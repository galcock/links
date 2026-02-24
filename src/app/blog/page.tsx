'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'Introducing LINKS: The Future of Education Technology',
    excerpt: 'Today we announce the launch of the world\'s first Comprehensive Education System. Learn how LINKS is transforming education.',
    category: 'Announcement',
    date: 'February 20, 2026',
    readTime: '5 min read',
    image: '🚀',
  },
  {
    title: 'How LINKS Achieves FERPA Compliance',
    excerpt: 'A deep dive into our security architecture and how we protect student data at every level of the platform.',
    category: 'Security',
    date: 'February 18, 2026',
    readTime: '8 min read',
    image: '🔒',
  },
  {
    title: 'AI in Education: Safety First',
    excerpt: 'Our approach to integrating AI assistance in education while maintaining strict guardrails for student safety.',
    category: 'AI & Innovation',
    date: 'February 15, 2026',
    readTime: '6 min read',
    image: '🤖',
  },
  {
    title: 'Why Unified Systems Beat Point Solutions',
    excerpt: 'The hidden costs of fragmented education software and why a comprehensive system delivers better outcomes.',
    category: 'Industry',
    date: 'February 12, 2026',
    readTime: '7 min read',
    image: '🎯',
  },
  {
    title: 'Meet Our Advisory Board',
    excerpt: 'The education leaders helping shape the future of LINKS represent 80% of the US education market.',
    category: 'Company',
    date: 'February 10, 2026',
    readTime: '4 min read',
    image: '👥',
  },
  {
    title: 'Building for Accessibility: WCAG 2.1 and Beyond',
    excerpt: 'How we ensure LINKS is accessible to every student and educator, regardless of ability.',
    category: 'Engineering',
    date: 'February 8, 2026',
    readTime: '6 min read',
    image: '♿',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50 dark:from-slate-950 dark:via-purple-950 dark:to-violet-950">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl">LINKS</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/"><ArrowLeft className="h-4 w-4 mr-2" />Back to Home</Link>
          </Button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              News, insights, and updates from the LINKS team.
            </p>
          </motion.div>

          {/* Featured Post */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="bg-gradient-to-br from-purple-600 to-violet-600 p-12 flex items-center justify-center">
                    <span className="text-8xl">{posts[0].image}</span>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-purple-100 text-purple-700">{posts[0].category}</Badge>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-purple-600 transition-colors">{posts[0].title}</h2>
                    <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{posts[0].date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{posts[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Post Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4">{post.image}</div>
                    <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
