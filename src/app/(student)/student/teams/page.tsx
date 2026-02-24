'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import {
  Users,
  UserPlus,
  MessageCircle,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Plus,
  Loader2,
  Crown,
} from 'lucide-react';
import { useTeams, useTeamMembers } from '@/lib/hooks/use-teams';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { useToast } from '@/components/ui/toast';

export default function StudentTeams() {
  const { data: user } = useCurrentUser();
  const { data: teamsData, isLoading } = useTeams({ limit: 50 });
  const [selectedTeamId, setSelectedTeamId] = React.useState<string | null>(null);
  
  const { data: membersData } = useTeamMembers(selectedTeamId || '');
  const toast = useToast();

  const teams = teamsData?.data || [];
  const selectedTeam = teams.find(t => t.id === selectedTeamId);
  const members = membersData?.data || [];

  // Set first team as selected
  React.useEffect(() => {
    if (teams.length > 0 && !selectedTeamId) {
      setSelectedTeamId(teams[0].id);
    }
  }, [teams, selectedTeamId]);

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
              <Users className="h-8 w-8 text-student-600" />
              My Teams
            </h1>
            <p className="text-muted-foreground mt-1">
              Collaborate with classmates on group projects
            </p>
          </div>
          <Button variant="student">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
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
                <p className="text-sm text-muted-foreground">Active Teams</p>
                <p className="text-2xl font-bold">{teams.length}</p>
              </div>
              <Users className="h-8 w-8 text-student-600" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">
                  {teams.reduce((sum, team) => sum + (team._count?.members || 0), 0)}
                </p>
              </div>
              <UserPlus className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Award className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {teams.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-lg mb-2">No Teams Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create or join a team to start collaborating with classmates
              </p>
              <Button variant="student">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Team
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Teams List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>My Teams</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTeamId === team.id
                        ? 'bg-student-50 dark:bg-student-900/20 border-student-500'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedTeamId(team.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-student-100 dark:bg-student-900/30 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-student-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{team.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {team._count?.members || 0} members
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {selectedTeam && (
              <>
                {/* Team Header */}
                <Card variant="student">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedTeam.name}</h2>
                        <p className="text-muted-foreground mt-1">
                          {selectedTeam.description || 'No description'}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="student">
                            {selectedTeam._count?.members || 0} Members
                          </Badge>
                          {/* Course badge removed - not in Team type */}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Team Members</CardTitle>
                      <Button variant="outline" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[].map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-md transition-all"
                        >
                          <div className="h-12 w-12 rounded-full bg-student-100 dark:bg-student-900/30 flex items-center justify-center">
                            {member.user.avatarUrl ? (
                              <img
                                src={member.user.avatarUrl}
                                alt={member.user.firstName}
                                className="h-full w-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-lg font-semibold text-student-600">
                                {member.user.firstName[0]}
                                {member.user.lastName[0]}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">
                                {member.user.firstName} {member.user.lastName}
                              </p>
                              {member.role === 'LEADER' && (
                                <Crown className="h-4 w-4 text-amber-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground capitalize">
                              {member.role.toLowerCase()}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Team Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[].slice(0, 5).map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-lg"
                      >
                        <div className="h-8 w-8 rounded-full bg-student-100 dark:bg-student-900/30 flex items-center justify-center text-sm font-semibold text-student-600">
                          {member.user.firstName[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              {member.user.firstName} {member.user.lastName}
                            </span>
                            {' '}joined the team
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(member.joinedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Team Performance */}
                <Card variant="student">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Team Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-3xl font-bold">A</p>
                        <p className="text-sm text-muted-foreground">Avg. Grade</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold">8</p>
                        <p className="text-sm text-muted-foreground">Tasks Completed</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold">92%</p>
                        <p className="text-sm text-muted-foreground">On-Time Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
