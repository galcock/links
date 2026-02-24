'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress, CircularProgress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { MiniCalendar } from '@/components/features/calendar';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Play,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
  Bot,
  ChevronRight,
} from 'lucide-react';

const stats = [
  { label: 'Daily Tasks', value: '6/8', icon: CheckCircle2, color: 'text-green-500' },
  { label: 'Assignments Due', value: '3', icon: FileText, color: 'text-amber-500' },
  { label: 'Messages', value: '12', icon: MessageSquare, color: 'text-blue-500' },
  { label: 'Study Streak', value: '7 days', icon: Zap, color: 'text-purple-500' },
];

const upcomingTasks = [
  { title: 'Math Homework Ch. 5', course: 'Algebra II', due: 'Today, 11:59 PM', priority: 'high' },
  { title: 'Science Lab Report', course: 'Biology', due: 'Tomorrow, 3:00 PM', priority: 'medium' },
  { title: 'History Essay Draft', course: 'World History', due: 'Friday', priority: 'low' },
];

const courses = [
  { name: 'Algebra II', teacher: 'Mrs. Johnson', progress: 72, grade: 'A-', color: 'purple' },
  { name: 'Biology', teacher: 'Mr. Smith', progress: 85, grade: 'A', color: 'green' },
  { name: 'World History', teacher: 'Ms. Davis', progress: 68, grade: 'B+', color: 'amber' },
  { name: 'English Literature', teacher: 'Mr. Brown', progress: 90, grade: 'A', color: 'blue' },
];

const achievements = [
  { name: 'Quick Learner', icon: '⚡', unlocked: true },
  { name: 'Bookworm', icon: '📚', unlocked: true },
  { name: 'Perfect Week', icon: '🏆', unlocked: false },
  { name: 'Team Player', icon: '🤝', unlocked: true },
];

export default function StudentDashboard() {
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
            Good morning, <span className="text-student-600">Alex</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            You have 3 tasks due today. Let's make it a productive day!
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="student">
            <Bot className="h-4 w-4 mr-2" />
            Ask AI
          </Button>
          <Button variant="outline">
            <Play className="h-4 w-4 mr-2" />
            Continue Learning
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
        {stats.map((stat, i) => (
          <Card key={stat.label} variant="student" hover="lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
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
          {/* Today's Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-student-600" />
                    Today's Focus
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded-full border-2 border-student-500 text-student-600 focus:ring-student-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.course}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          task.priority === 'high'
                            ? 'destructive'
                            : task.priority === 'medium'
                            ? 'warning'
                            : 'secondary'
                        }
                        size="sm"
                      >
                        {task.priority}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {task.due}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* My Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-student-600" />
                    My Courses
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {courses.map((course, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{course.name}</h4>
                          <p className="text-sm text-muted-foreground">{course.teacher}</p>
                        </div>
                        <Badge variant="student" className="text-lg font-bold">
                          {course.grade}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress
                          value={course.progress}
                          className="h-2"
                          indicatorClassName="bg-student-500"
                        />
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
          {/* Calendar Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MiniCalendar accentColor="student" />
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-xl flex items-center justify-center text-2xl ${
                        achievement.unlocked
                          ? 'bg-amber-100 dark:bg-amber-900/30'
                          : 'bg-muted opacity-50'
                      }`}
                      title={achievement.name}
                    >
                      {achievement.icon}
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="student">
              <CardContent className="p-6 text-center">
                <CircularProgress
                  value={78}
                  size={100}
                  strokeWidth={8}
                  indicatorClassName="text-student-500"
                />
                <h3 className="font-semibold mt-4">Overall Progress</h3>
                <p className="text-sm text-muted-foreground">
                  You're doing great this semester!
                </p>
                <div className="flex items-center justify-center gap-1 mt-2 text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+5% from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
