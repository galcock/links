'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Clock, MapPin, Plus, Building } from 'lucide-react';

const upcomingEvents = [
  { id: '1', title: 'Career Fair', start: new Date(Date.now() + 604800000), end: new Date(Date.now() + 604800000 + 14400000), color: 'teal', location: 'Gymnasium' },
  { id: '2', title: 'College Night', start: new Date(Date.now() + 1209600000), end: new Date(Date.now() + 1209600000 + 10800000), color: 'purple' },
  { id: '3', title: 'Community Safety Meeting', start: new Date(Date.now() + 259200000), end: new Date(Date.now() + 259200000 + 7200000), color: 'blue' },
  { id: '4', title: 'Library Book Sale', start: new Date(Date.now() + 345600000), end: new Date(Date.now() + 345600000 + 28800000), color: 'amber' },
];

const todayEvents = [
  { time: '10:00 AM', title: 'Library Story Time', location: 'Library' },
  { time: '2:00 PM', title: 'Job Skills Workshop', location: 'Room 201' },
  { time: '4:00 PM', title: 'Fitness Class', location: 'Gym' },
  { time: '6:00 PM', title: 'ESL Class', location: 'Room 105' },
];

export default function CommunityCalendarPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold flex items-center gap-3"><CalendarDays className="h-8 w-8 text-community-600" />Community Calendar</h1><p className="text-muted-foreground mt-1">Events and programs for the community</p></div>
        <Button variant="community"><Plus className="h-4 w-4 mr-2" />Submit Event</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Calendar events={upcomingEvents} accentColor="community" />
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="community"><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Today's Events</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {todayEvents.map((event, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50">
                    <div className="text-sm font-medium text-muted-foreground w-20">{event.time}</div>
                    <div className="flex-1"><p className="font-medium text-sm">{event.title}</p><p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div><p className="text-3xl font-bold">24</p><p className="text-sm text-muted-foreground">This Week</p></div>
                <div><p className="text-3xl font-bold">86</p><p className="text-sm text-muted-foreground">This Month</p></div>
              </div>
            </CardContent></Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
