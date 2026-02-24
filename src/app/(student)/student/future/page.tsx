'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Rocket,
  GraduationCap,
  Briefcase,
  Target,
  MapPin,
  Star,
  TrendingUp,
  Calendar,
  FileText,
  ChevronRight,
  ExternalLink,
  Heart,
} from 'lucide-react';

const colleges = [
  { name: 'Stanford University', location: 'Stanford, CA', match: 85, deadline: 'Jan 2', saved: true },
  { name: 'MIT', location: 'Cambridge, MA', match: 78, deadline: 'Jan 1', saved: true },
  { name: 'UC Berkeley', location: 'Berkeley, CA', match: 92, deadline: 'Nov 30', saved: true },
  { name: 'UCLA', location: 'Los Angeles, CA', match: 88, deadline: 'Nov 30', saved: false },
];

const careerInterests = [
  { field: 'Software Engineering', interest: 95, growth: '+22%' },
  { field: 'Data Science', interest: 85, growth: '+35%' },
  { field: 'Biomedical Research', interest: 70, growth: '+15%' },
];

const upcomingDeadlines = [
  { title: 'SAT Registration', date: 'Mar 15', type: 'test' },
  { title: 'Stanford Essay Due', date: 'Jan 2', type: 'application' },
  { title: 'Scholarship Application', date: 'Feb 1', type: 'financial' },
  { title: 'College Fair', date: 'Mar 20', type: 'event' },
];

const achievements = [
  { title: 'Honor Roll', semester: 'Fall 2025', icon: '🏆' },
  { title: 'Science Fair - 2nd Place', year: '2025', icon: '🔬' },
  { title: 'Math Club President', year: '2025-2026', icon: '📐' },
  { title: 'Varsity Soccer', year: '2025-2026', icon: '⚽' },
];

export default function StudentFuturePage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <Rocket className="h-8 w-8 text-student-600" />
          <div>
            <h1 className="text-3xl font-bold">My Future</h1>
            <p className="text-muted-foreground">
              Plan your path to college and career success
            </p>
          </div>
        </div>
        <Button variant="student">
          <GraduationCap className="h-4 w-4 mr-2" />
          Explore Colleges
        </Button>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="student">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">College Readiness</h3>
                <p className="text-sm text-muted-foreground">You're on track for your goals!</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">3.8</p>
                  <p className="text-xs text-muted-foreground">GPA</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">1420</p>
                  <p className="text-xs text-muted-foreground">SAT Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground">AP Courses</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Readiness</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-3" indicatorClassName="bg-student-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Saved Colleges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-student-600" />
                    Saved Colleges
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {colleges.map((college, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{college.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {college.location}
                          </p>
                        </div>
                        <Button variant="ghost" size="iconSm">
                          <Heart className={`h-4 w-4 ${college.saved ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Match: </span>
                            <span className="font-medium text-green-600">{college.match}%</span>
                          </p>
                        </div>
                        <Badge variant="secondary" size="sm">
                          Deadline: {college.deadline}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Career Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-student-600" />
                  Career Interests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {careerInterests.map((career, i) => (
                  <div key={i} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{career.field}</p>
                      <Badge variant="success" size="sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {career.growth} job growth
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={career.interest} className="flex-1 h-2" indicatorClassName="bg-student-500" />
                      <span className="text-sm font-medium">{career.interest}%</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Take Career Assessment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Key Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((deadline, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                  >
                    <div className="h-8 w-8 rounded-lg bg-student-100 dark:bg-student-900/30 flex items-center justify-center">
                      {deadline.type === 'test' && <FileText className="h-4 w-4 text-student-600" />}
                      {deadline.type === 'application' && <GraduationCap className="h-4 w-4 text-student-600" />}
                      {deadline.type === 'financial' && <Star className="h-4 w-4 text-student-600" />}
                      {deadline.type === 'event' && <Calendar className="h-4 w-4 text-student-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">{deadline.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="student">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  My Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg bg-background/50"
                  >
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-lg">
                      {achievement.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.semester || achievement.year}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  Add Achievement
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
