import { NextResponse } from 'next/server';

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export function successResponse<T>(data: T, meta?: ApiSuccessResponse['meta']) {
  return NextResponse.json({
    success: true,
    data,
    ...(meta && { meta }),
  } as ApiSuccessResponse<T>);
}

export function errorResponse(
  message: string,
  code: string = 'INTERNAL_ERROR',
  status: number = 500,
  details?: unknown
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
      },
    } as ApiErrorResponse,
    { status }
  );
}

export function validationError(details: unknown) {
  return errorResponse('Validation failed', 'VALIDATION_ERROR', 400, details);
}

export function unauthorizedError(message = 'Authentication required') {
  return errorResponse(message, 'UNAUTHORIZED', 401);
}

export function forbiddenError(message = 'Insufficient permissions') {
  return errorResponse(message, 'FORBIDDEN', 403);
}

export function notFoundError(resource = 'Resource') {
  return errorResponse(`${resource} not found`, 'NOT_FOUND', 404);
}

export function conflictError(message: string) {
  return errorResponse(message, 'CONFLICT', 409);
}

export function paginationMeta(page: number, limit: number, total: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
