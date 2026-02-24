'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress, CircularProgress } from '@/components/ui/progress';
import { MiniCalendar } from '@/components/features/calendar';
import {
  BookOpen,
  Clock,
  FileText,
  MessageSquare,
  Play,
  Target,
  TrendingUp,
  Trophy,
  Zap,
  Bot,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useCourses } from '@/lib/hooks/use-courses';
import { useAssignments } from '@/lib/hooks/use-assignments';
import { useConversations } from '@/lib/hooks/use-messages';
import { useGrades } from '@/lib/hooks/use-grades';

export default function StudentDashboard() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: coursesData, isLoading: coursesLoading } = useCourses({ limit: 4, status: 'ACTIVE' });
  const { data: assignmentsData, isLoading: assignmentsLoading } = useAssignments({ 
    limit: 3, 
    status: 'ACTIVE',
  });
  const { data: conversationsData } = useConversations({ limit: 1 });
  const { data: gradesData } = useGrades({ studentId: user?.id, limit: 100 });

  // Calculate stats
  const unreadMessages = 0; // Would need unread count from API
  const studyStreak = 7; // Would need from user profile/stats
  const totalDueTasks = assignmentsData?.meta.total || 0;
  const completedTasks = 0; // Would track completed tasks

  // Calculate overall grade average
  const overallProgress = React.useMemo(() => {
    if (!gradesData?.data || gradesData.data.length === 0) return 0;
    const avg = gradesData.data.reduce((sum, grade) => sum + (grade.percentage || 0), 0) / gradesData.data.length;
    return Math.round(avg);
  }, [gradesData]);

  const stats = [
    { label: 'Daily Tasks', value: `${completedTasks}/${totalDueTasks}`, icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Assignments Due', value: `${totalDueTasks}`, icon: FileText, color: 'text-amber-500' },
    { label: 'Messages', value: `${unreadMessages}`, icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Study Streak', value: `${studyStreak} days`, icon: Zap, color: 'text-purple-500' },
  ];

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-student-600" />
      </div>
    );
  }

  const firstName = user?.firstName || 'Student';
  const courses = coursesData?.data || [];
  const assignments = assignmentsData?.data || [];

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
            Good morning, <span className="text-student-600">{firstName}</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            {totalDueTasks > 0 
              ? `You have ${totalDueTasks} ${totalDueTasks === 1 ? 'task' : 'tasks'} due. Let's make it a productive day!`
              : "Great job! You're all caught up. Keep up the excellent work!"}
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
        {stats.map((stat) => (
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
                {assignmentsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : assignments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-500" />
                    <p>No assignments due! You're all caught up.</p>
                  </div>
                ) : (
                  assignments.map((task) => {
                    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                    const isToday = dueDate && dueDate.toDateString() === new Date().toDateString();
                    const isTomorrow = dueDate && 
                      dueDate.toDateString() === new Date(Date.now() + 86400000).toDateString();
                    
                    const dueDateText = dueDate 
                      ? isToday 
                        ? `Today, ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        : isTomorrow
                        ? `Tomorrow, ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        : dueDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
                      : 'No due date';

                    return (
                      <div
                        key={task.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded-full border-2 border-student-500 text-student-600 focus:ring-student-500"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {task.course?.name || 'Course'}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={isToday ? 'destructive' : 'secondary'}
                            size="sm"
                          >
                            {task.type}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {dueDateText}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
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
                {coursesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : courses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-2" />
                    <p>No enrolled courses yet.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {courses.map((course) => {
                      // Mock progress for now - would need from API
                      const progress = Math.floor(Math.random() * 30) + 70;
                      const grade = 'A-'; // Would get from grades data
                      
                      return (
                        <div
                          key={course.id}
                          className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{course.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {course.instructor?.user ? 
                                  `${course.instructor.user.firstName} ${course.instructor.user.lastName}` 
                                  : 'Instructor'}
                              </p>
                            </div>
                            <Badge variant="student" className="text-lg font-bold">
                              {grade}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{progress}%</span>
                            </div>
                            <Progress
                              value={progress}
                              className="h-2"
                              indicatorClassName="bg-student-500"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
                  {[
                    { name: 'Quick Learner', icon: '⚡', unlocked: true },
                    { name: 'Bookworm', icon: '📚', unlocked: true },
                    { name: 'Perfect Week', icon: '🏆', unlocked: false },
                    { name: 'Team Player', icon: '🤝', unlocked: true },
                  ].map((achievement, i) => (
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
                  value={overallProgress}
                  size={100}
                  strokeWidth={8}
                  indicatorClassName="text-student-500"
                />
                <h3 className="font-semibold mt-4">Overall Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {overallProgress >= 90 ? "Outstanding work!" :
                   overallProgress >= 80 ? "You're doing great this semester!" :
                   overallProgress >= 70 ? "Keep up the good work!" :
                   "Let's boost those grades!"}
                </p>
                <div className="flex items-center justify-center gap-1 mt-2 text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Keep it up!</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
