'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Calculator,
  PenTool,
  Lightbulb,
  History,
  Star,
  ChevronRight,
  Mic,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw,
} from 'lucide-react';

const suggestedPrompts = [
  { icon: Calculator, text: 'Help me solve quadratic equations', category: 'Math' },
  { icon: BookOpen, text: 'Explain photosynthesis in simple terms', category: 'Science' },
  { icon: PenTool, text: 'Review my essay for grammar', category: 'Writing' },
  { icon: Lightbulb, text: 'Give me study tips for my exam', category: 'Study' },
];

const recentChats = [
  { title: 'Quadratic Formula Help', date: 'Today', messages: 12 },
  { title: 'Essay Review - WWII', date: 'Yesterday', messages: 8 },
  { title: 'Biology Homework Help', date: '2 days ago', messages: 15 },
  { title: 'SAT Math Practice', date: '3 days ago', messages: 20 },
];

const chatMessages = [
  {
    role: 'user',
    content: 'Can you help me understand how to factor quadratic equations?',
    time: '2:30 PM',
  },
  {
    role: 'assistant',
    content: `Of course! Factoring quadratic equations is a key skill in algebra. Let me break it down:

**What is a Quadratic Equation?**
A quadratic equation has the form: ax² + bx + c = 0

**Steps to Factor:**
1. **Look for a common factor** - If all terms share a factor, factor it out first
2. **Find two numbers** that multiply to give 'ac' and add to give 'b'
3. **Rewrite the middle term** using these two numbers
4. **Group and factor** the terms

**Example:** x² + 5x + 6 = 0
- Find numbers that multiply to 6 and add to 5: 2 and 3
- Factor: (x + 2)(x + 3) = 0
- Solutions: x = -2 or x = -3

Would you like me to work through a specific problem with you?`,
    time: '2:31 PM',
  },
  {
    role: 'user',
    content: 'Yes! Can you help me factor x² + 7x + 12?',
    time: '2:32 PM',
  },
  {
    role: 'assistant',
    content: `Let's factor x² + 7x + 12 step by step:

**Step 1:** Identify a, b, and c
- a = 1, b = 7, c = 12

**Step 2:** Find two numbers that:
- Multiply to give c (12)
- Add to give b (7)

Think: What two numbers multiply to 12 and add to 7?
- 3 × 4 = 12 ✓
- 3 + 4 = 7 ✓

**Step 3:** Write the factored form:
x² + 7x + 12 = **(x + 3)(x + 4)**

**Step 4:** Verify by expanding:
(x + 3)(x + 4) = x² + 4x + 3x + 12 = x² + 7x + 12 ✓

So the solutions would be x = -3 or x = -4. Great job following along! 🎉`,
    time: '2:33 PM',
  },
];

export default function StudentAIPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-student-500 to-purple-600 flex items-center justify-center">
            <Bot className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">
              Your personal tutor for homework help and study support
            </p>
          </div>
        </div>
        <Button variant="outline">
          <History className="h-4 w-4 mr-2" />
          Chat History
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Suggested Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {suggestedPrompts.map((prompt, i) => (
              <Card
                key={i}
                className="cursor-pointer hover:shadow-md transition-all hover:border-student-500"
              >
                <CardContent className="p-3">
                  <prompt.icon className="h-5 w-5 text-student-600 mb-2" />
                  <p className="text-sm font-medium">{prompt.text}</p>
                  <Badge variant="secondary" size="sm" className="mt-2">
                    {prompt.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Chat Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-[500px] flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-student-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <Avatar fallback="You" size="sm" />
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-student-500 text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <div
                        className={`text-sm whitespace-pre-wrap ${
                          msg.role === 'assistant' ? 'prose prose-sm dark:prose-invert max-w-none' : ''
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: msg.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br />')
                        }}
                      />
                      <div className={`flex items-center justify-between mt-2 ${
                        msg.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        <span className="text-xs">{msg.time}</span>
                        {msg.role === 'assistant' && (
                          <div className="flex gap-1">
                            <Button variant="ghost" size="iconSm" className="h-6 w-6">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="iconSm" className="h-6 w-6">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="iconSm" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Ask me anything about your homework..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button variant="student" size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AI responses are for learning support. Always verify important information with your teacher.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Chats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Chats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentChats.map((chat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <p className="font-medium text-sm truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {chat.date} • {chat.messages} messages
                    </p>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="student">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calculator className="h-4 w-4 text-student-600" />
                  <span>Math Problem Solver</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PenTool className="h-4 w-4 text-student-600" />
                  <span>Essay Writing Help</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-student-600" />
                  <span>Reading Comprehension</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-student-600" />
                  <span>Study Tips & Tricks</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Usage Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">47</p>
                    <p className="text-xs text-muted-foreground">Questions Asked</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12h</p>
                    <p className="text-xs text-muted-foreground">Study Time Saved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
