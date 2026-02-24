'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Search, MapPin, Calendar, Users, FileText, DollarSign, ChevronRight, BookOpen, Star } from 'lucide-react';

const colleges = [
  { name: 'State University', type: 'Public', distance: '15 miles', deadline: 'Nov 30', match: 'High' },
  { name: 'City College', type: 'Community', distance: '5 miles', deadline: 'Rolling', match: 'High' },
  { name: 'Tech Institute', type: 'Private', distance: '25 miles', deadline: 'Jan 15', match: 'Medium' },
  { name: 'Liberal Arts College', type: 'Private', distance: '40 miles', deadline: 'Jan 1', match: 'Medium' },
];

const resources = [
  { title: 'FAFSA Help', description: 'Application assistance', date: 'Available now' },
  { title: 'Essay Workshop', description: 'Personal statement help', date: 'Saturdays' },
  { title: 'College Night', description: 'Meet admissions officers', date: 'Mar 20' },
];

const scholarships = [
  { name: 'Community Achievement', amount: '$5,000', deadline: 'Mar 15' },
  { name: 'STEM Excellence', amount: '$10,000', deadline: 'Apr 1' },
  { name: 'First Generation', amount: '$2,500', deadline: 'Apr 15' },
];

export default function CollegePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><GraduationCap className="h-8 w-8 text-community-600" /><div><h1 className="text-3xl font-bold">College Center</h1><p className="text-muted-foreground">College planning and resources</p></div></div>
        <Button variant="community"><Calendar className="h-4 w-4 mr-2" />Schedule Advising</Button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><GraduationCap className="h-8 w-8 text-community-600 mx-auto mb-2" /><p className="text-2xl font-bold">250+</p><p className="text-sm text-muted-foreground">Partner Colleges</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" /><p className="text-2xl font-bold">$2.5M</p><p className="text-sm text-muted-foreground">Scholarships</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Users className="h-8 w-8 text-blue-500 mx-auto mb-2" /><p className="text-2xl font-bold">450</p><p className="text-sm text-muted-foreground">Students Helped</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Star className="h-8 w-8 text-amber-500 mx-auto mb-2" /><p className="text-2xl font-bold">94%</p><p className="text-sm text-muted-foreground">Acceptance Rate</p></CardContent></Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle>Explore Colleges</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {colleges.map((college, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div><h4 className="font-semibold">{college.name}</h4><p className="text-sm text-muted-foreground">{college.type}</p></div>
                      <Badge variant={college.match === 'High' ? 'success' : 'warning'}>{college.match} Match</Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{college.distance}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Deadline: {college.deadline}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-community-600" />Scholarships</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {scholarships.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div><p className="font-semibold">{s.name}</p><p className="text-sm text-muted-foreground">Deadline: {s.deadline}</p></div>
                    <Badge variant="community">{s.amount}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card variant="community"><CardHeader><CardTitle>Resources</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {resources.map((r, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50"><p className="font-semibold text-sm">{r.title}</p><p className="text-xs text-muted-foreground">{r.description}</p><p className="text-xs text-community-600 mt-1">{r.date}</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2" />College Match Quiz</Button>
                <Button variant="outline" className="w-full justify-start"><BookOpen className="h-4 w-4 mr-2" />Application Guide</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
