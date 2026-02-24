'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Download, Upload, Search, RefreshCw, Shield, FileText, Users, BarChart3, Clock } from 'lucide-react';

const dataSources = [
  { name: 'Student Information System', records: '5,234', status: 'connected', lastSync: '5 min ago' },
  { name: 'Financial Database', records: '45,678', status: 'connected', lastSync: '1 hour ago' },
  { name: 'HR Management', records: '458', status: 'connected', lastSync: '30 min ago' },
  { name: 'Learning Management', records: '125,890', status: 'connected', lastSync: '2 hours ago' },
];

const recentQueries = [
  { query: 'Enrollment by grade level', user: 'Admin', date: 'Today' },
  { query: 'Budget variance Q2', user: 'CFO', date: 'Today' },
  { query: 'Staff certifications expiring', user: 'HR', date: 'Yesterday' },
];

export default function AdminDataPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Database className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">Data Management</h1><p className="text-muted-foreground">Access and manage district data</p></div></div>
        <div className="flex gap-2">
          <Button variant="outline"><RefreshCw className="h-4 w-4 mr-2" />Sync All</Button>
          <Button variant="admin"><Search className="h-4 w-4 mr-2" />Query Builder</Button>
        </div>
      </motion.div>

      {/* Data Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><Database className="h-8 w-8 text-admin-600 mx-auto mb-2" /><p className="text-2xl font-bold">4</p><p className="text-sm text-muted-foreground">Data Sources</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" /><p className="text-2xl font-bold">177K</p><p className="text-sm text-muted-foreground">Total Records</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Clock className="h-8 w-8 text-green-500 mx-auto mb-2" /><p className="text-2xl font-bold">99.9%</p><p className="text-sm text-muted-foreground">Uptime</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" /><p className="text-2xl font-bold">Secure</p><p className="text-sm text-muted-foreground">Encrypted</p></CardContent></Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-admin-600" />Data Sources</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {dataSources.map((source, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-admin-100 dark:bg-admin-900/30 flex items-center justify-center"><Database className="h-5 w-5 text-admin-600" /></div>
                      <div><h4 className="font-semibold">{source.name}</h4><p className="text-sm text-muted-foreground">{source.records} records • Last sync: {source.lastSync}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">{source.status}</Badge>
                      <Button variant="ghost" size="sm"><RefreshCw className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="admin"><CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" />Recent Queries</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentQueries.map((query, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50"><p className="font-medium text-sm">{query.query}</p><p className="text-xs text-muted-foreground">{query.user} • {query.date}</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Download className="h-4 w-4 mr-2" />Export Data</Button>
                <Button variant="outline" className="w-full justify-start"><Upload className="h-4 w-4 mr-2" />Import Data</Button>
                <Button variant="outline" className="w-full justify-start"><BarChart3 className="h-4 w-4 mr-2" />Run Analytics</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
