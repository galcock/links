'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { MiniCalendar } from '@/components/features/calendar';
import {
  Users,
  Calendar,
  FileText,
  Heart,
  Activity,
  ClipboardCheck,
  Clock,
  AlertTriangle,
  ChevronRight,
  MessageSquare,
  Target,
  TrendingUp,
} from 'lucide-react';

const stats = [
  { label: 'Active Caseload', value: '42', icon: Users, color: 'text-services-500' },
  { label: "Today's Sessions", value: '8', icon: Calendar, color: 'text-green-500' },
  { label: 'IEPs Due', value: '5', icon: FileText, color: 'text-amber-500' },
  { label: 'Pending Reviews', value: '12', icon: ClipboardCheck, color: 'text-blue-500' },
];

const todaySessions = [
  { student: 'Emma Wilson', type: 'Speech Therapy', time: '9:00 AM', duration: '30 min', status: 'completed' },
  { student: 'Michael Chen', type: 'Counseling', time: '10:00 AM', duration: '45 min', status: 'in-progress' },
  { student: 'Sofia Rodriguez', type: 'OT', time: '11:00 AM', duration: '45 min', status: 'upcoming' },
  { student: 'James Brown', type: 'PT', time: '1:00 PM', duration: '30 min', status: 'upcoming' },
  { student: 'Olivia Davis', type: 'Special Ed', time: '2:00 PM', duration: '60 min', status: 'upcoming' },
];

const caseloadOverview = [
  { category: 'Special Education', count: 18, trend: '+2' },
  { category: 'Speech Therapy', count: 12, trend: '0' },
  { category: 'Occupational Therapy', count: 8, trend: '+1' },
  { category: 'Physical Therapy', count: 4, trend: '0' },
];

const upcomingDeadlines = [
  { title: 'IEP Review - Emma Wilson', date: 'Mar 15', priority: 'high' },
  { title: 'Progress Report - Michael Chen', date: 'Mar 18', priority: 'medium' },
  { title: 'Annual Evaluation - Sofia Rodriguez', date: 'Mar 22', priority: 'high' },
];

export default function ServicesDashboard() {
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
            Student Services Hub 💙
          </h1>
          <p className="text-muted-foreground mt-1">
            Supporting student success through specialized care.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="services">
            <FileText className="h-4 w-4 mr-2" />
            New Service Record
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
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
          <Card key={stat.label} variant="services" hover="lift">
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
          {/* Today's Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-services-500" />
                    Today's Sessions
                  </CardTitle>
                  <Badge variant="services">{todaySessions.length} scheduled</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySessions.map((session, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      session.status === 'completed' ? 'bg-green-50 dark:bg-green-950/30' :
                      session.status === 'in-progress' ? 'bg-blue-50 dark:bg-blue-950/30' :
                      'bg-muted/50'
                    }`}
                  >
                    <Avatar fallback={session.student} size="default" />
                    <div className="flex-1">
                      <p className="font-medium">{session.student}</p>
                      <p className="text-sm text-muted-foreground">{session.type} • {session.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-services-600">{session.time}</p>
                      <Badge
                        variant={
                          session.status === 'completed' ? 'success' :
                          session.status === 'in-progress' ? 'info' :
                          'secondary'
                        }
                        size="sm"
                      >
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Caseload Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-services-500" />
                    Caseload Overview
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseloadOverview.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border">
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-muted-foreground">{item.count} students</p>
                      </div>
                      {item.trend !== '0' && (
                        <Badge variant={item.trend.startsWith('+') ? 'success' : 'destructive'}>
                          {item.trend}
                        </Badge>
                      )}
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
            <MiniCalendar accentColor="services" />
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((deadline, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className={`h-2 w-2 rounded-full ${
                      deadline.priority === 'high' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline.date}</p>
                    </div>
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
            <Card variant="services">
              <CardContent className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  IEP Documents
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Goals Tracking
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Team Communication
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Progress Reports
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
