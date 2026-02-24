'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Loader2 } from 'lucide-react';
import { useCourses } from '@/lib/hooks/use-courses';

export default function PublicClasses() {
  const { data: coursesData, isLoading } = useCourses({ limit: 50, status: 'ACTIVE' });
  const courses = coursesData?.data || [];

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-8 w-8" />
          Course Catalog
        </h1>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} hover="lift">
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge>{course.code}</Badge>
              <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
