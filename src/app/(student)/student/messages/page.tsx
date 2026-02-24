'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Messaging } from '@/components/features/messaging';
import { MessageSquare } from 'lucide-react';

const mockConversations = [
  {
    id: '1',
    name: 'Mrs. Johnson',
    avatar: undefined,
    lastMessage: 'Great work on your last assignment!',
    lastMessageTime: new Date(Date.now() - 1800000),
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Study Group - Math',
    avatar: undefined,
    lastMessage: 'Anyone free to study tonight?',
    lastMessageTime: new Date(Date.now() - 3600000),
    unreadCount: 5,
    isOnline: false,
    isGroup: true,
    participants: 6,
  },
  {
    id: '3',
    name: 'Mr. Smith',
    avatar: undefined,
    lastMessage: 'Remember to bring your lab coat tomorrow',
    lastMessageTime: new Date(Date.now() - 7200000),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '4',
    name: 'School Announcements',
    avatar: undefined,
    lastMessage: 'Spirit Week starts Monday!',
    lastMessageTime: new Date(Date.now() - 86400000),
    unreadCount: 1,
    isGroup: true,
    participants: 450,
  },
  {
    id: '5',
    name: 'Alex Chen',
    avatar: undefined,
    lastMessage: 'Want to work on the project together?',
    lastMessageTime: new Date(Date.now() - 172800000),
    unreadCount: 0,
    isOnline: true,
  },
];

const mockMessages = [
  {
    id: '1',
    content: 'Hi Mrs. Johnson, I had a question about the homework.',
    senderId: 'student',
    senderName: 'Me',
    createdAt: new Date(Date.now() - 7200000),
    isOwn: true,
    status: 'read' as const,
  },
  {
    id: '2',
    content: 'Of course! What do you need help with?',
    senderId: 'teacher',
    senderName: 'Mrs. Johnson',
    createdAt: new Date(Date.now() - 7000000),
    isOwn: false,
  },
  {
    id: '3',
    content: 'I\'m confused about problem #5 on the worksheet. Is the answer supposed to be a fraction or decimal?',
    senderId: 'student',
    senderName: 'Me',
    createdAt: new Date(Date.now() - 6800000),
    isOwn: true,
    status: 'read' as const,
  },
  {
    id: '4',
    content: 'Great question! You can leave it as a fraction - that\'s actually the preferred form for this type of problem.',
    senderId: 'teacher',
    senderName: 'Mrs. Johnson',
    createdAt: new Date(Date.now() - 3600000),
    isOwn: false,
  },
  {
    id: '5',
    content: 'Also, great work on your last assignment! Your understanding of quadratic equations has really improved.',
    senderId: 'teacher',
    senderName: 'Mrs. Johnson',
    createdAt: new Date(Date.now() - 1800000),
    isOwn: false,
  },
];

export default function StudentMessagesPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <MessageSquare className="h-8 w-8 text-student-600" />
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            Chat with teachers, classmates, and study groups
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Messaging
          currentUserId="student"
          conversations={mockConversations}
          messages={mockMessages}
          accentColor="student"
        />
      </motion.div>
    </div>
  );
}
