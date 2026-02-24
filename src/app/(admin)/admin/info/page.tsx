'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Search, Plus, Building, Users, Calendar, Clock, Edit, Folder } from 'lucide-react';

const documents = [
  { name: 'District Policy Manual', type: 'Policy', lastUpdated: 'Feb 2026', size: '2.4 MB' },
  { name: 'Emergency Procedures', type: 'Safety', lastUpdated: 'Jan 2026', size: '1.8 MB' },
  { name: 'Employee Handbook', type: 'HR', lastUpdated: 'Aug 2025', size: '3.2 MB' },
  { name: 'Strategic Plan 2025-2030', type: 'Planning', lastUpdated: 'Jan 2025', size: '5.1 MB' },
  { name: 'Board Meeting Calendar', type: 'Admin', lastUpdated: 'Feb 2026', size: '156 KB' },
];

const quickFacts = [
  { label: 'Established', value: '1952' },
  { label: 'Schools', value: '8' },
  { label: 'Students', value: '5,234' },
  { label: 'Staff', value: '458' },
];

const announcements = [
  { title: 'Spring Break Schedule', date: 'Mar 15-22', priority: 'info' },
  { title: 'Budget Hearing', date: 'Mar 5, 6 PM', priority: 'important' },
  { title: 'Staff Development Day', date: 'Mar 1', priority: 'info' },
];

export default function AdminInfoPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><FileText className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">District Information</h1><p className="text-muted-foreground">Policies, documents, and district info</p></div></div>
        <div className="flex gap-2">
          <Button variant="outline"><Search className="h-4 w-4 mr-2" />Search</Button>
          <Button variant="admin"><Plus className="h-4 w-4 mr-2" />Add Document</Button>
        </div>
      </motion.div>

      {/* Quick Facts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickFacts.map((fact, i) => (
          <Card key={i} variant="admin"><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{fact.value}</p><p className="text-sm text-muted-foreground">{fact.label}</p></CardContent></Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Folder className="h-5 w-5 text-admin-600" />Documents Library</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-admin-100 dark:bg-admin-900/30 flex items-center justify-center"><FileText className="h-5 w-5 text-admin-600" /></div>
                      <div><p className="font-semibold">{doc.name}</p><p className="text-sm text-muted-foreground">{doc.type} • {doc.size} • Updated {doc.lastUpdated}</p></div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Announcements</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {announcements.map((item, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${item.priority === 'important' ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200' : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200'}`}>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Links</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Building className="h-4 w-4 mr-2" />School Directory</Button>
                <Button variant="outline" className="w-full justify-start"><Users className="h-4 w-4 mr-2" />Staff Directory</Button>
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Academic Calendar</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
