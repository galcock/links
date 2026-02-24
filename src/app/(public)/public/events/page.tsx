'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react';
import { useCalendarEvents } from '@/lib/hooks/use-calendar';

export default function PublicEvents() {
  const { data: eventsData, isLoading } = useCalendarEvents({ 
    limit: 50,
    type: 'EVENT',
  });
  const events = eventsData?.data || [];

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calendar className="h-8 w-8" />
          Upcoming Events
        </h1>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No upcoming events</p>
            </CardContent>
          </Card>
        ) : (
          events.map((event) => (
            <Card key={event.id} hover="lift">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  {new Date(event.startTime).toLocaleString()}
                </div>
                {event.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                )}
                <Badge>{event.type}</Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
