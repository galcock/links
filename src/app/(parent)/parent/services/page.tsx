'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, BookOpen, Users, Phone, Calendar, Clock, MapPin, ChevronRight, Star, MessageSquare } from 'lucide-react';

const services = [
  { name: 'Tutoring Services', description: 'One-on-one academic support', icon: BookOpen, available: true, contact: 'tutoring@school.edu' },
  { name: 'Counseling Services', description: 'Academic and emotional support', icon: Heart, available: true, contact: 'counseling@school.edu' },
  { name: 'Special Education', description: 'IEP and 504 plan support', icon: Users, available: true, contact: 'specialed@school.edu' },
  { name: 'Speech Therapy', description: 'Language and speech services', icon: MessageSquare, available: true, contact: 'speech@school.edu' },
];

const activeServices = [
  { service: 'Math Tutoring', child: 'Alex', schedule: 'Tuesdays & Thursdays, 3:30 PM', provider: 'Ms. Martinez', nextSession: 'Tomorrow' },
];

const resources = [
  { title: 'Parent Resource Guide', type: 'PDF', description: 'Complete guide to school services' },
  { title: 'College Planning Handbook', type: 'PDF', description: 'Planning for higher education' },
  { title: 'Mental Health Resources', type: 'Link', description: 'Community mental health support' },
];

export default function ParentServicesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-parent-600" />
          <div><h1 className="text-3xl font-bold">Services</h1><p className="text-muted-foreground">Access support services for your children</p></div>
        </div>
        <Button variant="parent"><Calendar className="h-4 w-4 mr-2" />Request Service</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Available Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle>Available Services</CardTitle><CardDescription>Support services available to your family</CardDescription></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {services.map((service, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-10 w-10 rounded-xl bg-parent-100 dark:bg-parent-900/30 flex items-center justify-center"><service.icon className="h-5 w-5 text-parent-600" /></div>
                      <div className="flex-1"><h4 className="font-semibold">{service.name}</h4><p className="text-sm text-muted-foreground">{service.description}</p></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant={service.available ? 'success' : 'secondary'}>{service.available ? 'Available' : 'Waitlist'}</Badge>
                      <Button variant="ghost" size="sm">Learn More<ChevronRight className="h-4 w-4 ml-1" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-parent-600" />Active Services</CardTitle></CardHeader>
              <CardContent>
                {activeServices.length > 0 ? (
                  <div className="space-y-4">
                    {activeServices.map((service, i) => (
                      <div key={i} className="p-4 rounded-xl border bg-parent-50 dark:bg-parent-950/30">
                        <div className="flex items-start justify-between mb-3">
                          <div><h4 className="font-semibold">{service.service}</h4><p className="text-sm text-muted-foreground">For {service.child}</p></div>
                          <Badge variant="parent">Active</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" />{service.schedule}</p>
                          <p className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" />{service.provider}</p>
                          <p className="flex items-center gap-2 text-parent-600"><Clock className="h-4 w-4" />Next: {service.nextSession}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No active services</p>
                    <Button variant="parent" className="mt-4">Request a Service</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="parent">
              <CardHeader><CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5" />Quick Contact</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-background/50"><p className="font-medium text-sm">Main Office</p><p className="text-sm text-muted-foreground">(555) 123-4567</p></div>
                <div className="p-3 rounded-lg bg-background/50"><p className="font-medium text-sm">Counseling</p><p className="text-sm text-muted-foreground">(555) 123-4568</p></div>
                <div className="p-3 rounded-lg bg-background/50"><p className="font-medium text-sm">Special Services</p><p className="text-sm text-muted-foreground">(555) 123-4569</p></div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resources */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />Resources</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {resources.map((resource, i) => (
                  <div key={i} className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{resource.title}</p>
                      <Badge variant="secondary" size="sm">{resource.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
