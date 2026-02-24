'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Phone, AlertTriangle, FileText, Users, Calendar, Bell, MapPin, CheckCircle2 } from 'lucide-react';

const emergencyContacts = [
  { name: 'Emergency', number: '911', type: 'emergency' },
  { name: 'School Security', number: '(555) 123-4567', type: 'security' },
  { name: 'Anonymous Tip Line', number: '(555) 999-8888', type: 'tip' },
  { name: 'Crisis Hotline', number: '1-800-273-8255', type: 'crisis' },
];

const safetyPrograms = [
  { name: 'Neighborhood Watch', members: 45, status: 'active' },
  { name: 'Safe Routes to School', participants: 120, status: 'active' },
  { name: 'Emergency Preparedness', trained: 89, status: 'active' },
];

const recentAlerts = [
  { title: 'Weather Advisory', type: 'info', date: 'Today', message: 'Heavy rain expected' },
  { title: 'Traffic Update', type: 'info', date: 'Yesterday', message: 'Road closure on Main St' },
];

export default function SafetyPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Shield className="h-8 w-8 text-community-600" /><div><h1 className="text-3xl font-bold">Safety & Security</h1><p className="text-muted-foreground">Community safety resources</p></div></div>
        <Button variant="community"><Bell className="h-4 w-4 mr-2" />Alert Settings</Button>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader><CardTitle className="flex items-center gap-2 text-red-600"><Phone className="h-5 w-5" />Emergency Contacts</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, i) => (
              <div key={i} className={`p-4 rounded-lg text-center ${contact.type === 'emergency' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-muted'}`}>
                <p className="font-semibold">{contact.name}</p>
                <p className={`text-lg font-mono ${contact.type === 'emergency' ? 'text-red-600' : 'text-community-600'}`}>{contact.number}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-community-600" />Safety Programs</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {safetyPrograms.map((program, i) => (
                  <div key={i} className="p-4 rounded-xl border">
                    <div className="flex items-center justify-between">
                      <div><h4 className="font-semibold">{program.name}</h4><p className="text-sm text-muted-foreground">{program.members || program.participants || program.trained} participants</p></div>
                      <Badge variant="success">{program.status}</Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">View All Programs</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="community"><CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5" />Recent Alerts</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.map((alert, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50"><p className="font-semibold text-sm">{alert.title}</p><p className="text-xs text-muted-foreground">{alert.message}</p><p className="text-xs text-community-600 mt-1">{alert.date}</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2" />Report Concern</Button>
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Safety Training</Button>
                <Button variant="outline" className="w-full justify-start"><MapPin className="h-4 w-4 mr-2" />Safe Routes Map</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
