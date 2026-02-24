'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/features/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, BookOpen, Clock, MapPin, Users, Video, Loader2 } from 'lucide-react';
import { useCalendarEvents, useCreateEvent } from '@/lib/hooks/use-calendar';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useToast } from '@/components/ui/toast';

export default function StudentCalendar() {
  const { data: user } = useCurrentUser();
  const { data: eventsData, isLoading } = useCalendarEvents({ 
    limit: 100,
    startDate: new Date(Date.now() - 7 * 86400000).toISOString(), // Last week
    endDate: new Date(Date.now() + 30 * 86400000).toISOString(), // Next month
  });
  const createEventMutation = useCreateEvent();
  const toast = useToast();

  // Transform API events to calendar format
  const calendarEvents = React.useMemo(() => {
    if (!eventsData?.data) return [];
    
    return eventsData.data.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      color: event.type === 'CLASS' ? 'purple' : 
             event.type === 'ASSIGNMENT' ? 'amber' : 
             event.type === 'EVENT' ? 'blue' : 'green',
      location: event.location || undefined,
      description: event.description || undefined,
    }));
  }, [eventsData]);

  // Get upcoming events (next 7 days)
  const upcomingEvents = React.useMemo(() => {
    if (!eventsData?.data) return [];
    
    const now = Date.now();
    const weekFromNow = now + 7 * 86400000;
    
    return eventsData.data
      .filter(event => {
        const start = new Date(event.startTime).getTime();
        return start >= now && start <= weekFromNow;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 4);
  }, [eventsData]);

  // Get today's schedule
  const todaySchedule = React.useMemo(() => {
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

  const handleCreateEvent = async (eventData: any) => {
    try {
      await createEventMutation.mutateAsync({
        title: eventData.title,
        description: eventData.description,
        startTime: eventData.start.toISOString(),
        endTime: eventData.end.toISOString(),
        location: eventData.location,
        type: 'EVENT',
        isAllDay: false,
      });
      toast.success('Event Created', 'Your event has been added to the calendar');
    } catch (error) {
      toast.error('Failed to create event', 'Please try again');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-student-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <CalendarDays className="h-8 w-8 text-student-600" />
              My Calendar
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay organized with your schedule and upcoming events
            </p>
          </div>
          <Button variant="student">
            Add Event
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Calendar
            events={calendarEvents}
            accentColor="student"
            onEventClick={(event) => {
              toast.info(event.title, event.description || 'No description');
            }}
          />
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
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
                {todaySchedule.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No events scheduled for today
                  </p>
                ) : (
                  todaySchedule.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="text-sm font-medium min-w-[70px]">
                        {new Date(item.startTime).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        {item.location && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </p>
                        )}
                      </div>
                      <Badge
                        variant={
                          item.type === 'CLASS' ? 'default' : 
                          item.type === 'ASSIGNMENT' ? 'destructive' : 
                          'secondary'
                        }
                        size="sm"
                      >
                        {item.type}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming events this week
                  </p>
                ) : (
                  upcomingEvents.map((event) => {
                    const start = new Date(event.startTime);
                    const isToday = start.toDateString() === new Date().toDateString();
                    const isTomorrow = start.toDateString() === new Date(Date.now() + 86400000).toDateString();
                    
                    return (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg border hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <Badge
                            variant={event.type === 'ASSIGNMENT' ? 'destructive' : 'secondary'}
                            size="sm"
                          >
                            {event.type}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : start.toLocaleDateString([], {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })} at {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {event.location && (
                            <p className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="student">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{todaySchedule.length}</p>
                  <p className="text-sm text-muted-foreground">Events Today</p>
                </div>
                <div className="border-t my-3" />
                <div className="text-center">
                  <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
