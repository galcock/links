'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { useUsers } from '@/lib/hooks/use-users';
import { useCourses } from '@/lib/hooks/use-courses';
import { useStudents } from '@/lib/hooks/use-students';
import { useCalendarEvents } from '@/lib/hooks/use-calendar';
import { useAnnouncements } from '@/lib/hooks/use-announcements';

export default function AdminDashboard() {
  const { data: usersData, isLoading: usersLoading } = useUsers({ limit: 10, status: 'ACTIVE' });
  const { data: coursesData } = useCourses({ limit: 5, status: 'ACTIVE' });
  const { data: studentsData } = useStudents({ limit: 100 });
  const { data: eventsData } = useCalendarEvents({ limit: 5 });
  const { data: announcementsData } = useAnnouncements({ limit: 5, priority: 'HIGH' });

  const stats = [
    {
      label: 'Total Users',
      value: usersData?.meta.total || 0,
      icon: Users,
      color: 'text-blue-500',
      change: '+12 this month',
    },
    {
      label: 'Active Students',
      value: studentsData?.meta.total || 0,
      icon: Users,
      color: 'text-green-500',
      change: `${coursesData?.meta.total || 0} courses`,
    },
    {
      label: 'Total Courses',
      value: coursesData?.meta.total || 0,
      icon: BookOpen,
      color: 'text-purple-500',
      change: 'Current term',
    },
    {
      label: 'Events Today',
      value: eventsData?.meta.total || 0,
      icon: Calendar,
      color: 'text-amber-500',
      change: 'This week',
    },
  ];

  if (usersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-admin-600" />
      </div>
    );
  }

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
            System <span className="text-admin-600">Overview</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage your education platform
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="admin">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Reports
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
          <Card key={stat.label} variant="admin" hover="lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-admin-600 mt-1">{stat.change}</p>
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
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-admin-600" />
                    Recent Users
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {usersData?.data.slice(0, 5).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-admin-100 dark:bg-admin-900/30 flex items-center justify-center font-semibold text-admin-600">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge variant={user.status === 'ACTIVE' ? 'success' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-admin-600" />
                    Active Courses
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coursesData?.data.slice(0, 4).map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-3 rounded-xl border hover:shadow-md transition-all"
                    >
                      <div>
                        <h4 className="font-semibold">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {course._count?.enrollments || 0} students
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {course._count?.assignments || 0} assignments
                        </p>
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
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="admin">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Server Health</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                  <Progress value={100} className="h-2" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Database</span>
                    <span className="font-medium text-green-600">98%</span>
                  </div>
                  <Progress value={98} className="h-2" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Storage</span>
                    <span className="font-medium text-blue-600">67%</span>
                  </div>
                  <Progress value={67} className="h-2" indicatorClassName="bg-blue-500" />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    All systems operational
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Priority Announcements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Priority Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {announcementsData?.data.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No priority items
                  </p>
                ) : (
                  announcementsData?.data.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{announcement.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {announcement.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <Button variant="ghost" size="sm" className="w-full">
                  View All Announcements
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-admin-600" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventsData?.data.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center bg-admin-100 dark:bg-admin-900/30 rounded-lg p-2 min-w-[50px]">
                      <span className="text-xs font-medium text-admin-600">
                        {new Date(event.startTime).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-lg font-bold">
                        {new Date(event.startTime).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.startTime).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full">
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
