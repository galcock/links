import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface Workspace {
  id: string;
  name: string;
  description: string | null;
  type: string;
  color: string | null;
  icon: string | null;
  ownerId: string;
  createdAt: string;
  owner?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  _count?: {
    members: number;
    tasks: number;
  };
}

interface WorkspaceTask {
  id: string;
  workspaceId: string;
  columnId: string;
  title: string;
  description: string | null;
  priority: string;
  dueDate: string | null;
  assignedToId: string | null;
  position: number;
  labels: string[];
  createdAt: string;
  assignedTo?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}

interface WorkspacesParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
}

interface WorkspacesResponse {
  success: true;
  data: Workspace[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface WorkspaceTasksResponse {
  success: true;
  data: WorkspaceTask[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useWorkspaces(params?: WorkspacesParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.search) queryParams.set('search', params.search);
  if (params?.type) queryParams.set('type', params.type);

  return useQuery({
    queryKey: ['workspaces', params],
    queryFn: async () => {
      const response = await fetch(`/api/workspaces?${queryParams}`);
      const data: WorkspacesResponse = await response.json();
      return data;
    },
  });
}

export function useWorkspace(id: string) {
  return useQuery({
    queryKey: ['workspaces', id],
    queryFn: () => api.get<Workspace>(`/workspaces/${id}`),
    enabled: !!id,
  });
}

export function useWorkspaceTasks(workspaceId: string) {
  return useQuery({
    queryKey: ['workspaces', workspaceId, 'tasks'],
    queryFn: async () => {
      const response = await fetch(`/api/workspaces/${workspaceId}/tasks`);
      const data: WorkspaceTasksResponse = await response.json();
      return data;
    },
    enabled: !!workspaceId,
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Workspace>) => api.post<Workspace>('/workspaces', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
}

export function useUpdateWorkspace(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Workspace>) => api.patch<Workspace>(`/workspaces/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspaces', id] });
    },
  });
}

export function useDeleteWorkspace(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/workspaces/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
}

export function useCreateWorkspaceTask(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<WorkspaceTask>) => 
      api.post<WorkspaceTask>(`/workspaces/${workspaceId}/tasks`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces', workspaceId, 'tasks'] });
    },
  });
}

export function useUpdateWorkspaceTask(workspaceId: string, taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<WorkspaceTask>) => 
      api.patch<WorkspaceTask>(`/workspaces/${workspaceId}/tasks/${taskId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces', workspaceId, 'tasks'] });
    },
  });
}
