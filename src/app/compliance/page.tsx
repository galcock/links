'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, ArrowLeft, Shield, CheckCircle2, FileText, Lock, Users, Eye } from 'lucide-react';

const complianceAreas = [
  {
    title: 'FERPA',
    subtitle: 'Family Educational Rights and Privacy Act',
    icon: FileText,
    color: 'purple',
    items: [
      'Row-level security for all student records',
      'Audit logging with 7-year retention',
      'Parental consent management system',
      'Directory information opt-out controls',
      'Record amendment request workflow',
      'Annual notification delivery tracking',
    ],
  },
  {
    title: 'HIPAA',
    subtitle: 'Health Insurance Portability and Accountability Act',
    icon: Shield,
    color: 'blue',
    items: [
      'Separate PHI database with enhanced encryption',
      'TLS 1.3 only for health data transmission',
      'Role-based PHI access controls',
      'Business Associate Agreement management',
      'Breach notification workflow (60-day)',
      'Minimum necessary data principle enforcement',
    ],
  },
  {
    title: 'COPPA',
    subtitle: "Children's Online Privacy Protection Act",
    icon: Users,
    color: 'green',
    items: [
      'Verified parental consent for users under 13',
      'Limited data collection for minors',
      'Parental review and deletion rights',
      'No behavioral advertising to children',
      'Age-appropriate content controls',
    ],
  },
  {
    title: 'Student AI Safety',
    subtitle: 'AI Guardrails and Protections',
    icon: Lock,
    color: 'amber',
    items: [
      'Isolated AI environment (no public API exposure)',
      'Multi-layer content filtering',
      'Age-appropriate response controls',
      'Academic integrity boundaries',
      'Parental visibility into AI interactions',
      'Clear AI identification in all responses',
    ],
  },
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50 dark:from-slate-950 dark:via-purple-950 dark:to-violet-950">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 flex items-center">
              <img src="/links-logo.png" alt="LINKS" className="h-10 w-auto" />
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
            <Badge className="mb-4 bg-green-100 text-green-700">Fully Compliant</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Compliance Center
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              LINKS meets or exceeds all federal and state requirements for educational data protection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {complianceAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <area.icon className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{area.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{area.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {area.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12">
            <Card className="bg-gradient-to-br from-red-600 to-red-500 text-white border-0">
              <CardContent className="p-8 text-center">
                <Eye className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Transparency Commitment</h2>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                  We believe in complete transparency about how we handle your data. Request a copy of our Data Processing Agreement, security audit reports, or compliance documentation at any time.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="secondary" asChild>
                    <Link href="/contact">Request Documentation</Link>
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <Link href="/privacy">View Privacy Policy</Link>
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
