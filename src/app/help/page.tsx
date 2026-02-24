'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, ArrowLeft, Search, BookOpen, MessageCircle, Video, FileText, Users, Settings, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'Getting Started', icon: BookOpen, count: 12, color: 'purple' },
  { name: 'Account & Profile', icon: Users, count: 8, color: 'blue' },
  { name: 'Messaging', icon: MessageCircle, count: 10, color: 'green' },
  { name: 'Video Conferencing', icon: Video, count: 6, color: 'amber' },
  { name: 'Gradebook', icon: FileText, count: 14, color: 'red' },
  { name: 'Settings', icon: Settings, count: 9, color: 'slate' },
];

const popularArticles = [
  { title: 'How to reset your password', category: 'Account & Profile' },
  { title: 'Starting your first video call', category: 'Video Conferencing' },
  { title: 'Understanding the gradebook', category: 'Gradebook' },
  { title: 'Setting up notifications', category: 'Settings' },
  { title: 'Messaging best practices', category: 'Messaging' },
  { title: 'Navigating your dashboard', category: 'Getting Started' },
];

export default function HelpPage() {
  const [search, setSearch] = useState('');

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
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to common questions and learn how to get the most out of LINKS.
            </p>
            
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help articles..."
                className="pl-12 pr-4 py-6 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat, i) => (
                <Card key={cat.name} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                      <cat.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-purple-600 transition-colors">{cat.name}</h3>
                      <p className="text-sm text-muted-foreground">{cat.count} articles</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Popular Articles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
            <Card>
              <CardContent className="p-0 divide-y">
                {popularArticles.map((article) => (
                  <div key={article.title} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-between group">
                    <div>
                      <h3 className="font-medium group-hover:text-purple-600 transition-colors">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">{article.category}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Support */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-purple-600 to-violet-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                  Our support team is available Monday through Friday, 8am to 6pm PT.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="secondary" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Schedule a Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
