'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Settings, User, Bell, Lock, Palette, Globe, Shield, Mail, Smartphone, Moon, Sun, Monitor, Save, Camera, Calendar, Video, Users } from 'lucide-react';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'teaching', label: 'Teaching', icon: Users },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function InstructorSettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [theme, setTheme] = useState('system');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-instructor-600" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-2">
              {sections.map((section) => (
                <button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeSection === section.id ? 'bg-instructor-100 dark:bg-instructor-900/30 text-instructor-600' : 'hover:bg-muted'}`}>
                  <section.icon className="h-5 w-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {activeSection === 'profile' && (
              <Card>
                <CardHeader><CardTitle>Profile Settings</CardTitle><CardDescription>Manage your personal information</CardDescription></CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar fallback="Mrs. Johnson" size="lg" />
                      <Button variant="secondary" size="iconSm" className="absolute -bottom-1 -right-1 rounded-full"><Camera className="h-3 w-3" /></Button>
                    </div>
                    <div><p className="font-semibold">Mrs. Sarah Johnson</p><p className="text-sm text-muted-foreground">Mathematics Teacher</p></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium mb-1.5 block">First Name</label><Input defaultValue="Sarah" /></div>
                    <div><label className="text-sm font-medium mb-1.5 block">Last Name</label><Input defaultValue="Johnson" /></div>
                    <div><label className="text-sm font-medium mb-1.5 block">Email</label><Input defaultValue="sjohnson@school.edu" leftIcon={<Mail className="h-4 w-4" />} /></div>
                    <div><label className="text-sm font-medium mb-1.5 block">Phone</label><Input defaultValue="(555) 987-6543" leftIcon={<Smartphone className="h-4 w-4" />} /></div>
                  </div>
                  <div className="flex justify-end"><Button variant="instructor"><Save className="h-4 w-4 mr-2" />Save Changes</Button></div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'notifications' && (
              <Card>
                <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Student submissions', enabled: true },
                    { label: 'Grade reminders', enabled: true },
                    { label: 'Parent messages', enabled: true },
                    { label: 'Department announcements', enabled: true },
                    { label: 'Calendar reminders', enabled: true },
                    { label: 'System updates', enabled: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-medium">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-instructor-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeSection === 'appearance' && (
              <Card>
                <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Theme</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {[{ id: 'light', icon: Sun, label: 'Light' }, { id: 'dark', icon: Moon, label: 'Dark' }, { id: 'system', icon: Monitor, label: 'System' }].map((option) => (
                        <button key={option.id} onClick={() => setTheme(option.id)} className={`p-4 rounded-lg border-2 transition-colors ${theme === option.id ? 'border-instructor-500 bg-instructor-50 dark:bg-instructor-900/30' : 'border-transparent hover:border-muted'}`}>
                          <option.icon className="h-6 w-6 mx-auto mb-2" /><p className="text-sm font-medium">{option.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'teaching' && (
              <Card>
                <CardHeader><CardTitle>Teaching Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Default Grading Scale</label>
                    <select className="w-full h-10 rounded-lg border bg-background px-3">
                      <option>Standard (A-F)</option>
                      <option>Pass/Fail</option>
                      <option>Points Based</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Office Hours</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Start time" defaultValue="3:00 PM" />
                      <Input placeholder="End time" defaultValue="4:00 PM" />
                    </div>
                  </div>
                  {[
                    { label: 'Allow late submissions', enabled: true },
                    { label: 'Auto-send grade notifications', enabled: true },
                    { label: 'Enable virtual office hours', enabled: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-medium">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-instructor-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeSection === 'security' && (
              <Card>
                <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Change Password</h4>
                    <div className="space-y-3">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Input type="password" placeholder="Confirm new password" />
                      <Button variant="instructor">Update Password</Button>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security</p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
