'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Loader2 } from 'lucide-react';
import { useWorkspaces } from '@/lib/hooks/use-workspaces';

export default function AdminWork() {
  const { data: workspacesData, isLoading } = useWorkspaces({ limit: 100 });
  const workspaces = workspacesData?.data || [];

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ClipboardList className="h-8 w-8" />
          Administrative Work
        </h1>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <Card key={workspace.id} hover="lift">
            <CardHeader>
              <CardTitle>{workspace.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge>{workspace.type}</Badge>
              <p className="text-sm text-muted-foreground mt-2">{workspace.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
