'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, FileText, Calendar, Plus, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const students = [
  { name: 'Alex Martinez', grade: '10th', iepDue: 'Mar 15', services: ['Speech', 'OT'], progress: 75 },
  { name: 'Sarah Johnson', grade: '8th', iepDue: 'Apr 1', services: ['PT', 'Counseling'], progress: 82 },
  { name: 'Michael Chen', grade: '6th', iepDue: 'Mar 30', services: ['Speech'], progress: 68 },
  { name: 'Emily Davis', grade: '11th', iepDue: 'May 10', services: ['OT', 'Counseling'], progress: 90 },
];

const upcomingMeetings = [
  { student: 'Alex M.', type: 'Annual IEP', date: 'Tomorrow', time: '2:00 PM' },
  { student: 'Sarah J.', type: 'Progress Review', date: 'Mar 5', time: '10:00 AM' },
  { student: 'Michael C.', type: 'Evaluation', date: 'Mar 8', time: '1:00 PM' },
];

const stats = [
  { label: 'Active IEPs', value: '156', trend: '+3' },
  { label: 'Due This Month', value: '12', trend: '0' },
  { label: 'In Compliance', value: '98%', trend: '+1%' },
  { label: 'Staff', value: '24', trend: '0' },
];

export default function SpecialEdPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Heart className="h-8 w-8 text-services-600" /><div><h1 className="text-3xl font-bold">Special Education</h1><p className="text-muted-foreground">Manage IEPs and student services</p></div></div>
        <Button variant="services"><Plus className="h-4 w-4 mr-2" />New IEP</Button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}><CardContent className="p-4"><p className="text-2xl font-bold">{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p><p className="text-xs text-services-600">{stat.trend}</p></CardContent></Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><div className="flex items-center justify-between"><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-services-600" />Students</CardTitle><Button variant="ghost" size="sm">View All<ChevronRight className="h-4 w-4 ml-1" /></Button></div></CardHeader>
              <CardContent className="space-y-4">
                {students.map((student, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div><h4 className="font-semibold">{student.name}</h4><p className="text-sm text-muted-foreground">{student.grade} Grade • IEP Due: {student.iepDue}</p></div>
                      <div className="flex gap-1">{student.services.map((s, j) => <Badge key={j} variant="services" size="sm">{s}</Badge>)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Goal Progress:</span>
                      <Progress value={student.progress} className="flex-1 h-2" indicatorClassName="bg-services-500" />
                      <span className="text-sm font-medium">{student.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="services"><CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Upcoming Meetings</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {upcomingMeetings.map((meeting, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50"><p className="font-semibold text-sm">{meeting.student}</p><p className="text-xs text-muted-foreground">{meeting.type}</p><p className="text-xs text-services-600 mt-1">{meeting.date} • {meeting.time}</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2" />Create IEP</Button>
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Schedule Meeting</Button>
                <Button variant="outline" className="w-full justify-start"><Users className="h-4 w-4 mr-2" />Add Student</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
