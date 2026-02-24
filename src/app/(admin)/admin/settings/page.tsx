'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Settings, User, Bell, Lock, Palette, Building, Shield, Sun, Moon, Monitor, Save, Camera } from 'lucide-react';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'district', label: 'District', icon: Building },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [theme, setTheme] = useState('system');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">Settings</h1><p className="text-muted-foreground">System and account settings</p></div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card><CardContent className="p-2">
            {sections.map((section) => (
              <button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeSection === section.id ? 'bg-admin-100 dark:bg-admin-900/30 text-admin-600' : 'hover:bg-muted'}`}>
                <section.icon className="h-5 w-5" /><span className="font-medium">{section.label}</span>
              </button>
            ))}
          </CardContent></Card>
        </motion.div>

        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {activeSection === 'profile' && (
              <Card><CardHeader><CardTitle>Profile Settings</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative"><Avatar fallback="Admin User" size="lg" /><Button variant="secondary" size="iconSm" className="absolute -bottom-1 -right-1 rounded-full"><Camera className="h-3 w-3" /></Button></div>
                    <div><p className="font-semibold">District Administrator</p><p className="text-sm text-muted-foreground">System Admin</p></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium mb-1.5 block">Name</label><Input defaultValue="Admin User" /></div>
                    <div><label className="text-sm font-medium mb-1.5 block">Email</label><Input defaultValue="admin@district.edu" /></div>
                    <div><label className="text-sm font-medium mb-1.5 block">Phone</label><Input defaultValue="(555) 123-4567" /></div>
                    <div><label className="text-sm font-medium mb-1.5 block">Role</label><Input defaultValue="District Administrator" disabled /></div>
                  </div>
                  <div className="flex justify-end"><Button variant="admin"><Save className="h-4 w-4 mr-2" />Save Changes</Button></div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'district' && (
              <Card><CardHeader><CardTitle>District Settings</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div><label className="text-sm font-medium mb-1.5 block">District Name</label><Input defaultValue="Lincoln Unified School District" /></div>
                  <div><label className="text-sm font-medium mb-1.5 block">District Code</label><Input defaultValue="LUSD-001" disabled /></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium mb-1.5 block">Academic Year</label><Input defaultValue="2025-2026" /></div>
                    <div><label className="text-sm font-medium mb-1.5 block">Time Zone</label><select className="w-full h-10 rounded-lg border bg-background px-3"><option>Pacific Time (PT)</option></select></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'notifications' && (
              <Card><CardHeader><CardTitle>Notification Settings</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {['System alerts', 'Budget notifications', 'Staff updates', 'Board communications', 'Emergency alerts'].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-medium">{item}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-admin-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeSection === 'appearance' && (
              <Card><CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-3">Theme</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ id: 'light', icon: Sun, label: 'Light' }, { id: 'dark', icon: Moon, label: 'Dark' }, { id: 'system', icon: Monitor, label: 'System' }].map((option) => (
                      <button key={option.id} onClick={() => setTheme(option.id)} className={`p-4 rounded-lg border-2 transition-colors ${theme === option.id ? 'border-admin-500 bg-admin-50 dark:bg-admin-900/30' : 'border-transparent hover:border-muted'}`}>
                        <option.icon className="h-6 w-6 mx-auto mb-2" /><p className="text-sm font-medium">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'security' && (
              <Card><CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div><h4 className="font-medium mb-3">Change Password</h4>
                    <div className="space-y-3"><Input type="password" placeholder="Current password" /><Input type="password" placeholder="New password" /><Input type="password" placeholder="Confirm new password" /><Button variant="admin">Update Password</Button></div>
                  </div>
                  <div className="pt-4 border-t"><h4 className="font-medium mb-3">Two-Factor Authentication</h4><p className="text-sm text-muted-foreground mb-3">Add an extra layer of security</p><Button variant="outline">Enable 2FA</Button></div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
