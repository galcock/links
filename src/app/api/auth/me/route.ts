import { getCurrentUser } from '@/lib/auth';
import { successResponse, unauthorizedError, errorResponse } from '@/lib/api-response';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return unauthorizedError();
    }

    // Fetch complete user profile with relations
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            type: true,
            logoUrl: true,
          },
        },
        studentProfile: true,
        instructorProfile: true,
        parentProfile: true,
        adminProfile: true,
        servicesProfile: true,
        communityProfile: true,
      },
    });

    if (!fullUser) {
      return unauthorizedError();
    }

    return successResponse({
      id: fullUser.id,
      email: fullUser.email,
      firstName: fullUser.firstName,
      lastName: fullUser.lastName,
      avatarUrl: fullUser.avatarUrl,
      role: fullUser.role,
      status: fullUser.status,
      phone: fullUser.phone,
      dateOfBirth: fullUser.dateOfBirth,
      emailVerified: fullUser.emailVerified,
      mfaEnabled: fullUser.mfaEnabled,
      lastLoginAt: fullUser.lastLoginAt,
      preferences: fullUser.preferences,
      organization: fullUser.organization,
      profile: fullUser.studentProfile ||
        fullUser.instructorProfile ||
        fullUser.parentProfile ||
        fullUser.adminProfile ||
        fullUser.servicesProfile ||
        fullUser.communityProfile,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return errorResponse('An error occurred while fetching user data');
  }
}
