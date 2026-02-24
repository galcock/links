'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Download, Calendar, DollarSign, BookOpen, Award, Clock, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const documents = [
  { name: 'Report Card - Fall 2025', child: 'Alex', date: 'Jan 15, 2026', type: 'report' },
  { name: 'Immunization Records', child: 'Alex', date: 'Aug 1, 2025', type: 'medical' },
  { name: 'Report Card - Fall 2025', child: 'Emma', date: 'Jan 15, 2026', type: 'report' },
  { name: 'Permission Slip - Field Trip', child: 'Emma', date: 'Feb 10, 2026', type: 'form', status: 'pending' },
];

const financials = [
  { item: 'Tuition - Spring 2026', amount: 2500, status: 'paid', date: 'Jan 1' },
  { item: 'Activity Fee', amount: 150, status: 'due', date: 'Mar 1' },
  { item: 'Lunch Account Balance', amount: 45.50, status: 'balance', date: 'Current' },
];

const children = [
  { name: 'Alex Smith', grade: '10th', gpa: 3.8, attendance: 97 },
  { name: 'Emma Smith', grade: '7th', gpa: 3.9, attendance: 99 },
];

export default function ParentInfoPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-parent-600" />
          <div><h1 className="text-3xl font-bold">Our Info</h1><p className="text-muted-foreground">View family documents and information</p></div>
        </div>
        <Button variant="parent"><Download className="h-4 w-4 mr-2" />Download All</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Children Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-parent-600" />Academic Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {children.map((child, i) => (
                  <div key={i} className="p-4 rounded-xl border">
                    <div className="flex items-center justify-between mb-3">
                      <div><h4 className="font-semibold">{child.name}</h4><p className="text-sm text-muted-foreground">{child.grade} Grade</p></div>
                      <Button variant="ghost" size="sm">View Details<ChevronRight className="h-4 w-4 ml-1" /></Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-sm text-muted-foreground">GPA</p><p className="text-2xl font-bold text-parent-600">{child.gpa}</p></div>
                      <div><p className="text-sm text-muted-foreground">Attendance</p><p className="text-2xl font-bold text-green-600">{child.attendance}%</p></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Documents */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-parent-600" />Documents</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-parent-100 dark:bg-parent-900/30 flex items-center justify-center"><FileText className="h-5 w-5 text-parent-600" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.child} • {doc.date}</p>
                    </div>
                    {doc.status === 'pending' ? <Badge variant="warning">Action Required</Badge> : <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          {/* Financials */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="parent">
              <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" />Financials</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {financials.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                    <div>
                      <p className="font-medium text-sm">{item.item}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${item.amount.toFixed(2)}</p>
                      <Badge variant={item.status === 'paid' ? 'success' : item.status === 'due' ? 'warning' : 'secondary'} size="sm">{item.status}</Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">View All Transactions</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader><CardTitle className="text-sm">Quick Links</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Academic Calendar</Button>
                <Button variant="outline" className="w-full justify-start"><Award className="h-4 w-4 mr-2" />Award Letters</Button>
                <Button variant="outline" className="w-full justify-start"><DollarSign className="h-4 w-4 mr-2" />Make Payment</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Items */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><AlertCircle className="h-5 w-5 text-amber-500" />Action Required</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200">
                  <p className="font-medium text-sm">Permission Slip - Field Trip</p>
                  <p className="text-xs text-muted-foreground">Emma • Due: Feb 15</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200">
                  <p className="font-medium text-sm">Activity Fee Payment</p>
                  <p className="text-xs text-muted-foreground">Due: Mar 1</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
