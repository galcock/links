'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn, formatRelativeTime, getInitials } from '@/lib/utils';
import { useChatStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SearchInput } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Search,
  Plus,
  Check,
  CheckCheck,
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  createdAt: Date;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  isOnline?: boolean;
  isGroup?: boolean;
  participants?: number;
}

interface MessagingProps {
  currentUserId: string;
  conversations?: Conversation[];
  messages?: Message[];
  onSendMessage?: (content: string, conversationId: string) => void;
  onStartCall?: (type: 'audio' | 'video', conversationId: string) => void;
  accentColor?: string;
}

export function Messaging({
  currentUserId,
  conversations = [],
  messages = [],
  onSendMessage,
  onStartCall,
  accentColor = 'primary',
}: MessagingProps) {
  const [activeConversation, setActiveConversation] = useState<string | null>(
    conversations[0]?.id || null
  );
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConvo = conversations.find((c) => c.id === activeConversation);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() && activeConversation) {
      onSendMessage?.(newMessage, activeConversation);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-[calc(100vh-200px)] min-h-[500px] overflow-hidden flex">
      {/* Conversations List */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Messages</h2>
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <SearchInput
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn(
                  'flex items-center gap-3 p-4 cursor-pointer transition-colors border-b',
                  'hover:bg-muted/50',
                  activeConversation === conversation.id && 'bg-muted'
                )}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="relative">
                  <Avatar
                    src={conversation.avatar}
                    fallback={conversation.name}
                    size="default"
                    status={conversation.isOnline ? 'online' : undefined}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">{conversation.name}</span>
                    {conversation.lastMessageTime && (
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(conversation.lastMessageTime)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <Badge variant={accentColor as "student"} className="ml-2">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Area */}
      {activeConversation && activeConvo ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar
                src={activeConvo.avatar}
                fallback={activeConvo.name}
                status={activeConvo.isOnline ? 'online' : undefined}
              />
              <div>
                <h3 className="font-medium">{activeConvo.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {activeConvo.isOnline
                    ? 'Online'
                    : activeConvo.isGroup
                    ? `${activeConvo.participants} members`
                    : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onStartCall?.('audio', activeConversation)}
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onStartCall?.('video', activeConversation)}
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn('flex gap-3', message.isOwn && 'flex-row-reverse')}
                >
                  {!message.isOwn && (
                    <Avatar
                      src={message.senderAvatar}
                      fallback={message.senderName}
                      size="sm"
                    />
                  )}
                  <div
                    className={cn(
                      'max-w-[70%] rounded-2xl px-4 py-2',
                      message.isOwn
                        ? `bg-${accentColor}-500 text-white`
                        : 'bg-muted'
                    )}
                  >
                    {!message.isOwn && (
                      <p className="text-xs font-medium mb-1">{message.senderName}</p>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div
                      className={cn(
                        'flex items-center justify-end gap-1 mt-1',
                        message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                      )}
                    >
                      <span className="text-[10px]">
                        {formatRelativeTime(message.createdAt)}
                      </span>
                      {message.isOwn && (
                        <>
                          {message.status === 'read' && <CheckCheck className="h-3 w-3" />}
                          {message.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
                          {message.status === 'sent' && <Check className="h-3 w-3" />}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button onClick={handleSend} disabled={!newMessage.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select a conversation to start messaging
        </div>
      )}
    </Card>
  );
}

// Quick Message Widget
export function QuickMessages({ messages }: { messages: Message[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {messages.slice(0, 4).map((message) => (
          <div key={message.id} className="flex items-start gap-3">
            <Avatar src={message.senderAvatar} fallback={message.senderName} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.senderName}</p>
              <p className="text-xs text-muted-foreground truncate">{message.content}</p>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              {formatRelativeTime(message.createdAt)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
