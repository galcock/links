'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image, Calendar, Camera, Play, Filter, ChevronRight, Grid, List } from 'lucide-react';

const galleries = [
  { title: 'Winter Sports Season', date: 'Feb 2026', photos: 45, type: 'Athletics', thumbnail: '🏀' },
  { title: 'Science Fair 2026', date: 'Jan 2026', photos: 78, type: 'Academic', thumbnail: '🔬' },
  { title: 'Winter Concert', date: 'Dec 2025', photos: 62, type: 'Performance', thumbnail: '🎵' },
  { title: 'Homecoming 2025', date: 'Oct 2025', photos: 120, type: 'Events', thumbnail: '🎉' },
  { title: 'Back to School', date: 'Aug 2025', photos: 55, type: 'Events', thumbnail: '📚' },
  { title: 'Graduation 2025', date: 'Jun 2025', photos: 200, type: 'Ceremony', thumbnail: '🎓' },
];

const categories = ['All', 'Athletics', 'Academic', 'Performance', 'Events', 'Ceremony'];

export default function GalleriesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold flex items-center gap-3"><Image className="h-8 w-8 text-slate-600" />Photo Galleries</h1><p className="text-muted-foreground mt-1">School photos and memories</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon"><Grid className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><List className="h-4 w-4" /></Button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <Button key={i} variant={i === 0 ? 'default' : 'outline'} size="sm">{cat}</Button>
        ))}
      </motion.div>

      {/* Galleries Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gallery, i) => (
          <Card key={i} className="hover:shadow-md transition-all cursor-pointer overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-6xl">
              {gallery.thumbnail}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{gallery.type}</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Camera className="h-3 w-3" />{gallery.photos} photos</span>
              </div>
              <h3 className="font-semibold">{gallery.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Calendar className="h-3 w-3" />{gallery.date}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Button variant="outline" className="w-full">Load More Galleries</Button>
      </motion.div>
    </div>
  );
}
