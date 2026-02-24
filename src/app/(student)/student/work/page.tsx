'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ClipboardList,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  FileText,
  Filter,
  Plus,
  Loader2,
} from 'lucide-react';
import { useAssignments } from '@/lib/hooks/use-assignments';
import { useWorkspaces, useWorkspaceTasks } from '@/lib/hooks/use-workspaces';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useToast } from '@/components/ui/toast';

export default function StudentWork() {
  const { data: user } = useCurrentUser();
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'completed'>('all');

  const { data: assignmentsData, isLoading: assignmentsLoading } = useAssignments({
    status: filter === 'completed' ? 'GRADED' : 'ACTIVE',
    limit: 100,
  });

  const { data: workspacesData } = useWorkspaces({ limit: 50 });

  const toast = useToast();

  // Categorize assignments
  const assignments = React.useMemo(() => {
    if (!assignmentsData?.data) return { overdue: [], dueSoon: [], upcoming: [], completed: [] };

    const now = Date.now();
    const oneDayFromNow = now + 86400000;
    const threeDaysFromNow = now + 259200000;

    const categorized = {
      overdue: [] as typeof assignmentsData.data,
      dueSoon: [] as typeof assignmentsData.data,
      upcoming: [] as typeof assignmentsData.data,
      completed: [] as typeof assignmentsData.data,
    };

    assignmentsData.data.forEach((assignment) => {
      if (assignment.status === 'GRADED') {
        categorized.completed.push(assignment);
      } else if (assignment.dueDate) {
        const dueTime = new Date(assignment.dueDate).getTime();
        if (dueTime < now) {
          categorized.overdue.push(assignment);
        } else if (dueTime < oneDayFromNow) {
          categorized.dueSoon.push(assignment);
        } else if (dueTime < threeDaysFromNow) {
          categorized.upcoming.push(assignment);
        } else {
          categorized.upcoming.push(assignment);
        }
      } else {
        categorized.upcoming.push(assignment);
      }
    });

    return categorized;
  }, [assignmentsData]);

  // Calculate stats
  const stats = {
    total: assignmentsData?.meta.total || 0,
    overdue: assignments.overdue.length,
    dueSoon: assignments.dueSoon.length,
    completed: assignments.completed.length,
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const formatDueDate = (dueDate: string | null) => {
    if (!dueDate) return 'No due date';
    const date = new Date(dueDate);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 86400000).toDateString();

    if (isToday) return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (isTomorrow) return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (assignmentsLoading) {
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
              <ClipboardList className="h-8 w-8 text-student-600" />
              My Work
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your assignments and tasks
            </p>
          </div>
          <Button variant="student">
            <Plus className="h-4 w-4 mr-2" />
            New Task
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
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <ClipboardList className="h-8 w-8 text-student-600" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-500">{stats.overdue}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Due Soon</p>
                <p className="text-2xl font-bold text-amber-500">{stats.dueSoon}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="student">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Overall Completion</h3>
              <span className="text-2xl font-bold">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-3" indicatorClassName="bg-student-500" />
            <p className="text-sm text-muted-foreground mt-2">
              {stats.completed} of {stats.total} assignments completed
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2"
      >
        <Button
          variant={filter === 'all' ? 'student' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'pending' ? 'student' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pending
        </Button>
        <Button
          variant={filter === 'completed' ? 'student' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </motion.div>

      {/* Overdue Assignments */}
      {assignments.overdue.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                Overdue ({assignments.overdue.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.overdue.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-2 border-red-500 text-red-600"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.course?.name || 'Course'}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" size="sm">
                      {assignment.type}
                    </Badge>
                    <p className="text-xs text-red-600 mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {formatDueDate(assignment.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Due Soon */}
      {assignments.dueSoon.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Due Soon ({assignments.dueSoon.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.dueSoon.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-2 border-student-500 text-student-600"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.course?.name || 'Course'}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" size="sm">
                      {assignment.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {formatDueDate(assignment.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Upcoming */}
      {assignments.upcoming.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-student-600" />
                Upcoming ({assignments.upcoming.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.upcoming.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-2 border-student-500 text-student-600"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.course?.name || 'Course'}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" size="sm">
                      {assignment.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {formatDueDate(assignment.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Empty State */}
      {stats.total === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="font-semibold text-lg mb-2">All Caught Up!</h3>
              <p className="text-muted-foreground">
                You have no pending assignments. Great work!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
