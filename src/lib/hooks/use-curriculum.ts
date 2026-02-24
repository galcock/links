import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface CurriculumPlan {
  id: string;
  name: string;
  description: string | null;
  subject: string;
  gradeLevel: number | null;
  scope: string;
  standards: string[];
  ownerId: string;
  createdAt: string;
  owner?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  _count?: {
    units: number;
  };
}

interface CurriculumUnit {
  id: string;
  curriculumId: string;
  name: string;
  description: string | null;
  position: number;
  estimatedWeeks: number | null;
  objectives: string[];
  resources: Record<string, any> | null;
  createdAt: string;
}

interface CurriculumParams {
  page?: number;
  limit?: number;
  search?: string;
  subject?: string;
  gradeLevel?: number;
  scope?: string;
}

interface CurriculumResponse {
  success: true;
  data: CurriculumPlan[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface CurriculumUnitsResponse {
  success: true;
  data: CurriculumUnit[];
}

export function useCurriculum(params?: CurriculumParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.search) queryParams.set('search', params.search);
  if (params?.subject) queryParams.set('subject', params.subject);
  if (params?.gradeLevel) queryParams.set('gradeLevel', params.gradeLevel.toString());
  if (params?.scope) queryParams.set('scope', params.scope);

  return useQuery({
    queryKey: ['curriculum', params],
    queryFn: async () => {
      const response = await fetch(`/api/curriculum?${queryParams}`);
      const data: CurriculumResponse = await response.json();
      return data;
    },
  });
}

export function useCurriculumPlan(id: string) {
  return useQuery({
    queryKey: ['curriculum', id],
    queryFn: () => api.get<CurriculumPlan>(`/curriculum/${id}`),
    enabled: !!id,
  });
}

export function useCurriculumUnits(curriculumId: string) {
  return useQuery({
    queryKey: ['curriculum', curriculumId, 'units'],
    queryFn: async () => {
      const response = await fetch(`/api/curriculum/${curriculumId}/units`);
      const data: CurriculumUnitsResponse = await response.json();
      return data;
    },
    enabled: !!curriculumId,
  });
}

export function useCreateCurriculum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CurriculumPlan>) => api.post<CurriculumPlan>('/curriculum', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curriculum'] });
    },
  });
}

export function useUpdateCurriculum(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CurriculumPlan>) => api.patch<CurriculumPlan>(`/curriculum/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curriculum'] });
      queryClient.invalidateQueries({ queryKey: ['curriculum', id] });
    },
  });
}

export function useDeleteCurriculum(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/curriculum/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curriculum'] });
    },
  });
}

export function useCreateCurriculumUnit(curriculumId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CurriculumUnit>) => 
      api.post<CurriculumUnit>(`/curriculum/${curriculumId}/units`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curriculum', curriculumId, 'units'] });
    },
  });
}

export function useUpdateCurriculumUnit(curriculumId: string, unitId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CurriculumUnit>) => 
      api.patch<CurriculumUnit>(`/curriculum/${curriculumId}/units/${unitId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curriculum', curriculumId, 'units'] });
    },
  });
}
