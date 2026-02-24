'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Users, UserPlus, Search, Filter, Mail, Phone, Building, GraduationCap, ChevronRight } from 'lucide-react';

const staff = [
  { name: 'Dr. Sarah Williams', role: 'Superintendent', department: 'District Office', status: 'active' },
  { name: 'Michael Chen', role: 'Principal', department: 'Lincoln High School', status: 'active' },
  { name: 'Emily Johnson', role: 'Principal', department: 'Washington Middle', status: 'active' },
  { name: 'Robert Davis', role: 'CFO', department: 'Finance', status: 'active' },
  { name: 'Jennifer Martinez', role: 'HR Director', department: 'Human Resources', status: 'active' },
];

const departments = [
  { name: 'Administration', staff: 12, head: 'Dr. Williams' },
  { name: 'Finance', staff: 8, head: 'Robert Davis' },
  { name: 'Human Resources', staff: 6, head: 'Jennifer Martinez' },
  { name: 'Operations', staff: 15, head: 'Mark Thompson' },
  { name: 'Technology', staff: 10, head: 'Lisa Anderson' },
];

const stats = [
  { label: 'Total Staff', value: '458' },
  { label: 'Teachers', value: '312' },
  { label: 'Support Staff', value: '98' },
  { label: 'Admin', value: '48' },
];

export default function AdminManagementPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Users className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">Staff Management</h1><p className="text-muted-foreground">Manage district personnel</p></div></div>
        <div className="flex gap-2">
          <Button variant="outline"><Search className="h-4 w-4 mr-2" />Search</Button>
          <Button variant="admin"><UserPlus className="h-4 w-4 mr-2" />Add Staff</Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p></CardContent></Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><div className="flex items-center justify-between"><CardTitle>Leadership Team</CardTitle><Button variant="ghost" size="sm">View All<ChevronRight className="h-4 w-4 ml-1" /></Button></div></CardHeader>
              <CardContent className="space-y-4">
                {staff.map((person, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <Avatar fallback={person.name} size="default" />
                      <div><h4 className="font-semibold">{person.name}</h4><p className="text-sm text-muted-foreground">{person.role} • {person.department}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">{person.status}</Badge>
                      <Button variant="ghost" size="sm"><Mail className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Phone className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="admin"><CardHeader><CardTitle className="flex items-center gap-2"><Building className="h-5 w-5" />Departments</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {departments.map((dept, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                    <div><p className="font-medium text-sm">{dept.name}</p><p className="text-xs text-muted-foreground">{dept.head}</p></div>
                    <Badge variant="secondary">{dept.staff} staff</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><UserPlus className="h-4 w-4 mr-2" />New Hire</Button>
                <Button variant="outline" className="w-full justify-start"><GraduationCap className="h-4 w-4 mr-2" />Training</Button>
                <Button variant="outline" className="w-full justify-start"><Building className="h-4 w-4 mr-2" />Org Chart</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
