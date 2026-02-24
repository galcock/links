'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Calendar, FileText, Bell, ChevronRight, Filter, Search } from 'lucide-react';

const postings = [
  { title: 'Spring Enrollment Now Open', category: 'Announcement', date: 'Feb 20, 2026', summary: 'Registration for the 2026-27 school year is now open for all grade levels.', important: true },
  { title: 'New School Construction Update', category: 'News', date: 'Feb 18, 2026', summary: 'Construction of the new elementary school is on schedule for August completion.', important: false },
  { title: 'COVID-19 Guidelines Update', category: 'Policy', date: 'Feb 15, 2026', summary: 'Updated health and safety guidelines for the spring semester.', important: true },
  { title: 'Summer Program Registration', category: 'Announcement', date: 'Feb 10, 2026', summary: 'Sign up now for summer enrichment programs and camps.', important: false },
  { title: 'Board Meeting Minutes', category: 'Board', date: 'Feb 5, 2026', summary: 'Minutes from the February school board meeting are now available.', important: false },
  { title: 'Bus Route Changes', category: 'Transportation', date: 'Feb 1, 2026', summary: 'Several bus routes will change starting March 1st.', important: true },
];

const categories = ['All', 'Announcement', 'News', 'Policy', 'Board', 'Transportation'];

export default function PostingsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold flex items-center gap-3"><Newspaper className="h-8 w-8 text-slate-600" />News & Postings</h1><p className="text-muted-foreground mt-1">District news and announcements</p></div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button variant="outline"><Search className="h-4 w-4 mr-2" />Search</Button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <Button key={i} variant={i === 0 ? 'default' : 'outline'} size="sm">{cat}</Button>
        ))}
      </motion.div>

      {/* Postings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
        {postings.map((posting, i) => (
          <Card key={i} className={`hover:shadow-md transition-all cursor-pointer ${posting.important ? 'border-amber-200 dark:border-amber-800' : ''}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{posting.category}</Badge>
                    {posting.important && <Badge variant="warning">Important</Badge>}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{posting.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{posting.summary}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{posting.date}</p>
                </div>
                <Button variant="ghost" size="sm">Read More<ChevronRight className="h-4 w-4 ml-1" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Button variant="outline" className="w-full">Load More</Button>
      </motion.div>
    </div>
  );
}
