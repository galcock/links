'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeartHandshake, Users, Calendar, Clock, Plus, Shield, AlertTriangle, FileText } from 'lucide-react';

const students = [
  { name: 'Student A', grade: '9th', type: 'Individual', frequency: 'Weekly', status: 'active', priority: 'normal' },
  { name: 'Student B', grade: '11th', type: 'Individual', frequency: 'Bi-weekly', status: 'active', priority: 'high' },
  { name: 'Student C', grade: '10th', type: 'Group', frequency: 'Weekly', status: 'active', priority: 'normal' },
  { name: 'Student D', grade: '8th', type: 'Individual', frequency: 'Weekly', status: 'active', priority: 'normal' },
];

const todaySessions = [
  { time: '9:00 AM', type: 'Individual', duration: '45 min' },
  { time: '10:30 AM', type: 'Group (6)', duration: '50 min' },
  { time: '1:00 PM', type: 'Crisis Follow-up', duration: '30 min' },
  { time: '2:30 PM', type: 'Individual', duration: '45 min' },
];

const resources = [
  { title: 'Crisis Hotline', number: '1-800-273-8255' },
  { title: 'Text Support', number: 'Text HOME to 741741' },
  { title: 'School Resource', number: 'Ext. 5555' },
];

export default function CounselingPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><HeartHandshake className="h-8 w-8 text-services-600" /><div><h1 className="text-3xl font-bold">Counseling Services</h1><p className="text-muted-foreground">Support student mental health and wellbeing</p></div></div>
        <Button variant="services"><Plus className="h-4 w-4 mr-2" />New Referral</Button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><Users className="h-8 w-8 text-services-600 mx-auto mb-2" /><p className="text-2xl font-bold">64</p><p className="text-sm text-muted-foreground">Active Caseload</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" /><p className="text-2xl font-bold">8</p><p className="text-sm text-muted-foreground">Today's Sessions</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Shield className="h-8 w-8 text-green-500 mx-auto mb-2" /><p className="text-2xl font-bold">12</p><p className="text-sm text-muted-foreground">Group Programs</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" /><p className="text-2xl font-bold">2</p><p className="text-sm text-muted-foreground">Priority Cases</p></CardContent></Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-services-600" />Active Cases</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {students.map((student, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div><h4 className="font-semibold">{student.name}</h4><p className="text-sm text-muted-foreground">{student.grade} Grade • {student.type} • {student.frequency}</p></div>
                      <div className="flex gap-2">
                        {student.priority === 'high' && <Badge variant="destructive">Priority</Badge>}
                        <Badge variant="success">{student.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="services"><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Today</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {todaySessions.map((session, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50">
                    <div className="flex items-center justify-between"><p className="font-semibold text-sm">{session.type}</p><span className="text-xs text-muted-foreground">{session.time}</span></div>
                    <p className="text-xs text-muted-foreground">{session.duration}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Crisis Resources</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource, i) => (
                  <div key={i} className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200">
                    <p className="font-medium text-sm">{resource.title}</p>
                    <p className="text-sm text-red-600 font-mono">{resource.number}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
