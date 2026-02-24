'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Briefcase, FileText, FolderOpen, Download, Upload, Clock, Users, BookOpen, CheckCircle2, ChevronRight, Star } from 'lucide-react';

const recentFiles = [
  { name: 'Chapter_5_Test.pdf', type: 'Assessment', size: '456 KB', date: '2 hours ago' },
  { name: 'Lesson_Plan_Week12.docx', type: 'Planning', size: '128 KB', date: 'Yesterday' },
  { name: 'Parent_Conference_Notes.pdf', type: 'Notes', size: '892 KB', date: '2 days ago' },
  { name: 'Curriculum_Guide_2024.pdf', type: 'Reference', size: '2.4 MB', date: '1 week ago' },
];

const classes = [
  { name: 'Algebra II - Period 1', students: 28, avgGrade: 85, assignments: 3 },
  { name: 'Pre-Calculus - Period 2', students: 24, avgGrade: 88, assignments: 2 },
  { name: 'Algebra I - Period 4', students: 30, avgGrade: 82, assignments: 4 },
];

const tasks = [
  { title: 'Grade Chapter 5 Tests', due: 'Tomorrow', priority: 'high', progress: 60 },
  { title: 'Prepare Week 13 Materials', due: 'Friday', priority: 'medium', progress: 30 },
  { title: 'Submit Q2 Reports', due: 'Next Monday', priority: 'medium', progress: 0 },
];

export default function InstructorOfficePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-instructor-600" />
          <div>
            <h1 className="text-3xl font-bold">My Office</h1>
            <p className="text-muted-foreground">Your teaching workspace and resources</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
          <Button variant="instructor"><Upload className="h-4 w-4 mr-2" />Upload</Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-instructor-600" />My Classes</CardTitle>
                  <Button variant="ghost" size="sm">View All<ChevronRight className="h-4 w-4 ml-1" /></Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {classes.map((cls, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{cls.name}</h4>
                        <p className="text-sm text-muted-foreground">{cls.students} students</p>
                      </div>
                      <Badge variant="instructor">{cls.avgGrade}% avg</Badge>
                    </div>
                    <p className="text-sm text-instructor-600">{cls.assignments} pending assignments to grade</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FolderOpen className="h-5 w-5 text-instructor-600" />Recent Files</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {recentFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-instructor-100 dark:bg-instructor-900/30 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-instructor-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.type} • {file.size} • {file.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="instructor">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="text-3xl font-bold">82</p><p className="text-sm text-muted-foreground">Students</p></div>
                  <div className="text-center"><p className="text-3xl font-bold">9</p><p className="text-sm text-muted-foreground">To Grade</p></div>
                  <div className="text-center"><p className="text-3xl font-bold">85%</p><p className="text-sm text-muted-foreground">Avg Grade</p></div>
                  <div className="text-center"><p className="text-3xl font-bold">3</p><p className="text-sm text-muted-foreground">Classes</p></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" />Tasks</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task, i) => (
                  <div key={i} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{task.title}</p>
                      <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'} size="sm">{task.priority}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Due: {task.due}</p>
                    <Progress value={task.progress} className="h-1.5" indicatorClassName="bg-instructor-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
