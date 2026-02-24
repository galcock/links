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

    if (!hasPermission(user, 'services:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const { sort, order } = getSearchParams(request);
    const searchParams = request.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};

    if (studentId) {
      where.studentId = studentId;
    } else if (user.role === 'STUDENT') {
      where.studentId = user.id;
    }

    if (type) where.type = type;
    if (status) where.status = status;

    const total = await prisma.serviceRecord.count({ where });

    const records = await prisma.serviceRecord.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort || 'sessionDate', order || 'desc'),
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return successResponse(records, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get service records error:', error);
    return errorResponse('An error occurred while fetching service records');
  }
}

const createServiceRecordSchema = z.object({
  type: z.enum(['SPECIAL_EDUCATION', 'PHYSICAL_THERAPY', 'SPEECH_THERAPY', 'OCCUPATIONAL_THERAPY', 'COUNSELING', 'GUIDANCE', 'PSYCHOLOGY', 'SOCIAL_WORK', 'NURSING']),
  sessionDate: z.string().datetime(),
  duration: z.number().min(1),
  notes: z.string().optional(),
  goals: z.array(z.any()).optional(),
  progress: z.record(z.unknown()).optional(),
  attachments: z.array(z.any()).optional(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
  studentId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'services:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createServiceRecordSchema);
    if (validation.error) {
      return validation.error;
    }

    const record = await prisma.serviceRecord.create({
      data: {
        ...validation.data,
        status: validation.data.status || 'SCHEDULED',
      },
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return successResponse(record);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create service record error:', error);
    return errorResponse('An error occurred while creating service record');
  }
}
