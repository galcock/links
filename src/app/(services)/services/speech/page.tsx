'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mic, Users, Calendar, Clock, Plus, ChevronRight, FileText, TrendingUp, Volume2 } from 'lucide-react';

const students = [
  { name: 'Emma Wilson', grade: '3rd', focus: 'Articulation', frequency: '2x/week', progress: 78 },
  { name: 'Liam Davis', grade: '5th', focus: 'Fluency', frequency: '2x/week', progress: 65 },
  { name: 'Sophia Martinez', grade: '2nd', focus: 'Language', frequency: '3x/week', progress: 82 },
  { name: 'Noah Johnson', grade: '4th', focus: 'Voice', frequency: '1x/week', progress: 90 },
];

const todaySessions = [
  { time: '9:00 AM', student: 'Emma W.', type: 'Individual', goal: 'R sounds' },
  { time: '10:00 AM', student: 'Group (4)', type: 'Group', goal: 'Social communication' },
  { time: '11:30 AM', student: 'Liam D.', type: 'Individual', goal: 'Fluency techniques' },
  { time: '2:00 PM', student: 'Sophia M.', type: 'Individual', goal: 'Vocabulary expansion' },
];

export default function SpeechPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Mic className="h-8 w-8 text-services-600" /><div><h1 className="text-3xl font-bold">Speech Therapy</h1><p className="text-muted-foreground">Manage speech-language services</p></div></div>
        <Button variant="services"><Plus className="h-4 w-4 mr-2" />New Student</Button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><Volume2 className="h-8 w-8 text-services-600 mx-auto mb-2" /><p className="text-2xl font-bold">45</p><p className="text-sm text-muted-foreground">Active Caseload</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" /><p className="text-2xl font-bold">12</p><p className="text-sm text-muted-foreground">Today's Sessions</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" /><p className="text-2xl font-bold">76%</p><p className="text-sm text-muted-foreground">Avg Progress</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Users className="h-8 w-8 text-purple-500 mx-auto mb-2" /><p className="text-2xl font-bold">8</p><p className="text-sm text-muted-foreground">Group Sessions</p></CardContent></Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-services-600" />Student Caseload</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {students.map((student, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div><h4 className="font-semibold">{student.name}</h4><p className="text-sm text-muted-foreground">{student.grade} Grade • {student.focus}</p></div>
                      <Badge variant="services">{student.frequency}</Badge>
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
            <Card variant="services"><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Today's Schedule</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {todaySessions.map((session, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50">
                    <div className="flex items-center justify-between mb-1"><p className="font-semibold text-sm">{session.student}</p><span className="text-xs text-muted-foreground">{session.time}</span></div>
                    <p className="text-xs text-muted-foreground">{session.type} • {session.goal}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Schedule Session</Button>
                <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2" />SOAP Notes</Button>
                <Button variant="outline" className="w-full justify-start"><TrendingUp className="h-4 w-4 mr-2" />Progress Report</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
