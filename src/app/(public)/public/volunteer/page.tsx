'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, Clock, Users, Calendar, MapPin, ChevronRight, Star, CheckCircle2 } from 'lucide-react';

const opportunities = [
  { title: 'Classroom Helper', commitment: '2-4 hrs/week', location: 'Various Schools', need: 'High', description: 'Assist teachers with classroom activities' },
  { title: 'Library Assistant', commitment: '3 hrs/week', location: 'School Libraries', need: 'Medium', description: 'Help organize books and assist students' },
  { title: 'Event Volunteer', commitment: 'As needed', location: 'Various Locations', need: 'High', description: 'Support school events and activities' },
  { title: 'Tutoring Program', commitment: '2 hrs/week', location: 'After School', need: 'High', description: 'Help students with homework and studying' },
  { title: 'Sports Coach Assistant', commitment: '4 hrs/week', location: 'Athletic Facilities', need: 'Medium', description: 'Assist coaches with team activities' },
];

const benefits = [
  'Make a difference in students\' lives',
  'Flexible scheduling options',
  'Training and support provided',
  'Background check assistance',
  'Community recognition',
];

const stats = [
  { label: 'Active Volunteers', value: '250+' },
  { label: 'Hours Contributed', value: '15,000+' },
  { label: 'Schools Served', value: '8' },
  { label: 'Programs Supported', value: '25+' },
];

export default function VolunteerPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-3"><Heart className="h-8 w-8 text-slate-600" />Volunteer</h1>
        <p className="text-muted-foreground mt-1">Make a difference in our schools</p>
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
              <CardHeader><CardTitle>Volunteer Opportunities</CardTitle><CardDescription>Find the perfect way to contribute</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {opportunities.map((opp, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div><h4 className="font-semibold">{opp.title}</h4><p className="text-sm text-muted-foreground">{opp.description}</p></div>
                      <Badge variant={opp.need === 'High' ? 'destructive' : 'warning'}>{opp.need} Need</Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-3">
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{opp.commitment}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{opp.location}</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">Apply<ChevronRight className="h-4 w-4 ml-1" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5" />Why Volunteer?</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-500" />{benefit}</div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Apply</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Your Name" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Phone" />
                <Button className="w-full"><Heart className="h-4 w-4 mr-2" />Get Started</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
