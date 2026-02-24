'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Clock, Send, Building, MessageSquare } from 'lucide-react';

const contacts = [
  { department: 'Main Office', phone: '(555) 123-4567', email: 'info@school.edu', hours: '8 AM - 4 PM' },
  { department: 'Admissions', phone: '(555) 123-4568', email: 'admissions@school.edu', hours: '8 AM - 5 PM' },
  { department: 'Athletics', phone: '(555) 123-4569', email: 'athletics@school.edu', hours: '7 AM - 6 PM' },
  { department: 'Community Services', phone: '(555) 123-4570', email: 'community@school.edu', hours: '9 AM - 5 PM' },
];

const locations = [
  { name: 'District Office', address: '123 Education Blvd, Anytown, ST 12345' },
  { name: 'Lincoln High School', address: '456 School Street, Anytown, ST 12345' },
  { name: 'Washington Middle School', address: '789 Learning Lane, Anytown, ST 12345' },
];

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-3"><Mail className="h-8 w-8 text-slate-600" />Contact Us</h1>
        <p className="text-muted-foreground mt-1">Get in touch with our district</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" />Send a Message</CardTitle><CardDescription>We'll respond within 1-2 business days</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Your Email" type="email" />
                </div>
                <Input placeholder="Subject" />
                <select className="w-full h-10 rounded-lg border bg-background px-3">
                  <option>Select Department</option>
                  <option>General Inquiry</option>
                  <option>Admissions</option>
                  <option>Athletics</option>
                  <option>Community Services</option>
                </select>
                <textarea className="w-full h-32 px-3 py-2 rounded-lg border bg-background resize-none" placeholder="Your Message" />
                <Button className="w-full md:w-auto"><Send className="h-4 w-4 mr-2" />Send Message</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Department Contacts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle>Department Contacts</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {contacts.map((contact, i) => (
                  <div key={i} className="p-4 rounded-xl border">
                    <h4 className="font-semibold mb-2">{contact.department}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2"><Phone className="h-4 w-4" />{contact.phone}</p>
                      <p className="flex items-center gap-2"><Mail className="h-4 w-4" />{contact.email}</p>
                      <p className="flex items-center gap-2"><Clock className="h-4 w-4" />{contact.hours}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Locations</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {locations.map((loc, i) => (
                  <div key={i} className="p-3 rounded-lg border"><p className="font-semibold text-sm">{loc.name}</p><p className="text-xs text-muted-foreground">{loc.address}</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Office Hours</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Monday - Friday</span><span className="font-medium">8:00 AM - 4:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday - Sunday</span><span className="font-medium">Closed</span></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
