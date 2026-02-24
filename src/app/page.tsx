'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Video,
  Shield,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Play,
  Check,
  Star,
  Globe,
  Zap,
  Heart,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const roles = [
  { name: 'Student', icon: '📚', gradient: 'from-purple-500 to-purple-600', href: '/login?role=student' },
  { name: 'Instructor', icon: '🎓', gradient: 'from-amber-500 to-amber-600', href: '/login?role=instructor' },
  { name: 'Parent', icon: '👨‍👩‍👧‍👦', gradient: 'from-emerald-500 to-emerald-600', href: '/login?role=parent' },
  { name: 'Administrator', icon: '⚙️', gradient: 'from-orange-500 to-orange-600', href: '/login?role=admin' },
  { name: 'Services', icon: '💙', gradient: 'from-blue-500 to-blue-600', href: '/login?role=services' },
  { name: 'Community', icon: '🤝', gradient: 'from-teal-500 to-teal-600', href: '/login?role=community' },
  { name: 'Public', icon: '🌐', gradient: 'from-slate-500 to-slate-600', href: '/public' },
];
const features = [
  {
    icon: BookOpen,
    title: 'Unified Learning',
    description: 'All educational tools in one seamless platform',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Intelligent calendar with automated reminders',
  },
  {
    icon: MessageSquare,
    title: 'Real-time Communication',
    description: 'Instant messaging, announcements, and updates',
  },
  {
    icon: Video,
    title: 'Video Conferencing',
    description: 'Built-in video calls for remote learning',
  },
  {
    icon: Shield,
    title: 'FERPA & HIPAA Compliant',
    description: 'Enterprise-grade security for student data',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Assistant',
    description: 'Smart AI with educational guardrails',
  },
];

const stats = [
  { value: '500K+', label: 'Students' },
  { value: '50K+', label: 'Educators' },
  { value: '1,000+', label: 'Schools' },
  { value: '99.9%', label: 'Uptime' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50 dark:from-slate-950 dark:via-purple-950 dark:to-violet-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/links-logo.png" alt="LINKS" className="h-10 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-red-600 transition-colors">
              Features
            </Link>
            <Link href="#roles" className="text-sm font-medium hover:text-red-600 transition-colors">
              Portals
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-red-600 transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-red-600 transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-6 bg-red-100 text-red-700 dark:bg-purple-900/30 dark:text-purple-400">
              <Sparkles className="h-3 w-3 mr-1" />
              The Future of Education is Here
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Comprehensive Education System
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              The world's first unified education platform. Replace fragmented software with a single,
              student-centered portal that connects everyone in education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600">
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#demo">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border shadow-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {roles.map((role, i) => (
                  <motion.div
                    key={role.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`aspect-square rounded-xl bg-gradient-to-br ${role.gradient} flex flex-col items-center justify-center text-white shadow-lg hover:scale-105 transition-transform cursor-pointer`}
                  >
                    <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{role.icon}</span>
                    <span className="text-sm font-semibold drop-shadow-md">{role.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete suite of tools designed to transform education
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-24 px-6 bg-gradient-to-br from-purple-900 to-violet-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              7 Portals
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              One Platform, Seven Experiences
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Every user gets a tailored experience with role-specific tools and interfaces
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.slice(0, 4).map((role, i) => (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={role.href}>
                  <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer group h-full">
                    <CardContent className="p-6 text-center">
                      <span className="text-5xl mb-4 block">{role.icon}</span>
                      <h3 className="text-xl font-semibold text-white mb-2">{role.name}</h3>
                      <p className="text-white/60 text-sm">Access Portal</p>
                      <ChevronRight className="h-5 w-5 mx-auto mt-4 text-white/60 group-hover:translate-x-1 transition-transform" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4 max-w-3xl mx-auto">
            {roles.slice(4).map((role, i) => (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={role.href}>
                  <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <span className="text-4xl mb-3 block">{role.icon}</span>
                      <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of schools already using LINKS to create better educational outcomes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600">
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center mb-4">
                <img src="/links-logo.png" alt="LINKS" className="h-10 w-auto" />
              </Link>
              <p className="text-sm text-muted-foreground">
                The world's first Comprehensive Education System.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/security" className="hover:text-foreground transition-colors">Security</Link></li>
                <li><Link href="/integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/compliance" className="hover:text-foreground transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 CES Links. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Founded by Dr. Marie Alcock | Contact: admin@ceslinks.io | 818-658-9100
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
