'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Download, FileText, Calendar, TrendingUp, Users, DollarSign, Building, Filter, Plus } from 'lucide-react';

const reportCategories = [
  { name: 'Enrollment', count: 12, icon: Users, color: 'blue' },
  { name: 'Financial', count: 8, icon: DollarSign, color: 'green' },
  { name: 'Academic', count: 15, icon: BarChart3, color: 'purple' },
  { name: 'Operations', count: 6, icon: Building, color: 'orange' },
];

const recentReports = [
  { title: 'Q2 Enrollment Summary', type: 'Enrollment', date: 'Feb 20, 2026', status: 'complete' },
  { title: 'Monthly Budget Report', type: 'Financial', date: 'Feb 15, 2026', status: 'complete' },
  { title: 'Student Achievement Analysis', type: 'Academic', date: 'Feb 10, 2026', status: 'complete' },
  { title: 'Facilities Audit', type: 'Operations', date: 'Feb 5, 2026', status: 'complete' },
  { title: 'Annual Performance Review', type: 'Academic', date: 'In Progress', status: 'draft' },
];

const scheduledReports = [
  { title: 'Weekly Attendance Report', frequency: 'Weekly', next: 'Monday' },
  { title: 'Monthly Financial Summary', frequency: 'Monthly', next: 'Mar 1' },
  { title: 'Quarterly Board Report', frequency: 'Quarterly', next: 'Apr 1' },
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><BarChart3 className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">Reports</h1><p className="text-muted-foreground">Generate and manage district reports</p></div></div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button variant="admin"><Plus className="h-4 w-4 mr-2" />Create Report</Button>
        </div>
      </motion.div>

      {/* Report Categories */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reportCategories.map((cat, i) => (
          <Card key={i} className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4"><cat.icon className={`h-8 w-8 text-${cat.color}-500 mb-2`} /><p className="font-semibold">{cat.name}</p><p className="text-sm text-muted-foreground">{cat.count} reports</p></CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-admin-600" />Recent Reports</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentReports.map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-admin-100 dark:bg-admin-900/30 flex items-center justify-center"><FileText className="h-5 w-5 text-admin-600" /></div>
                      <div><p className="font-semibold">{report.title}</p><p className="text-sm text-muted-foreground">{report.type} • {report.date}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={report.status === 'complete' ? 'success' : 'warning'}>{report.status}</Badge>
                      {report.status === 'complete' && <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="admin"><CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Scheduled Reports</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {scheduledReports.map((report, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50">
                    <p className="font-medium text-sm">{report.title}</p>
                    <p className="text-xs text-muted-foreground">{report.frequency} • Next: {report.next}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Generate</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Users className="h-4 w-4 mr-2" />Enrollment Report</Button>
                <Button variant="outline" className="w-full justify-start"><DollarSign className="h-4 w-4 mr-2" />Budget Summary</Button>
                <Button variant="outline" className="w-full justify-start"><TrendingUp className="h-4 w-4 mr-2" />Performance Report</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
