'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Messaging } from '@/components/features/messaging';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useConversations, useMessages, useSendMessage } from '@/lib/hooks/use-messages';
import { useToast } from '@/components/ui/toast';

export default function InstructorMessages() {
  const { data: user } = useCurrentUser();
  const { data: conversationsData, isLoading } = useConversations({ limit: 50 });
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null);
  
  const { data: messagesData } = useMessages({
    conversationId: activeConversationId || '',
  });
  
  const sendMessageMutation = useSendMessage();
  const toast = useToast();

  React.useEffect(() => {
    if (conversationsData?.data && conversationsData.data.length > 0 && !activeConversationId) {
      setActiveConversationId(conversationsData.data[0].id);
    }
  }, [conversationsData, activeConversationId]);

  const conversations = React.useMemo(() => {
    if (!conversationsData?.data) return [];
    return conversationsData.data.map((conv) => ({
      id: conv.id,
      name: conv.name || conv.participants.map(p => 
        `${p.user.firstName} ${p.user.lastName}`
      ).join(', ') || 'Unknown',
      avatar: conv.type === 'DIRECT' && conv.participants[0]?.user.avatarUrl || undefined,
      lastMessage: conv.messages?.[0]?.content || 'No messages yet',
      lastMessageTime: conv.lastMessageAt ? new Date(conv.lastMessageAt) : undefined,
      unreadCount: 0,
      isOnline: false,
      isGroup: conv.type === 'GROUP',
      participants: conv.participants.length,
    }));
  }, [conversationsData]);

  const messages = React.useMemo(() => {
    if (!messagesData?.data || !user) return [];
    return messagesData.data.map((msg) => ({
      id: msg.id,
      content: msg.content,
      senderId: msg.senderId,
      senderName: `${msg.sender.firstName} ${msg.sender.lastName}`,
      senderAvatar: msg.sender.avatarUrl || undefined,
      createdAt: new Date(msg.createdAt),
      isOwn: msg.senderId === user.id,
      status: msg.isRead ? 'read' as const : 'delivered' as const,
    }));
  }, [messagesData, user]);

  const handleSendMessage = async (content: string, conversationId: string) => {
    try {
      await sendMessageMutation.mutateAsync({
        conversationId,
        content,
        type: 'TEXT',
      });
    } catch (error) {
      toast.error('Failed to send message', 'Please try again');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-instructor-600" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Messaging
        conversations={conversations}
        messages={messages}
        currentUserId={user?.id || ''}
        activeConversationId={activeConversationId}
        onConversationSelect={setActiveConversationId}
        onSendMessage={handleSendMessage}
        accentColor="instructor"
      />
    </div>
  );
}
