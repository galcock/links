'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Compass, Users, Calendar, GraduationCap, Briefcase, FileText, Plus, ChevronRight, Target, TrendingUp } from 'lucide-react';

const students = [
  { name: 'Alex Martinez', grade: '11th', focus: 'College Planning', nextMeeting: 'Tomorrow', status: 'on-track' },
  { name: 'Sarah Johnson', grade: '12th', focus: 'Applications', nextMeeting: 'Today', status: 'priority' },
  { name: 'Michael Chen', grade: '10th', focus: 'Course Selection', nextMeeting: 'Friday', status: 'on-track' },
  { name: 'Emily Davis', grade: '9th', focus: 'Academic Goals', nextMeeting: 'Next week', status: 'on-track' },
];

const upcomingEvents = [
  { title: 'College Fair', date: 'Mar 15', attendees: 200 },
  { title: 'FAFSA Workshop', date: 'Mar 20', attendees: 45 },
  { title: 'Career Day', date: 'Apr 5', attendees: 350 },
];

const stats = [
  { label: 'Active Students', value: '450', icon: Users },
  { label: 'College Apps', value: '125', icon: GraduationCap },
  { label: 'Scholarships', value: '$2.1M', icon: Target },
  { label: 'Career Counseling', value: '89', icon: Briefcase },
];

export default function GuidancePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Compass className="h-8 w-8 text-services-600" /><div><h1 className="text-3xl font-bold">Guidance Counseling</h1><p className="text-muted-foreground">Academic and career guidance services</p></div></div>
        <Button variant="services"><Plus className="h-4 w-4 mr-2" />New Appointment</Button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{stat.label}</p><p className="text-2xl font-bold">{stat.value}</p></div><stat.icon className="h-8 w-8 text-services-600" /></div></CardContent></Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><div className="flex items-center justify-between"><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-services-600" />Student Caseload</CardTitle><Button variant="ghost" size="sm">View All<ChevronRight className="h-4 w-4 ml-1" /></Button></div></CardHeader>
              <CardContent className="space-y-4">
                {students.map((student, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div><h4 className="font-semibold">{student.name}</h4><p className="text-sm text-muted-foreground">{student.grade} Grade • {student.focus}</p><p className="text-xs text-services-600 mt-1">Next: {student.nextMeeting}</p></div>
                      <Badge variant={student.status === 'priority' ? 'warning' : 'success'}>{student.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="services"><CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Upcoming Events</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50"><p className="font-semibold text-sm">{event.title}</p><p className="text-xs text-muted-foreground">{event.date} • {event.attendees} expected</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><GraduationCap className="h-4 w-4 mr-2" />College Resources</Button>
                <Button variant="outline" className="w-full justify-start"><Briefcase className="h-4 w-4 mr-2" />Career Assessment</Button>
                <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2" />Transcript Request</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
