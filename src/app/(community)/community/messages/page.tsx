'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Messaging } from '@/components/features/messaging';
import { MessageSquare } from 'lucide-react';

const mockConversations = [
  { id: '1', name: 'Career Services', lastMessage: 'Your resume is ready for review', lastMessageTime: new Date(Date.now() - 1800000), unreadCount: 1, isOnline: true },
  { id: '2', name: 'Library Services', lastMessage: 'Book available for pickup', lastMessageTime: new Date(Date.now() - 3600000), unreadCount: 0, isOnline: true },
  { id: '3', name: 'Community Partners', lastMessage: 'Partnership event confirmed', lastMessageTime: new Date(Date.now() - 86400000), unreadCount: 3, isGroup: true },
  { id: '4', name: 'Facilities Team', lastMessage: 'Room booking confirmed', lastMessageTime: new Date(Date.now() - 172800000), unreadCount: 0, isGroup: true },
];

const mockMessages = [
  { id: '1', content: 'Hi, I wanted to follow up on my resume review request.', senderId: 'user', senderName: 'Me', createdAt: new Date(Date.now() - 7200000), isOwn: true, status: 'read' as const },
  { id: '2', content: 'Your resume has been reviewed. I\'ve made some suggestions for improvement.', senderId: 'career', senderName: 'Career Services', createdAt: new Date(Date.now() - 7000000), isOwn: false },
  { id: '3', content: 'Thank you! When can I pick it up?', senderId: 'user', senderName: 'Me', createdAt: new Date(Date.now() - 6800000), isOwn: true, status: 'read' as const },
  { id: '4', content: 'Your resume is ready for review. You can pick it up anytime during office hours.', senderId: 'career', senderName: 'Career Services', createdAt: new Date(Date.now() - 1800000), isOwn: false },
];

export default function CommunityMessagesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-community-600" />
        <div><h1 className="text-3xl font-bold">Messages</h1><p className="text-muted-foreground">Connect with community services</p></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Messaging currentUserId="user" conversations={mockConversations} messages={mockMessages} accentColor="community" />
      </motion.div>
    </div>
  );
}
