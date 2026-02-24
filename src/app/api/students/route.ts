import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { hasPermission } from '@/lib/authorization';
import { successResponse, errorResponse, forbiddenError, paginationMeta } from '@/lib/api-response';
import { getPaginationParams, getSearchParams, buildOrderBy } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'students:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const { search, sort, order } = getSearchParams(request);
    const searchParams = request.nextUrl.searchParams;
    const gradeLevel = searchParams.get('gradeLevel');

    const where: Record<string, unknown> = {
      user: { organizationId: user.organizationId },
    };

    if (search) {
      where.user = {
        organizationId: user.organizationId,
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    if (gradeLevel) {
      where.gradeLevel = parseInt(gradeLevel);
    }

    const total = await prisma.studentProfile.count({ where });

    const students = await prisma.studentProfile.findMany({
      where,
      skip,
      take: limit,
      orderBy: sort === 'name' ? { user: { firstName: order } } : buildOrderBy(sort, order),
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            phone: true,
            dateOfBirth: true,
            status: true,
          },
        },
      },
    });

    return successResponse(students, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get students error:', error);
    return errorResponse('An error occurred while fetching students');
  }
}
