'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Briefcase,
  FileText,
  FolderOpen,
  Download,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  BookOpen,
  Calendar,
  ChevronRight,
} from 'lucide-react';

const recentFiles = [
  { name: 'Math_Homework_Ch5.pdf', type: 'PDF', size: '2.4 MB', date: '2 hours ago', status: 'submitted' },
  { name: 'Biology_Lab_Report.docx', type: 'Word', size: '1.8 MB', date: 'Yesterday', status: 'draft' },
  { name: 'History_Essay_Draft.pdf', type: 'PDF', size: '892 KB', date: '2 days ago', status: 'submitted' },
  { name: 'English_Notes.pdf', type: 'PDF', size: '456 KB', date: '3 days ago', status: 'personal' },
];

const assignments = [
  { title: 'Quadratic Equations Practice', course: 'Algebra II', due: 'Today', status: 'pending', progress: 75 },
  { title: 'Lab Report: Photosynthesis', course: 'Biology', due: 'Tomorrow', status: 'in-progress', progress: 40 },
  { title: 'World War II Essay', course: 'History', due: 'Friday', status: 'not-started', progress: 0 },
  { title: 'Shakespeare Analysis', course: 'English', due: 'Next Week', status: 'not-started', progress: 0 },
];

const grades = [
  { course: 'Algebra II', grade: 'A-', score: 91, trend: 'up' },
  { course: 'Biology', grade: 'A', score: 94, trend: 'up' },
  { course: 'History', grade: 'B+', score: 87, trend: 'same' },
  { course: 'English', grade: 'A', score: 93, trend: 'up' },
];

export default function StudentOfficePage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-student-600" />
          <div>
            <h1 className="text-3xl font-bold">My Office</h1>
            <p className="text-muted-foreground">
              Your personal workspace for files, assignments, and grades
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
          <Button variant="student">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-student-600" />
                    Active Assignments
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignments.map((assignment, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      </div>
                      <Badge
                        variant={
                          assignment.status === 'pending'
                            ? 'warning'
                            : assignment.status === 'in-progress'
                            ? 'student'
                            : 'secondary'
                        }
                      >
                        {assignment.status === 'not-started' ? 'Not Started' : assignment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Due: {assignment.due}
                      </span>
                      <span className="font-medium">{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="h-2" indicatorClassName="bg-student-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Files */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-student-600" />
                  Recent Files
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentFiles.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-lg bg-student-100 dark:bg-student-900/30 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-student-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.type} • {file.size} • {file.date}
                        </p>
                      </div>
                      <Badge
                        variant={
                          file.status === 'submitted'
                            ? 'success'
                            : file.status === 'draft'
                            ? 'warning'
                            : 'secondary'
                        }
                        size="sm"
                      >
                        {file.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="student">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">4</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">91%</p>
                    <p className="text-sm text-muted-foreground">Avg Grade</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">28</p>
                    <p className="text-sm text-muted-foreground">Files</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Grades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Current Grades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {grades.map((course, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">{course.course}</p>
                      <p className="text-xs text-muted-foreground">{course.score}%</p>
                    </div>
                    <Badge variant="student" className="text-lg font-bold">
                      {course.grade}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Storage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={35} className="h-2 mb-2" indicatorClassName="bg-student-500" />
                <p className="text-sm text-muted-foreground">3.5 GB of 10 GB used</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
