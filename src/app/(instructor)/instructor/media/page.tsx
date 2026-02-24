'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input, SearchInput } from '@/components/ui/input';
import { Video, Upload, Play, Folder, Image, FileText, Music, Film, Eye, Clock, Download, Trash2, Edit, Plus, Filter, Grid, List } from 'lucide-react';

const mediaItems = [
  { name: 'Intro to Quadratics.mp4', type: 'video', size: '245 MB', duration: '15:32', views: 156, date: 'Feb 20' },
  { name: 'Factoring Tutorial.mp4', type: 'video', size: '189 MB', duration: '12:45', views: 234, date: 'Feb 18' },
  { name: 'Chapter 5 Slides.pptx', type: 'presentation', size: '12 MB', views: 89, date: 'Feb 15' },
  { name: 'Graph Examples.png', type: 'image', size: '2.4 MB', views: 45, date: 'Feb 14' },
  { name: 'Problem Solving Audio.mp3', type: 'audio', size: '18 MB', duration: '8:20', views: 67, date: 'Feb 10' },
  { name: 'Unit 3 Worksheet.pdf', type: 'document', size: '456 KB', views: 312, date: 'Feb 8' },
];

const folders = [
  { name: 'Algebra II', items: 45, size: '1.2 GB' },
  { name: 'Pre-Calculus', items: 38, size: '890 MB' },
  { name: 'Math Club', items: 22, size: '456 MB' },
  { name: 'Templates', items: 15, size: '234 MB' },
];

const stats = [
  { label: 'Total Files', value: '120', icon: FileText },
  { label: 'Videos', value: '34', icon: Video },
  { label: 'Storage Used', value: '4.2 GB', icon: Folder },
  { label: 'Total Views', value: '2,847', icon: Eye },
];

export default function InstructorMediaPage() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Film;
      case 'image': return Image;
      case 'audio': return Music;
      case 'presentation': return FileText;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Video className="h-8 w-8 text-instructor-600" />
          <div>
            <h1 className="text-3xl font-bold">Media Library</h1>
            <p className="text-muted-foreground">Manage your teaching videos and resources</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Folder className="h-4 w-4 mr-2" />New Folder</Button>
          <Button variant="instructor"><Upload className="h-4 w-4 mr-2" />Upload</Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className="h-8 w-8 text-instructor-600" />
              <div><p className="text-2xl font-bold">{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader><CardTitle className="text-sm">Folders</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {folders.map((folder, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Folder className="h-5 w-5 text-instructor-600" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{folder.name}</p>
                    <p className="text-xs text-muted-foreground">{folder.items} items • {folder.size}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full justify-start"><Plus className="h-4 w-4 mr-2" />New Folder</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <SearchInput placeholder="Search media..." className="md:w-64" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon"><Grid className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><List className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mediaItems.map((item, i) => {
                    const Icon = getTypeIcon(item.type);
                    return (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                        <div className="h-12 w-12 rounded-lg bg-instructor-100 dark:bg-instructor-900/30 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-instructor-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.size}
                            {item.duration && ` • ${item.duration}`}
                            {` • ${item.date}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          {item.views}
                        </div>
                        <Badge variant="secondary">{item.type}</Badge>
                        <div className="flex gap-1">
                          {item.type === 'video' && <Button variant="ghost" size="iconSm"><Play className="h-4 w-4" /></Button>}
                          <Button variant="ghost" size="iconSm"><Download className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="iconSm"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="iconSm"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upload Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardContent className="p-8">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-instructor-500 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-1">Upload Media</h3>
                  <p className="text-sm text-muted-foreground mb-4">Drag & drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports: MP4, MOV, MP3, PDF, PPTX, PNG, JPG (Max 500MB)</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
