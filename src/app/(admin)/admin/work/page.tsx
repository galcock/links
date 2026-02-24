'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Briefcase, CheckCircle2, Clock, AlertCircle, Plus, Filter, ChevronRight, Calendar, Users } from 'lucide-react';

const projects = [
  { name: 'New School Construction', status: 'in-progress', progress: 45, deadline: 'Aug 2026', team: 12 },
  { name: 'Curriculum Revision', status: 'in-progress', progress: 70, deadline: 'Jun 2026', team: 8 },
  { name: 'Technology Upgrade', status: 'planning', progress: 15, deadline: 'Dec 2026', team: 5 },
  { name: 'Safety Initiative', status: 'completed', progress: 100, deadline: 'Completed', team: 6 },
];

const tasks = [
  { title: 'Review budget proposals', priority: 'high', due: 'Today' },
  { title: 'Approve hiring requests', priority: 'high', due: 'Tomorrow' },
  { title: 'Schedule board presentation', priority: 'medium', due: 'This week' },
  { title: 'Review policy updates', priority: 'medium', due: 'Next week' },
  { title: 'Facility inspection follow-up', priority: 'low', due: 'Next week' },
];

export default function AdminWorkPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Briefcase className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">Work Management</h1><p className="text-muted-foreground">Track projects and tasks</p></div></div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button variant="admin"><Plus className="h-4 w-4 mr-2" />New Project</Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle>Active Projects</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div><h4 className="font-semibold">{project.name}</h4><p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" />{project.deadline}<span className="mx-2">•</span><Users className="h-4 w-4" />{project.team} members</p></div>
                      <Badge variant={project.status === 'completed' ? 'success' : project.status === 'in-progress' ? 'admin' : 'secondary'}>{project.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="flex-1 h-2" indicatorClassName="bg-admin-500" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="admin"><CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" />My Tasks</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                    <input type="checkbox" className="h-4 w-4 rounded border-admin-500 text-admin-600" />
                    <div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{task.title}</p><p className="text-xs text-muted-foreground">{task.due}</p></div>
                    <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'warning' : 'secondary'} size="sm">{task.priority}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div><p className="text-3xl font-bold">4</p><p className="text-sm text-muted-foreground">Active Projects</p></div>
                <div><p className="text-3xl font-bold">12</p><p className="text-sm text-muted-foreground">Open Tasks</p></div>
                <div><p className="text-3xl font-bold">3</p><p className="text-sm text-muted-foreground">Due This Week</p></div>
                <div><p className="text-3xl font-bold">8</p><p className="text-sm text-muted-foreground">Team Members</p></div>
              </div>
            </CardContent></Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
