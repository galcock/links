'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { MiniCalendar } from '@/components/features/calendar';
import {
  Users,
  Calendar,
  Briefcase,
  GraduationCap,
  Building,
  Handshake,
  ChevronRight,
  MapPin,
  Clock,
  Star,
  FileText,
  Globe,
} from 'lucide-react';

const stats = [
  { label: 'Active Partnerships', value: '24', icon: Handshake, color: 'text-community-500' },
  { label: 'Upcoming Events', value: '8', icon: Calendar, color: 'text-blue-500' },
  { label: 'Job Postings', value: '15', icon: Briefcase, color: 'text-green-500' },
  { label: 'Scholarship Programs', value: '6', icon: GraduationCap, color: 'text-amber-500' },
];

const upcomingEvents = [
  { title: 'Career Fair 2026', date: 'Mar 20', time: '10:00 AM - 3:00 PM', location: 'Main Gymnasium', type: 'career' },
  { title: 'College Night', date: 'Mar 25', time: '6:00 PM - 8:00 PM', location: 'Auditorium', type: 'college' },
  { title: 'Community Service Day', date: 'Apr 1', time: '9:00 AM - 2:00 PM', location: 'Various', type: 'service' },
];

const partnerships = [
  { name: 'Tech Corp Inc.', type: 'Career Partner', logo: null, status: 'active', opportunities: 5 },
  { name: 'State University', type: 'College Partner', logo: null, status: 'active', opportunities: 3 },
  { name: 'Local Hospital', type: 'Healthcare Partner', logo: null, status: 'active', opportunities: 2 },
  { name: 'City Library', type: 'Community Partner', logo: null, status: 'active', opportunities: 4 },
];

const recentOpportunities = [
  { title: 'Summer Internship - Software Engineering', company: 'Tech Corp Inc.', deadline: 'Mar 30' },
  { title: 'Nursing Scholarship Program', company: 'Local Hospital', deadline: 'Apr 15' },
  { title: 'Part-time Library Assistant', company: 'City Library', deadline: 'Open' },
];

export default function CommunityDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Community Services Portal 🤝
          </h1>
          <p className="text-muted-foreground mt-1">
            Connecting students with opportunities and resources.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="community">
            <Briefcase className="h-4 w-4 mr-2" />
            Post Opportunity
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Event
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <Card key={stat.label} variant="community" hover="lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-community-500" />
                    Upcoming Events
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="text-center min-w-[60px] bg-community-100 dark:bg-community-900/30 rounded-lg p-2">
                      <p className="text-xs text-community-600">{event.date.split(' ')[0]}</p>
                      <p className="text-xl font-bold text-community-700">{event.date.split(' ')[1]}</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Partnerships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Handshake className="h-5 w-5 text-community-500" />
                    Active Partnerships
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    Manage
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {partnerships.map((partner, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-md transition-all">
                      <Avatar fallback={partner.name} size="lg" />
                      <div className="flex-1">
                        <h4 className="font-medium">{partner.name}</h4>
                        <p className="text-sm text-muted-foreground">{partner.type}</p>
                        <Badge variant="community" size="sm" className="mt-1">
                          {partner.opportunities} opportunities
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MiniCalendar accentColor="community" />
          </motion.div>

          {/* Recent Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-community-500" />
                  Recent Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentOpportunities.map((opp, i) => (
                  <div key={i} className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <h4 className="font-medium text-sm">{opp.title}</h4>
                    <p className="text-xs text-muted-foreground">{opp.company}</p>
                    <Badge variant="secondary" size="sm" className="mt-1">
                      Deadline: {opp.deadline}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="community">
              <CardContent className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Career Resources
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  College Prep
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Facility Requests
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Community Board
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
