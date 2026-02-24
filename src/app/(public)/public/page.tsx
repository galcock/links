'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MiniCalendar } from '@/components/features/calendar';
import {
  Calendar,
  Newspaper,
  Image,
  Heart,
  Briefcase,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  ExternalLink,
  Users,
  GraduationCap,
} from 'lucide-react';

const quickLinks = [
  { title: 'School Calendar', icon: Calendar, href: '/public/calendar' },
  { title: 'News & Events', icon: Newspaper, href: '/public/events' },
  { title: 'Student Galleries', icon: Image, href: '/public/galleries' },
  { title: 'Volunteer', icon: Heart, href: '/public/volunteer' },
  { title: 'Job Openings', icon: Briefcase, href: '/public/jobs' },
  { title: 'Adult Classes', icon: BookOpen, href: '/public/classes' },
];

const upcomingEvents = [
  { title: 'Spring Concert', date: 'Mar 22', time: '7:00 PM', type: 'Arts' },
  { title: 'Open House', date: 'Mar 28', time: '6:00 PM', type: 'Community' },
  { title: 'Science Fair', date: 'Apr 5', time: '4:00 PM', type: 'Academic' },
  { title: 'Sports Day', date: 'Apr 12', time: '9:00 AM', type: 'Sports' },
];

const latestNews = [
  { title: 'Lincoln High Wins State Championship', date: 'Mar 10', category: 'Sports' },
  { title: 'New STEM Lab Grand Opening', date: 'Mar 8', category: 'Facilities' },
  { title: 'Student Art Exhibition Coming Soon', date: 'Mar 5', category: 'Arts' },
];

const jobPostings = [
  { title: 'Mathematics Teacher', department: 'Academic', type: 'Full-time' },
  { title: 'Administrative Assistant', department: 'Office', type: 'Part-time' },
  { title: 'Cafeteria Staff', department: 'Operations', type: 'Part-time' },
];

export default function PublicPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/public" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-600 to-gray-700 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl">Lincoln High School</span>
              <Badge variant="secondary" className="ml-2">Public Portal</Badge>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/public/contact">Contact</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Lincoln High School
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Excellence in Education Since 1952. Discover what makes our community special.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule a Visit
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <Card hover="lift" className="h-full cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <link.icon className="h-8 w-8 mx-auto mb-3 text-public-500" />
                    <p className="font-medium text-sm">{link.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Events & News */}
            <div className="lg:col-span-2 space-y-8">
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
                        <Calendar className="h-5 w-5 text-public-500" />
                        Upcoming Events
                      </CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/public/events">
                          View All
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingEvents.map((event, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="text-center min-w-[50px]">
                          <p className="text-xs text-muted-foreground">{event.date.split(' ')[0]}</p>
                          <p className="text-xl font-bold">{event.date.split(' ')[1]}</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {event.time}
                          </p>
                        </div>
                        <Badge variant="secondary">{event.type}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Latest News */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Newspaper className="h-5 w-5 text-public-500" />
                        Latest News
                      </CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/public/postings">
                          All News
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {latestNews.map((news, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex-1">
                          <p className="font-medium">{news.title}</p>
                          <p className="text-sm text-muted-foreground">{news.date}</p>
                        </div>
                        <Badge>{news.category}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Job Openings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-public-500" />
                        Job Openings
                      </CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/public/jobs">
                          All Jobs
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {jobPostings.map((job, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border hover:shadow-md transition-all cursor-pointer">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.department}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{job.type}</Badge>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <MiniCalendar accentColor="public" />
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-public-500" />
                      Contact Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">123 Education Lane, Anytown, ST 12345</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">(555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">info@lincolnhigh.edu</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Mon-Fri: 7:30 AM - 4:00 PM</span>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="bg-gradient-to-br from-slate-600 to-gray-700 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">By the Numbers</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold">2,847</p>
                        <p className="text-sm text-white/70">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold">186</p>
                        <p className="text-sm text-white/70">Staff</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold">95%</p>
                        <p className="text-sm text-white/70">Graduation Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold">72</p>
                        <p className="text-sm text-white/70">Years of Excellence</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 bg-white dark:bg-slate-900">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 Lincoln High School. Powered by LINKS CES.</p>
        </div>
      </footer>
    </div>
  );
}
