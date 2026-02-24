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

    if (!hasPermission(user, 'assignments:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const { search, sort, order } = getSearchParams(request);
    const searchParams = request.nextUrl.searchParams;
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const where: Record<string, unknown> = {
      course: { organizationId: user.organizationId },
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (courseId) where.courseId = courseId;
    if (status) where.status = status;
    if (type) where.type = type;

    // For students, only show assignments from their courses
    if (user.role === 'STUDENT') {
      where.course = {
        organizationId: user.organizationId,
        enrollments: {
          some: { userId: user.id, status: 'ACTIVE' },
        },
      };
    }

    const total = await prisma.assignment.count({ where });

    const assignments = await prisma.assignment.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort || 'dueDate', order),
      include: {
        course: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            submissions: true,
          },
        },
      },
    });

    return successResponse(assignments, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get assignments error:', error);
    return errorResponse('An error occurred while fetching assignments');
  }
}

const createAssignmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  instructions: z.string().optional(),
  type: z.enum(['HOMEWORK', 'QUIZ', 'TEST', 'ESSAY', 'PROJECT', 'PRESENTATION', 'DISCUSSION', 'LAB', 'PARTICIPATION']),
  points: z.number().optional(),
  dueDate: z.string().datetime().optional(),
  availableFrom: z.string().datetime().optional(),
  availableUntil: z.string().datetime().optional(),
  allowLateSubmission: z.boolean().optional(),
  latePenalty: z.number().optional(),
  rubric: z.array(z.any()).optional(),
  attachments: z.array(z.any()).optional(),
  courseId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'assignments:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createAssignmentSchema);
    if (validation.error) {
      return validation.error;
    }

    // Verify course exists and user has access
    const course = await prisma.course.findUnique({
      where: { id: validation.data.courseId },
    });

    if (!course || course.organizationId !== user.organizationId) {
      return errorResponse('Course not found', 'NOT_FOUND', 404);
    }

    const assignment = await prisma.assignment.create({
      data: {
        ...validation.data,
        createdById: user.id,
        status: 'DRAFT',
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return successResponse(assignment);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create assignment error:', error);
    return errorResponse('An error occurred while creating assignment');
  }
}
