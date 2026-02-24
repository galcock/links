'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Handshake, Building, Users, Calendar, Mail, ExternalLink, Plus, Star } from 'lucide-react';

const partners = [
  { name: 'TechCorp Industries', type: 'Corporate', programs: ['Internships', 'Job Shadow'], years: 5 },
  { name: 'Community Health Center', type: 'Healthcare', programs: ['Health Screenings', 'Wellness'], years: 8 },
  { name: 'Local Food Bank', type: 'Non-profit', programs: ['Food Drives', 'Volunteers'], years: 12 },
  { name: 'City Recreation', type: 'Government', programs: ['Sports Leagues', 'Camps'], years: 15 },
];

const upcomingEvents = [
  { title: 'Career Fair', partner: 'Multiple Partners', date: 'Mar 15' },
  { title: 'Health Screening', partner: 'Community Health', date: 'Mar 20' },
  { title: 'Food Drive', partner: 'Local Food Bank', date: 'Mar 25' },
];

const stats = [
  { label: 'Active Partners', value: '45' },
  { label: 'Programs', value: '28' },
  { label: 'Students Served', value: '2,500+' },
  { label: 'Years Active', value: '20+' },
];

export default function PartnersPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Handshake className="h-8 w-8 text-community-600" /><div><h1 className="text-3xl font-bold">Community Partners</h1><p className="text-muted-foreground">Organizations working with our community</p></div></div>
        <Button variant="community"><Plus className="h-4 w-4 mr-2" />Become a Partner</Button>
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
              <CardHeader><CardTitle>Our Partners</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {partners.map((partner, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-community-100 dark:bg-community-900/30 flex items-center justify-center"><Building className="h-6 w-6 text-community-600" /></div>
                        <div><h4 className="font-semibold">{partner.name}</h4><p className="text-sm text-muted-foreground">{partner.type} • {partner.years} years</p></div>
                      </div>
                      <Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4" /></Button>
                    </div>
                    <div className="flex flex-wrap gap-2">{partner.programs.map((p, j) => <Badge key={j} variant="secondary" size="sm">{p}</Badge>)}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="community"><CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Partner Events</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50"><p className="font-semibold text-sm">{event.title}</p><p className="text-xs text-muted-foreground">{event.partner}</p><p className="text-xs text-community-600 mt-1">{event.date}</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Get Involved</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Handshake className="h-4 w-4 mr-2" />Partner Application</Button>
                <Button variant="outline" className="w-full justify-start"><Mail className="h-4 w-4 mr-2" />Contact Us</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
