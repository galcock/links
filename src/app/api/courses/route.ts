import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { hasPermission } from '@/lib/authorization';
import { successResponse, errorResponse, forbiddenError, paginationMeta } from '@/lib/api-response';
import { getPaginationParams, getSearchParams, validateBody, buildOrderBy } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'courses:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const { search, sort, order } = getSearchParams(request);
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const instructorId = searchParams.get('instructorId');

    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) where.status = status;
    if (instructorId) where.instructorId = instructorId;

    // For students, only show courses they're enrolled in
    if (user.role === 'STUDENT') {
      where.enrollments = {
        some: { userId: user.id, status: 'ACTIVE' },
      };
    }

    const total = await prisma.course.count({ where });

    const courses = await prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        instructor: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
            assignments: true,
          },
        },
      },
    });

    return successResponse(courses, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get courses error:', error);
    return errorResponse('An error occurred while fetching courses');
  }
}

const createCourseSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional(),
  syllabus: z.string().optional(),
  credits: z.number().optional(),
  gradeLevel: z.number().optional(),
  subject: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  maxEnrollment: z.number().optional(),
  instructorId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'courses:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createCourseSchema);
    if (validation.error) {
      return validation.error;
    }

    const course = await prisma.course.create({
      data: {
        ...validation.data,
        organizationId: user.organizationId,
        status: 'DRAFT',
      },
      include: {
        instructor: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    return successResponse(course);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create course error:', error);
    return errorResponse('An error occurred while creating course');
  }
}
