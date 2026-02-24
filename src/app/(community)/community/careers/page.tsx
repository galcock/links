'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Search, MapPin, Clock, DollarSign, Users, FileText, Calendar, ChevronRight, Filter } from 'lucide-react';

const jobs = [
  { title: 'Software Developer', company: 'TechCorp', location: 'Local', type: 'Full-time', salary: '$70k-90k', posted: '2 days ago' },
  { title: 'Marketing Associate', company: 'Creative Agency', location: 'Remote', type: 'Full-time', salary: '$45k-55k', posted: '3 days ago' },
  { title: 'Administrative Assistant', company: 'Law Office', location: 'Local', type: 'Part-time', salary: '$18/hr', posted: '1 week ago' },
  { title: 'Warehouse Associate', company: 'Logistics Inc', location: 'Local', type: 'Full-time', salary: '$35k-42k', posted: '1 day ago' },
];

const services = [
  { name: 'Resume Review', description: 'Get professional feedback', icon: FileText },
  { name: 'Interview Prep', description: 'Practice sessions available', icon: Users },
  { name: 'Job Fair', description: 'March 15, 10 AM - 3 PM', icon: Calendar },
];

const stats = [
  { label: 'Active Listings', value: '156' },
  { label: 'Partners', value: '45' },
  { label: 'Placed', value: '89' },
  { label: 'This Month', value: '12' },
];

export default function CareersPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Briefcase className="h-8 w-8 text-community-600" /><div><h1 className="text-3xl font-bold">Career Center</h1><p className="text-muted-foreground">Find jobs and career resources</p></div></div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button variant="community"><Search className="h-4 w-4 mr-2" />Search Jobs</Button>
        </div>
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
              <CardHeader><CardTitle>Job Listings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {jobs.map((job, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div><h4 className="font-semibold">{job.title}</h4><p className="text-sm text-muted-foreground">{job.company}</p></div>
                      <Badge variant="community">{job.type}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />{job.salary}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{job.posted}</span>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full">View All Jobs<ChevronRight className="h-4 w-4 ml-1" /></Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="community"><CardHeader><CardTitle>Career Services</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {services.map((service, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50 flex items-center gap-3 cursor-pointer hover:bg-background">
                    <service.icon className="h-5 w-5 text-community-600" />
                    <div><p className="font-medium text-sm">{service.name}</p><p className="text-xs text-muted-foreground">{service.description}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2" />Upload Resume</Button>
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Schedule Consultation</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
