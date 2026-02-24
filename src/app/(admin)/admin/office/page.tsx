'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, FileText, Users, Calendar, Clock, CheckCircle2, AlertCircle, ChevronRight, Briefcase } from 'lucide-react';

const quickStats = [
  { label: 'Schools', value: '8', icon: Building2, color: 'text-blue-500' },
  { label: 'Staff', value: '450', icon: Users, color: 'text-green-500' },
  { label: 'Students', value: '5,200', icon: Users, color: 'text-purple-500' },
  { label: 'Pending Items', value: '12', icon: Clock, color: 'text-amber-500' },
];

const pendingApprovals = [
  { title: 'Budget Transfer Request', from: 'Lincoln High', priority: 'high', date: 'Today' },
  { title: 'New Hire Approval', from: 'HR Department', priority: 'medium', date: 'Yesterday' },
  { title: 'Facility Rental', from: 'Community Center', priority: 'low', date: '2 days ago' },
];

const recentDocuments = [
  { name: 'Q2 Budget Report.pdf', type: 'Finance', date: 'Today' },
  { name: 'Staff Evaluation Summary.xlsx', type: 'HR', date: 'Yesterday' },
  { name: 'Board Meeting Minutes.docx', type: 'Admin', date: '3 days ago' },
];

export default function AdminOfficePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Building2 className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">Admin Office</h1><p className="text-muted-foreground">District administration hub</p></div></div>
        <Button variant="admin"><Briefcase className="h-4 w-4 mr-2" />Quick Actions</Button>
      </motion.div>

      {/* Quick Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <Card key={i}><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{stat.label}</p><p className="text-2xl font-bold">{stat.value}</p></div><stat.icon className={`h-8 w-8 ${stat.color}`} /></div></CardContent></Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><div className="flex items-center justify-between"><CardTitle className="flex items-center gap-2"><AlertCircle className="h-5 w-5 text-admin-600" />Pending Approvals</CardTitle><Button variant="ghost" size="sm">View All<ChevronRight className="h-4 w-4 ml-1" /></Button></div></CardHeader>
              <CardContent className="space-y-4">
                {pendingApprovals.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border">
                    <div><h4 className="font-semibold">{item.title}</h4><p className="text-sm text-muted-foreground">{item.from} • {item.date}</p></div>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'warning' : 'secondary'}>{item.priority}</Badge>
                      <Button variant="admin" size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-admin-600" />Recent Documents</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-admin-100 dark:bg-admin-900/30 flex items-center justify-center"><FileText className="h-5 w-5 text-admin-600" /></div>
                    <div className="flex-1"><p className="font-medium">{doc.name}</p><p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card variant="admin"><CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Upcoming</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-background/50"><p className="font-medium text-sm">Board Meeting</p><p className="text-xs text-muted-foreground">Tomorrow, 6:00 PM</p></div>
                <div className="p-3 rounded-lg bg-background/50"><p className="font-medium text-sm">Budget Review</p><p className="text-xs text-muted-foreground">Friday, 2:00 PM</p></div>
                <div className="p-3 rounded-lg bg-background/50"><p className="font-medium text-sm">Staff Meeting</p><p className="text-xs text-muted-foreground">Monday, 8:00 AM</p></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
