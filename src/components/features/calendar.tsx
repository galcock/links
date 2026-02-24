'use client';

import React, { useState, useMemo } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { useCalendarStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
} from 'lucide-react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  allDay?: boolean;
  location?: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  onCreateEvent?: (event: Partial<CalendarEvent>) => void;
  accentColor?: string;
}

export function Calendar({
  events = [],
  onEventClick,
  onDateClick,
  onCreateEvent,
  accentColor = 'primary',
}: CalendarProps) {
  const { currentDate, view, setCurrentDate, setView } = useCalendarStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({ title: '', location: '' });

  // Navigation
  const navigateBack = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(subWeeks(currentDate, 1));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const navigateForward = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(addWeeks(currentDate, 1));
    else setCurrentDate(addDays(currentDate, 1));
  };

  // Generate calendar days for month view
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.start), day));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateClick) onDateClick(date);
    setIsCreateOpen(true);
  };

  const handleCreateEvent = () => {
    if (onCreateEvent && selectedDate && newEvent.title) {
      onCreateEvent({
        title: newEvent.title,
        start: selectedDate,
        end: selectedDate,
        location: newEvent.location,
      });
      setNewEvent({ title: '', location: '' });
      setIsCreateOpen(false);
    }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card variant="glass" className="overflow-hidden">
      {/* Calendar Header */}
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-xl">
              {format(currentDate, view === 'day' ? 'EEEE, MMMM d, yyyy' : 'MMMM yyyy')}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={navigateBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={navigateForward}>
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="ml-4 flex rounded-lg bg-muted p-1">
              {(['day', 'week', 'month'] as const).map((v) => (
                <Button
                  key={v}
                  variant={view === v ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView(v)}
                  className="capitalize"
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Week day headers */}
        <div className="grid grid-cols-7 border-b bg-muted/50">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          <AnimatePresence mode="wait">
            {calendarDays.map((day, i) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isCurrentDay = isToday(day);

              return (
                <motion.div
                  key={day.toISOString()}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                  className={cn(
                    'min-h-[100px] border-b border-r p-2 cursor-pointer transition-colors',
                    'hover:bg-muted/50',
                    !isCurrentMonth && 'bg-muted/30 text-muted-foreground'
                  )}
                  onClick={() => handleDateClick(day)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full text-sm',
                        isCurrentDay && `bg-${accentColor}-500 text-white font-bold`
                      )}
                    >
                      {format(day, 'd')}
                    </span>
                    {dayEvents.length > 0 && (
                      <Badge variant="secondary" size="sm">
                        {dayEvents.length}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick?.(event);
                        }}
                        className={cn(
                          'truncate rounded px-1.5 py-0.5 text-xs font-medium',
                          'hover:opacity-80 transition-opacity cursor-pointer',
                          event.color
                            ? `bg-${event.color}-100 text-${event.color}-700 dark:bg-${event.color}-900/30 dark:text-${event.color}-400`
                            : `bg-${accentColor}-100 text-${accentColor}-700 dark:bg-${accentColor}-900/30 dark:text-${accentColor}-400`
                        )}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-muted-foreground px-1.5">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>

      {/* Create Event Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              {selectedDate && formatDate(selectedDate)}
            </div>
            <div>
              <Input
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                leftIcon={<Clock className="h-4 w-4" />}
              />
            </div>
            <div>
              <Input
                placeholder="Location (optional)"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                leftIcon={<MapPin className="h-4 w-4" />}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent} disabled={!newEvent.title}>
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// Mini Calendar for sidebars/widgets
export function MiniCalendar({ accentColor = 'primary' }: { accentColor?: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="iconSm"
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="iconSm"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="p-1 text-muted-foreground font-medium">
              {d}
            </div>
          ))}
          {calendarDays.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                'p-1 rounded hover:bg-muted cursor-pointer transition-colors',
                !isSameMonth(day, currentDate) && 'text-muted-foreground/50',
                isToday(day) && `bg-${accentColor}-500 text-white hover:bg-${accentColor}-600`
              )}
            >
              {format(day, 'd')}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
