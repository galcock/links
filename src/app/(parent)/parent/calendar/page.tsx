'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Clock, MapPin, Bell, GraduationCap } from 'lucide-react';

const upcomingEvents = [
  { id: '1', title: 'Parent-Teacher Conference', start: new Date(Date.now() + 172800000), end: new Date(Date.now() + 172800000 + 1800000), color: 'green', location: 'Room 204' },
  { id: '2', title: 'School Play - Alex performing', start: new Date(Date.now() + 604800000), end: new Date(Date.now() + 604800000 + 7200000), color: 'purple' },
  { id: '3', title: 'Soccer Game', start: new Date(Date.now() + 345600000), end: new Date(Date.now() + 345600000 + 7200000), color: 'blue', location: 'Athletic Field' },
  { id: '4', title: 'Report Card Release', start: new Date(Date.now() + 1209600000), end: new Date(Date.now() + 1209600000), color: 'amber' },
];

const childSchedule = [
  { time: '8:00 AM', title: 'English Literature', room: 'Room 101' },
  { time: '9:30 AM', title: 'Algebra II', room: 'Room 204' },
  { time: '11:00 AM', title: 'Biology', room: 'Science Lab' },
  { time: '12:30 PM', title: 'Lunch', room: 'Cafeteria' },
  { time: '1:30 PM', title: 'World History', room: 'Room 302' },
  { time: '3:00 PM', title: 'Soccer Practice', room: 'Athletic Field' },
];

const importantDates = [
  { title: 'Progress Report Due', date: 'Mar 1', type: 'academic' },
  { title: 'Spring Break', date: 'Mar 15-22', type: 'break' },
  { title: 'SAT Test Date', date: 'Mar 25', type: 'test' },
];

export default function ParentCalendarPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><CalendarDays className="h-8 w-8 text-parent-600" />Family Calendar</h1>
          <p className="text-muted-foreground mt-1">Track your children's school events and activities</p>
        </div>
        <Button variant="parent"><Bell className="h-4 w-4 mr-2" />Set Reminders</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Calendar events={upcomingEvents} accentColor="parent" />
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="parent">
              <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5" />Alex's Schedule Today</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {childSchedule.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50">
                    <div className="text-sm font-medium text-muted-foreground w-20">{item.time}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{item.room}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Important Dates</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {importantDates.map((date, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${date.type === 'academic' ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200' : date.type === 'break' ? 'bg-green-50 dark:bg-green-950/30 border-green-200' : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200'}`}>
                    <p className="font-medium text-sm">{date.title}</p>
                    <p className="text-xs text-muted-foreground">{date.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
