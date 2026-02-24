'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Filter,
  Plus,
  ChevronRight,
  Upload,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';

const assignments = [
  {
    id: 1,
    title: 'Quadratic Equations Practice',
    course: 'Algebra II',
    type: 'Homework',
    due: 'Today, 11:59 PM',
    status: 'in-progress',
    progress: 75,
    points: 100,
    submitted: false,
  },
  {
    id: 2,
    title: 'Lab Report: Photosynthesis',
    course: 'Biology',
    type: 'Lab Report',
    due: 'Tomorrow, 3:00 PM',
    status: 'in-progress',
    progress: 40,
    points: 150,
    submitted: false,
  },
  {
    id: 3,
    title: 'World War II Essay',
    course: 'World History',
    type: 'Essay',
    due: 'Friday',
    status: 'not-started',
    progress: 0,
    points: 200,
    submitted: false,
  },
  {
    id: 4,
    title: 'Shakespeare Analysis',
    course: 'English Literature',
    type: 'Analysis',
    due: 'Next Monday',
    status: 'not-started',
    progress: 0,
    points: 100,
    submitted: false,
  },
];

const completedWork = [
  { title: 'Chapter 4 Test', course: 'Algebra II', grade: 'A', score: 95, date: '2 days ago' },
  { title: 'Cell Structure Quiz', course: 'Biology', grade: 'A-', score: 92, date: '3 days ago' },
  { title: 'Primary Sources Analysis', course: 'History', grade: 'B+', score: 88, date: '5 days ago' },
  { title: 'Poetry Analysis', course: 'English', grade: 'A', score: 96, date: '1 week ago' },
];

const upcomingTests = [
  { title: 'Chapter 5 Test', course: 'Algebra II', date: 'Friday, Feb 28', topics: ['Quadratics', 'Factoring'] },
  { title: 'Cell Biology Exam', course: 'Biology', date: 'Monday, Mar 3', topics: ['Mitosis', 'Meiosis', 'Cell Cycle'] },
];

export default function StudentWorkPage() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-student-600" />
          <div>
            <h1 className="text-3xl font-bold">My Work</h1>
            <p className="text-muted-foreground">
              Track assignments, tests, and submitted work
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="student">
            <Plus className="h-4 w-4 mr-2" />
            New Draft
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Due Today</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Clock className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold">91%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-student-100 flex items-center justify-center text-student-600 font-bold">
                A
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList>
                    <TabsTrigger value="pending">Pending (4)</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                {activeTab === 'pending' && (
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="p-4 rounded-xl border hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {assignment.course} • {assignment.type}
                            </p>
                          </div>
                          <Badge
                            variant={
                              assignment.status === 'in-progress'
                                ? 'student'
                                : 'secondary'
                            }
                          >
                            {assignment.status === 'not-started' ? 'Not Started' : 'In Progress'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-3">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Due: {assignment.due}
                          </span>
                          <span className="font-medium">{assignment.points} pts</span>
                        </div>
                        {assignment.progress > 0 && (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{assignment.progress}%</span>
                            </div>
                            <Progress value={assignment.progress} className="h-2" indicatorClassName="bg-student-500" />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="student" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            {assignment.progress > 0 ? 'Continue' : 'Start'}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'completed' && (
                  <div className="space-y-3">
                    {completedWork.map((work, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{work.title}</p>
                          <p className="text-sm text-muted-foreground">{work.course} • {work.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="student" className="text-lg font-bold">
                            {work.grade}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{work.score}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'drafts' && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No drafts saved</p>
                    <Button variant="student" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Draft
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="student">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Tests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTests.map((test, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50">
                    <p className="font-semibold">{test.title}</p>
                    <p className="text-sm text-muted-foreground">{test.course}</p>
                    <p className="text-sm font-medium mt-1">{test.date}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {test.topics.map((topic, j) => (
                        <Badge key={j} variant="secondary" size="sm">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-student-500 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop files here or click to browse
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
