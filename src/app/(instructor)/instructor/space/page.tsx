'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LayoutGrid,
  Plus,
  Users,
  CheckCircle2,
  Clock,
  Target,
  Loader2,
} from 'lucide-react';
import { useWorkspaces, useWorkspaceTasks } from '@/lib/hooks/use-workspaces';
import { useToast } from '@/components/ui/toast';

export default function InstructorLearningSpace() {
  const { data: workspacesData, isLoading } = useWorkspaces({ limit: 50 });
  const [selectedWorkspaceId, setSelectedWorkspaceId] = React.useState<string | null>(null);
  const { data: tasksData } = useWorkspaceTasks(selectedWorkspaceId || '');
  const toast = useToast();

  const workspaces = workspacesData?.data || [];
  const tasks = tasksData?.data || [];
  const selectedWorkspace = workspaces.find(w => w.id === selectedWorkspaceId);

  React.useEffect(() => {
    if (workspaces.length > 0 && !selectedWorkspaceId) {
      setSelectedWorkspaceId(workspaces[0].id);
    }
  }, [workspaces, selectedWorkspaceId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-instructor-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <LayoutGrid className="h-8 w-8 text-instructor-600" />
              Learning Spaces
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage collaborative workspaces for your courses
            </p>
          </div>
          <Button variant="instructor">
            <Plus className="h-4 w-4 mr-2" />
            Create Workspace
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Spaces</p>
                <p className="text-2xl font-bold">{workspaces.length}</p>
              </div>
              <LayoutGrid className="h-8 w-8 text-instructor-600" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">
                  {workspaces.reduce((sum, w) => sum + (w.tasks?.length || 0), 0)}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-2xl font-bold">
                  {workspaces.reduce((sum, w) => sum + (w.members?.length || 0), 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {workspaces.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="py-12 text-center">
              <LayoutGrid className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-lg mb-2">No Workspaces Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create a workspace to collaborate with students
              </p>
              <Button variant="instructor">
                <Plus className="h-4 w-4 mr-2" />
                Create First Workspace
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {workspaces.map((workspace) => {
            const completedTasks = workspace.tasks?.filter(t => t.status === 'COMPLETED').length || 0;
            const totalTasks = workspace.tasks?.length || 0;
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return (
              <motion.div
                key={workspace.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card hover="lift" className="cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{workspace.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {workspace.description || 'No description'}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="instructor">
                        {workspace.type}
                      </Badge>
                      <Badge variant="secondary">
                        {workspace.members?.length || 0} members
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" indicatorClassName="bg-instructor-500" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        {completedTasks}/{totalTasks} tasks
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
