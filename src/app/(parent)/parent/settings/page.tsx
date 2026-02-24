'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon, User, Save, Loader2 } from 'lucide-react';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useUpdateUser } from '@/lib/hooks/use-users';
import { useToast } from '@/components/ui/toast';

export default function ParentSettings() {
  const { data: user, isLoading } = useCurrentUser();
  const updateMutation = useUpdateUser(user?.id || '');
  const toast = useToast();

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user?.id) return;
    try {
      await updateMutation.mutateAsync(formData);
      toast.success('Settings Updated', 'Your settings have been saved');
    } catch (error) {
      toast.error('Update Failed', 'Failed to update settings');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-parent-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-parent-600" />
          Settings
        </h1>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-parent-600" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              type="tel"
            />
          </div>
          <div className="flex justify-end">
            <Button variant="parent" onClick={handleSave} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
