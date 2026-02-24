'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, Briefcase, GraduationCap, Building, Library, History, Mic, Paperclip } from 'lucide-react';

const suggestedPrompts = [
  { icon: Briefcase, text: 'Find job opportunities', category: 'Careers' },
  { icon: GraduationCap, text: 'College application help', category: 'Education' },
  { icon: Building, text: 'Facility rental info', category: 'Facilities' },
  { icon: Library, text: 'Library programs', category: 'Library' },
];

export default function CommunityAssistantPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-community-500 to-cyan-600 flex items-center justify-center"><Bot className="h-7 w-7 text-white" /></div>
          <div><h1 className="text-3xl font-bold">Community Assistant</h1><p className="text-muted-foreground">Get help with community services</p></div>
        </div>
        <Button variant="outline"><History className="h-4 w-4 mr-2" />History</Button>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {suggestedPrompts.map((prompt, i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-all hover:border-community-500">
                <CardContent className="p-3"><prompt.icon className="h-5 w-5 text-community-600 mb-2" /><p className="text-sm font-medium">{prompt.text}</p><Badge variant="secondary" size="sm" className="mt-2">{prompt.category}</Badge></CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-[500px] flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-muted-foreground">
                <div className="text-center"><Bot className="h-16 w-16 mx-auto mb-4 text-community-600" /><h3 className="font-semibold text-lg mb-2">How can I help?</h3><p className="text-sm">Ask about careers, education, facilities, or community programs.</p></div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
                  <Input placeholder="Ask about community services..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1" />
                  <Button variant="ghost" size="icon"><Mic className="h-5 w-5" /></Button>
                  <Button variant="community" size="icon"><Send className="h-5 w-5" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="community"><CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5" />Services</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4" /><span>Career Counseling</span></div>
                <div className="flex items-center gap-2 text-sm"><GraduationCap className="h-4 w-4" /><span>College Guidance</span></div>
                <div className="flex items-center gap-2 text-sm"><Building className="h-4 w-4" /><span>Facility Rentals</span></div>
                <div className="flex items-center gap-2 text-sm"><Library className="h-4 w-4" /><span>Library Services</span></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
