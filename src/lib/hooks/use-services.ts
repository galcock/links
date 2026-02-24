import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface ServiceRecord {
  id: string;
  studentId: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string | null;
  providerId: string;
  frequency: string | null;
  duration: number | null;
  goals: string[];
  accommodations: string[];
  notes: string | null;
  createdAt: string;
  student?: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    };
  };
  provider?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  _count?: {
    sessions: number;
  };
}

interface ServiceSession {
  id: string;
  serviceId: string;
  date: string;
  duration: number;
  notes: string | null;
  progressRating: number | null;
  attendanceStatus: string;
  createdAt: string;
}

interface ServicesParams {
  page?: number;
  limit?: number;
  studentId?: string;
  type?: string;
  status?: string;
  providerId?: string;
}

interface ServicesResponse {
  success: true;
  data: ServiceRecord[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ServiceSessionsResponse {
  success: true;
  data: ServiceSession[];
}

export function useServices(params?: ServicesParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.studentId) queryParams.set('studentId', params.studentId);
  if (params?.type) queryParams.set('type', params.type);
  if (params?.status) queryParams.set('status', params.status);
  if (params?.providerId) queryParams.set('providerId', params.providerId);

  return useQuery({
    queryKey: ['services', params],
    queryFn: async () => {
      const response = await fetch(`/api/services?${queryParams}`);
      const data: ServicesResponse = await response.json();
      return data;
    },
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ['services', id],
    queryFn: () => api.get<ServiceRecord>(`/services/${id}`),
    enabled: !!id,
  });
}

export function useServiceSessions(serviceId: string) {
  return useQuery({
    queryKey: ['services', serviceId, 'sessions'],
    queryFn: async () => {
      const response = await fetch(`/api/services/${serviceId}/sessions`);
      const data: ServiceSessionsResponse = await response.json();
      return data;
    },
    enabled: !!serviceId,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ServiceRecord>) => api.post<ServiceRecord>('/services', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useUpdateService(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ServiceRecord>) => api.patch<ServiceRecord>(`/services/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services', id] });
    },
  });
}

export function useDeleteService(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useCreateServiceSession(serviceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ServiceSession>) => 
      api.post<ServiceSession>(`/services/${serviceId}/sessions`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', serviceId, 'sessions'] });
      queryClient.invalidateQueries({ queryKey: ['services', serviceId] });
    },
  });
}

export function useUpdateServiceSession(serviceId: string, sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ServiceSession>) => 
      api.patch<ServiceSession>(`/services/${serviceId}/sessions/${sessionId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', serviceId, 'sessions'] });
    },
  });
}
