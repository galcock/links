'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Clock, MapPin, Video, Plus, BookOpen } from 'lucide-react';

const upcomingEvents = [
  { id: '1', title: 'Algebra II - Period 1', start: new Date(), end: new Date(Date.now() + 3600000), color: 'amber', location: 'Room 204' },
  { id: '2', title: 'Department Meeting', start: new Date(Date.now() + 86400000), end: new Date(Date.now() + 86400000 + 3600000), color: 'blue', location: 'Conference Room' },
  { id: '3', title: 'Parent Conference - Smith', start: new Date(Date.now() + 172800000), end: new Date(Date.now() + 172800000 + 1800000), color: 'green' },
  { id: '4', title: 'Professional Development', start: new Date(Date.now() + 345600000), end: new Date(Date.now() + 345600000 + 7200000), color: 'purple' },
];

const todayClasses = [
  { time: '8:00 AM', title: 'Algebra II - Period 1', room: 'Room 204', students: 28 },
  { time: '9:30 AM', title: 'Pre-Calculus - Period 2', room: 'Room 204', students: 24 },
  { time: '11:00 AM', title: 'Planning Period', room: 'Office', students: 0 },
  { time: '12:30 PM', title: 'Lunch', room: '-', students: 0 },
  { time: '1:30 PM', title: 'Algebra I - Period 4', room: 'Room 204', students: 30 },
  { time: '3:00 PM', title: 'Math Club', room: 'Room 204', students: 15 },
];

export default function InstructorCalendarPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-instructor-600" />
            My Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            View your teaching schedule and appointments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Video className="h-4 w-4 mr-2" />
            Virtual Office Hours
          </Button>
          <Button variant="instructor">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Calendar events={upcomingEvents} accentColor="instructor" />
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="instructor">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayClasses.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors">
                    <div className="text-sm font-medium text-muted-foreground w-20">{item.time}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.room}
                        {item.students > 0 && (
                          <span className="ml-2 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {item.students}
                          </span>
                        )}
                      </p>
                    </div>
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
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <p className="font-medium text-sm text-amber-700 dark:text-amber-400">Grade Chapter 5 Tests</p>
                  <p className="text-xs text-amber-600 dark:text-amber-500">Due Tomorrow</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <p className="font-medium text-sm text-blue-700 dark:text-blue-400">Submit Curriculum Review</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500">Due Friday</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                  <p className="font-medium text-sm text-purple-700 dark:text-purple-400">Q2 Progress Reports</p>
                  <p className="text-xs text-purple-600 dark:text-purple-500">Due Next Monday</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
