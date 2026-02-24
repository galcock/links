import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api-client';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: string;
  mediaUrl: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}

interface Conversation {
  id: string;
  type: string;
  name: string | null;
  lastMessageAt: string | null;
  participants: Array<{
    user: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    };
  }>;
  messages?: Message[];
}

interface MessagesParams {
  conversationId: string;
  page?: number;
  limit?: number;
}

interface MessagesResponse {
  success: true;
  data: Message[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ConversationsResponse {
  success: true;
  data: Conversation[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useMessages(params: MessagesParams) {
  const queryParams = new URLSearchParams();
  queryParams.set('conversationId', params.conversationId);
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());

  return useQuery({
    queryKey: ['messages', params],
    queryFn: async () => {
      const response = await fetch(`/api/messages?${queryParams}`);
      const data: MessagesResponse = await response.json();
      return data;
    },
    enabled: !!params.conversationId,
  });
}

export function useConversations(params?: { page?: number; limit?: number }) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());

  return useQuery({
    queryKey: ['conversations', params],
    queryFn: async () => {
      const response = await fetch(`/api/messages/conversations?${queryParams}`);
      const data: ConversationsResponse = await response.json();
      return data;
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { conversationId: string; content: string; type?: string; mediaUrl?: string }) => 
      api.post<Message>('/messages', data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', { conversationId: variables.conversationId }] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useMarkMessageRead(messageId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.patch(`/messages/${messageId}/read`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}
