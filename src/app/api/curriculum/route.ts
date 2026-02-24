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

    if (!hasPermission(user, 'curriculum:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const { search, sort, order } = getSearchParams(request);
    const searchParams = request.nextUrl.searchParams;
    const scope = searchParams.get('scope');
    const subject = searchParams.get('subject');
    const gradeLevel = searchParams.get('gradeLevel');

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (scope) where.scope = scope;
    if (subject) where.subject = subject;
    if (gradeLevel) where.gradeLevel = parseInt(gradeLevel);

    // Filter by instructor or global/shared plans
    if (user.role === 'INSTRUCTOR') {
      where.OR = [
        { instructorId: user.id },
        { scope: 'GLOBAL' },
        { scope: 'SHARED' },
      ];
    } else {
      where.OR = [
        { scope: 'GLOBAL' },
        { scope: 'SHARED' },
      ];
    }

    const total = await prisma.curriculumPlan.count({ where });

    const plans = await prisma.curriculumPlan.findMany({
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
              },
            },
          },
        },
        _count: {
          select: { units: true },
        },
      },
    });

    return successResponse(plans, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get curriculum plans error:', error);
    return errorResponse('An error occurred while fetching curriculum plans');
  }
}

const createCurriculumPlanSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  scope: z.enum(['PERSONAL', 'SHARED', 'GLOBAL']).optional(),
  gradeLevel: z.number().optional(),
  subject: z.string().optional(),
  standards: z.array(z.any()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'curriculum:write')) {
      return forbiddenError();
    }

    // Only instructors can create curriculum plans
    if (user.role !== 'INSTRUCTOR' && user.role !== 'ADMINISTRATOR') {
      return forbiddenError();
    }

    const validation = await validateBody(request, createCurriculumPlanSchema);
    if (validation.error) {
      return validation.error;
    }

    // Get instructor profile
    const instructorProfile = await prisma.instructorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!instructorProfile && user.role === 'INSTRUCTOR') {
      return errorResponse('Instructor profile not found', 'NOT_FOUND', 404);
    }

    const plan = await prisma.curriculumPlan.create({
      data: {
        ...validation.data,
        instructorId: instructorProfile?.id || '',
      },
      include: {
        instructor: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return successResponse(plan);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create curriculum plan error:', error);
    return errorResponse('An error occurred while creating curriculum plan');
  }
}
