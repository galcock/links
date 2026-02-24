'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, Users, Clock, MapPin, DollarSign, ChevronRight, CheckCircle2 } from 'lucide-react';

const facilities = [
  { name: 'Gymnasium', capacity: 500, rate: '$100/hr', availability: 'Available', features: ['Basketball', 'Volleyball', 'Events'] },
  { name: 'Auditorium', capacity: 800, rate: '$150/hr', availability: 'Available', features: ['Stage', 'Sound', 'Lighting'] },
  { name: 'Meeting Rooms', capacity: 30, rate: '$25/hr', availability: 'Available', features: ['AV Equipment', 'WiFi'] },
  { name: 'Athletic Field', capacity: 1000, rate: '$75/hr', availability: 'Booked', features: ['Soccer', 'Football', 'Track'] },
];

const upcomingReservations = [
  { facility: 'Gymnasium', event: 'Community Basketball', date: 'Mar 5', time: '6-9 PM' },
  { facility: 'Auditorium', event: 'School Play', date: 'Mar 10', time: '7 PM' },
  { facility: 'Meeting Room A', event: 'PTA Meeting', date: 'Mar 12', time: '7 PM' },
];

export default function FacilitiesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Building className="h-8 w-8 text-community-600" /><div><h1 className="text-3xl font-bold">Facilities</h1><p className="text-muted-foreground">Rent community spaces</p></div></div>
        <Button variant="community"><Calendar className="h-4 w-4 mr-2" />Book a Space</Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader><CardTitle>Available Spaces</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {facilities.map((facility, i) => (
                  <div key={i} className="p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div><h4 className="font-semibold">{facility.name}</h4><p className="text-sm text-muted-foreground">Capacity: {facility.capacity}</p></div>
                      <div className="text-right">
                        <Badge variant={facility.availability === 'Available' ? 'success' : 'warning'}>{facility.availability}</Badge>
                        <p className="text-sm font-semibold text-community-600 mt-1">{facility.rate}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {facility.features.map((f, j) => <Badge key={j} variant="secondary" size="sm">{f}</Badge>)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="community"><CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Upcoming</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {upcomingReservations.map((res, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50"><p className="font-semibold text-sm">{res.event}</p><p className="text-xs text-muted-foreground">{res.facility}</p><p className="text-xs text-community-600 mt-1">{res.date} • {res.time}</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Check Availability</Button>
                <Button variant="outline" className="w-full justify-start"><DollarSign className="h-4 w-4 mr-2" />Rental Rates</Button>
                <Button variant="outline" className="w-full justify-start"><MapPin className="h-4 w-4 mr-2" />Campus Map</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
