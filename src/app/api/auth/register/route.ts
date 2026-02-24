import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';
import type { UserRole } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      firstName,
      lastName,
      role,
      organizationCode,
    } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles: UserRole[] = [
      'STUDENT',
      'INSTRUCTOR',
      'PARENT',
      'ADMINISTRATOR',
      'STUDENT_SERVICES',
      'COMMUNITY_SERVICES',
    ];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Find or create organization
    let organization;
    if (organizationCode) {
      organization = await prisma.organization.findUnique({
        where: { slug: organizationCode.toLowerCase() },
      });
      if (!organization) {
        return NextResponse.json(
          { error: 'Invalid organization code' },
          { status: 400 }
        );
      }
    } else {
      // Use or create a default organization for demo
      organization = await prisma.organization.upsert({
        where: { slug: 'demo-school' },
        update: {},
        create: {
          name: 'Demo School',
          slug: 'demo-school',
          type: 'SCHOOL',
        },
      });
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
        organizationId: organization.id,
        status: 'ACTIVE',
        emailVerified: false, // In production, send verification email
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
          data: { userId: user.id, serviceType: 'COUNSELING' },
        });
        break;
      case 'COMMUNITY_SERVICES':
        await prisma.communityProfile.create({
          data: { userId: user.id },
        });
        break;
    }

    // Create default calendar for user
    await prisma.calendar.create({
      data: {
        name: 'My Calendar',
        organizationId: organization.id,
      },
    });

    // Log registration
    await createAuditLog({
      action: 'CREATE',
      entityType: 'USER',
      entityId: user.id,
      organizationId: organization.id,
      newValues: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });

    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
