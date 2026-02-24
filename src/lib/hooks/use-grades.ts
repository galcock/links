import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignmentId: string | null;
  score: number | null;
  maxScore: number | null;
  percentage: number | null;
  letterGrade: string | null;
  feedback: string | null;
  rubricScores: Record<string, number> | null;
  gradedBy: string | null;
  gradedAt: string | null;
  student?: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    };
  };
  course?: {
    id: string;
    name: string;
    code: string;
  };
  assignment?: {
    id: string;
    title: string;
    type: string;
  };
}

interface GradesParams {
  page?: number;
  limit?: number;
  studentId?: string;
  courseId?: string;
  assignmentId?: string;
}

interface GradesResponse {
  success: true;
  data: Grade[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useGrades(params?: GradesParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.studentId) queryParams.set('studentId', params.studentId);
  if (params?.courseId) queryParams.set('courseId', params.courseId);
  if (params?.assignmentId) queryParams.set('assignmentId', params.assignmentId);

  return useQuery({
    queryKey: ['grades', params],
    queryFn: async () => {
      const response = await fetch(`/api/grades?${queryParams}`);
      const data: GradesResponse = await response.json();
      return data;
    },
  });
}

export function useGrade(id: string) {
  return useQuery({
    queryKey: ['grades', id],
    queryFn: () => api.get<Grade>(`/grades/${id}`),
    enabled: !!id,
  });
}

export function useCreateGrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Grade>) => api.post<Grade>('/grades', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });
}

export function useUpdateGrade(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Grade>) => api.patch<Grade>(`/grades/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
      queryClient.invalidateQueries({ queryKey: ['grades', id] });
    },
  });
}

export function useDeleteGrade(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/grades/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });
}
