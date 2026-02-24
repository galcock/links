'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, BookOpen, GraduationCap, Loader2 } from 'lucide-react';
import { useUsers } from '@/lib/hooks/use-users';
import { useCourses } from '@/lib/hooks/use-courses';
import { useStudents } from '@/lib/hooks/use-students';

export default function AdminReports() {
  const { data: usersData, isLoading: usersLoading } = useUsers({ limit: 1 });
  const { data: coursesData, isLoading: coursesLoading } = useCourses({ limit: 1 });
  const { data: studentsData, isLoading: studentsLoading } = useStudents({ limit: 1 });

  const isLoading = usersLoading || coursesLoading || studentsLoading;

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-8 w-8" />
          Reports & Analytics
        </h1>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card hover="lift">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Users className="h-12 w-12 text-blue-500" />
              <p className="text-4xl font-bold">{usersData?.meta.total || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardHeader>
            <CardTitle>Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <BookOpen className="h-12 w-12 text-green-500" />
              <p className="text-4xl font-bold">{coursesData?.meta.total || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <GraduationCap className="h-12 w-12 text-purple-500" />
              <p className="text-4xl font-bold">{studentsData?.meta.total || 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
