'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Building, Phone, Calendar, Plus, ChevronRight, Settings, FileText } from 'lucide-react';

const services = [
  { name: 'Special Education', students: 234, staff: 28, budget: '2.4M', status: 'active' },
  { name: 'Counseling Services', students: 890, staff: 12, budget: '850K', status: 'active' },
  { name: 'Food Services', students: 4500, staff: 45, budget: '1.8M', status: 'active' },
  { name: 'Transportation', students: 3200, staff: 65, budget: '3.2M', status: 'active' },
  { name: 'Health Services', students: 5200, staff: 8, budget: '450K', status: 'active' },
];

const requests = [
  { type: 'Special Ed Evaluation', student: 'John D.', school: 'Lincoln High', status: 'pending' },
  { type: 'Counseling Referral', student: 'Sarah M.', school: 'Washington MS', status: 'in-progress' },
  { type: 'Transportation Change', student: 'Mike T.', school: 'Jefferson Elem', status: 'approved' },
];

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Heart className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">District Services</h1><p className="text-muted-foreground">Manage student support services</p></div></div>
        <Button variant="admin"><Plus className="h-4 w-4 mr-2" />Add Service</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle>Service Programs</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {services.map((service, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-admin-100 dark:bg-admin-900/30 flex items-center justify-center"><Heart className="h-5 w-5 text-admin-600" /></div>
                        <div><h4 className="font-semibold">{service.name}</h4><p className="text-sm text-muted-foreground">{service.staff} staff • Budget: ${service.budget}</p></div>
                      </div>
                      <Badge variant="success">{service.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1"><Users className="h-4 w-4" />{service.students} students served</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm"><Settings className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><ChevronRight className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="admin"><CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Recent Requests</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {requests.map((req, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50">
                    <p className="font-medium text-sm">{req.type}</p>
                    <p className="text-xs text-muted-foreground">{req.student} • {req.school}</p>
                    <Badge variant={req.status === 'approved' ? 'success' : req.status === 'pending' ? 'warning' : 'admin'} size="sm" className="mt-2">{req.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div><p className="text-3xl font-bold">5</p><p className="text-sm text-muted-foreground">Programs</p></div>
                <div><p className="text-3xl font-bold">158</p><p className="text-sm text-muted-foreground">Staff</p></div>
                <div><p className="text-3xl font-bold">$8.7M</p><p className="text-sm text-muted-foreground">Budget</p></div>
                <div><p className="text-3xl font-bold">14K</p><p className="text-sm text-muted-foreground">Served</p></div>
              </div>
            </CardContent></Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
