'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input, SearchInput } from '@/components/ui/input';
import { ClipboardList, Download, Upload, Filter, Plus, ChevronDown, TrendingUp, TrendingDown, Minus, Edit, Eye } from 'lucide-react';

const students = [
  { id: 1, name: 'Alex Smith', hw1: 95, hw2: 88, quiz1: 92, test1: 89, avg: 91, trend: 'up' },
  { id: 2, name: 'Emily Johnson', hw1: 100, hw2: 95, quiz1: 88, test1: 94, avg: 94, trend: 'up' },
  { id: 3, name: 'Michael Chen', hw1: 82, hw2: 78, quiz1: 85, test1: 80, avg: 81, trend: 'down' },
  { id: 4, name: 'Sarah Davis', hw1: 90, hw2: 92, quiz1: 90, test1: 88, avg: 90, trend: 'same' },
  { id: 5, name: 'James Wilson', hw1: 75, hw2: 80, quiz1: 72, test1: 78, avg: 76, trend: 'up' },
  { id: 6, name: 'Emma Brown', hw1: 98, hw2: 100, quiz1: 95, test1: 97, avg: 97, trend: 'up' },
  { id: 7, name: 'Daniel Martinez', hw1: 85, hw2: 82, quiz1: 88, test1: 84, avg: 85, trend: 'same' },
  { id: 8, name: 'Olivia Taylor', hw1: 92, hw2: 90, quiz1: 94, test1: 91, avg: 92, trend: 'up' },
];

const assignments = ['HW 1', 'HW 2', 'Quiz 1', 'Test 1'];

const classStats = [
  { label: 'Class Average', value: '88%', change: '+2%' },
  { label: 'Highest Grade', value: '97%', student: 'Emma B.' },
  { label: 'Assignments', value: '4', pending: '1 to grade' },
  { label: 'Students', value: '28', present: '26 today' },
];

export default function InstructorGradebookPage() {
  const [selectedClass, setSelectedClass] = useState('Algebra II - Period 1');
  const [searchQuery, setSearchQuery] = useState('');

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getLetterGrade = (score: number) => {
    if (score >= 93) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    if (score >= 80) return 'B-';
    if (score >= 77) return 'C+';
    if (score >= 73) return 'C';
    if (score >= 70) return 'C-';
    return 'F';
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-8 w-8 text-instructor-600" />
          <div>
            <h1 className="text-3xl font-bold">Gradebook</h1>
            <p className="text-muted-foreground">Track and manage student grades</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
          <Button variant="instructor"><Plus className="h-4 w-4 mr-2" />Add Assignment</Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {classStats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-instructor-600">{stat.change || stat.student || stat.pending || stat.present}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Gradebook Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <select className="h-10 rounded-lg border bg-background px-3 font-medium">
                  <option>Algebra II - Period 1</option>
                  <option>Pre-Calculus - Period 2</option>
                  <option>Algebra I - Period 4</option>
                </select>
                <Badge variant="secondary">Q2</Badge>
              </div>
              <div className="flex gap-2">
                <SearchInput placeholder="Search students..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onClear={() => setSearchQuery('')} className="w-64" />
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Student</th>
                    {assignments.map((a) => (<th key={a} className="text-center p-3 font-medium">{a}</th>))}
                    <th className="text-center p-3 font-medium">Average</th>
                    <th className="text-center p-3 font-medium">Grade</th>
                    <th className="text-center p-3 font-medium">Trend</th>
                    <th className="text-right p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((student) => (
                    <tr key={student.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{student.name}</td>
                      <td className={`p-3 text-center ${getGradeColor(student.hw1)}`}>{student.hw1}</td>
                      <td className={`p-3 text-center ${getGradeColor(student.hw2)}`}>{student.hw2}</td>
                      <td className={`p-3 text-center ${getGradeColor(student.quiz1)}`}>{student.quiz1}</td>
                      <td className={`p-3 text-center ${getGradeColor(student.test1)}`}>{student.test1}</td>
                      <td className={`p-3 text-center font-bold ${getGradeColor(student.avg)}`}>{student.avg}%</td>
                      <td className="p-3 text-center">
                        <Badge variant={student.avg >= 90 ? 'success' : student.avg >= 80 ? 'instructor' : student.avg >= 70 ? 'warning' : 'destructive'}>
                          {getLetterGrade(student.avg)}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        {student.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500 mx-auto" />}
                        {student.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500 mx-auto" />}
                        {student.trend === 'same' && <Minus className="h-4 w-4 text-gray-400 mx-auto" />}
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="iconSm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="iconSm"><Eye className="h-4 w-4" /></Button>
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
  );
}
