'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Edit, Save, Camera, Shield, Bell, Users, Home } from 'lucide-react';

const familyMembers = [
  { name: 'Alex Smith', relation: 'Child', grade: '10th Grade', school: 'Lincoln High School' },
  { name: 'Emma Smith', relation: 'Child', grade: '7th Grade', school: 'Lincoln Middle School' },
];

const emergencyContacts = [
  { name: 'John Smith', relation: 'Spouse', phone: '(555) 123-4567', primary: true },
  { name: 'Mary Johnson', relation: 'Grandmother', phone: '(555) 987-6543', primary: false },
];

export default function ParentProfilePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-parent-600" />
          <div><h1 className="text-3xl font-bold">My Profile</h1><p className="text-muted-foreground">Manage your personal and family information</p></div>
        </div>
        <Button variant="parent"><Save className="h-4 w-4 mr-2" />Save Changes</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar fallback="Sarah Smith" size="lg" className="h-24 w-24 text-2xl" />
                    <Button variant="secondary" size="iconSm" className="absolute -bottom-2 -right-2 rounded-full"><Camera className="h-3 w-3" /></Button>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input defaultValue="Sarah Smith" placeholder="Full Name" leftIcon={<User className="h-4 w-4" />} />
                    <Input defaultValue="sarah.smith@email.com" placeholder="Email" leftIcon={<Mail className="h-4 w-4" />} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1.5 block">Phone</label><Input defaultValue="(555) 234-5678" leftIcon={<Phone className="h-4 w-4" />} /></div>
                  <div><label className="text-sm font-medium mb-1.5 block">Work Phone</label><Input defaultValue="(555) 345-6789" leftIcon={<Phone className="h-4 w-4" />} /></div>
                  <div className="md:col-span-2"><label className="text-sm font-medium mb-1.5 block">Address</label><Input defaultValue="123 Main Street, Anytown, ST 12345" leftIcon={<MapPin className="h-4 w-4" />} /></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between"><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-parent-600" />Children</CardTitle><Button variant="ghost" size="sm">Add Child</Button></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyMembers.map((member, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border">
                    <Avatar fallback={member.name} size="default" />
                    <div className="flex-1">
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.grade} • {member.school}</p>
                    </div>
                    <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-1" />Edit</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between"><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-parent-600" />Emergency Contacts</CardTitle><Button variant="ghost" size="sm">Add Contact</Button></div>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.relation} • {contact.phone}</p>
                    </div>
                    {contact.primary && <Badge variant="parent">Primary</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card variant="parent">
              <CardContent className="p-6">
                <div className="text-center mb-4"><Avatar fallback="Sarah Smith" size="lg" className="mx-auto mb-3" /><h3 className="font-semibold">Sarah Smith</h3><p className="text-sm text-muted-foreground">Parent Account</p></div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Member Since</span><span>Aug 2020</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Children</span><span>2</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant="success" size="sm">Active</Badge></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Bell className="h-4 w-4 mr-2" />Notification Settings</Button>
                <Button variant="outline" className="w-full justify-start"><Shield className="h-4 w-4 mr-2" />Privacy Settings</Button>
                <Button variant="outline" className="w-full justify-start"><Home className="h-4 w-4 mr-2" />Update Address</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
