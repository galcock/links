'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { MiniCalendar } from '@/components/features/calendar';
import {
  Users,
  BookOpen,
  ClipboardList,
  MessageSquare,
  Video,
  PlusCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  FileText,
  BarChart3,
} from 'lucide-react';

const stats = [
  { label: 'Active Students', value: '127', icon: Users, color: 'text-instructor-500', change: '+5' },
  { label: 'Courses', value: '4', icon: BookOpen, color: 'text-blue-500' },
  { label: 'Pending Grades', value: '23', icon: ClipboardList, color: 'text-amber-500' },
  { label: 'Messages', value: '8', icon: MessageSquare, color: 'text-green-500' },
];

const todayClasses = [
  { name: 'Algebra II - Period 1', time: '8:00 AM', students: 32, room: 'Room 201' },
  { name: 'Algebra II - Period 3', time: '10:30 AM', students: 28, room: 'Room 201' },
  { name: 'AP Calculus', time: '1:00 PM', students: 24, room: 'Room 203' },
];

const recentSubmissions = [
  { student: 'Emma Wilson', assignment: 'Chapter 5 Quiz', time: '10 min ago', score: null },
  { student: 'James Chen', assignment: 'Homework Set 12', time: '25 min ago', score: null },
  { student: 'Sofia Rodriguez', assignment: 'Lab Report', time: '1 hour ago', score: 92 },
  { student: 'Michael Brown', assignment: 'Chapter 5 Quiz', time: '2 hours ago', score: 88 },
];

const coursePerformance = [
  { name: 'Algebra II - P1', avgGrade: 84, completion: 92 },
  { name: 'Algebra II - P3', avgGrade: 78, completion: 88 },
  { name: 'AP Calculus', avgGrade: 86, completion: 95 },
];

export default function InstructorDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, <span className="text-instructor-500">Mrs. Johnson</span>! 🎓
          </h1>
          <p className="text-muted-foreground mt-1">
            You have 3 classes today and 23 assignments to grade.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="instructor">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Assignment
          </Button>
          <Button variant="outline">
            <Video className="h-4 w-4 mr-2" />
            Start Class
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
        {stats.map((stat) => (
          <Card key={stat.label} variant="instructor" hover="lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    {stat.change && (
                      <span className="text-xs text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-instructor-500" />
                    Today's Schedule
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    Full Calendar
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayClasses.map((cls, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="h-12 w-12 rounded-xl bg-instructor-100 dark:bg-instructor-900/30 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-instructor-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {cls.room} • {cls.students} students
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-instructor-600">{cls.time}</p>
                      <Button size="sm" variant="ghost" className="mt-1">
                        <Video className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Submissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-instructor-500" />
                    Recent Submissions
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    Grade All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSubmissions.map((sub, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Avatar fallback={sub.student} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{sub.student}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {sub.assignment}
                        </p>
                      </div>
                      <div className="text-right">
                        {sub.score ? (
                          <Badge variant="success">{sub.score}%</Badge>
                        ) : (
                          <Badge variant="warning">Pending</Badge>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{sub.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MiniCalendar accentColor="instructor" />
          </motion.div>

          {/* Course Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-instructor-500" />
                  Course Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {coursePerformance.map((course, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{course.name}</span>
                      <span className="text-muted-foreground">Avg: {course.avgGrade}%</span>
                    </div>
                    <Progress
                      value={course.completion}
                      className="h-2"
                      indicatorClassName="bg-instructor-500"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="instructor">
              <CardContent className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Open Gradebook
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Curriculum Builder
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Student Roster
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
