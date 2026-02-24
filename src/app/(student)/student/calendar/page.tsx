'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, BookOpen, Clock, MapPin, Users, Video } from 'lucide-react';

const upcomingEvents = [
  {
    id: '1',
    title: 'Algebra II - Chapter 5 Test',
    start: new Date(Date.now() + 86400000),
    end: new Date(Date.now() + 86400000 + 3600000),
    color: 'purple',
    location: 'Room 204',
  },
  {
    id: '2',
    title: 'Biology Lab',
    start: new Date(Date.now() + 172800000),
    end: new Date(Date.now() + 172800000 + 7200000),
    color: 'green',
    location: 'Science Building',
  },
  {
    id: '3',
    title: 'Study Group - History',
    start: new Date(Date.now() + 259200000),
    end: new Date(Date.now() + 259200000 + 5400000),
    color: 'amber',
    location: 'Library',
  },
  {
    id: '4',
    title: 'Virtual Tutoring Session',
    start: new Date(Date.now() + 345600000),
    end: new Date(Date.now() + 345600000 + 3600000),
    color: 'blue',
  },
];

const todaySchedule = [
  { time: '8:00 AM', title: 'English Literature', room: 'Room 101', type: 'class' },
  { time: '9:30 AM', title: 'Algebra II', room: 'Room 204', type: 'class' },
  { time: '11:00 AM', title: 'Biology', room: 'Science Lab', type: 'class' },
  { time: '12:30 PM', title: 'Lunch', room: 'Cafeteria', type: 'break' },
  { time: '1:30 PM', title: 'World History', room: 'Room 302', type: 'class' },
  { time: '3:00 PM', title: 'Soccer Practice', room: 'Athletic Field', type: 'activity' },
];

export default function StudentCalendarPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-student-600" />
            My Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            View your classes, assignments, and activities
          </p>
        </div>
        <Button variant="student">
          <Video className="h-4 w-4 mr-2" />
          Join Virtual Class
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Calendar events={upcomingEvents} accentColor="student" />
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="student">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySchedule.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-sm font-medium text-muted-foreground w-20">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.room}
                      </p>
                    </div>
                    <Badge
                      variant={
                        item.type === 'class'
                          ? 'student'
                          : item.type === 'break'
                          ? 'secondary'
                          : 'outline'
                      }
                      size="sm"
                    >
                      {item.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <p className="font-medium text-sm text-red-700 dark:text-red-400">Math Homework</p>
                  <p className="text-xs text-red-600 dark:text-red-500">Due Today, 11:59 PM</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <p className="font-medium text-sm text-amber-700 dark:text-amber-400">Science Lab Report</p>
                  <p className="text-xs text-amber-600 dark:text-amber-500">Due Tomorrow, 3:00 PM</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <p className="font-medium text-sm text-blue-700 dark:text-blue-400">History Essay Draft</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500">Due Friday</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
