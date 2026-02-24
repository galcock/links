'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, FileText, Calendar, Users, HelpCircle, History, Mic, Paperclip, GraduationCap, Heart } from 'lucide-react';

const suggestedPrompts = [
  { icon: GraduationCap, text: 'How is my child doing academically?', category: 'Grades' },
  { icon: Calendar, text: 'What events are coming up?', category: 'Schedule' },
  { icon: Users, text: 'How do I contact a teacher?', category: 'Communication' },
  { icon: Heart, text: 'What support services are available?', category: 'Resources' },
];

const recentChats = [
  { title: 'Grade inquiry', date: 'Today', messages: 5 },
  { title: 'Event schedule', date: 'Yesterday', messages: 3 },
  { title: 'Teacher contact info', date: '3 days ago', messages: 4 },
];

export default function ParentAssistantPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-parent-500 to-green-600 flex items-center justify-center"><Bot className="h-7 w-7 text-white" /></div>
          <div><h1 className="text-3xl font-bold">Parent Assistant</h1><p className="text-muted-foreground">Get help navigating your child's education</p></div>
        </div>
        <Button variant="outline"><History className="h-4 w-4 mr-2" />History</Button>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {suggestedPrompts.map((prompt, i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-all hover:border-parent-500">
                <CardContent className="p-3">
                  <prompt.icon className="h-5 w-5 text-parent-600 mb-2" />
                  <p className="text-sm font-medium">{prompt.text}</p>
                  <Badge variant="secondary" size="sm" className="mt-2">{prompt.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-[500px] flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Bot className="h-16 w-16 mx-auto mb-4 text-parent-600" />
                  <h3 className="font-semibold text-lg mb-2">How can I help you today?</h3>
                  <p className="text-sm">Ask me about grades, schedules, events, or school resources.</p>
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
                  <Input placeholder="Ask about your child's education..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1" />
                  <Button variant="ghost" size="icon"><Mic className="h-5 w-5" /></Button>
                  <Button variant="parent" size="icon"><Send className="h-5 w-5" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><History className="h-5 w-5" />Recent</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {recentChats.map((chat, i) => (
                  <div key={i} className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer"><p className="font-medium text-sm truncate">{chat.title}</p><p className="text-xs text-muted-foreground">{chat.date}</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card variant="parent"><CardHeader><CardTitle className="flex items-center gap-2"><HelpCircle className="h-5 w-5" />Quick Help</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4" /><span>View Report Cards</span></div>
                <div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4" /><span>Schedule Conference</span></div>
                <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4" /><span>Contact Teachers</span></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
