'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, Loader2 } from 'lucide-react';
import { useFiles } from '@/lib/hooks/use-files';

export default function StudentGalleries() {
  const { data: filesData, isLoading } = useFiles({ 
    limit: 50,
  });
  const images = filesData?.data || [];

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Image className="h-8 w-8" />
          Student Galleries
        </h1>
      </motion.div>
      <div className="grid md:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No images in gallery</p>
            </CardContent>
          </Card>
        ) : (
          images.map((image) => (
            <Card key={image.id} hover="lift">
              <CardContent className="p-2">
                {image.storageUrl && (
                  <img 
                    src={image.storageUrl} 
                    alt={image.name} 
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
