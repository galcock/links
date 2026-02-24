'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Loader2 } from 'lucide-react';
import { useAnnouncements } from '@/lib/hooks/use-announcements';

export default function ParentInfo() {
  const { data: announcementsData, isLoading } = useAnnouncements({ limit: 50 });
  const announcements = announcementsData?.data || [];

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Info className="h-8 w-8 text-parent-600" />
          School Information
        </h1>
      </motion.div>
      <div className="grid gap-6">
        {announcements.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No announcements</p>
            </CardContent>
          </Card>
        ) : (
          announcements.map((announcement) => (
            <Card key={announcement.id} hover="lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{announcement.title}</CardTitle>
                  <Badge variant="parent">{announcement.priority}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{announcement.content}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
