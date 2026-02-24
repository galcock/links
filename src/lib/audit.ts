import { prisma } from './db';
import { AuditAction } from '@prisma/client';
import { headers } from 'next/headers';

interface AuditLogParams {
  action: AuditAction;
  entityType: string;
  entityId?: string;
  userId?: string;
  organizationId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export async function createAuditLog(params: AuditLogParams) {
  const headersList = await headers();
  const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip');
  const userAgent = headersList.get('user-agent');

  try {
    await prisma.auditLog.create({
      data: {
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        userId: params.userId,
        organizationId: params.organizationId,
        oldValues: params.oldValues ? JSON.parse(JSON.stringify(params.oldValues)) : undefined,
        newValues: params.newValues ? JSON.parse(JSON.stringify(params.newValues)) : undefined,
        metadata: params.metadata ? JSON.parse(JSON.stringify(params.metadata)) : {},
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw - audit logging should never break the main operation
  }
}

export async function getAuditLogs(options: {
  organizationId?: string;
  userId?: string;
  entityType?: string;
  entityId?: string;
  action?: AuditAction;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}) {
  const {
    organizationId,
    userId,
    entityType,
    entityId,
    action,
    startDate,
    endDate,
    page = 1,
    limit = 50,
  } = options;

  const where: Record<string, unknown> = {};
  
  if (organizationId) where.organizationId = organizationId;
  if (userId) where.userId = userId;
  if (entityType) where.entityType = entityType;
  if (entityId) where.entityId = entityId;
  if (action) where.action = action;
  
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) (where.createdAt as Record<string, Date>).gte = startDate;
    if (endDate) (where.createdAt as Record<string, Date>).lte = endDate;
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// FERPA-compliant logging for student record access
export async function logStudentRecordAccess(
  userId: string,
  studentId: string,
  recordType: string,
  organizationId: string
) {
  await createAuditLog({
    action: 'READ',
    entityType: 'STUDENT_RECORD',
    entityId: studentId,
    userId,
    organizationId,
    metadata: {
      recordType,
      ferpaCompliant: true,
      timestamp: new Date().toISOString(),
    },
  });
}

// HIPAA-compliant logging for PHI access
export async function logPHIAccess(
  userId: string,
  studentId: string,
  phiType: string,
  organizationId: string
) {
  await createAuditLog({
    action: 'READ',
    entityType: 'PHI',
    entityId: studentId,
    userId,
    organizationId,
    metadata: {
      phiType,
      hipaaCompliant: true,
      timestamp: new Date().toISOString(),
    },
  });
}
