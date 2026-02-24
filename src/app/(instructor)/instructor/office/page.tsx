'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, File, Upload, Search, Grid, List, Loader2, FolderOpen } from 'lucide-react';
import { useFolders, useFiles, useUploadFile } from '@/lib/hooks/use-files';
import { useToast } from '@/components/ui/toast';

export default function InstructorOffice() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null);

  const { data: foldersData, isLoading: foldersLoading } = useFolders({
    parentId: currentFolderId || undefined,
    limit: 100,
  });

  const { data: filesData, isLoading: filesLoading } = useFiles({
    folderId: currentFolderId || undefined,
    search: searchQuery || undefined,
    limit: 100,
  });

  const uploadMutation = useUploadFile();
  const toast = useToast();

  const folders = foldersData?.data || [];
  const files = filesData?.data || [];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (currentFolderId) formData.append('folderId', currentFolderId);

      await uploadMutation.mutateAsync(formData as any);
      toast.success('File Uploaded', `${file.name} uploaded successfully`);
    } catch (error) {
      toast.error('Upload Failed', 'Failed to upload file');
    }
  };

  if (foldersLoading || filesLoading) {
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
              <FolderOpen className="h-8 w-8 text-instructor-600" />
              My Office
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage course materials and documents
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="instructor"
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={uploadMutation.isPending}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'instructor' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'instructor' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{currentFolderId ? 'Current Folder' : 'All Files'}</CardTitle>
          </CardHeader>
          <CardContent>
            {folders.length === 0 && files.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No files or folders yet</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-4 gap-4' : 'space-y-2'}>
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className={viewMode === 'grid'
                      ? 'p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer'
                      : 'flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer'
                    }
                    onClick={() => setCurrentFolderId(folder.id)}
                  >
                    <Folder className={viewMode === 'grid' ? 'h-12 w-12 mx-auto mb-2 text-amber-500' : 'h-5 w-5 text-amber-500'} />
                    <p className={viewMode === 'grid' ? 'font-medium text-center' : 'font-medium'}>
                      {folder.name}
                    </p>
                  </div>
                ))}
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={viewMode === 'grid'
                      ? 'p-4 rounded-lg border hover:shadow-md transition-all'
                      : 'flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors'
                    }
                  >
                    <File className={viewMode === 'grid' ? 'h-12 w-12 mx-auto mb-2 text-blue-500' : 'h-5 w-5 text-blue-500'} />
                    <div className={viewMode === 'grid' ? 'text-center' : 'flex-1'}>
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((file.size || 0) / 1024)} KB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
