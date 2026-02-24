'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, BarChart3, DollarSign, Users, FileText, History, Mic, Paperclip } from 'lucide-react';

const suggestedPrompts = [
  { icon: BarChart3, text: 'Generate enrollment report', category: 'Reports' },
  { icon: DollarSign, text: 'Analyze budget variances', category: 'Finance' },
  { icon: Users, text: 'Summarize staff performance', category: 'HR' },
  { icon: FileText, text: 'Draft board communication', category: 'Communications' },
];

export default function AdminAssistantPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-admin-500 to-orange-600 flex items-center justify-center"><Bot className="h-7 w-7 text-white" /></div>
          <div><h1 className="text-3xl font-bold">Admin Assistant</h1><p className="text-muted-foreground">AI-powered administrative support</p></div>
        </div>
        <Button variant="outline"><History className="h-4 w-4 mr-2" />History</Button>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {suggestedPrompts.map((prompt, i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-all hover:border-admin-500">
                <CardContent className="p-3"><prompt.icon className="h-5 w-5 text-admin-600 mb-2" /><p className="text-sm font-medium">{prompt.text}</p><Badge variant="secondary" size="sm" className="mt-2">{prompt.category}</Badge></CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-[500px] flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-muted-foreground">
                <div className="text-center"><Bot className="h-16 w-16 mx-auto mb-4 text-admin-600" /><h3 className="font-semibold text-lg mb-2">How can I assist you?</h3><p className="text-sm">Ask me to generate reports, analyze data, or draft communications.</p></div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
                  <Input placeholder="Ask about district operations..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1" />
                  <Button variant="ghost" size="icon"><Mic className="h-5 w-5" /></Button>
                  <Button variant="admin" size="icon"><Send className="h-5 w-5" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="admin"><CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5" />Capabilities</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4" /><span>Data Analysis</span></div>
                <div className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4" /><span>Report Generation</span></div>
                <div className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4" /><span>Budget Insights</span></div>
                <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4" /><span>HR Analytics</span></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
