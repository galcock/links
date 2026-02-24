'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Upload, Loader2 } from 'lucide-react';
import { useFiles, useUploadFile } from '@/lib/hooks/use-files';
import { useToast } from '@/components/ui/toast';

export default function AdminOffice() {
  const { data: filesData, isLoading } = useFiles({ limit: 100 });
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
      toast.success('File Uploaded', `${file.name} uploaded successfully`);
    } catch (error) {
      toast.error('Upload Failed');
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FolderOpen className="h-8 w-8" />
            Office Files
          </h1>
          <div>
            <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
            <Button onClick={() => document.getElementById('file-upload')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="grid md:grid-cols-4 gap-4">
        {files.map((file) => (
          <Card key={file.id} hover="lift">
            <CardContent className="p-4">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{Math.round((file.size || 0) / 1024)} KB</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
