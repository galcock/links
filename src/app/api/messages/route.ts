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

    if (!hasPermission(user, 'messages:read')) {
      return forbiddenError();
    }

    const { page, limit, skip } = getPaginationParams(request);
    const searchParams = request.nextUrl.searchParams;
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return errorResponse('conversationId is required', 'VALIDATION_ERROR', 400);
    }

    // Verify user is participant
    const participant = await prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: {
          conversationId,
          userId: user.id,
        },
      },
    });

    if (!participant) {
      return forbiddenError();
    }

    const total = await prisma.message.count({
      where: {
        conversationId,
        isDeleted: false,
      },
    });

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
        isDeleted: false,
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        sender: {
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

    return successResponse(messages.reverse(), paginationMeta(page, limit, total));
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Get messages error:', error);
    return errorResponse('An error occurred while fetching messages');
  }
}

const createMessageSchema = z.object({
  conversationId: z.string(),
  content: z.string().min(1),
  type: z.enum(['TEXT', 'IMAGE', 'FILE', 'VIDEO', 'AUDIO', 'SYSTEM']).optional(),
  attachments: z.array(z.any()).optional(),
  recipientId: z.string().optional(),
  replyToId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    if (!hasPermission(user, 'messages:write')) {
      return forbiddenError();
    }

    const validation = await validateBody(request, createMessageSchema);
    if (validation.error) {
      return validation.error;
    }

    // Verify user is participant
    const participant = await prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: {
          conversationId: validation.data.conversationId,
          userId: user.id,
        },
      },
    });

    if (!participant) {
      return forbiddenError();
    }

    const message = await prisma.message.create({
      data: {
        ...validation.data,
        senderId: user.id,
        type: validation.data.type || 'TEXT',
      },
      include: {
        sender: {
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

    // Update conversation lastMessageAt
    await prisma.conversation.update({
      where: { id: validation.data.conversationId },
      data: { lastMessageAt: new Date() },
    });

    return successResponse(message);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Authentication required', 'UNAUTHORIZED', 401);
    }
    console.error('Create message error:', error);
    return errorResponse('An error occurred while creating message');
  }
}
