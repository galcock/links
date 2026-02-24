'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import {
  Users,
  Plus,
  MessageSquare,
  Video,
  Calendar,
  FileText,
  Star,
  ChevronRight,
  UserPlus,
  Settings,
} from 'lucide-react';

const myTeams = [
  {
    id: 1,
    name: 'Math Study Group',
    members: 6,
    course: 'Algebra II',
    nextMeeting: 'Today, 4:00 PM',
    unread: 3,
    avatar: '📐',
  },
  {
    id: 2,
    name: 'Biology Lab Partners',
    members: 4,
    course: 'Biology',
    nextMeeting: 'Tomorrow, 2:00 PM',
    unread: 0,
    avatar: '🔬',
  },
  {
    id: 3,
    name: 'History Project Team',
    members: 5,
    course: 'World History',
    nextMeeting: 'Wednesday, 3:30 PM',
    unread: 7,
    avatar: '📚',
  },
  {
    id: 4,
    name: 'Debate Club',
    members: 12,
    course: 'Extracurricular',
    nextMeeting: 'Friday, 3:00 PM',
    unread: 2,
    avatar: '🎤',
  },
];

const teamMembers = [
  { name: 'Sarah Johnson', role: 'Team Lead', status: 'online', avatar: undefined },
  { name: 'Mike Chen', role: 'Member', status: 'online', avatar: undefined },
  { name: 'Emily Davis', role: 'Member', status: 'offline', avatar: undefined },
  { name: 'Alex Kim', role: 'Member', status: 'away', avatar: undefined },
  { name: 'Jordan Smith', role: 'Member', status: 'online', avatar: undefined },
];

const recentActivity = [
  { user: 'Sarah', action: 'shared a file', item: 'Chapter 5 Notes.pdf', time: '10 min ago' },
  { user: 'Mike', action: 'sent a message', item: 'Meeting reminder', time: '1 hour ago' },
  { user: 'Emily', action: 'completed', item: 'Problem Set 3', time: '2 hours ago' },
  { user: 'Alex', action: 'scheduled', item: 'Study Session', time: 'Yesterday' },
];

const sharedFiles = [
  { name: 'Chapter 5 Notes.pdf', size: '2.4 MB', uploader: 'Sarah', date: 'Today' },
  { name: 'Practice Problems.docx', size: '156 KB', uploader: 'Mike', date: 'Yesterday' },
  { name: 'Study Guide.pdf', size: '890 KB', uploader: 'You', date: '2 days ago' },
];

export default function StudentTeamsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-student-600" />
          <div>
            <h1 className="text-3xl font-bold">Teams</h1>
            <p className="text-muted-foreground">
              Collaborate with classmates on projects and study groups
            </p>
          </div>
        </div>
        <Button variant="student">
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Teams List */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>My Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {myTeams.map((team) => (
                    <div
                      key={team.id}
                      className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-student-100 dark:bg-student-900/30 flex items-center justify-center text-2xl">
                            {team.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold">{team.name}</h4>
                            <p className="text-sm text-muted-foreground">{team.course}</p>
                          </div>
                        </div>
                        {team.unread > 0 && (
                          <Badge variant="student">{team.unread}</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {team.members} members
                        </span>
                        <span className="text-student-600">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {team.nextMeeting}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="student" size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Math Study Group</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                  >
                    <Avatar fallback={activity.user} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="text-student-600">{activity.item}</span>
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Members */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Members
                  </CardTitle>
                  <Button variant="ghost" size="iconSm">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Math Study Group</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <Avatar
                      fallback={member.name}
                      size="sm"
                      status={member.status as 'online' | 'offline' | 'away'}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Shared Files */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Shared Files
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sharedFiles.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="h-8 w-8 rounded-lg bg-student-100 dark:bg-student-900/30 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-student-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.uploader} • {file.date}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Files
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="student">
              <CardContent className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Start Video Call
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Team Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
