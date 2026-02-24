import { useQuery, useMutation, useQueryClient } from '@tantml:react-query';
import { api } from '../api-client';

interface Team {
  id: string;
  name: string;
  description: string | null;
  type: string;
  isPublic: boolean;
  color: string | null;
  icon: string | null;
  createdById: string;
  createdAt: string;
  createdBy?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  _count?: {
    members: number;
  };
}

interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: string;
  joinedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string | null;
  };
}

interface TeamsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  isPublic?: boolean;
}

interface TeamsResponse {
  success: true;
  data: Team[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface TeamMembersResponse {
  success: true;
  data: TeamMember[];
}

export function useTeams(params?: TeamsParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.search) queryParams.set('search', params.search);
  if (params?.type) queryParams.set('type', params.type);
  if (params?.isPublic !== undefined) queryParams.set('isPublic', params.isPublic.toString());

  return useQuery({
    queryKey: ['teams', params],
    queryFn: async () => {
      const response = await fetch(`/api/teams?${queryParams}`);
      const data: TeamsResponse = await response.json();
      return data;
    },
  });
}

export function useTeam(id: string) {
  return useQuery({
    queryKey: ['teams', id],
    queryFn: () => api.get<Team>(`/teams/${id}`),
    enabled: !!id,
  });
}

export function useTeamMembers(teamId: string) {
  return useQuery({
    queryKey: ['teams', teamId, 'members'],
    queryFn: async () => {
      const response = await fetch(`/api/teams/${teamId}/members`);
      const data: TeamMembersResponse = await response.json();
      return data;
    },
    enabled: !!teamId,
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Team>) => api.post<Team>('/teams', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useUpdateTeam(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Team>) => api.patch<Team>(`/teams/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['teams', id] });
    },
  });
}

export function useDeleteTeam(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/teams/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useAddTeamMember(teamId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { userId: string; role?: string }) => 
      api.post<TeamMember>(`/teams/${teamId}/members`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams', teamId, 'members'] });
      queryClient.invalidateQueries({ queryKey: ['teams', teamId] });
    },
  });
}

export function useRemoveTeamMember(teamId: string, memberId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/teams/${teamId}/members/${memberId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams', teamId, 'members'] });
      queryClient.invalidateQueries({ queryKey: ['teams', teamId] });
    },
  });
}
