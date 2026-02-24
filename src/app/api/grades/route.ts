import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { hasPermission } from '@/lib/authorization';
import { successResponse, errorResponse, forbiddenError, paginationMeta } from '@/lib/api-response';
import { getPaginationParams, getSearchParams, validateBody } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'grades:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const searchParams = request.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const courseId = searchParams.get('courseId');

    const where: Record<string, unknown> = {
      submission: {
        assignment: {
          course: { organizationId: user.organizationId },
        },
      },
    };

    // Students can only see their own grades
    if (user.role === 'STUDENT') {
      where.studentId = user.id;
    } else if (studentId) {
      where.studentId = studentId;
    }

    if (courseId) {
      where.submission = {
        assignment: {
          courseId,
          course: { organizationId: user.organizationId },
        },
      };
    }

    const total = await prisma.grade.count({ where });

    const grades = await prisma.grade.findMany({
      where,
      skip,
      take: limit,
      orderBy: { gradedAt: 'desc' },
      include: {
        submission: {
          include: {
            assignment: {
              select: {
                id: true,
                title: true,
                type: true,
                points: true,
                courseId: true,
              },
            },
          },
        },
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        instructor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return successResponse(grades, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get grades error:', error);
    return errorResponse('An error occurred while fetching grades');
  }
}

const createGradeSchema = z.object({
  submissionId: z.string(),
  score: z.number(),
  maxScore: z.number(),
  letterGrade: z.string().optional(),
  feedback: z.string().optional(),
  rubricScores: z.array(z.any()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'grades:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createGradeSchema);
    if (validation.error) {
      return validation.error;
    }

    // Get submission with assignment and course info
    const submission = await prisma.submission.findUnique({
      where: { id: validation.data.submissionId },
      include: {
        assignment: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!submission || submission.assignment.course.organizationId !== user.organizationId) {
      return errorResponse('Submission not found', 'NOT_FOUND', 404);
    }

    // Calculate percentage
    const percentage = (validation.data.score / validation.data.maxScore) * 100;

    // Create or update grade
    const grade = await prisma.grade.upsert({
      where: { submissionId: validation.data.submissionId },
      create: {
        ...validation.data,
        percentage,
        studentId: submission.userId,
        instructorId: user.id,
      },
      update: {
        ...validation.data,
        percentage,
        instructorId: user.id,
      },
      include: {
        submission: {
          include: {
            assignment: {
              select: {
                id: true,
                title: true,
                type: true,
              },
            },
          },
        },
      },
    });

    return successResponse(grade);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create grade error:', error);
    return errorResponse('An error occurred while creating grade');
  }
}
