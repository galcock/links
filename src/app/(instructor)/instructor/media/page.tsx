'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image, Video, Music, Upload, Search, Loader2 } from 'lucide-react';
import { useFiles, useUploadFile } from '@/lib/hooks/use-files';
import { useToast } from '@/components/ui/toast';

export default function InstructorMedia() {
  const [filter, setFilter] = React.useState<'all' | 'image' | 'video' | 'audio'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: filesData, isLoading } = useFiles({
    search: searchQuery || undefined,
    mimeType: filter === 'image' ? 'image/' : 
              filter === 'video' ? 'video/' : 
              filter === 'audio' ? 'audio/' : undefined,
    limit: 100,
  });

  const uploadMutation = useUploadFile();
  const toast = useToast();

  const files = filesData?.data || [];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      await uploadMutation.mutateAsync(formData as any);
      toast.success('Media Uploaded', `${file.name} uploaded successfully`);
    } catch (error) {
      toast.error('Upload Failed', 'Failed to upload media');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-instructor-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Image className="h-8 w-8 text-instructor-600" />
              My Media
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your multimedia content
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="file"
              id="media-upload"
              className="hidden"
              accept="image/*,video/*,audio/*"
              onChange={handleFileUpload}
            />
            <Button
              variant="instructor"
              onClick={() => document.getElementById('media-upload')?.click()}
              disabled={uploadMutation.isPending}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploadMutation.isPending ? 'Uploading...' : 'Upload Media'}
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        <Button
          variant={filter === 'all' ? 'instructor' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'image' ? 'instructor' : 'outline'}
          size="sm"
          onClick={() => setFilter('image')}
        >
          <Image className="h-4 w-4 mr-2" />
          Images
        </Button>
        <Button
          variant={filter === 'video' ? 'instructor' : 'outline'}
          size="sm"
          onClick={() => setFilter('video')}
        >
          <Video className="h-4 w-4 mr-2" />
          Videos
        </Button>
        <Button
          variant={filter === 'audio' ? 'instructor' : 'outline'}
          size="sm"
          onClick={() => setFilter('audio')}
        >
          <Music className="h-4 w-4 mr-2" />
          Audio
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Media Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="text-center py-12">
                <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No media files yet</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-4 gap-4">
                {files.map((file) => {
                  const isImage = file.mimeType?.startsWith('image/');
                  const isVideo = file.mimeType?.startsWith('video/');
                  const isAudio = file.mimeType?.startsWith('audio/');

                  return (
                    <div
                      key={file.id}
                      className="p-4 rounded-lg border hover:shadow-md transition-all group"
                    >
                      <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                        {isImage && file.url ? (
                          <img src={file.url} alt={file.filename} className="w-full h-full object-cover rounded-lg" />
                        ) : isVideo ? (
                          <Video className="h-12 w-12 text-purple-500" />
                        ) : isAudio ? (
                          <Music className="h-12 w-12 text-green-500" />
                        ) : (
                          <Image className="h-12 w-12 text-blue-500" />
                        )}
                      </div>
                      <p className="font-medium text-sm truncate">{file.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((file.size || 0) / 1024)} KB
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
