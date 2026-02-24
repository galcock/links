import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { hashPassword, createSession, setAuthCookies } from '@/lib/auth';
import { successResponse, errorResponse, conflictError } from '@/lib/api-response';
import { validateBody } from '@/lib/api-helpers';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['STUDENT', 'INSTRUCTOR', 'PARENT', 'ADMINISTRATOR', 'STUDENT_SERVICES', 'COMMUNITY_SERVICES']),
  organizationId: z.string().min(1, 'Organization is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const validation = await validateBody(request, registerSchema);
    if (validation.error) {
      return validation.error;
    }

    const { email, password, firstName, lastName, role, organizationId } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return conflictError('Email already registered');
    }

    // Verify organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!organization) {
      return errorResponse('Organization not found', 'INVALID_ORGANIZATION', 400);
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        role,
        organizationId,
        status: 'PENDING_VERIFICATION',
      },
      include: {
        organization: {
          select: { id: true, name: true, type: true },
        },
      },
    });

    // Create role-specific profile
    switch (role) {
      case 'STUDENT':
        await prisma.studentProfile.create({
          data: { userId: user.id },
        });
        break;
      case 'INSTRUCTOR':
        await prisma.instructorProfile.create({
          data: { userId: user.id },
        });
        break;
      case 'PARENT':
        await prisma.parentProfile.create({
          data: { userId: user.id },
        });
        break;
      case 'ADMINISTRATOR':
        await prisma.adminProfile.create({
          data: { userId: user.id },
        });
        break;
      case 'STUDENT_SERVICES':
        await prisma.servicesProfile.create({
          data: { 
            userId: user.id,
            serviceType: 'GUIDANCE', // Default, can be changed later
          },
        });
        break;
      case 'COMMUNITY_SERVICES':
        await prisma.communityProfile.create({
          data: { userId: user.id },
        });
        break;
    }

    // Get client info
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;

    // Create session - only if status is ACTIVE (for now, we set to ACTIVE for demo)
    // In production, you'd send a verification email first
    await prisma.user.update({
      where: { id: user.id },
      data: { status: 'ACTIVE' },
    });

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
    console.error('Registration error:', error);
    return errorResponse('An error occurred during registration');
  }
}
