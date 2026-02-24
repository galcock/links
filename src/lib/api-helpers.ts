import { NextRequest } from 'next/server';
import { ZodSchema, z } from 'zod';
import { validationError } from './api-response';

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export function getPaginationParams(request: NextRequest): PaginationParams {
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function getSearchParams(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  return {
    search: searchParams.get('search') || undefined,
    sort: searchParams.get('sort') || undefined,
    order: (searchParams.get('order') || 'asc') as 'asc' | 'desc',
    filter: searchParams.get('filter') || undefined,
  };
}

export async function validateBody<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<{ data: T; error: null } | { data: null; error: ReturnType<typeof validationError> }> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { data, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { data: null, error: validationError(error.errors) };
    }
    return { data: null, error: validationError('Invalid request body') };
  }
}

export function buildWhereClause(searchParams: ReturnType<typeof getSearchParams>, searchFields: string[]) {
  const where: Record<string, unknown> = {};

  if (searchParams.search && searchFields.length > 0) {
    where.OR = searchFields.map(field => ({
      [field]: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    }));
  }

  return where;
}

export function buildOrderBy(sort?: string, order: 'asc' | 'desc' = 'asc') {
  if (!sort) return { createdAt: 'desc' };
  return { [sort]: order };
}
