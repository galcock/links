'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Messaging } from '@/components/features/messaging';
import { MessageSquare } from 'lucide-react';

const mockConversations = [
  { id: '1', name: 'Parent - Smith Family', lastMessage: 'Thank you for the IEP update', lastMessageTime: new Date(Date.now() - 1800000), unreadCount: 0, isOnline: false },
  { id: '2', name: 'Special Ed Team', lastMessage: 'Meeting notes attached', lastMessageTime: new Date(Date.now() - 3600000), unreadCount: 2, isGroup: true, participants: 8 },
  { id: '3', name: 'Mrs. Johnson (Teacher)', lastMessage: 'Progress report ready', lastMessageTime: new Date(Date.now() - 7200000), unreadCount: 0, isOnline: true },
  { id: '4', name: 'PT Department', lastMessage: 'Schedule update for next week', lastMessageTime: new Date(Date.now() - 86400000), unreadCount: 1, isGroup: true },
  { id: '5', name: 'Counseling Team', lastMessage: 'Workshop materials ready', lastMessageTime: new Date(Date.now() - 172800000), unreadCount: 0, isGroup: true },
];

const mockMessages = [
  { id: '1', content: 'Hi, I wanted to follow up on the IEP meeting.', senderId: 'services', senderName: 'Me', createdAt: new Date(Date.now() - 7200000), isOwn: true, status: 'read' as const },
  { id: '2', content: 'Yes, we have reviewed the proposed accommodations.', senderId: 'parent', senderName: 'Mrs. Smith', createdAt: new Date(Date.now() - 7000000), isOwn: false },
  { id: '3', content: 'Great! I\'ll send over the updated plan today.', senderId: 'services', senderName: 'Me', createdAt: new Date(Date.now() - 6800000), isOwn: true, status: 'read' as const },
  { id: '4', content: 'Thank you for the IEP update. We appreciate all your help!', senderId: 'parent', senderName: 'Mrs. Smith', createdAt: new Date(Date.now() - 1800000), isOwn: false },
];

export default function ServicesMessagesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-services-600" />
        <div><h1 className="text-3xl font-bold">Messages</h1><p className="text-muted-foreground">Communicate with parents, teachers, and team members</p></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Messaging currentUserId="services" conversations={mockConversations} messages={mockMessages} accentColor="services" />
      </motion.div>
    </div>
  );
}
