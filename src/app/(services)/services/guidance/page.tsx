'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Compass, Loader2 } from 'lucide-react';
import { useServices } from '@/lib/hooks/use-services';

export default function Guidance() {
  const { data: servicesData, isLoading } = useServices({ 
    limit: 100,
    type: 'GUIDANCE',
  });
  const services = servicesData?.data || [];

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Compass className="h-8 w-8" />
          Guidance Services
        </h1>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6">
        {services.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No active guidance services</p>
            </CardContent>
          </Card>
        ) : (
          services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>
                  {service.student?.user?.firstName} {service.student?.user?.lastName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge>{service.status}</Badge>
                <p className="text-sm text-muted-foreground mt-2">{service.notes}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
