'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users, Calendar, MapPin, DollarSign, Filter, ChevronRight } from 'lucide-react';

const classes = [
  { title: 'ESL - Beginning English', category: 'Language', schedule: 'Mon & Wed, 6-8 PM', duration: '12 weeks', location: 'Room 105', fee: 'Free', spots: 8 },
  { title: 'Computer Basics', category: 'Technology', schedule: 'Tuesdays, 6-8 PM', duration: '8 weeks', location: 'Computer Lab', fee: '$25', spots: 5 },
  { title: 'GED Preparation', category: 'Academic', schedule: 'Tue & Thu, 6-9 PM', duration: '16 weeks', location: 'Room 201', fee: 'Free', spots: 12 },
  { title: 'Yoga for Beginners', category: 'Fitness', schedule: 'Saturdays, 9-10 AM', duration: 'Ongoing', location: 'Gymnasium', fee: '$40/month', spots: 15 },
  { title: 'Art for Adults', category: 'Arts', schedule: 'Thursdays, 7-9 PM', duration: '10 weeks', location: 'Art Room', fee: '$50', spots: 3 },
  { title: 'Spanish - Beginner', category: 'Language', schedule: 'Mon & Wed, 7-8:30 PM', duration: '12 weeks', location: 'Room 110', fee: '$75', spots: 10 },
];

const categories = ['All', 'Language', 'Technology', 'Academic', 'Fitness', 'Arts'];

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold flex items-center gap-3"><BookOpen className="h-8 w-8 text-slate-600" />Community Classes</h1><p className="text-muted-foreground mt-1">Lifelong learning opportunities</p></div>
        <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <Button key={i} variant={i === 0 ? 'default' : 'outline'} size="sm">{cat}</Button>
        ))}
      </motion.div>

      {/* Classes Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls, i) => (
          <Card key={i} className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary">{cls.category}</Badge>
                <Badge variant={cls.spots < 5 ? 'warning' : 'success'}>{cls.spots} spots left</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">{cls.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{cls.schedule}</p>
                <p className="flex items-center gap-2"><Clock className="h-4 w-4" />{cls.duration}</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{cls.location}</p>
                <p className="flex items-center gap-2"><DollarSign className="h-4 w-4" />{cls.fee}</p>
              </div>
              <Button variant="outline" className="w-full">Register<ChevronRight className="h-4 w-4 ml-1" /></Button>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card><CardContent className="p-6 text-center">
          <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-semibold mb-2">Have a Class Idea?</h3>
          <p className="text-sm text-muted-foreground mb-4">We're always looking for instructors and new class offerings.</p>
          <Button variant="outline">Contact Us</Button>
        </CardContent></Card>
      </motion.div>
    </div>
  );
}
