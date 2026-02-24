'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Loader2 } from 'lucide-react';
import { useCalendarEvents } from '@/lib/hooks/use-calendar';
import { useToast } from '@/components/ui/toast';

export default function ParentCalendar() {
  const { data: eventsData, isLoading } = useCalendarEvents({
    limit: 100,
    startDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    endDate: new Date(Date.now() + 30 * 86400000).toISOString(),
  });
  const toast = useToast();

  const calendarEvents = React.useMemo(() => {
    if (!eventsData?.data) return [];
    return eventsData.data.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      color: event.type === 'CLASS' ? 'purple' : 'green',
      location: event.location || undefined,
    }));
  }, [eventsData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-parent-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CalendarDays className="h-8 w-8 text-parent-600" />
          Family Calendar
        </h1>
        <p className="text-muted-foreground mt-1">
          View your children's schedules and school events
        </p>
      </motion.div>

      <Calendar
        events={calendarEvents}
        accentColor="parent"
        onEventClick={(event) => toast.info(event.title, event.description || '')}
      />
    </div>
  );
}
