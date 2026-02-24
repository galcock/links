'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Messaging } from '@/components/features/messaging';
import { MessageSquare } from 'lucide-react';

const mockConversations = [
  { id: '1', name: 'Mrs. Johnson (Math)', lastMessage: 'Alex is doing great in class!', lastMessageTime: new Date(Date.now() - 1800000), unreadCount: 1, isOnline: true },
  { id: '2', name: 'Mr. Smith (Biology)', lastMessage: 'Lab report feedback attached', lastMessageTime: new Date(Date.now() - 3600000), unreadCount: 0, isOnline: false },
  { id: '3', name: 'School Administration', lastMessage: 'Reminder: Picture day tomorrow', lastMessageTime: new Date(Date.now() - 86400000), unreadCount: 2, isGroup: true },
  { id: '4', name: 'Coach Martinez', lastMessage: 'Soccer schedule update', lastMessageTime: new Date(Date.now() - 172800000), unreadCount: 0, isOnline: true },
  { id: '5', name: 'PTA Group', lastMessage: 'Next meeting: March 5th', lastMessageTime: new Date(Date.now() - 259200000), unreadCount: 5, isGroup: true, participants: 45 },
];

const mockMessages = [
  { id: '1', content: 'Hi Mrs. Johnson, I wanted to check on Alex\'s progress in math.', senderId: 'parent', senderName: 'Me', createdAt: new Date(Date.now() - 7200000), isOwn: true, status: 'read' as const },
  { id: '2', content: 'Hi! Alex is doing wonderfully. Their test scores have improved significantly.', senderId: 'teacher', senderName: 'Mrs. Johnson', createdAt: new Date(Date.now() - 7000000), isOwn: false },
  { id: '3', content: 'That\'s great to hear! Is there anything we can do at home to support their learning?', senderId: 'parent', senderName: 'Me', createdAt: new Date(Date.now() - 6800000), isOwn: true, status: 'read' as const },
  { id: '4', content: 'Alex is doing great in class! Keep encouraging them to practice the problem sets. Let me know if you\'d like to schedule a conference.', senderId: 'teacher', senderName: 'Mrs. Johnson', createdAt: new Date(Date.now() - 1800000), isOwn: false },
];

export default function ParentMessagesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-parent-600" />
        <div><h1 className="text-3xl font-bold">Messages</h1><p className="text-muted-foreground">Communicate with teachers and school staff</p></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Messaging currentUserId="parent" conversations={mockConversations} messages={mockMessages} accentColor="parent" />
      </motion.div>
    </div>
  );
}
