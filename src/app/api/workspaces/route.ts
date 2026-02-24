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

    if (!hasPermission(user, 'workspaces:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const { search, sort, order } = getSearchParams(request);
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
      members: {
        some: { userId: user.id },
      },
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (type) where.type = type;
    if (status) where.status = status;

    const total = await prisma.workspace.count({ where });

    const workspaces = await prisma.workspace.findMany({
      where,
      skip,
      take: limit,
      orderBy: buildOrderBy(sort, order),
      include: {
        _count: {
          select: {
            members: true,
            tasks: true,
          },
        },
      },
    });

    return successResponse(workspaces, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get workspaces error:', error);
    return errorResponse('An error occurred while fetching workspaces');
  }
}

const createWorkspaceSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['PROJECT', 'TEAM', 'DEPARTMENT', 'COURSE', 'PERSONAL']).optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'workspaces:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createWorkspaceSchema);
    if (validation.error) {
      return validation.error;
    }

    // Create workspace with user as owner
    const workspace = await prisma.workspace.create({
      data: {
        ...validation.data,
        organizationId: user.organizationId,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
        columns: {
          create: [
            { name: 'To Do', sequence: 0, color: '#94A3B8' },
            { name: 'In Progress', sequence: 1, color: '#3B82F6' },
            { name: 'Done', sequence: 2, color: '#10B981' },
          ],
        },
      },
      include: {
        columns: true,
        _count: {
          select: { members: true, tasks: true },
        },
      },
    });

    return successResponse(workspace);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create workspace error:', error);
    return errorResponse('An error occurred while creating workspace');
  }
}
