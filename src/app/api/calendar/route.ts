import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { hasPermission } from '@/lib/authorization';
import { successResponse, errorResponse, forbiddenError, paginationMeta } from '@/lib/api-response';
import { getPaginationParams, validateBody } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'calendar:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');

    const where: Record<string, unknown> = {
      calendar: { organizationId: user.organizationId },
      userId: user.id,
    };

    if (startDate && endDate) {
      where.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (type) where.type = type;

    const total = await prisma.calendarEvent.count({ where });

    const events = await prisma.calendarEvent.findMany({
      where,
      skip,
      take: limit,
      orderBy: { startTime: 'asc' },
      include: {
        calendar: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return successResponse(events, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get calendar events error:', error);
    return errorResponse('An error occurred while fetching calendar events');
  }
}

const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  allDay: z.boolean().optional(),
  location: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurrenceRule: z.string().optional(),
  color: z.string().optional(),
  type: z.enum(['EVENT', 'MEETING', 'CLASS', 'DEADLINE', 'HOLIDAY', 'REMINDER', 'APPOINTMENT']).optional(),
  visibility: z.enum(['PRIVATE', 'PUBLIC', 'ORGANIZATION']).optional(),
  reminders: z.array(z.any()).optional(),
  calendarId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'calendar:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createEventSchema);
    if (validation.error) {
      return validation.error;
    }

    const event = await prisma.calendarEvent.create({
      data: {
        ...validation.data,
        userId: user.id,
      },
      include: {
        calendar: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    return successResponse(event);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create calendar event error:', error);
    return errorResponse('An error occurred while creating calendar event');
  }
}
