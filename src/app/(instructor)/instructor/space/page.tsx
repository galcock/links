'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout, Plus, Users, Eye, Edit, Copy, Trash2, Star, BookOpen, FileText, Video, Link as LinkIcon, Folder, Settings } from 'lucide-react';

const spaces = [
  { name: 'Algebra II - Main', students: 28, resources: 45, lastUpdated: '2 hours ago', status: 'active', views: 156 },
  { name: 'Pre-Calculus Hub', students: 24, resources: 38, lastUpdated: 'Yesterday', status: 'active', views: 98 },
  { name: 'Math Club Resources', students: 15, resources: 22, lastUpdated: '3 days ago', status: 'active', views: 45 },
  { name: 'Summer Prep (Draft)', students: 0, resources: 12, lastUpdated: '1 week ago', status: 'draft', views: 0 },
];

const recentResources = [
  { name: 'Chapter 5 Study Guide', type: 'document', space: 'Algebra II', date: 'Today' },
  { name: 'Quadratic Functions Video', type: 'video', space: 'Algebra II', date: 'Yesterday' },
  { name: 'Practice Problems Set 4', type: 'assignment', space: 'Pre-Calculus', date: '2 days ago' },
  { name: 'Khan Academy - Factoring', type: 'link', space: 'Algebra II', date: '3 days ago' },
];

const templates = [
  { name: 'Course Homepage', description: 'Standard course landing page', uses: 234 },
  { name: 'Unit Overview', description: 'Template for unit introductions', uses: 189 },
  { name: 'Assignment Hub', description: 'Centralized assignment space', uses: 156 },
];

export default function InstructorSpacePage() {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'assignment': return BookOpen;
      case 'link': return LinkIcon;
      default: return Folder;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Layout className="h-8 w-8 text-instructor-600" />
          <div>
            <h1 className="text-3xl font-bold">Learning Spaces</h1>
            <p className="text-muted-foreground">Create and manage online learning environments</p>
          </div>
        </div>
        <Button variant="instructor"><Plus className="h-4 w-4 mr-2" />Create Space</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle>My Learning Spaces</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {spaces.map((space, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-instructor-100 dark:bg-instructor-900/30 flex items-center justify-center">
                          <Layout className="h-6 w-6 text-instructor-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{space.name}</h4>
                          <p className="text-sm text-muted-foreground">{space.resources} resources • Updated {space.lastUpdated}</p>
                        </div>
                      </div>
                      <Badge variant={space.status === 'active' ? 'success' : 'secondary'}>{space.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" />{space.students} students</span>
                        <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{space.views} views</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="iconSm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="iconSm"><Copy className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="iconSm"><Settings className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-instructor-600" />Recent Resources</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentResources.map((resource, i) => {
                  const Icon = getResourceIcon(resource.type);
                  return (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="h-10 w-10 rounded-lg bg-instructor-100 dark:bg-instructor-900/30 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-instructor-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{resource.name}</p>
                        <p className="text-sm text-muted-foreground">{resource.space} • {resource.date}</p>
                      </div>
                      <Badge variant="secondary" size="sm">{resource.type}</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="instructor">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div><p className="text-3xl font-bold">4</p><p className="text-sm text-muted-foreground">Spaces</p></div>
                  <div><p className="text-3xl font-bold">117</p><p className="text-sm text-muted-foreground">Resources</p></div>
                  <div><p className="text-3xl font-bold">67</p><p className="text-sm text-muted-foreground">Students</p></div>
                  <div><p className="text-3xl font-bold">299</p><p className="text-sm text-muted-foreground">Total Views</p></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5" />Templates</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {templates.map((template, i) => (
                  <div key={i} className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <p className="font-semibold text-sm">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                    <p className="text-xs text-instructor-600 mt-1">Used {template.uses} times</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">Browse All Templates</Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Plus className="h-4 w-4 mr-2" />Add Resource</Button>
                <Button variant="outline" className="w-full justify-start"><Users className="h-4 w-4 mr-2" />Invite Students</Button>
                <Button variant="outline" className="w-full justify-start"><Copy className="h-4 w-4 mr-2" />Duplicate Space</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
