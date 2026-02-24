'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  GraduationCap,
  ArrowLeft,
  Users,
  Target,
  Heart,
  Globe,
  Award,
  Lightbulb,
} from 'lucide-react';

const team = [
  {
    name: 'Dr. Marie Alcock',
    role: 'Founder & CEO',
    bio: 'Nationally recognized educator, author, and consultant with decades of experience transforming education.',
    image: '👩‍🏫',
  },
  {
    name: 'Paul Negrete',
    role: 'Co-Founder & CTO',
    bio: 'Technology leader focused on building scalable, secure platforms for education.',
    image: '👨‍💻',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Student-Centered',
    description: 'Every decision we make puts students first. Their success is our mission.',
  },
  {
    icon: Users,
    title: 'Inclusive',
    description: 'Education should be accessible to everyone. No student left behind.',
  },
  {
    icon: Lightbulb,
    title: 'Innovative',
    description: 'We constantly push boundaries to create the best educational tools.',
  },
  {
    icon: Globe,
    title: 'Connected',
    description: 'Building bridges between students, educators, parents, and communities.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50 dark:from-slate-950 dark:via-purple-950 dark:to-violet-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 flex items-center">
              <img src="/links-logo.png" alt="LINKS" className="h-10 w-auto" />
            </div>
            <span className="font-bold text-xl">LINKS</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              About LINKS
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The world's first Comprehensive Education System, built to transform how we learn and teach.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20"
          >
            <Card className="bg-gradient-to-br from-red-600 to-red-500 text-white border-0">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-purple-100 leading-relaxed">
                  To eliminate the fragmented landscape of education software and replace it with a single, 
                  unified platform that serves every stakeholder in education. We believe that when students, 
                  educators, parents, and communities are connected through one seamless system, 
                  everyone succeeds.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-8">Leadership</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">{member.image}</div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-red-600 font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Advisory Board */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Advisory Board</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  LINKS is backed by an advisory board representing approximately <strong>80% of the U.S. education market</strong> and <strong>50% globally</strong>. 
                  Our advisors bring decades of experience in K-12 education, higher education, and educational technology.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
