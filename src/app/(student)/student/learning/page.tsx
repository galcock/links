'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Play,
  Clock,
  Star,
  Trophy,
  Target,
  Zap,
  ChevronRight,
  Video,
  FileText,
  Headphones,
  CheckCircle2,
} from 'lucide-react';

const courses = [
  {
    id: 1,
    name: 'Algebra II',
    teacher: 'Mrs. Johnson',
    progress: 72,
    currentUnit: 'Quadratic Equations',
    nextLesson: 'Solving by Factoring',
    color: 'purple',
    lessons: 24,
    completed: 17,
  },
  {
    id: 2,
    name: 'Biology',
    teacher: 'Mr. Smith',
    progress: 85,
    currentUnit: 'Cell Biology',
    nextLesson: 'Mitosis and Meiosis',
    color: 'green',
    lessons: 30,
    completed: 25,
  },
  {
    id: 3,
    name: 'World History',
    teacher: 'Ms. Davis',
    progress: 68,
    currentUnit: 'World War II',
    nextLesson: 'The Pacific Theater',
    color: 'amber',
    lessons: 28,
    completed: 19,
  },
  {
    id: 4,
    name: 'English Literature',
    teacher: 'Mr. Brown',
    progress: 90,
    currentUnit: 'Shakespeare',
    nextLesson: 'Hamlet Act III Analysis',
    color: 'blue',
    lessons: 20,
    completed: 18,
  },
];

const recentLessons = [
  { title: 'The Quadratic Formula', course: 'Algebra II', duration: '25 min', type: 'video', completed: true },
  { title: 'Cell Membrane Structure', course: 'Biology', duration: '30 min', type: 'video', completed: true },
  { title: 'D-Day: Operation Overlord', course: 'History', duration: '45 min', type: 'reading', completed: false },
  { title: 'Romeo & Juliet: Act II', course: 'English', duration: '20 min', type: 'audio', completed: true },
];

const learningPaths = [
  { name: 'SAT Math Prep', progress: 45, modules: 12, enrolled: true },
  { name: 'AP Biology', progress: 30, modules: 18, enrolled: true },
  { name: 'College Essay Writing', progress: 0, modules: 8, enrolled: false },
];

export default function StudentLearningPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-student-600" />
          <div>
            <h1 className="text-3xl font-bold">Learning</h1>
            <p className="text-muted-foreground">
              Continue your learning journey across all courses
            </p>
          </div>
        </div>
        <Button variant="student">
          <Play className="h-4 w-4 mr-2" />
          Continue Learning
        </Button>
      </motion.div>

      {/* Learning Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card variant="student" hover="lift">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">12.5h</p>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">79</p>
            <p className="text-sm text-muted-foreground">Lessons Done</p>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">15</p>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Courses */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Courses</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.teacher}</p>
                      </div>
                      <Badge variant="student">{course.progress}%</Badge>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Current: </span>
                        {course.currentUnit}
                      </p>
                      <p className="text-sm text-student-600">
                        Next: {course.nextLesson}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        {course.completed}/{course.lessons} lessons
                      </span>
                      <Button variant="student" size="sm">
                        <Play className="h-3 w-3 mr-1" />
                        Continue
                      </Button>
                    </div>
                    <Progress value={course.progress} className="h-2" indicatorClassName="bg-student-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentLessons.map((lesson, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      lesson.completed ? 'bg-green-100 text-green-600' : 'bg-student-100 text-student-600'
                    }`}>
                      {lesson.type === 'video' && <Video className="h-4 w-4" />}
                      {lesson.type === 'reading' && <FileText className="h-4 w-4" />}
                      {lesson.type === 'audio' && <Headphones className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">{lesson.course} • {lesson.duration}</p>
                    </div>
                    {lesson.completed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Paths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {learningPaths.map((path, i) => (
                  <div key={i} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{path.name}</p>
                      {path.enrolled ? (
                        <Badge variant="student" size="sm">Enrolled</Badge>
                      ) : (
                        <Button variant="outline" size="sm">Enroll</Button>
                      )}
                    </div>
                    {path.enrolled && (
                      <>
                        <Progress value={path.progress} className="h-1.5 mb-1" indicatorClassName="bg-student-500" />
                        <p className="text-xs text-muted-foreground">{path.progress}% • {path.modules} modules</p>
                      </>
                    )}
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
