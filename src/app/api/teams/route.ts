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

    if (!hasPermission(user, 'teams:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const { search, sort, order } = getSearchParams(request);
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const isPublic = searchParams.get('isPublic');

    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (type) where.type = type;
    if (isPublic !== null) where.isPublic = isPublic === 'true';

    // Non-public teams require membership
    if (isPublic !== 'true') {
      where.OR = [
        { isPublic: true },
        { members: { some: { userId: user.id } } },
      ];
    }

    const total = await prisma.team.count({ where });

    const teams = await prisma.team.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    return successResponse(teams, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get teams error:', error);
    return errorResponse('An error occurred while fetching teams');
  }
}

const createTeamSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['GENERAL', 'CLASS', 'CLUB', 'SPORT', 'DEPARTMENT', 'COMMITTEE']).optional(),
  isPublic: z.boolean().optional(),
  avatarUrl: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'teams:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createTeamSchema);
    if (validation.error) {
      return validation.error;
    }

    const team = await prisma.team.create({
      data: {
        ...validation.data,
        organizationId: user.organizationId,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
      },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    return successResponse(team);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create team error:', error);
    return errorResponse('An error occurred while creating team');
  }
}
