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

    if (!hasPermission(user, 'announcements:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const { search, sort, order } = getSearchParams(request);
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const priority = searchParams.get('priority');

    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
      isPublished: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gte: new Date() } },
      ],
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (type) where.type = type;
    if (priority) where.priority = priority;

    const total = await prisma.announcement.count({ where });

    const announcements = await prisma.announcement.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        { isPinned: 'desc' },
        buildOrderBy(sort || 'publishedAt', order || 'desc'),
      ],
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
    });

    return successResponse(announcements, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get announcements error:', error);
    return errorResponse('An error occurred while fetching announcements');
  }
}

const createAnnouncementSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  type: z.enum(['INFO', 'WARNING', 'ALERT', 'SUCCESS', 'EVENT']).optional(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
  targetRoles: z.array(z.string()).optional(),
  isPinned: z.boolean().optional(),
  expiresAt: z.string().datetime().optional(),
  attachments: z.array(z.any()).optional(),
  isPublished: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'announcements:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createAnnouncementSchema);
    if (validation.error) {
      return validation.error;
    }

    const announcement = await prisma.announcement.create({
      data: {
        ...validation.data,
        organizationId: user.organizationId,
        authorId: user.id,
        publishedAt: validation.data.isPublished ? new Date() : null,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
    });

    return successResponse(announcement);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create announcement error:', error);
    return errorResponse('An error occurred while creating announcement');
  }
}
