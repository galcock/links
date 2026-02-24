'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Library, Search, BookOpen, Calendar, Clock, Users, Laptop, FileText, ChevronRight } from 'lucide-react';

const services = [
  { name: 'Book Lending', description: 'Borrow books for 3 weeks', icon: BookOpen },
  { name: 'Computer Lab', description: 'Free internet access', icon: Laptop },
  { name: 'Study Rooms', description: 'Quiet study spaces', icon: Users },
  { name: 'Digital Resources', description: 'E-books & databases', icon: FileText },
];

const programs = [
  { name: 'Story Time', day: 'Tuesdays', time: '10 AM', age: 'Ages 3-5' },
  { name: 'Teen Book Club', day: 'Thursdays', time: '4 PM', age: 'Ages 12-18' },
  { name: 'ESL Classes', day: 'Mon & Wed', time: '6 PM', age: 'Adults' },
  { name: 'Tech Help', day: 'Saturdays', time: '2 PM', age: 'All ages' },
];

const hours = [
  { day: 'Monday - Thursday', time: '9 AM - 8 PM' },
  { day: 'Friday', time: '9 AM - 6 PM' },
  { day: 'Saturday', time: '10 AM - 5 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Library className="h-8 w-8 text-community-600" /><div><h1 className="text-3xl font-bold">Library</h1><p className="text-muted-foreground">Community library services</p></div></div>
        <Button variant="community"><Search className="h-4 w-4 mr-2" />Search Catalog</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle>Services</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {services.map((service, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer">
                    <service.icon className="h-8 w-8 text-community-600 mb-3" />
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-community-600" />Programs</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {programs.map((program, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div><p className="font-semibold">{program.name}</p><p className="text-sm text-muted-foreground">{program.day} • {program.time}</p></div>
                    <Badge variant="community">{program.age}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="community"><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Hours</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between p-2"><span className="text-sm">{h.day}</span><span className="text-sm font-medium">{h.time}</span></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><BookOpen className="h-4 w-4 mr-2" />My Account</Button>
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Reserve Room</Button>
                <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2" />Digital Library</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
