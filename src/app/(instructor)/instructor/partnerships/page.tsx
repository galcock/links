'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Handshake, Building, Users, Calendar, Mail, ExternalLink, Plus, Star, MapPin } from 'lucide-react';

const partners = [
  { name: 'TechCorp Inc.', type: 'Industry Partner', contact: 'John Davis', email: 'jdavis@techcorp.com', status: 'active', events: 3 },
  { name: 'State University', type: 'Academic Partner', contact: 'Dr. Sarah Lee', email: 'slee@stateuni.edu', status: 'active', events: 5 },
  { name: 'Local Library', type: 'Community Partner', contact: 'Mike Brown', email: 'mbrown@library.org', status: 'active', events: 2 },
  { name: 'STEM Foundation', type: 'Non-profit', contact: 'Emily Chen', email: 'echen@stemfound.org', status: 'pending', events: 0 },
];

const upcomingEvents = [
  { title: 'Career Day Speaker', partner: 'TechCorp Inc.', date: 'Mar 15', type: 'Presentation' },
  { title: 'Campus Tour', partner: 'State University', date: 'Mar 22', type: 'Field Trip' },
  { title: 'Research Workshop', partner: 'STEM Foundation', date: 'Apr 5', type: 'Workshop' },
];

const opportunities = [
  { title: 'Summer Internship Program', company: 'TechCorp Inc.', deadline: 'Apr 1', spots: 5 },
  { title: 'Math Tutoring Volunteer', org: 'Local Library', deadline: 'Ongoing', spots: 10 },
  { title: 'Research Assistant', org: 'State University', deadline: 'Mar 30', spots: 2 },
];

export default function InstructorPartnershipsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Handshake className="h-8 w-8 text-instructor-600" />
          <div>
            <h1 className="text-3xl font-bold">Partnerships</h1>
            <p className="text-muted-foreground">Manage industry and community connections</p>
          </div>
        </div>
        <Button variant="instructor"><Plus className="h-4 w-4 mr-2" />Add Partner</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Building className="h-5 w-5 text-instructor-600" />Partner Organizations</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {partners.map((partner, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-instructor-100 dark:bg-instructor-900/30 flex items-center justify-center">
                          <Building className="h-6 w-6 text-instructor-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{partner.name}</h4>
                          <p className="text-sm text-muted-foreground">{partner.type}</p>
                        </div>
                      </div>
                      <Badge variant={partner.status === 'active' ? 'success' : 'warning'}>{partner.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" />{partner.contact}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{partner.events} events</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Mail className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-instructor-600" />Student Opportunities</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {opportunities.map((opp, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{opp.title}</p>
                      <p className="text-sm text-muted-foreground">{opp.company || opp.org} • {opp.spots} spots</p>
                    </div>
                    <Badge variant="secondary">Due: {opp.deadline}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="instructor">
              <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Upcoming Events</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50">
                    <p className="font-semibold text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.partner}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" size="sm">{event.type}</Badge>
                      <span className="text-xs font-medium">{event.date}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div><p className="text-3xl font-bold">4</p><p className="text-sm text-muted-foreground">Partners</p></div>
                  <div><p className="text-3xl font-bold">10</p><p className="text-sm text-muted-foreground">Events</p></div>
                  <div><p className="text-3xl font-bold">17</p><p className="text-sm text-muted-foreground">Opportunities</p></div>
                  <div><p className="text-3xl font-bold">45</p><p className="text-sm text-muted-foreground">Students Placed</p></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
