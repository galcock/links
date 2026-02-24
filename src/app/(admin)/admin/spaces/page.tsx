'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout, Building, Users, MapPin, Plus, Calendar, Clock, Settings, Eye, Edit } from 'lucide-react';

const facilities = [
  { name: 'Lincoln High School', type: 'High School', capacity: 1200, utilization: 95, rooms: 45 },
  { name: 'Washington Middle School', type: 'Middle School', capacity: 800, utilization: 88, rooms: 32 },
  { name: 'Jefferson Elementary', type: 'Elementary', capacity: 600, utilization: 92, rooms: 24 },
  { name: 'District Admin Building', type: 'Administrative', capacity: 150, utilization: 78, rooms: 20 },
];

const upcomingBookings = [
  { space: 'Lincoln Auditorium', event: 'School Play', date: 'Mar 5', time: '7:00 PM' },
  { space: 'Athletic Field', event: 'Soccer Tournament', date: 'Mar 8', time: '9:00 AM' },
  { space: 'Conference Room A', event: 'Board Meeting', date: 'Mar 10', time: '6:00 PM' },
];

export default function AdminSpacesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Layout className="h-8 w-8 text-admin-600" /><div><h1 className="text-3xl font-bold">Spaces & Facilities</h1><p className="text-muted-foreground">Manage district facilities and rooms</p></div></div>
        <Button variant="admin"><Plus className="h-4 w-4 mr-2" />Add Facility</Button>
      </motion.div>

      {/* Quick Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><Building className="h-8 w-8 text-admin-600 mx-auto mb-2" /><p className="text-2xl font-bold">8</p><p className="text-sm text-muted-foreground">Facilities</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Layout className="h-8 w-8 text-blue-500 mx-auto mb-2" /><p className="text-2xl font-bold">121</p><p className="text-sm text-muted-foreground">Total Rooms</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Users className="h-8 w-8 text-green-500 mx-auto mb-2" /><p className="text-2xl font-bold">2,750</p><p className="text-sm text-muted-foreground">Total Capacity</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" /><p className="text-2xl font-bold">89%</p><p className="text-sm text-muted-foreground">Avg Utilization</p></CardContent></Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Building className="h-5 w-5 text-admin-600" />Facilities</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {facilities.map((facility, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-admin-100 dark:bg-admin-900/30 flex items-center justify-center"><Building className="h-6 w-6 text-admin-600" /></div>
                      <div><h4 className="font-semibold">{facility.name}</h4><p className="text-sm text-muted-foreground">{facility.type} • {facility.rooms} rooms • Capacity: {facility.capacity}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={facility.utilization > 90 ? 'warning' : 'success'}>{facility.utilization}% utilized</Badge>
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Settings className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="admin"><CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Upcoming Bookings</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {upcomingBookings.map((booking, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50"><p className="font-semibold text-sm">{booking.event}</p><p className="text-xs text-muted-foreground">{booking.space}</p><p className="text-xs text-admin-600 mt-1">{booking.date} • {booking.time}</p></div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card><CardHeader><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Book Space</Button>
                <Button variant="outline" className="w-full justify-start"><MapPin className="h-4 w-4 mr-2" />View Map</Button>
                <Button variant="outline" className="w-full justify-start"><Settings className="h-4 w-4 mr-2" />Maintenance</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
