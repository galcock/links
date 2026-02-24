'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { CalendarDays, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCalendarEvents } from '@/lib/hooks/use-calendar';
import { useToast } from '@/components/ui/toast';

export default function AdminCalendar() {
  const { data: eventsData, isLoading } = useCalendarEvents({ limit: 100 });
  const toast = useToast();

  const calendarEvents = React.useMemo(() => {
    if (!eventsData?.data) return [];
    return eventsData.data.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      color: 'blue',
    }));
  }, [eventsData]);

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CalendarDays className="h-8 w-8" />
            Calendar
          </h1>
          <Button><Plus className="h-4 w-4 mr-2" />Create Event</Button>
        </div>
      </motion.div>
      <Calendar events={calendarEvents} onEventClick={(e) => toast.info(e.title)} />
    </div>
  );
}
