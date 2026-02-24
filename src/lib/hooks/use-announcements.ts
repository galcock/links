import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  isPinned: boolean;
  expiresAt: string | null;
  authorId: string;
  targetRoles: string[];
  createdAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}

interface AnnouncementsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  priority?: string;
}

interface AnnouncementsResponse {
  success: true;
  data: Announcement[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useAnnouncements(params?: AnnouncementsParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.search) queryParams.set('search', params.search);
  if (params?.type) queryParams.set('type', params.type);
  if (params?.priority) queryParams.set('priority', params.priority);

  return useQuery({
    queryKey: ['announcements', params],
    queryFn: async () => {
      const response = await fetch(`/api/announcements?${queryParams}`);
      const data: AnnouncementsResponse = await response.json();
      return data;
    },
  });
}

export function useAnnouncement(id: string) {
  return useQuery({
    queryKey: ['announcements', id],
    queryFn: () => api.get<Announcement>(`/announcements/${id}`),
    enabled: !!id,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Announcement>) => api.post<Announcement>('/announcements', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export function useUpdateAnnouncement(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Announcement>) => api.patch<Announcement>(`/announcements/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcements', id] });
    },
  });
}

export function useDeleteAnnouncement(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/announcements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}
