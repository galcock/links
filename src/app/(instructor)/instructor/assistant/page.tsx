'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, FileText, Calculator, PenTool, Lightbulb, BookOpen, Users, ClipboardList, History, Mic, Paperclip } from 'lucide-react';

const suggestedPrompts = [
  { icon: FileText, text: 'Generate a quiz on quadratic equations', category: 'Assessment' },
  { icon: BookOpen, text: 'Create a lesson plan for tomorrow', category: 'Planning' },
  { icon: Users, text: 'Suggest differentiation strategies', category: 'Teaching' },
  { icon: ClipboardList, text: 'Help me write progress report comments', category: 'Reports' },
];

const recentChats = [
  { title: 'Quiz Generation - Chapter 5', date: 'Today', messages: 8 },
  { title: 'Lesson Plan Ideas', date: 'Yesterday', messages: 12 },
  { title: 'Parent Email Draft', date: '2 days ago', messages: 5 },
];

export default function InstructorAssistantPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-instructor-500 to-orange-600 flex items-center justify-center">
            <Bot className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Your teaching assistant for planning and preparation</p>
          </div>
        </div>
        <Button variant="outline"><History className="h-4 w-4 mr-2" />History</Button>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {suggestedPrompts.map((prompt, i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-all hover:border-instructor-500">
                <CardContent className="p-3">
                  <prompt.icon className="h-5 w-5 text-instructor-600 mb-2" />
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
                  <Bot className="h-16 w-16 mx-auto mb-4 text-instructor-600" />
                  <h3 className="font-semibold text-lg mb-2">How can I help you today?</h3>
                  <p className="text-sm">Ask me to create quizzes, lesson plans, or help with any teaching task.</p>
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
                  <Input placeholder="Ask me anything about teaching..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1" />
                  <Button variant="ghost" size="icon"><Mic className="h-5 w-5" /></Button>
                  <Button variant="instructor" size="icon"><Send className="h-5 w-5" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><History className="h-5 w-5" />Recent</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {recentChats.map((chat, i) => (
                  <div key={i} className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <p className="font-medium text-sm truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">{chat.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card variant="instructor">
              <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5" />Features</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4" /><span>Quiz Generator</span></div>
                <div className="flex items-center gap-2 text-sm"><BookOpen className="h-4 w-4" /><span>Lesson Planner</span></div>
                <div className="flex items-center gap-2 text-sm"><PenTool className="h-4 w-4" /><span>Email Drafter</span></div>
                <div className="flex items-center gap-2 text-sm"><ClipboardList className="h-4 w-4" /><span>Report Writer</span></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
