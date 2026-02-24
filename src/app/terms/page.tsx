'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
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
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-muted-foreground mb-8">Last updated: February 23, 2026</p>
            
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using the LINKS Comprehensive Education System ("Service"), you agree to be bound by these Terms of Service. If you are using the Service on behalf of an organization (such as a school or district), you represent that you have authority to bind that organization to these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  LINKS provides a unified cloud-based education platform including student information management, learning management, communication tools, scheduling, assessment, and related educational services. The Service is designed for K-12 educational institutions and their stakeholders.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must immediately notify us of any unauthorized use. Users under 13 require verified parental consent (COPPA compliance).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe intellectual property rights</li>
                  <li>Transmit malicious code or interfere with the Service</li>
                  <li>Attempt to gain unauthorized access to any systems</li>
                  <li>Use the Service for any purpose other than legitimate educational activities</li>
                  <li>Share login credentials or allow unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data Ownership</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Educational institutions retain ownership of all student data and educational records. LINKS processes this data solely to provide the Service. We do not sell, rent, or monetize student data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We target 99.95% uptime and will provide reasonable notice for scheduled maintenance. We are not liable for interruptions beyond our reasonable control.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate with 30 days written notice. Upon termination, we will provide data export capabilities and delete data according to our retention policies and legal requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Questions about these Terms should be directed to legal@ceslinks.io or 818-658-9100.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
