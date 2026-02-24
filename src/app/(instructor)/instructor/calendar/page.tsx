'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Plus, Clock, MapPin, Loader2 } from 'lucide-react';
import { useCalendarEvents, useCreateEvent } from '@/lib/hooks/use-calendar';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useToast } from '@/components/ui/toast';

export default function InstructorCalendar() {
  const { data: user } = useCurrentUser();
  const { data: eventsData, isLoading } = useCalendarEvents({
    limit: 100,
    startDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    endDate: new Date(Date.now() + 30 * 86400000).toISOString(),
  });
  const createEventMutation = useCreateEvent();
  const toast = useToast();

  const calendarEvents = React.useMemo(() => {
    if (!eventsData?.data) return [];
    return eventsData.data.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      color: event.type === 'CLASS' ? 'purple' : 
             event.type === 'MEETING' ? 'blue' : 
             event.type === 'EVENT' ? 'green' : 'amber',
      location: event.location || undefined,
      description: event.description || undefined,
    }));
  }, [eventsData]);

  const todayEvents = React.useMemo(() => {
    if (!eventsData?.data) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return eventsData.data
      .filter(event => {
        const start = new Date(event.startTime);
        return start >= today && start < tomorrow;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [eventsData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-instructor-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <CalendarDays className="h-8 w-8 text-instructor-600" />
              Calendar
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your schedule and upcoming events
            </p>
          </div>
          <Button variant="instructor">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Calendar
            events={calendarEvents}
            accentColor="instructor"
            onEventClick={(event) => {
              toast.info(event.title, event.description || 'No description');
            }}
          />
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No events scheduled for today
                  </p>
                ) : (
                  todayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="text-sm font-medium min-w-[70px]">
                        {new Date(event.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        {event.location && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                        )}
                      </div>
                      <Badge variant="secondary" size="sm">
                        {event.type}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="instructor">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{todayEvents.length}</p>
                  <p className="text-sm text-muted-foreground">Events Today</p>
                </div>
                <div className="border-t my-3" />
                <div className="text-center">
                  <p className="text-2xl font-bold">{eventsData?.meta.total || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
