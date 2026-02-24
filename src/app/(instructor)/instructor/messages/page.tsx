'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Messaging } from '@/components/features/messaging';
import { MessageSquare } from 'lucide-react';

const mockConversations = [
  { id: '1', name: 'Alex Smith (Student)', lastMessage: 'Thank you for the extra help!', lastMessageTime: new Date(Date.now() - 1800000), unreadCount: 0, isOnline: true },
  { id: '2', name: 'Sarah Johnson (Parent)', lastMessage: 'Can we schedule a conference?', lastMessageTime: new Date(Date.now() - 3600000), unreadCount: 1, isOnline: false },
  { id: '3', name: 'Math Department', lastMessage: 'Meeting moved to 3pm', lastMessageTime: new Date(Date.now() - 7200000), unreadCount: 5, isGroup: true, participants: 12 },
  { id: '4', name: 'Dr. Williams (Principal)', lastMessage: 'Great work on the curriculum!', lastMessageTime: new Date(Date.now() - 86400000), unreadCount: 0, isOnline: true },
  { id: '5', name: 'Period 1 - Algebra II', lastMessage: 'Homework reminder posted', lastMessageTime: new Date(Date.now() - 172800000), unreadCount: 0, isGroup: true, participants: 28 },
];

const mockMessages = [
  { id: '1', content: 'Hi Mrs. Johnson, I wanted to discuss your child\'s progress in class.', senderId: 'teacher', senderName: 'Me', createdAt: new Date(Date.now() - 7200000), isOwn: true, status: 'read' as const },
  { id: '2', content: 'Of course! How is Alex doing?', senderId: 'parent', senderName: 'Sarah Johnson', createdAt: new Date(Date.now() - 7000000), isOwn: false },
  { id: '3', content: 'Alex has been doing great! Improved significantly on the last test.', senderId: 'teacher', senderName: 'Me', createdAt: new Date(Date.now() - 6800000), isOwn: true, status: 'read' as const },
  { id: '4', content: 'That\'s wonderful news! Can we schedule a conference to discuss further?', senderId: 'parent', senderName: 'Sarah Johnson', createdAt: new Date(Date.now() - 3600000), isOwn: false },
];

export default function InstructorMessagesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-instructor-600" />
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with students, parents, and colleagues</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Messaging currentUserId="teacher" conversations={mockConversations} messages={mockMessages} accentColor="instructor" />
      </motion.div>
    </div>
  );
}
