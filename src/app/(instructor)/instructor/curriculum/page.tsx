'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Plus, FileText, Clock, CheckCircle2, ChevronRight, Edit, Copy, Trash2, Star, Target } from 'lucide-react';

const units = [
  { name: 'Linear Equations', status: 'completed', lessons: 8, progress: 100, weeks: '1-2' },
  { name: 'Systems of Equations', status: 'completed', lessons: 10, progress: 100, weeks: '3-4' },
  { name: 'Quadratic Functions', status: 'current', lessons: 12, progress: 65, weeks: '5-7' },
  { name: 'Polynomial Functions', status: 'upcoming', lessons: 10, progress: 0, weeks: '8-9' },
  { name: 'Exponential Functions', status: 'upcoming', lessons: 8, progress: 0, weeks: '10-11' },
];

const lessonPlans = [
  { title: 'Intro to Quadratics', duration: '55 min', materials: 3, date: 'Mon, Feb 24' },
  { title: 'Factoring Quadratics', duration: '55 min', materials: 4, date: 'Tue, Feb 25' },
  { title: 'Quadratic Formula', duration: '55 min', materials: 5, date: 'Wed, Feb 26' },
  { title: 'Graphing Parabolas', duration: '55 min', materials: 4, date: 'Thu, Feb 27' },
];

const standards = [
  { code: 'A-SSE.3', description: 'Factor quadratic expressions', progress: 80 },
  { code: 'A-REI.4', description: 'Solve quadratic equations', progress: 65 },
  { code: 'F-IF.7', description: 'Graph functions and show features', progress: 45 },
];

export default function InstructorCurriculumPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-instructor-600" />
          <div>
            <h1 className="text-3xl font-bold">Curriculum</h1>
            <p className="text-muted-foreground">Manage your course content and lesson plans</p>
          </div>
        </div>
        <Button variant="instructor"><Plus className="h-4 w-4 mr-2" />New Lesson Plan</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Algebra II - Course Units</CardTitle>
                    <CardDescription>Fall 2025 Semester</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">Edit Course<ChevronRight className="h-4 w-4 ml-1" /></Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {units.map((unit, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          unit.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' :
                          unit.status === 'current' ? 'bg-instructor-100 dark:bg-instructor-900/30' :
                          'bg-muted'
                        }`}>
                          {unit.status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-green-600" /> :
                           unit.status === 'current' ? <BookOpen className="h-5 w-5 text-instructor-600" /> :
                           <Clock className="h-5 w-5 text-muted-foreground" />}
                        </div>
                        <div>
                          <h4 className="font-semibold">{unit.name}</h4>
                          <p className="text-sm text-muted-foreground">{unit.lessons} lessons • Weeks {unit.weeks}</p>
                        </div>
                      </div>
                      <Badge variant={unit.status === 'completed' ? 'success' : unit.status === 'current' ? 'instructor' : 'secondary'}>
                        {unit.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={unit.progress} className="flex-1 h-2" indicatorClassName="bg-instructor-500" />
                      <span className="text-sm font-medium">{unit.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-instructor-600" />Upcoming Lesson Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lessonPlans.map((lesson, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="flex-1">
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-sm text-muted-foreground">{lesson.date} • {lesson.duration} • {lesson.materials} materials</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="iconSm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="iconSm"><Copy className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="instructor">
              <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" />Standards Coverage</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {standards.map((standard, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{standard.code}</p>
                      <span className="text-sm">{standard.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{standard.description}</p>
                    <Progress value={standard.progress} className="h-1.5" indicatorClassName="bg-instructor-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Plus className="h-4 w-4 mr-2" />Add New Unit</Button>
                <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2" />Import Curriculum</Button>
                <Button variant="outline" className="w-full justify-start"><Star className="h-4 w-4 mr-2" />Browse Templates</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
