'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress, CircularProgress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { MiniCalendar } from '@/components/features/calendar';
import {
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Bell,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  FileText,
  Heart,
  Star,
} from 'lucide-react';

const children = [
  {
    name: 'Emma Wilson',
    grade: '10th Grade',
    avatar: null,
    gpa: 3.8,
    attendance: 97,
    trend: 'up',
    alerts: 0,
  },
  {
    name: 'Lucas Wilson',
    grade: '7th Grade',
    avatar: null,
    gpa: 3.4,
    attendance: 94,
    trend: 'stable',
    alerts: 1,
  },
];

const recentActivity = [
  { child: 'Emma', event: 'Submitted Math Assignment', time: '2 hours ago', icon: FileText },
  { child: 'Lucas', event: 'Received grade on Science Quiz: 88%', time: '4 hours ago', icon: CheckCircle },
  { child: 'Emma', event: 'Joined Study Group: AP History', time: 'Yesterday', icon: Users },
  { child: 'Lucas', event: 'Absent from PE class', time: 'Yesterday', icon: AlertTriangle },
];

const upcomingEvents = [
  { title: 'Parent-Teacher Conference', date: 'Mar 15', time: '3:30 PM', type: 'meeting' },
  { title: "Emma's Science Fair", date: 'Mar 20', time: '6:00 PM', type: 'event' },
  { title: "Lucas's Soccer Game", date: 'Mar 22', time: '4:00 PM', type: 'sports' },
];

const messages = [
  { from: 'Mrs. Johnson', subject: "Emma's Progress Report", time: '1 day ago', unread: true },
  { from: 'Mr. Smith', subject: 'Science Fair Reminder', time: '2 days ago', unread: false },
  { from: 'Coach Davis', subject: 'Soccer Schedule Update', time: '3 days ago', unread: false },
];

export default function ParentDashboard() {
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
            Welcome, <span className="text-parent-500">Mr. & Mrs. Wilson</span>! 👨‍👩‍👧‍👦
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's how your children are doing this week.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="parent">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message Teacher
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </motion.div>

      {/* Children Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 gap-4"
      >
        {children.map((child, i) => (
          <Card key={child.name} variant="parent" hover="lift" className="cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar fallback={child.name} size="xl" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{child.name}</h3>
                      <p className="text-sm text-muted-foreground">{child.grade}</p>
                    </div>
                    {child.alerts > 0 && (
                      <Badge variant="destructive">{child.alerts} Alert</Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">GPA</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{child.gpa}</span>
                        {child.trend === 'up' && (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        )}
                        {child.trend === 'down' && (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Attendance</p>
                      <span className="text-2xl font-bold">{child.attendance}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="w-full mt-4">
                View Full Profile
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
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
                    <Bell className="h-5 w-5 text-parent-500" />
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/50"
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.icon === AlertTriangle 
                        ? 'bg-amber-100 text-amber-600' 
                        : 'bg-parent-100 text-parent-600'
                    }`}>
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        <span className="text-parent-600">{activity.child}</span>: {activity.event}
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-parent-500" />
                    Messages from Teachers
                  </CardTitle>
                  <Badge variant="parent">3 New</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                      msg.unread ? 'bg-parent-50 dark:bg-parent-950/30' : 'hover:bg-muted/50'
                    }`}
                  >
                    <Avatar fallback={msg.from} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{msg.from}</p>
                      <p className="text-sm text-muted-foreground truncate">{msg.subject}</p>
                    </div>
                    <div className="text-right">
                      {msg.unread && (
                        <span className="h-2 w-2 rounded-full bg-parent-500 inline-block" />
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
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
            <MiniCalendar accentColor="parent" />
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-parent-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="text-center min-w-[50px]">
                      <p className="text-xs text-muted-foreground">{event.date.split(' ')[0]}</p>
                      <p className="font-bold text-parent-600">{event.date.split(' ')[1]}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
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
            <Card variant="parent">
              <CardContent className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Grades
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Report Cards
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Student Services
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Attendance History
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
