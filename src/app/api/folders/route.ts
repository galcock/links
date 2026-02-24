import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { hasPermission } from '@/lib/authorization';
import { successResponse, errorResponse, forbiddenError } from '@/lib/api-response';
import { validateBody } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'files:read')) {
      return forbiddenError();
    }

    const searchParams = request.nextUrl.searchParams;
    const parentId = searchParams.get('parentId');

    const where: Record<string, unknown> = {
      ownerId: user.id,
    };

    if (parentId) {
      where.parentId = parentId;
    } else {
      where.parentId = null; // Root folders
    }

    const folders = await prisma.folder.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            children: true,
            files: true,
          },
        },
      },
    });

    return successResponse(folders);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get folders error:', error);
    return errorResponse('An error occurred while fetching folders');
  }
}

const createFolderSchema = z.object({
  name: z.string().min(1),
  parentId: z.string().optional(),
  color: z.string().optional(),
  isShared: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'files:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createFolderSchema);
    if (validation.error) {
      return validation.error;
    }

    const folder = await prisma.folder.create({
      data: {
        ...validation.data,
        ownerId: user.id,
        organizationId: user.organizationId,
      },
      include: {
        _count: {
          select: {
            children: true,
            files: true,
          },
        },
      },
    });

    return successResponse(folder);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create folder error:', error);
    return errorResponse('An error occurred while creating folder');
  }
}
