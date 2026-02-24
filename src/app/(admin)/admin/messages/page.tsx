'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Messaging } from '@/components/features/messaging';
import { MessageSquare } from 'lucide-react';

const mockConversations = [
  { id: '1', name: 'Dr. Williams (Superintendent)', lastMessage: 'Budget approval confirmed', lastMessageTime: new Date(Date.now() - 1800000), unreadCount: 0, isOnline: true },
  { id: '2', name: 'School Board', lastMessage: 'Meeting agenda attached', lastMessageTime: new Date(Date.now() - 3600000), unreadCount: 3, isGroup: true, participants: 7 },
  { id: '3', name: 'All Principals', lastMessage: 'Staff development update', lastMessageTime: new Date(Date.now() - 7200000), unreadCount: 0, isGroup: true, participants: 8 },
  { id: '4', name: 'HR Department', lastMessage: 'New hire paperwork ready', lastMessageTime: new Date(Date.now() - 86400000), unreadCount: 1, isGroup: true },
  { id: '5', name: 'Facilities Team', lastMessage: 'Maintenance report submitted', lastMessageTime: new Date(Date.now() - 172800000), unreadCount: 0, isGroup: true },
];

const mockMessages = [
  { id: '1', content: 'The budget for Q3 has been reviewed.', senderId: 'admin', senderName: 'Me', createdAt: new Date(Date.now() - 7200000), isOwn: true, status: 'read' as const },
  { id: '2', content: 'Excellent. All departments are within allocation.', senderId: 'super', senderName: 'Dr. Williams', createdAt: new Date(Date.now() - 7000000), isOwn: false },
  { id: '3', content: 'I\'ll prepare the board presentation for Monday.', senderId: 'admin', senderName: 'Me', createdAt: new Date(Date.now() - 6800000), isOwn: true, status: 'read' as const },
  { id: '4', content: 'Budget approval confirmed. Great work on the projections.', senderId: 'super', senderName: 'Dr. Williams', createdAt: new Date(Date.now() - 1800000), isOwn: false },
];

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-admin-600" />
        <div><h1 className="text-3xl font-bold">Messages</h1><p className="text-muted-foreground">District-wide communications</p></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Messaging currentUserId="admin" conversations={mockConversations} messages={mockMessages} accentColor="admin" />
      </motion.div>
    </div>
  );
}
