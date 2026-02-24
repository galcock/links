'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Users, Calendar, Clock, Plus, ChevronRight, FileText, TrendingUp } from 'lucide-react';

const patients = [
  { name: 'Alex Martinez', grade: '10th', condition: 'Mobility Support', sessions: 2, progress: 70, nextSession: 'Tomorrow' },
  { name: 'Jordan Kim', grade: '6th', condition: 'Motor Skills', sessions: 3, progress: 85, nextSession: 'Today' },
  { name: 'Taylor Brown', grade: '9th', condition: 'Post-Surgery Rehab', sessions: 2, progress: 45, nextSession: 'Friday' },
];

const todaySessions = [
  { time: '8:30 AM', student: 'Jordan Kim', type: 'Motor Skills', duration: '30 min', status: 'upcoming' },
  { time: '10:00 AM', student: 'New Evaluation', type: 'Assessment', duration: '45 min', status: 'upcoming' },
  { time: '1:30 PM', student: 'Group Session', type: 'Coordination', duration: '45 min', status: 'upcoming' },
];

const stats = [
  { label: 'Active Patients', value: '28' },
  { label: 'Sessions Today', value: '8' },
  { label: 'Avg Progress', value: '72%' },
  { label: 'This Week', value: '35' },
];

export default function PTPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Activity className="h-8 w-8 text-services-600" /><div><h1 className="text-3xl font-bold">Physical Therapy</h1><p className="text-muted-foreground">Manage PT sessions and patient progress</p></div></div>
        <Button variant="services"><Plus className="h-4 w-4 mr-2" />New Patient</Button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p></CardContent></Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-services-600" />Active Patients</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {patients.map((patient, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div><h4 className="font-semibold">{patient.name}</h4><p className="text-sm text-muted-foreground">{patient.grade} • {patient.condition}</p></div>
                      <Badge variant="services">{patient.sessions}x/week</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">Progress:</span>
                      <Progress value={patient.progress} className="flex-1 h-2" indicatorClassName="bg-services-500" />
                      <span className="text-sm font-medium">{patient.progress}%</span>
                    </div>
                    <p className="text-xs text-services-600">Next: {patient.nextSession}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="services"><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Today's Sessions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {todaySessions.map((session, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50">
                    <div className="flex items-center justify-between mb-1"><p className="font-semibold text-sm">{session.student}</p><span className="text-xs text-muted-foreground">{session.time}</span></div>
                    <p className="text-xs text-muted-foreground">{session.type} • {session.duration}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Schedule Session</Button>
                <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2" />Session Notes</Button>
                <Button variant="outline" className="w-full justify-start"><TrendingUp className="h-4 w-4 mr-2" />Progress Report</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
