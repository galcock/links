'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { CalendarDays, Loader2 } from 'lucide-react';
import { useCalendarEvents } from '@/lib/hooks/use-calendar';
import { useToast } from '@/components/ui/toast';

export default function CommunityCalendar() {
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
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CalendarDays className="h-8 w-8" />
          Community Calendar
        </h1>
      </motion.div>
      <Calendar events={calendarEvents} accentColor="community" onEventClick={(e) => toast.info(e.title)} />
    </div>
  );
}
