'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Users, BookOpen, Calendar, Award, TrendingUp, Clock, ChevronRight, MessageSquare, Star, CheckCircle2 } from 'lucide-react';

const children = [
  {
    name: 'Alex Smith',
    grade: '10th Grade',
    school: 'Lincoln High School',
    gpa: 3.8,
    attendance: 97,
    courses: [
      { name: 'Algebra II', teacher: 'Mrs. Johnson', grade: 'A-', progress: 78 },
      { name: 'Biology', teacher: 'Mr. Smith', grade: 'A', progress: 85 },
      { name: 'World History', teacher: 'Ms. Davis', grade: 'B+', progress: 68 },
      { name: 'English Lit', teacher: 'Mr. Brown', grade: 'A', progress: 90 },
    ],
    upcomingAssignments: 3,
    recentGrade: { assignment: 'Math Test Ch.5', grade: 'A-', score: 91 },
  },
  {
    name: 'Emma Smith',
    grade: '7th Grade',
    school: 'Lincoln Middle School',
    gpa: 3.9,
    attendance: 99,
    courses: [
      { name: 'Pre-Algebra', teacher: 'Mr. Wilson', grade: 'A', progress: 92 },
      { name: 'Life Science', teacher: 'Ms. Chen', grade: 'A', progress: 88 },
      { name: 'English', teacher: 'Mrs. Taylor', grade: 'A-', progress: 85 },
      { name: 'Social Studies', teacher: 'Mr. Garcia', grade: 'A', progress: 91 },
    ],
    upcomingAssignments: 2,
    recentGrade: { assignment: 'Science Project', grade: 'A', score: 98 },
  },
];

export default function ParentChildrenPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Users className="h-8 w-8 text-parent-600" />
        <div><h1 className="text-3xl font-bold">My Children</h1><p className="text-muted-foreground">Monitor your children's academic progress</p></div>
      </motion.div>

      {children.map((child, index) => (
        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (index + 1) }}>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar fallback={child.name} size="lg" />
                  <div>
                    <CardTitle>{child.name}</CardTitle>
                    <CardDescription>{child.grade} • {child.school}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><MessageSquare className="h-4 w-4 mr-1" />Contact Teachers</Button>
                  <Button variant="parent" size="sm"><ChevronRight className="h-4 w-4 mr-1" />Full Profile</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-parent-50 dark:bg-parent-950/30 text-center">
                  <p className="text-2xl font-bold text-parent-600">{child.gpa}</p>
                  <p className="text-sm text-muted-foreground">GPA</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 text-center">
                  <p className="text-2xl font-bold text-green-600">{child.attendance}%</p>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-center">
                  <p className="text-2xl font-bold text-amber-600">{child.upcomingAssignments}</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-center">
                  <p className="text-2xl font-bold text-blue-600">{child.courses.length}</p>
                  <p className="text-sm text-muted-foreground">Courses</p>
                </div>
              </div>

              {/* Recent Grade */}
              <div className="mb-6 p-4 rounded-xl border bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">Recent Grade</span>
                </div>
                <p className="text-sm">{child.recentGrade.assignment}: <span className="font-bold">{child.recentGrade.grade}</span> ({child.recentGrade.score}%)</p>
              </div>

              {/* Courses */}
              <div className="grid md:grid-cols-2 gap-4">
                {child.courses.map((course, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.teacher}</p>
                      </div>
                      <Badge variant="parent" className="text-lg font-bold">{course.grade}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={course.progress} className="flex-1 h-2" indicatorClassName="bg-parent-500" />
                      <span className="text-sm text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
