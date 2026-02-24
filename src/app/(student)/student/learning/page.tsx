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
  Loader2,
} from 'lucide-react';
import { useCourses } from '@/lib/hooks/use-courses';
import { useAssignments } from '@/lib/hooks/use-assignments';
import { useWorkspaces } from '@/lib/hooks/use-workspaces';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useGrades } from '@/lib/hooks/use-grades';

export default function StudentLearningSpaces() {
  const { data: user } = useCurrentUser();
  const { data: coursesData, isLoading: coursesLoading } = useCourses({ 
    status: 'ACTIVE',
    limit: 50,
  });
  const { data: assignmentsData } = useAssignments({ 
    status: 'ACTIVE',
    limit: 100,
  });
  const { data: workspacesData } = useWorkspaces({ limit: 20 });
  const { data: gradesData } = useGrades({ 
    studentId: user?.id,
    limit: 100,
  });

  // Calculate course progress and grades
  const coursesWithProgress = React.useMemo(() => {
    if (!coursesData?.data) return [];
    
    return coursesData.data.map((course) => {
      // Calculate completion from assignments
      const courseAssignments = assignmentsData?.data?.filter(
        a => a.courseId === course.id
      ) || [];
      const totalLessons = courseAssignments.length || 24;
      const completed = courseAssignments.filter(a => a.status === 'GRADED').length;
      const progress = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
      
      // Get grade for this course
      const courseGrades = gradesData?.data?.filter(g => g.assignment?.courseId === course.id) || [];
      const averageGrade = courseGrades.length > 0
        ? courseGrades.reduce((sum, g) => sum + (g.percentage || 0), 0) / courseGrades.length
        : 0;
      
      const gradeLabel = averageGrade >= 93 ? 'A' :
                        averageGrade >= 90 ? 'A-' :
                        averageGrade >= 87 ? 'B+' :
                        averageGrade >= 83 ? 'B' :
                        averageGrade >= 80 ? 'B-' :
                        averageGrade >= 77 ? 'C+' :
                        averageGrade >= 73 ? 'C' : 'C-';
      
      return {
        ...course,
        progress,
        completed,
        totalLessons,
        gradeLabel,
        gradePercent: Math.round(averageGrade),
      };
    });
  }, [coursesData, assignmentsData, gradesData]);

  // Group courses by progress level
  const inProgressCourses = coursesWithProgress.filter(c => c.progress > 0 && c.progress < 100);
  const notStartedCourses = coursesWithProgress.filter(c => c.progress === 0);

  // Recent learning activities
  const recentActivities = React.useMemo(() => {
    if (!assignmentsData?.data) return [];
    
    return assignmentsData.data
      .filter(a => a.status === 'GRADED')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  }, [assignmentsData]);

  if (coursesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-student-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-student-600" />
              Learning Spaces
            </h1>
            <p className="text-muted-foreground mt-1">
              Your personalized learning environment
            </p>
          </div>
          <Button variant="student">
            <Play className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card variant="student" hover="lift">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-student-600" />
            <p className="text-2xl font-bold">{coursesWithProgress.length}</p>
            <p className="text-sm text-muted-foreground">Active Courses</p>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">
              {coursesWithProgress.reduce((sum, c) => sum + c.completed, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Lessons Completed</p>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-amber-500" />
            <p className="text-2xl font-bold">{recentActivities.length}</p>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">
              {coursesWithProgress.length > 0
                ? Math.round(
                    coursesWithProgress.reduce((sum, c) => sum + c.gradePercent, 0) /
                      coursesWithProgress.length
                  )
                : 0}%
            </p>
            <p className="text-sm text-muted-foreground">Avg. Grade</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Continue Learning */}
      {inProgressCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Continue Learning</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {inProgressCourses.slice(0, 4).map((course) => {
                  const colorMap: Record<string, string> = {
                    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
                    green: 'bg-green-100 dark:bg-green-900/30 text-green-600',
                    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
                    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
                  };
                  const randomColor = ['purple', 'green', 'blue', 'amber'][
                    Math.floor(Math.random() * 4)
                  ];
                  
                  return (
                    <div
                      key={course.id}
                      className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold group-hover:text-student-600 transition-colors">
                            {course.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {course.instructor?.user
                              ? `${course.instructor.user.firstName} ${course.instructor.user.lastName}`
                              : 'Instructor'}
                          </p>
                        </div>
                        <Badge variant="student" className="text-base font-bold">
                          {course.gradeLabel}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress
                          value={course.progress}
                          className="h-2"
                          indicatorClassName="bg-student-500"
                        />
                        <p className="text-xs text-muted-foreground">
                          {course.completed} of {course.totalLessons} lessons completed
                        </p>
                      </div>
                      <Button variant="student" size="sm" className="w-full mt-3">
                        <Play className="h-3 w-3 mr-2" />
                        Continue
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* All Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>All My Courses</CardTitle>
            <CardDescription>
              Explore all your enrolled courses and learning materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            {coursesWithProgress.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No courses enrolled yet</p>
                <Button variant="student" className="mt-4">
                  Browse Courses
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {coursesWithProgress.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl border hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 group-hover:text-student-600 transition-colors">
                          {course.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {course.code || 'Course Code'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Grade</span>
                        <Badge variant="student">{course.gradeLabel}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <Progress
                        value={course.progress}
                        className="h-1.5"
                        indicatorClassName="bg-student-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      {recentActivities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.course?.name || 'Course'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
