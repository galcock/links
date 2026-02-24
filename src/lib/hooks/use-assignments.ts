import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface Assignment {
  id: string;
  title: string;
  description: string | null;
  type: string;
  points: number | null;
  dueDate: string | null;
  status: string;
  courseId: string;
  course?: {
    id: string;
    name: string;
    code: string;
  };
  _count?: {
    submissions: number;
  };
}

interface AssignmentsParams {
  page?: number;
  limit?: number;
  search?: string;
  courseId?: string;
  status?: string;
  type?: string;
}

interface AssignmentsResponse {
  success: true;
  data: Assignment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useAssignments(params?: AssignmentsParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.search) queryParams.set('search', params.search);
  if (params?.courseId) queryParams.set('courseId', params.courseId);
  if (params?.status) queryParams.set('status', params.status);
  if (params?.type) queryParams.set('type', params.type);

  return useQuery({
    queryKey: ['assignments', params],
    queryFn: async () => {
      const response = await fetch(`/api/assignments?${queryParams}`);
      const data: AssignmentsResponse = await response.json();
      return data;
    },
  });
}

export function useAssignment(id: string) {
  return useQuery({
    queryKey: ['assignments', id],
    queryFn: () => api.get<Assignment>(`/assignments/${id}`),
    enabled: !!id,
  });
}

export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Assignment>) => api.post<Assignment>('/assignments', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}

export function useUpdateAssignment(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Assignment>) => api.patch<Assignment>(`/assignments/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      queryClient.invalidateQueries({ queryKey: ['assignments', id] });
    },
  });
}

export function useDeleteAssignment(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/assignments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}
