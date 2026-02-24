import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, createSession, setAuthCookies } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        organization: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Your account is not active. Please contact support.' },
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      // Log failed attempt
      await createAuditLog({
        action: 'LOGIN',
        entityType: 'USER',
        entityId: user.id,
        organizationId: user.organizationId,
        metadata: { success: false, reason: 'Invalid password' },
      });

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session
    const userAgent = request.headers.get('user-agent') || undefined;
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : undefined;

    const { accessToken, refreshToken } = await createSession(
      user,
      userAgent,
      ipAddress
    );

    // Log successful login
    await createAuditLog({
      action: 'LOGIN',
      entityType: 'USER',
      entityId: user.id,
      userId: user.id,
      organizationId: user.organizationId,
      metadata: { success: true },
    });

    // Set cookies
    const cookieStore = await cookies();
    const authCookies = setAuthCookies(accessToken, refreshToken);
    
    cookieStore.set(authCookies.accessToken.name, authCookies.accessToken.value, {
      httpOnly: authCookies.accessToken.httpOnly,
      secure: authCookies.accessToken.secure,
      sameSite: authCookies.accessToken.sameSite,
      maxAge: authCookies.accessToken.maxAge,
      path: authCookies.accessToken.path,
    });
    
    cookieStore.set(authCookies.refreshToken.name, authCookies.refreshToken.value, {
      httpOnly: authCookies.refreshToken.httpOnly,
      secure: authCookies.refreshToken.secure,
      sameSite: authCookies.refreshToken.sameSite,
      maxAge: authCookies.refreshToken.maxAge,
      path: authCookies.refreshToken.path,
    });

    // Return user data (without sensitive info)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        organizationId: user.organizationId,
        avatarUrl: user.avatarUrl,
        organization: user.organization,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
