'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, Users, Filter } from 'lucide-react';

const upcomingEvents = [
  { id: '1', title: 'Open House', start: new Date(Date.now() + 604800000), end: new Date(Date.now() + 604800000 + 10800000), color: 'slate', location: 'All Campuses' },
  { id: '2', title: 'School Play', start: new Date(Date.now() + 1209600000), end: new Date(Date.now() + 1209600000 + 7200000), color: 'purple' },
  { id: '3', title: 'Sports Tournament', start: new Date(Date.now() + 259200000), end: new Date(Date.now() + 259200000 + 28800000), color: 'blue' },
  { id: '4', title: 'Art Exhibition', start: new Date(Date.now() + 345600000), end: new Date(Date.now() + 345600000 + 14400000), color: 'amber' },
];

const featuredEvents = [
  { title: 'Spring Open House', date: 'Mar 15', time: '10 AM - 2 PM', location: 'All Schools', type: 'Open House' },
  { title: 'Annual School Play', date: 'Mar 20-22', time: '7 PM', location: 'Auditorium', type: 'Performance' },
  { title: 'Science Fair', date: 'Apr 5', time: '9 AM - 4 PM', location: 'Gymnasium', type: 'Exhibition' },
];

export default function PublicCalendarPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold flex items-center gap-3"><CalendarDays className="h-8 w-8 text-slate-600" />Public Calendar</h1><p className="text-muted-foreground mt-1">School events open to the public</p></div>
        <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter Events</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Calendar events={upcomingEvents} accentColor="slate" />
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Featured Events</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {featuredEvents.map((event, i) => (
                  <div key={i} className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-start justify-between mb-1"><p className="font-semibold text-sm">{event.title}</p><Badge variant="secondary" size="sm">{event.type}</Badge></div>
                    <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{event.location}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">All events are free and open to the public unless otherwise noted.</p>
            </CardContent></Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
