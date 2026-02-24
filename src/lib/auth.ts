import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './db';
import { nanoid } from 'nanoid';
import type { User, UserRole } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
);
const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-change-in-production'
);

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  organizationId: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId: string;
  avatarUrl: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateAccessToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload } as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .setJti(nanoid())
    .sign(JWT_SECRET);
}

export async function generateRefreshToken(payload: TokenPayload, family: string): Promise<string> {
  return new SignJWT({ ...payload, family } as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .setJti(nanoid())
    .sign(JWT_REFRESH_SECRET);
}

export async function verifyAccessToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<(TokenPayload & { family: string }) | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
    return payload as unknown as TokenPayload & { family: string };
  } catch {
    return null;
  }
}

export async function createSession(user: User, userAgent?: string, ipAddress?: string) {
  const family = nanoid();
  
  const tokenPayload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId,
  };

  const accessToken = await generateAccessToken(tokenPayload);
  const refreshToken = await generateRefreshToken(tokenPayload, family);

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      family,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  // Create session record
  await prisma.session.create({
    data: {
      userId: user.id,
      token: accessToken,
      userAgent,
      ipAddress,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return { accessToken, refreshToken };
}

export async function refreshSession(refreshToken: string) {
  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) return null;

  // Check if refresh token exists and is not revoked
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });

  if (!storedToken || storedToken.revokedAt) {
    // Token reuse detected - revoke entire family
    if (storedToken) {
      await prisma.refreshToken.updateMany({
        where: { family: storedToken.family },
        data: { revokedAt: new Date() },
      });
    }
    return null;
  }

  // Revoke old refresh token
  await prisma.refreshToken.update({
    where: { id: storedToken.id },
    data: { revokedAt: new Date() },
  });

  // Generate new tokens
  const tokenPayload: TokenPayload = {
    userId: storedToken.user.id,
    email: storedToken.user.email,
    role: storedToken.user.role,
    organizationId: storedToken.user.organizationId,
  };

  const newAccessToken = await generateAccessToken(tokenPayload);
  const newRefreshToken = await generateRefreshToken(tokenPayload, payload.family);

  // Store new refresh token
  await prisma.refreshToken.create({
    data: {
      userId: storedToken.user.id,
      token: newRefreshToken,
      family: payload.family,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function revokeSession(userId: string, family?: string) {
  if (family) {
    await prisma.refreshToken.updateMany({
      where: { userId, family },
      data: { revokedAt: new Date() },
    });
  } else {
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { revokedAt: new Date() },
    });
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  
  if (!token) return null;

  const payload = await verifyAccessToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      organizationId: true,
      avatarUrl: true,
    },
  });

  return user;
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireRole(allowedRoles: UserRole[]): Promise<AuthUser> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Forbidden');
  }
  return user;
}

export function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();
  
  // Note: In Next.js 14, cookies() is async in server actions
  // These will be set in API routes or server actions
  return {
    accessToken: {
      name: 'access_token',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    },
    refreshToken: {
      name: 'refresh_token',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    },
  };
}
