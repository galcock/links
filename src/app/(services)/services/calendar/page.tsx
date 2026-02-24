'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Clock, MapPin, Plus, Heart } from 'lucide-react';

const upcomingEvents = [
  { id: '1', title: 'IEP Meeting - Smith', start: new Date(Date.now() + 86400000), end: new Date(Date.now() + 86400000 + 3600000), color: 'blue' },
  { id: '2', title: 'PT Session - Johnson', start: new Date(Date.now() + 172800000), end: new Date(Date.now() + 172800000 + 1800000), color: 'green' },
  { id: '3', title: 'Speech Therapy Group', start: new Date(Date.now() + 259200000), end: new Date(Date.now() + 259200000 + 3600000), color: 'purple' },
  { id: '4', title: 'Counseling Workshop', start: new Date(Date.now() + 345600000), end: new Date(Date.now() + 345600000 + 7200000), color: 'teal' },
];

const todayAppointments = [
  { time: '8:30 AM', title: 'PT - Alex M.', type: 'Physical Therapy', room: 'PT Room' },
  { time: '9:30 AM', title: 'Speech - Sarah K.', type: 'Speech Therapy', room: 'Room 105' },
  { time: '10:30 AM', title: 'IEP Review', type: 'Special Ed', room: 'Conference' },
  { time: '1:00 PM', title: 'Counseling - Group', type: 'Counseling', room: 'Room 110' },
  { time: '2:30 PM', title: 'Parent Meeting', type: 'Guidance', room: 'Office' },
];

export default function ServicesCalendarPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold flex items-center gap-3"><CalendarDays className="h-8 w-8 text-services-600" />Services Calendar</h1><p className="text-muted-foreground mt-1">Schedule appointments and sessions</p></div>
        <Button variant="services"><Plus className="h-4 w-4 mr-2" />New Appointment</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Calendar events={upcomingEvents} accentColor="services" />
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="services"><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Today's Sessions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {todayAppointments.map((apt, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50">
                    <div className="text-sm font-medium text-muted-foreground w-20">{apt.time}</div>
                    <div className="flex-1"><p className="font-medium text-sm">{apt.title}</p><p className="text-xs text-muted-foreground">{apt.type} • {apt.room}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div><p className="text-3xl font-bold">12</p><p className="text-sm text-muted-foreground">Today</p></div>
                <div><p className="text-3xl font-bold">48</p><p className="text-sm text-muted-foreground">This Week</p></div>
              </div>
            </CardContent></Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
