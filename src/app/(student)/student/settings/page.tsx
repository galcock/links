'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Shield,
  Mail,
  Smartphone,
  Loader2,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useUpdateUser } from '@/lib/hooks/use-users';
import { useToast } from '@/components/ui/toast';

export default function StudentSettings() {
  const { data: user, isLoading } = useCurrentUser();
  const updateMutation = useUpdateUser(user?.id || '');
  const toast = useToast();

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [notifications, setNotifications] = React.useState({
    emailAssignments: true,
    emailGrades: true,
    emailMessages: true,
    pushAssignments: true,
    pushMessages: true,
  });

  // Initialize form data when user loads
  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user?.id) return;

    try {
      await updateMutation.mutateAsync(formData);
      toast.success('Profile Updated', 'Your profile has been updated successfully');
    } catch (error) {
      toast.error('Update Failed', 'Failed to update profile');
    }
  };

  const handleSaveNotifications = async () => {
    toast.success('Notification Settings Updated', 'Your preferences have been saved');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-student-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-student-600" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and settings
        </p>
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-student-600" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="student"
                onClick={handleSaveProfile}
                disabled={updateMutation.isPending}
              >
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
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-student-600" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose how you want to be notified about updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Assignment Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified about new assignments</p>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={notifications.emailAssignments}
                      onChange={(e) => setNotifications({ 
                        ...notifications, 
                        emailAssignments: e.target.checked 
                      })}
                      className="h-4 w-4"
                    />
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={notifications.pushAssignments}
                      onChange={(e) => setNotifications({ 
                        ...notifications, 
                        pushAssignments: e.target.checked 
                      })}
                      className="h-4 w-4"
                    />
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </label>
                </div>
              </div>

              <div className="border-t pt-3" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Grade Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified when grades are posted</p>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={notifications.emailGrades}
                      onChange={(e) => setNotifications({ 
                        ...notifications, 
                        emailGrades: e.target.checked 
                      })}
                      className="h-4 w-4"
                    />
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </label>
                </div>
              </div>

              <div className="border-t pt-3" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Message Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={notifications.emailMessages}
                      onChange={(e) => setNotifications({ 
                        ...notifications, 
                        emailMessages: e.target.checked 
                      })}
                      className="h-4 w-4"
                    />
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={notifications.pushMessages}
                      onChange={(e) => setNotifications({ 
                        ...notifications, 
                        pushMessages: e.target.checked 
                      })}
                      className="h-4 w-4"
                    />
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="student" onClick={handleSaveNotifications}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-student-600" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your password and account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your password regularly</p>
              </div>
              <Button variant="outline">
                Change
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-student-600" />
              Preferences
            </CardTitle>
            <CardDescription>
              Customize your experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <select className="w-full p-2 border rounded-lg">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <select className="w-full p-2 border rounded-lg">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Time Zone</Label>
              <select className="w-full p-2 border rounded-lg">
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
