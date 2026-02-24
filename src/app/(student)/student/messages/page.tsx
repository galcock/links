'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Messaging } from '@/components/features/messaging';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useConversations, useMessages, useSendMessage } from '@/lib/hooks/use-messages';
import { useToast } from '@/components/ui/toast';

export default function StudentMessages() {
  const { data: user } = useCurrentUser();
  const { data: conversationsData, isLoading: conversationsLoading } = useConversations({ limit: 50 });
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null);
  
  const { data: messagesData, isLoading: messagesLoading } = useMessages({
    conversationId: activeConversationId || '',
  });
  
  const sendMessageMutation = useSendMessage();
  const toast = useToast();

  // Set first conversation as active when conversations load
  React.useEffect(() => {
    if (conversationsData?.data && conversationsData.data.length > 0 && !activeConversationId) {
      setActiveConversationId(conversationsData.data[0].id);
    }
  }, [conversationsData, activeConversationId]);

  // Transform conversations data for the Messaging component
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
      unreadCount: 0, // Would need from API
      isOnline: false, // Would need presence system
      isGroup: conv.type === 'GROUP',
      participants: conv.participants.length,
    }));
  }, [conversationsData]);

  // Transform messages data for the Messaging component
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
      // Message will be refetched automatically due to query invalidation
    } catch (error) {
      toast.error('Failed to send message', 'Please try again');
    }
  };

  const handleStartCall = (type: 'audio' | 'video', conversationId: string) => {
    toast.info('Calling feature', `Starting ${type} call... (Coming soon)`);
  };

  if (conversationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-student-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Please log in to view messages</p>
        </div>
      </div>
    );
  }

  if (!conversationsData?.data || conversationsData.data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
          <p className="text-muted-foreground">
            Start a conversation with your instructors or classmates!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-student-600" />
          Messages
        </h1>
        <p className="text-muted-foreground mt-1">
          Chat with instructors, classmates, and study groups
        </p>
      </div>

      <Messaging
        currentUserId={user.id}
        conversations={conversations}
        messages={messagesLoading ? [] : messages}
        onSendMessage={handleSendMessage}
        onStartCall={handleStartCall}
        accentColor="student"
      />
    </motion.div>
  );
}
