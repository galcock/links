import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireAuth, hashPassword } from '@/lib/auth';
import { hasPermission } from '@/lib/authorization';
import { 
  successResponse, 
  errorResponse,
  forbiddenError,
  notFoundError 
} from '@/lib/api-response';
import { validateBody } from '@/lib/api-helpers';

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const { id } = params;

    if (!hasPermission(user, 'users:read') && user.id !== id) {
      return forbiddenError();
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
      include: {
        organization: { select: { id: true, name: true, type: true } },
        studentProfile: true,
        instructorProfile: true,
        parentProfile: true,
        adminProfile: true,
        servicesProfile: true,
        communityProfile: true,
      },
    });

    if (!targetUser || targetUser.organizationId !== user.organizationId) {
      return notFoundError('User');
    }

    const { passwordHash, mfaSecret, ...safeUser } = targetUser;

    return successResponse(safeUser);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get user error:', error);
    return errorResponse('An error occurred while fetching user');
  }
}

const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  avatarUrl: z.string().optional(),
  dateOfBirth: z.string().datetime().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION']).optional(),
  preferences: z.record(z.unknown()).optional(),
});

// PATCH /api/users/[id] - Update user
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const { id } = params;

    const canEdit = hasPermission(user, 'users:write') || user.id === id;
    if (!canEdit) {
      return forbiddenError();
    }

    const validation = await validateBody(request, updateUserSchema);
    if (validation.error) {
      return validation.error;
    }

    // Check user exists and is in same organization
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser || existingUser.organizationId !== user.organizationId) {
      return notFoundError('User');
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: validation.data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        role: true,
        status: true,
        phone: true,
        dateOfBirth: true,
        preferences: true,
        updatedAt: true,
      },
    });

    return successResponse(updatedUser);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Update user error:', error);
    return errorResponse('An error occurred while updating user');
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const { id } = params;

    if (!hasPermission(user, 'users:delete')) {
      return forbiddenError();
    }

    // Check user exists and is in same organization
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser || existingUser.organizationId !== user.organizationId) {
      return notFoundError('User');
    }

    // Soft delete by setting status to INACTIVE
    await prisma.user.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });

    return successResponse({ message: 'User deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Delete user error:', error);
    return errorResponse('An error occurred while deleting user');
  }
}
