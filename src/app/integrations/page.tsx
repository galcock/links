'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, ArrowLeft, Plug, Check } from 'lucide-react';

const integrations = [
  { name: 'Google Workspace', category: 'Productivity', logo: '🔵', status: 'Available' },
  { name: 'Microsoft 365', category: 'Productivity', logo: '🟦', status: 'Available' },
  { name: 'Clever', category: 'SSO', logo: '🔷', status: 'Available' },
  { name: 'ClassLink', category: 'SSO', logo: '🟩', status: 'Available' },
  { name: 'Canvas LMS', category: 'LMS', logo: '🟠', status: 'Available' },
  { name: 'Schoology', category: 'LMS', logo: '🟢', status: 'Available' },
  { name: 'PowerSchool', category: 'SIS', logo: '🔴', status: 'Available' },
  { name: 'Infinite Campus', category: 'SIS', logo: '🟣', status: 'Available' },
  { name: 'Zoom', category: 'Video', logo: '🔵', status: 'Available' },
  { name: 'Google Meet', category: 'Video', logo: '🟢', status: 'Available' },
  { name: 'Khan Academy', category: 'Content', logo: '🟢', status: 'Coming Soon' },
  { name: 'Newsela', category: 'Content', logo: '🔵', status: 'Coming Soon' },
];

const categories = ['All', 'Productivity', 'SSO', 'LMS', 'SIS', 'Video', 'Content'];

export default function IntegrationsPage() {
  const [filter, setFilter] = React.useState('All');
  
  const filtered = filter === 'All' ? integrations : integrations.filter(i => i.category === filter);

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
            <Badge className="mb-4 bg-purple-100 text-purple-700">Seamless Connectivity</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Integrations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              LINKS connects with the tools your school already uses. One platform, endless possibilities.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(cat)}
                className={filter === cat ? 'bg-gradient-to-r from-purple-600 to-violet-600' : ''}
              >
                {cat}
              </Button>
            ))}
          </motion.div>

          {/* Integrations Grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((integration, i) => (
              <Card key={integration.name} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{integration.logo}</span>
                    <Badge variant={integration.status === 'Available' ? 'default' : 'secondary'} className={integration.status === 'Available' ? 'bg-green-100 text-green-700' : ''}>
                      {integration.status === 'Available' && <Check className="h-3 w-3 mr-1" />}
                      {integration.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.category}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12">
            <Card className="bg-gradient-to-br from-purple-600 to-violet-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <Plug className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Need a Custom Integration?</h2>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                  Our API-first architecture makes it easy to connect LINKS with any system. Contact us to discuss your integration needs.
                </p>
                <Button variant="secondary" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
