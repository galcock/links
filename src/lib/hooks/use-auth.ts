import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl: string | null;
  organization: {
    id: string;
    name: string;
    type: string;
  };
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  organizationId: string;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      try {
        return await api.get<User>('/auth/me');
      } catch (error) {
        // Return null for auth errors instead of throwing
        return null;
      }
    },
    retry: false,
    throwOnError: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginData) => api.post<{ user: User }>('/auth/login', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data.user);
      // Redirect based on role
      const roleRoutes: Record<string, string> = {
        STUDENT: '/student',
        INSTRUCTOR: '/instructor',
        PARENT: '/parent',
        ADMINISTRATOR: '/admin',
        STUDENT_SERVICES: '/services',
        COMMUNITY_SERVICES: '/community',
      };
      router.push(roleRoutes[data.user.role] || '/');
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterData) => api.post<{ user: User }>('/auth/register', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data.user);
      const roleRoutes: Record<string, string> = {
        STUDENT: '/student',
        INSTRUCTOR: '/instructor',
        PARENT: '/parent',
        ADMINISTRATOR: '/admin',
        STUDENT_SERVICES: '/services',
        COMMUNITY_SERVICES: '/community',
      };
      router.push(roleRoutes[data.user.role] || '/');
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
}
