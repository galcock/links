'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, ArrowLeft, Shield, Lock, Key, Server, Eye, FileCheck, CheckCircle2 } from 'lucide-react';

const securityFeatures = [
  { icon: Lock, title: 'Encryption', description: 'AES-256 encryption at rest, TLS 1.3 in transit' },
  { icon: Key, title: 'Authentication', description: 'MFA, SSO (SAML 2.0), OAuth2, WebAuthn support' },
  { icon: Server, title: 'Infrastructure', description: 'SOC 2 Type II compliant cloud infrastructure' },
  { icon: Eye, title: 'Monitoring', description: '24/7 security monitoring and threat detection' },
  { icon: FileCheck, title: 'Auditing', description: 'Comprehensive audit logs with 7-year retention' },
  { icon: Shield, title: 'Access Control', description: 'Role-based and attribute-based access controls' },
];

const certifications = [
  'SOC 2 Type II',
  'FERPA Compliant',
  'HIPAA Compliant',
  'COPPA Compliant',
  'GDPR Ready',
  'ISO 27001',
];

export default function SecurityPage() {
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
            <Badge className="mb-4 bg-green-100 text-green-700">Enterprise-Grade Security</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Security & Compliance
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              LINKS is built from the ground up with security and compliance at its core. We protect student data with the highest standards.
            </p>
          </motion.div>

          {/* Certifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert) => (
                <Badge key={cert} variant="outline" className="text-sm py-2 px-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  {cert}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Security Features */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Security Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, i) => (
                <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Trust Center */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-purple-600 to-violet-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Security is Our Priority</h2>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                  We conduct regular penetration testing, maintain a bug bounty program, and undergo annual third-party security audits. Our security team monitors for threats 24/7.
                </p>
                <Button variant="secondary" asChild>
                  <Link href="/contact">Contact Security Team</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
