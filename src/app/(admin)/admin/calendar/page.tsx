'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Clock, Building, Plus, Bell } from 'lucide-react';

const upcomingEvents = [
  { id: '1', title: 'Board Meeting', start: new Date(Date.now() + 86400000), end: new Date(Date.now() + 86400000 + 7200000), color: 'orange', location: 'Board Room' },
  { id: '2', title: 'Staff Development Day', start: new Date(Date.now() + 604800000), end: new Date(Date.now() + 604800000 + 28800000), color: 'purple' },
  { id: '3', title: 'Budget Review', start: new Date(Date.now() + 259200000), end: new Date(Date.now() + 259200000 + 3600000), color: 'green' },
  { id: '4', title: 'Parent Open House', start: new Date(Date.now() + 1209600000), end: new Date(Date.now() + 1209600000 + 10800000), color: 'blue' },
];

const todaySchedule = [
  { time: '8:00 AM', title: 'Principal Meeting', location: 'Office' },
  { time: '10:00 AM', title: 'Facilities Review', location: 'Campus' },
  { time: '12:00 PM', title: 'Lunch with Donors', location: 'Off-site' },
  { time: '2:00 PM', title: 'HR Review', location: 'Conference Room' },
  { time: '4:00 PM', title: 'Parent Call', location: 'Office' },
];

export default function AdminCalendarPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold flex items-center gap-3"><CalendarDays className="h-8 w-8 text-admin-600" />Admin Calendar</h1><p className="text-muted-foreground mt-1">Manage district-wide events and schedules</p></div>
        <div className="flex gap-2">
          <Button variant="outline"><Bell className="h-4 w-4 mr-2" />Notifications</Button>
          <Button variant="admin"><Plus className="h-4 w-4 mr-2" />Add Event</Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Calendar events={upcomingEvents} accentColor="admin" />
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="admin"><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Today's Schedule</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {todaySchedule.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50">
                    <div className="text-sm font-medium text-muted-foreground w-20">{item.time}</div>
                    <div className="flex-1"><p className="font-medium text-sm">{item.title}</p><p className="text-xs text-muted-foreground">{item.location}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Building className="h-5 w-5" />District Events</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200"><p className="font-medium text-sm">Q3 Budget Review</p><p className="text-xs text-muted-foreground">Mar 1 • District Office</p></div>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200"><p className="font-medium text-sm">State Audit</p><p className="text-xs text-muted-foreground">Mar 15 • All Schools</p></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
