'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
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
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-red-600" />
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground mb-8">Last updated: February 23, 2026</p>
            
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  LINKS Education, Inc. ("LINKS," "we," "us," or "our") is committed to protecting the privacy of students, educators, parents, and all users of our Comprehensive Education System. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We collect information in the following categories:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Account Information:</strong> Name, email address, role, organization affiliation</li>
                  <li><strong>Educational Records:</strong> Grades, assignments, attendance, curriculum data (FERPA protected)</li>
                  <li><strong>Health Information:</strong> For Student Services users only, with explicit consent (HIPAA protected)</li>
                  <li><strong>Usage Data:</strong> Login times, features accessed, device information</li>
                  <li><strong>Communications:</strong> Messages, announcements, and collaboration content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. FERPA Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  LINKS fully complies with the Family Educational Rights and Privacy Act (FERPA). We act as a "school official" with legitimate educational interest. Parents and eligible students have the right to access, review, and request amendments to educational records. We never sell student data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. HIPAA Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Health-related information processed through our Student Services module is protected under HIPAA. We maintain Business Associate Agreements with covered entities, implement encryption for PHI, and maintain separate audit logs for health data access.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-leading security measures including AES-256 encryption at rest, TLS 1.3 encryption in transit, multi-factor authentication, role-based access controls, and continuous security monitoring.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Educational records are retained for 7 years after a student's last enrollment. Health records are retained for 6 years as required by HIPAA. Users may request data deletion subject to legal retention requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For privacy-related inquiries, contact our Data Protection Officer at privacy@ceslinks.io or call 818-658-9100.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
