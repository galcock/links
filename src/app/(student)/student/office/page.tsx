'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Folder,
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Upload,
  Search,
  Grid,
  List,
  MoreVertical,
  Download,
  Trash2,
  Share2,
  Loader2,
  FolderOpen,
} from 'lucide-react';
import { useFolders, useFiles, useUploadFile, useDeleteFile } from '@/lib/hooks/use-files';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useToast } from '@/components/ui/toast';

export default function StudentMyOffice() {
  const { data: user } = useCurrentUser();
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = React.useState('');

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
  const deleteMutation = useDeleteFile();
  const toast = useToast();

  const isLoading = foldersLoading || filesLoading;

  const folders = foldersData?.data || [];
  const files = filesData?.data || [];

  // Calculate storage stats
  const totalSize = React.useMemo(() => {
    return files.reduce((sum, file) => sum + (file.size || 0), 0);
  }, [files]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-5 w-5 text-blue-500" />;
    if (mimeType.startsWith('video/')) return <Video className="h-5 w-5 text-purple-500" />;
    if (mimeType.startsWith('audio/')) return <Music className="h-5 w-5 text-green-500" />;
    if (mimeType.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    if (mimeType.includes('zip') || mimeType.includes('archive')) 
      return <Archive className="h-5 w-5 text-amber-500" />;
    return <File className="h-5 w-5 text-muted-foreground" />;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (currentFolderId) formData.append('folderId', currentFolderId);

      await uploadMutation.mutateAsync(formData as any);
      toast.success('File Uploaded', `${file.name} has been uploaded successfully`);
    } catch (error) {
      toast.error('Upload Failed', 'Failed to upload file');
    }
  };

  const handleDeleteFile = async (fileId: string, fileName: string) => {
    if (!confirm(`Delete ${fileName}?`)) return;

    try {
      await deleteMutation.mutateAsync(fileId);
      toast.success('File Deleted', `${fileName} has been deleted`);
    } catch (error) {
      toast.error('Delete Failed', 'Failed to delete file');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-student-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FolderOpen className="h-8 w-8 text-student-600" />
              My Office
            </h1>
            <p className="text-muted-foreground mt-1">
              Organize and access your files and documents
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
              variant="student"
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={uploadMutation.isPending}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Storage Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">{files.length}</p>
              </div>
              <File className="h-8 w-8 text-student-600" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Folders</p>
                <p className="text-2xl font-bold">{folders.length}</p>
              </div>
              <Folder className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">{formatBytes(totalSize)}</p>
              </div>
              <Archive className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-student-500"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'student' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'student' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Files and Folders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {currentFolderId ? 'Current Folder' : 'All Files'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {folders.length === 0 && files.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">No files or folders yet</p>
                <p className="text-sm text-muted-foreground">
                  Upload files to get started
                </p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid md:grid-cols-3 lg:grid-cols-4 gap-4' 
                : 'space-y-2'
              }>
                {/* Folders */}
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className={viewMode === 'grid'
                      ? 'p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer'
                      : 'flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer'
                    }
                    onClick={() => setCurrentFolderId(folder.id)}
                  >
                    <Folder className={viewMode === 'grid' 
                      ? 'h-12 w-12 mx-auto mb-2 text-amber-500'
                      : 'h-5 w-5 text-amber-500'
                    } />
                    <div className={viewMode === 'grid' ? 'text-center' : 'flex-1'}>
                      <p className={viewMode === 'grid' ? 'font-medium' : 'font-medium text-sm'}>
                        {folder.name}
                      </p>
                      {/* Folder description removed - not in type */}
                    </div>
                  </div>
                ))}

                {/* Files */}
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={viewMode === 'grid'
                      ? 'p-4 rounded-lg border hover:shadow-md transition-all group'
                      : 'flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group'
                    }
                  >
                    <div className={viewMode === 'grid' 
                      ? 'flex justify-center mb-2'
                      : ''
                    }>
                      {getFileIcon(file.mimeType || '')}
                    </div>
                    <div className={viewMode === 'grid' ? 'text-center flex-1' : 'flex-1'}>
                      <p className={viewMode === 'grid' 
                        ? 'font-medium text-sm truncate' 
                        : 'font-medium text-sm'
                      }>
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(file.size || 0)}
                      </p>
                    </div>
                    <div className={viewMode === 'grid'
                      ? 'flex justify-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity'
                      : 'flex gap-1'
                    }>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFile(file.id, file.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
