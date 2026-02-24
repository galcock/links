import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { verifyPassword, createSession, setAuthCookies } from '@/lib/auth';
import { successResponse, errorResponse, validationError } from '@/lib/api-response';
import { validateBody } from '@/lib/api-helpers';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const validation = await validateBody(request, loginSchema);
    if (validation.error) {
      return validation.error;
    }

    const { email, password } = validation.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        organization: {
          select: { id: true, name: true, type: true },
        },
      },
    });

    if (!user) {
      return errorResponse('Invalid email or password', 'INVALID_CREDENTIALS', 401);
    }

    // Check if account is active
    if (user.status !== 'ACTIVE') {
      return errorResponse(
        'Account is not active. Please contact support.',
        'ACCOUNT_INACTIVE',
        403
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return errorResponse('Invalid email or password', 'INVALID_CREDENTIALS', 401);
    }

    // Get client info
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;

    // Create session and tokens
    const { accessToken, refreshToken } = await createSession(user, userAgent, ipAddress);

    // Prepare cookies
    const cookies = setAuthCookies(accessToken, refreshToken);

    // Create response
    const response = successResponse({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        organization: user.organization,
      },
      accessToken,
      refreshToken,
    });

    // Set cookies
    response.cookies.set(cookies.accessToken);
    response.cookies.set(cookies.refreshToken);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('An error occurred during login');
  }
}
