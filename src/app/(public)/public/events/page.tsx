'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PartyPopper, Calendar, MapPin, Clock, Users, Filter, ChevronRight, Ticket } from 'lucide-react';

const events = [
  { title: 'Spring Open House', date: 'Mar 15, 2026', time: '10 AM - 2 PM', location: 'All Campuses', type: 'Open House', description: 'Tour our schools and meet faculty', free: true },
  { title: 'Annual School Play: Romeo & Juliet', date: 'Mar 20-22, 2026', time: '7 PM', location: 'Lincoln Auditorium', type: 'Performance', description: 'Student theater production', free: false, price: '$10' },
  { title: 'Science Fair', date: 'Apr 5, 2026', time: '9 AM - 4 PM', location: 'Lincoln Gymnasium', type: 'Exhibition', description: 'Student science projects showcase', free: true },
  { title: 'Spring Concert', date: 'Apr 15, 2026', time: '6:30 PM', location: 'Auditorium', type: 'Performance', description: 'Band, orchestra, and choir performances', free: true },
  { title: 'Sports Day', date: 'May 1, 2026', time: '8 AM - 3 PM', location: 'Athletic Fields', type: 'Athletics', description: 'Annual athletic competition', free: true },
];

const categories = ['All', 'Open House', 'Performance', 'Exhibition', 'Athletics'];

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold flex items-center gap-3"><PartyPopper className="h-8 w-8 text-slate-600" />Events</h1><p className="text-muted-foreground mt-1">Upcoming public events</p></div>
        <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <Button key={i} variant={i === 0 ? 'default' : 'outline'} size="sm">{cat}</Button>
        ))}
      </motion.div>

      {/* Events Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, i) => (
          <Card key={i} className="hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary">{event.type}</Badge>
                {event.free ? <Badge variant="success">Free</Badge> : <Badge variant="outline">{event.price}</Badge>}
              </div>
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{event.date}</p>
                <p className="flex items-center gap-2"><Clock className="h-4 w-4" />{event.time}</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.location}</p>
              </div>
              <Button variant="outline" className="w-full mt-4">
                {event.free ? 'Learn More' : 'Get Tickets'}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
