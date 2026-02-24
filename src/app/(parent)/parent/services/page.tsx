'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, Clock, User, Loader2 } from 'lucide-react';
import { useServices } from '@/lib/hooks/use-services';

export default function ParentServices() {
  const { data: servicesData, isLoading } = useServices({ limit: 50 });
  const services = servicesData?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-parent-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Heart className="h-8 w-8 text-parent-600" />
          Student Services
        </h1>
        <p className="text-muted-foreground mt-1">
          View services your children are receiving
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {services.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="py-12 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No services currently active</p>
            </CardContent>
          </Card>
        ) : (
          services.map((service) => (
            <Card key={service.id} hover="lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{service.type}</CardTitle>
                  <Badge variant="parent">{service.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {service.notes || 'No description'}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {service.student?.user?.firstName} {service.student?.user?.lastName}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </motion.div>
    </div>
  );
}
