import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface Course {
  id: string;
  name: string;
  code: string;
  description: string | null;
  credits: number | null;
  gradeLevel: number | null;
  subject: string | null;
  status: string;
  instructor?: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    };
  };
  _count?: {
    enrollments: number;
    assignments: number;
  };
}

interface CoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  instructorId?: string;
}

interface CoursesResponse {
  success: true;
  data: Course[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useCourses(params?: CoursesParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.search) queryParams.set('search', params.search);
  if (params?.status) queryParams.set('status', params.status);
  if (params?.instructorId) queryParams.set('instructorId', params.instructorId);

  return useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      const response = await fetch(`/api/courses?${queryParams}`);
      const data: CoursesResponse = await response.json();
      return data;
    },
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ['courses', id],
    queryFn: () => api.get<Course>(`/courses/${id}`),
    enabled: !!id,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Course>) => api.post<Course>('/courses', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useUpdateCourse(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Course>) => api.patch<Course>(`/courses/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['courses', id] });
    },
  });
}

export function useDeleteCourse(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/courses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}
