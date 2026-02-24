'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, BookOpen, TrendingUp, Calendar, Loader2 } from 'lucide-react';
import { useStudents } from '@/lib/hooks/use-students';
import { useGrades } from '@/lib/hooks/use-grades';
import { useAssignments } from '@/lib/hooks/use-assignments';

export default function ParentChildren() {
  const { data: studentsData, isLoading } = useStudents({ limit: 50 });
  const students = studentsData?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-parent-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8 text-parent-600" />
          My Children
        </h1>
        <p className="text-muted-foreground mt-1">
          View your children's academic progress
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {students.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="py-12 text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No student profiles linked</p>
            </CardContent>
          </Card>
        ) : (
          students.map((student) => (
            <Card key={student.id} hover="lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {student.user.firstName} {student.user.lastName}
                  </CardTitle>
                  <Badge variant="parent">Grade {student.gradeLevel}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Student ID</span>
                  <span className="font-medium">{student.studentId}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" indicatorClassName="bg-parent-500" />
                </div>
                <Button variant="parent" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </motion.div>
    </div>
  );
}
