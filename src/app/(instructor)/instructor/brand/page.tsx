'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Palette, Camera, Globe, Link as LinkIcon, Mail, Twitter, Linkedin, Youtube, Edit, Eye, Save, Star, Award, BookOpen } from 'lucide-react';

const achievements = [
  { title: 'Master Educator', icon: '🏆', year: '2024' },
  { title: '10 Years Teaching', icon: '⭐', year: '2024' },
  { title: 'Tech Innovator', icon: '💡', year: '2023' },
  { title: 'Student Favorite', icon: '❤️', year: '2023' },
];

const socialLinks = [
  { platform: 'Website', icon: Globe, url: 'www.mrsjohnsonmath.com', connected: true },
  { platform: 'Twitter', icon: Twitter, url: '@mrsjohnsonmath', connected: true },
  { platform: 'LinkedIn', icon: Linkedin, url: 'linkedin.com/in/mrsjohnson', connected: true },
  { platform: 'YouTube', icon: Youtube, url: 'MrsJohnsonMath', connected: false },
];

const publications = [
  { title: 'Engaging Students with Interactive Math', type: 'Article', date: 'Jan 2024' },
  { title: 'Technology in the Modern Classroom', type: 'Workshop', date: 'Dec 2023' },
  { title: 'Making Algebra Accessible', type: 'Presentation', date: 'Sep 2023' },
];

export default function InstructorBrandPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Palette className="h-8 w-8 text-instructor-600" />
          <div>
            <h1 className="text-3xl font-bold">My Brand</h1>
            <p className="text-muted-foreground">Build your professional teaching identity</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Eye className="h-4 w-4 mr-2" />Preview Profile</Button>
          <Button variant="instructor"><Save className="h-4 w-4 mr-2" />Save Changes</Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle>Public Profile</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar fallback="Mrs. Johnson" size="lg" className="h-24 w-24 text-2xl" />
                    <Button variant="secondary" size="iconSm" className="absolute -bottom-2 -right-2 rounded-full"><Camera className="h-3 w-3" /></Button>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input defaultValue="Mrs. Sarah Johnson" placeholder="Display Name" />
                    <Input defaultValue="Mathematics Teacher | Algebra & Pre-Calculus" placeholder="Tagline" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Bio</label>
                  <textarea className="w-full h-32 px-3 py-2 rounded-lg border bg-background text-sm resize-none" placeholder="Tell people about yourself..." defaultValue="Passionate mathematics educator with 10+ years of experience making algebra accessible and engaging. I believe every student can succeed in math with the right support and encouragement. Google Certified Educator | AP Certified | STEM Advocate" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Subjects</label>
                    <Input defaultValue="Mathematics, Algebra, Pre-Calculus" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Grade Levels</label>
                    <Input defaultValue="9-12" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><LinkIcon className="h-5 w-5 text-instructor-600" />Social Links</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {socialLinks.map((link, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                    <link.icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{link.platform}</p>
                      <p className="text-sm text-muted-foreground">{link.url}</p>
                    </div>
                    <Badge variant={link.connected ? 'success' : 'secondary'}>{link.connected ? 'Connected' : 'Connect'}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Publications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-instructor-600" />Publications & Presentations</CardTitle>
                  <Button variant="ghost" size="sm">Add New</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {publications.map((pub, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{pub.title}</p>
                      <p className="text-sm text-muted-foreground">{pub.date}</p>
                    </div>
                    <Badge variant="secondary">{pub.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          {/* Achievements */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card variant="instructor">
              <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" />Achievements</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-xl">{achievement.icon}</div>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.year}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader><CardTitle className="text-sm">Profile Stats</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Profile Views</span><span className="font-bold">1,247</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Resource Downloads</span><span className="font-bold">3,891</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Followers</span><span className="font-bold">234</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Rating</span><span className="font-bold flex items-center gap-1"><Star className="h-4 w-4 text-amber-500 fill-amber-500" />4.9</span></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Theme */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card>
              <CardHeader><CardTitle className="text-sm">Profile Theme</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {['amber', 'blue', 'green', 'purple', 'red', 'pink'].map((color) => (
                    <button key={color} className={`h-8 w-8 rounded-full bg-${color}-500 ${color === 'amber' ? 'ring-2 ring-offset-2 ring-amber-500' : ''}`} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
