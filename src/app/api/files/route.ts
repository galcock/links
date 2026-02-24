import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { hasPermission } from '@/lib/authorization';
import { successResponse, errorResponse, forbiddenError, paginationMeta } from '@/lib/api-response';
import { getPaginationParams, getSearchParams } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'files:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const { search } = getSearchParams(request);
    const searchParams = request.nextUrl.searchParams;
    const folderId = searchParams.get('folderId');

    const where: Record<string, unknown> = {
      uploadedById: user.id,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { originalName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (folderId) {
      where.folderId = folderId;
    }

    const total = await prisma.file.count({ where });

    const files = await prisma.file.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return successResponse(files, paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get files error:', error);
    return errorResponse('An error occurred while fetching files');
  }
}

// Note: File upload would require multipart/form-data handling
// This is a placeholder for the POST route structure
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'files:write')) {
      return forbiddenError();
    }

    // In a real implementation, you would:
    // 1. Parse multipart/form-data
    // 2. Upload file to storage (local/S3)
    // 3. Create file record in database

    return errorResponse('File upload not implemented yet', 'NOT_IMPLEMENTED', 501);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Upload file error:', error);
    return errorResponse('An error occurred while uploading file');
  }
}
