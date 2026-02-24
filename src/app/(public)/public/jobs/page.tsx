'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock, DollarSign, Building, Filter, Search, ChevronRight, Users } from 'lucide-react';

const jobs = [
  { title: 'High School Math Teacher', department: 'Instruction', type: 'Full-time', salary: '$55,000 - $75,000', location: 'Lincoln High', posted: '2 days ago', urgent: true },
  { title: 'School Counselor', department: 'Student Services', type: 'Full-time', salary: '$50,000 - $65,000', location: 'District-wide', posted: '5 days ago', urgent: false },
  { title: 'Administrative Assistant', department: 'Administration', type: 'Full-time', salary: '$35,000 - $42,000', location: 'District Office', posted: '1 week ago', urgent: false },
  { title: 'Bus Driver', department: 'Transportation', type: 'Part-time', salary: '$18/hour', location: 'District-wide', posted: '3 days ago', urgent: true },
  { title: 'Custodian', department: 'Operations', type: 'Full-time', salary: '$32,000 - $38,000', location: 'Various Schools', posted: '1 week ago', urgent: false },
  { title: 'IT Support Specialist', department: 'Technology', type: 'Full-time', salary: '$45,000 - $55,000', location: 'District Office', posted: '4 days ago', urgent: false },
];

const categories = ['All', 'Instruction', 'Administration', 'Support Services', 'Transportation'];

const benefits = ['Competitive salary', 'Health insurance', 'Retirement plan', 'Paid time off', 'Professional development'];

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold flex items-center gap-3"><Briefcase className="h-8 w-8 text-slate-600" />Career Opportunities</h1><p className="text-muted-foreground mt-1">Join our team and make a difference</p></div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button variant="outline"><Search className="h-4 w-4 mr-2" />Search</Button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <Button key={i} variant={i === 0 ? 'default' : 'outline'} size="sm">{cat}</Button>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle>Open Positions ({jobs.length})</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {jobs.map((job, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2"><h4 className="font-semibold">{job.title}</h4>{job.urgent && <Badge variant="destructive" size="sm">Urgent</Badge>}</div>
                        <p className="text-sm text-muted-foreground">{job.department}</p>
                      </div>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-3">
                      <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />{job.salary}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{job.posted}</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">View Details<ChevronRight className="h-4 w-4 ml-1" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Why Work With Us?</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">✓ {benefit}</div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardContent className="p-6 text-center">
              <Building className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Equal Opportunity Employer</h3>
              <p className="text-sm text-muted-foreground">We are committed to creating an inclusive environment for all employees.</p>
            </CardContent></Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
