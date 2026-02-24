'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Award, BookOpen, Video, Calendar, Clock, Star, Target, Trophy, ChevronRight, Play, CheckCircle2 } from 'lucide-react';

const courses = [
  { title: 'Advanced Assessment Strategies', provider: 'EdX', progress: 75, hours: 20, deadline: 'Mar 15', status: 'in-progress' },
  { title: 'Differentiated Instruction', provider: 'Coursera', progress: 100, hours: 15, completed: 'Feb 10', status: 'completed' },
  { title: 'Technology in the Classroom', provider: 'LinkedIn Learning', progress: 30, hours: 12, deadline: 'Apr 1', status: 'in-progress' },
];

const certifications = [
  { name: 'Google Certified Educator Level 2', issuer: 'Google', date: 'Dec 2024', expires: 'Dec 2027' },
  { name: 'AP Calculus Certified', issuer: 'College Board', date: 'Aug 2023', expires: 'Aug 2026' },
  { name: 'STEM Teaching Excellence', issuer: 'NSTA', date: 'Jun 2024', expires: 'Jun 2027' },
];

const upcomingPD = [
  { title: 'Math Department Workshop', date: 'Feb 28', time: '3:00 PM', location: 'Library', type: 'workshop' },
  { title: 'EdTech Conference 2026', date: 'Mar 15-17', location: 'Convention Center', type: 'conference' },
  { title: 'Curriculum Planning Meeting', date: 'Mar 5', time: '2:00 PM', location: 'Room 101', type: 'meeting' },
];

const goals = [
  { title: 'Complete 40 PD hours', progress: 65, target: 40, current: 26 },
  { title: 'Earn 2 new certifications', progress: 50, target: 2, current: 1 },
  { title: 'Attend 3 conferences', progress: 33, target: 3, current: 1 },
];

export default function InstructorDevelopmentPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-instructor-600" />
          <div>
            <h1 className="text-3xl font-bold">Professional Development</h1>
            <p className="text-muted-foreground">Track your growth and learning journey</p>
          </div>
        </div>
        <Button variant="instructor"><BookOpen className="h-4 w-4 mr-2" />Browse Courses</Button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="instructor"><CardContent className="p-4 text-center"><Clock className="h-8 w-8 mx-auto mb-2" /><p className="text-2xl font-bold">26</p><p className="text-sm text-muted-foreground">PD Hours</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Award className="h-8 w-8 text-amber-500 mx-auto mb-2" /><p className="text-2xl font-bold">3</p><p className="text-sm text-muted-foreground">Certifications</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" /><p className="text-2xl font-bold">5</p><p className="text-sm text-muted-foreground">Courses</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Trophy className="h-8 w-8 text-purple-500 mx-auto mb-2" /><p className="text-2xl font-bold">2</p><p className="text-sm text-muted-foreground">Achievements</p></CardContent></Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Video className="h-5 w-5 text-instructor-600" />My Courses</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.provider} • {course.hours} hours</p>
                      </div>
                      <Badge variant={course.status === 'completed' ? 'success' : 'instructor'}>{course.status === 'completed' ? 'Completed' : 'In Progress'}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Progress value={course.progress} className="flex-1 h-2" indicatorClassName="bg-instructor-500" />
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{course.deadline ? `Due: ${course.deadline}` : `Completed: ${course.completed}`}</span>
                      {course.status !== 'completed' && <Button variant="instructor" size="sm"><Play className="h-3 w-3 mr-1" />Continue</Button>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-instructor-600" />Certifications</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"><Award className="h-6 w-6 text-amber-600" /></div>
                    <div className="flex-1">
                      <p className="font-semibold">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.issuer} • Earned {cert.date}</p>
                    </div>
                    <Badge variant="secondary">Expires {cert.expires}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card variant="instructor">
              <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" />Annual Goals</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {goals.map((goal, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{goal.title}</p>
                      <span className="text-sm">{goal.current}/{goal.target}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" indicatorClassName="bg-instructor-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Upcoming PD</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {upcomingPD.map((event, i) => (
                  <div key={i} className="p-3 rounded-lg border hover:bg-muted/50">
                    <p className="font-semibold text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}{event.time && ` • ${event.time}`}</p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
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
