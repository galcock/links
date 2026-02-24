'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { MiniCalendar } from '@/components/features/calendar';
import {
  Users,
  GraduationCap,
  DollarSign,
  BarChart3,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  FileText,
  Settings,
  Shield,
  Activity,
  PieChart,
} from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '2,847', icon: Users, change: '+127', trend: 'up' },
  { label: 'Staff Members', value: '186', icon: GraduationCap, change: '+8', trend: 'up' },
  { label: 'Budget Used', value: '67%', icon: DollarSign, change: null, trend: null },
  { label: 'Avg. Attendance', value: '94.2%', icon: Activity, change: '+1.3%', trend: 'up' },
];

const alerts = [
  { type: 'warning', title: 'Budget Review Due', description: 'Q2 budget review is due in 3 days', time: 'Due Mar 15' },
  { type: 'info', title: 'New Staff Onboarding', description: '3 new teachers starting next week', time: 'Mar 18' },
  { type: 'success', title: 'Compliance Report', description: 'Annual compliance report submitted', time: 'Completed' },
];

const departments = [
  { name: 'Mathematics', staff: 18, students: 412, performance: 87 },
  { name: 'Sciences', staff: 22, students: 485, performance: 91 },
  { name: 'English', staff: 16, students: 398, performance: 84 },
  { name: 'Social Studies', staff: 14, students: 356, performance: 82 },
];

const recentReports = [
  { name: 'Enrollment Statistics', date: 'Today', status: 'ready' },
  { name: 'Financial Summary Q1', date: 'Yesterday', status: 'ready' },
  { name: 'Staff Performance Review', date: 'Mar 10', status: 'pending' },
  { name: 'Facility Assessment', date: 'Mar 8', status: 'ready' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Administration Dashboard ⚙️
          </h1>
          <p className="text-muted-foreground mt-1">
            Lincoln High School • Academic Year 2025-26
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="admin">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <Card key={stat.label} variant="admin" hover="lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    {stat.change && (
                      <span className={`text-xs flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
                <stat.icon className="h-8 w-8 text-admin-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-admin-500" />
                    Alerts & Notifications
                  </CardTitle>
                  <Badge variant="admin">{alerts.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 p-4 rounded-xl ${
                      alert.type === 'warning' ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200' :
                      alert.type === 'success' ? 'bg-green-50 dark:bg-green-950/30 border border-green-200' :
                      'bg-blue-50 dark:bg-blue-950/30 border border-blue-200'
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                      alert.type === 'success' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {alert.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
                      {alert.type === 'success' && <CheckCircle className="h-5 w-5" />}
                      {alert.type === 'info' && <Activity className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                    <Badge variant="secondary" size="sm">{alert.time}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Department Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-admin-500" />
                    Department Overview
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    Manage
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Department</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Staff</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Students</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((dept, i) => (
                        <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-2 font-medium">{dept.name}</td>
                          <td className="py-3 px-2 text-center">{dept.staff}</td>
                          <td className="py-3 px-2 text-center">{dept.students}</td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <Progress value={dept.performance} className="h-2 flex-1" indicatorClassName="bg-admin-500" />
                              <span className="text-sm font-medium w-10">{dept.performance}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MiniCalendar accentColor="admin" />
          </motion.div>

          {/* Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-admin-500" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentReports.map((report, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.date}</p>
                    </div>
                    <Badge variant={report.status === 'ready' ? 'success' : 'warning'} size="sm">
                      {report.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="admin">
              <CardContent className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Budget Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Compliance Center
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <PieChart className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
