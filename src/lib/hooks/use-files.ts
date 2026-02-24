import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  ownerId: string;
  isShared: boolean;
  createdAt: string;
  owner?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  _count?: {
    files: number;
    subfolders: number;
  };
}

interface File {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  storageUrl: string;
  folderId: string | null;
  uploadedById: string;
  createdAt: string;
  uploadedBy?: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  folder?: {
    id: string;
    name: string;
  };
}

interface FoldersParams {
  page?: number;
  limit?: number;
  parentId?: string | null;
  search?: string;
}

interface FilesParams {
  page?: number;
  limit?: number;
  folderId?: string;
  search?: string;
}

interface FoldersResponse {
  success: true;
  data: Folder[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface FilesResponse {
  success: true;
  data: File[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useFolders(params?: FoldersParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.parentId !== undefined) queryParams.set('parentId', params.parentId || '');
  if (params?.search) queryParams.set('search', params.search);

  return useQuery({
    queryKey: ['folders', params],
    queryFn: async () => {
      const response = await fetch(`/api/folders?${queryParams}`);
      const data: FoldersResponse = await response.json();
      return data;
    },
  });
}

export function useFolder(id: string) {
  return useQuery({
    queryKey: ['folders', id],
    queryFn: () => api.get<Folder>(`/folders/${id}`),
    enabled: !!id,
  });
}

export function useFiles(params?: FilesParams) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.folderId) queryParams.set('folderId', params.folderId);
  if (params?.search) queryParams.set('search', params.search);

  return useQuery({
    queryKey: ['files', params],
    queryFn: async () => {
      const response = await fetch(`/api/files?${queryParams}`);
      const data: FilesResponse = await response.json();
      return data;
    },
  });
}

export function useFile(id: string) {
  return useQuery({
    queryKey: ['files', id],
    queryFn: () => api.get<File>(`/files/${id}`),
    enabled: !!id,
  });
}

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Folder>) => api.post<Folder>('/folders', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
}

export function useUpdateFolder(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Folder>) => api.patch<Folder>(`/folders/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({ queryKey: ['folders', id] });
    },
  });
}

export function useDeleteFolder(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/folders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
}

export function useUploadFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { file: File; folderId?: string }) => {
      const formData = new FormData();
      formData.append('file', data.file);
      if (data.folderId) formData.append('folderId', data.folderId);

      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error?.message || 'Upload failed');
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
}

export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/files/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
}
