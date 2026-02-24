'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input, SearchInput } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { 
  ClipboardList, 
  Download, 
  Plus, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Edit, 
  Eye, 
  Loader2 
} from 'lucide-react';
import { useCourses } from '@/lib/hooks/use-courses';
import { useGrades, useCreateGrade, useUpdateGrade } from '@/lib/hooks/use-grades';
import { useAssignments } from '@/lib/hooks/use-assignments';
import { useStudents } from '@/lib/hooks/use-students';
import { useToast } from '@/components/ui/toast';

export default function InstructorGradebookPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingGrade, setEditingGrade] = useState<{
    studentId: string;
    assignmentId: string;
    currentScore?: number;
  } | null>(null);
  const [gradeScore, setGradeScore] = useState('');

  const toast = useToast();
  
  const { data: coursesData, isLoading: coursesLoading } = useCourses({ status: 'ACTIVE' });
  const { data: gradesData, isLoading: gradesLoading } = useGrades({
    courseId: selectedCourseId,
    limit: 500,
  });
  const { data: assignmentsData } = useAssignments({
    courseId: selectedCourseId,
    status: 'ACTIVE',
    limit: 100,
  });
  const { data: studentsData } = useStudents({ limit: 100 });

  const createGradeMutation = useCreateGrade();
  const updateGradeMutation = useUpdateGrade(editingGrade?.studentId || '');

  // Set first course as selected when courses load
  React.useEffect(() => {
    if (coursesData?.data && coursesData.data.length > 0 && !selectedCourseId) {
      setSelectedCourseId(coursesData.data[0].id);
    }
  }, [coursesData, selectedCourseId]);

  // Calculate class statistics
  const classStats = React.useMemo(() => {
    if (!gradesData?.data || gradesData.data.length === 0) {
      return {
        average: 0,
        highest: 0,
        highestStudent: '',
        totalAssignments: 0,
        totalStudents: 0,
      };
    }

    const grades = gradesData.data.filter(g => g.percentage !== null);
    const average = grades.reduce((sum, g) => sum + (g.percentage || 0), 0) / grades.length;
    const highest = Math.max(...grades.map(g => g.percentage || 0));
    const highestGrade = grades.find(g => g.percentage === highest);

    return {
      average: Math.round(average),
      highest: Math.round(highest),
      highestStudent: highestGrade?.student?.user 
        ? `${highestGrade.student.user.firstName} ${highestGrade.student.user.lastName.charAt(0)}.`
        : '',
      totalAssignments: assignmentsData?.meta.total || 0,
      totalStudents: studentsData?.meta.total || 0,
    };
  }, [gradesData, assignmentsData, studentsData]);

  // Build gradebook grid data
  const gradebookData = React.useMemo(() => {
    if (!studentsData?.data || !assignmentsData?.data) return [];

    return studentsData.data.map(student => {
      const studentGrades = gradesData?.data.filter(g => g.studentId === student.id) || [];
      const assignmentGrades: Record<string, number | null> = {};
      let totalPercentage = 0;
      let gradeCount = 0;

      assignmentsData.data.forEach(assignment => {
        const grade = studentGrades.find(g => g.assignmentId === assignment.id);
        assignmentGrades[assignment.id] = grade?.score || null;
        if (grade?.percentage !== null && grade?.percentage !== undefined) {
          totalPercentage += grade.percentage;
          gradeCount++;
        }
      });

      const average = gradeCount > 0 ? Math.round(totalPercentage / gradeCount) : 0;

      return {
        studentId: student.id,
        studentName: `${student.user.firstName} ${student.user.lastName}`,
        assignmentGrades,
        average,
        trend: 'same' as 'up' | 'down' | 'same', // Would calculate from historical data
      };
    });
  }, [studentsData, assignmentsData, gradesData]);

  const filteredData = gradebookData.filter(row =>
    row.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'text-muted-foreground';
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

  const handleEditGrade = (studentId: string, assignmentId: string, currentScore?: number) => {
    setEditingGrade({ studentId, assignmentId, currentScore: currentScore || undefined });
    setGradeScore(currentScore?.toString() || '');
  };

  const handleSaveGrade = async () => {
    if (!editingGrade || !selectedCourseId) return;

    const score = parseFloat(gradeScore);
    if (isNaN(score) || score < 0 || score > 100) {
      toast.error('Invalid score', 'Please enter a valid score between 0 and 100');
      return;
    }

    try {
      await createGradeMutation.mutateAsync({
        studentId: editingGrade.studentId,
        courseId: selectedCourseId,
        assignmentId: editingGrade.assignmentId,
        score,
        maxScore: 100,
      });
      toast.success('Grade saved', 'The grade has been updated successfully');
      setEditingGrade(null);
      setGradeScore('');
    } catch (error) {
      toast.error('Failed to save grade', 'Please try again');
    }
  };

  if (coursesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-instructor-600" />
      </div>
    );
  }

  if (!coursesData?.data || coursesData.data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ClipboardList className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
          <p className="text-muted-foreground">Create a course to start managing grades</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <ClipboardList className="h-8 w-8 text-instructor-600" />
          <div>
            <h1 className="text-3xl font-bold">Gradebook</h1>
            <p className="text-muted-foreground">Track and manage student grades</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="instructor">
            <Plus className="h-4 w-4 mr-2" />
            Add Assignment
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
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Class Average</p>
            <p className="text-2xl font-bold">{classStats.average}%</p>
            <p className="text-xs text-instructor-600">Current term</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Highest Grade</p>
            <p className="text-2xl font-bold">{classStats.highest}%</p>
            <p className="text-xs text-instructor-600">{classStats.highestStudent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Assignments</p>
            <p className="text-2xl font-bold">{classStats.totalAssignments}</p>
            <p className="text-xs text-instructor-600">Active assignments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Students</p>
            <p className="text-2xl font-bold">{classStats.totalStudents}</p>
            <p className="text-xs text-instructor-600">Enrolled</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Gradebook Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <select 
                  className="h-10 rounded-lg border bg-background px-3 font-medium"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                  {coursesData.data.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </option>
                  ))}
                </select>
                <Badge variant="secondary">Current Term</Badge>
              </div>
              <div className="flex gap-2">
                <SearchInput 
                  placeholder="Search students..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  onClear={() => setSearchQuery('')} 
                  className="w-64" 
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {gradesLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium sticky left-0 bg-background">Student</th>
                      {assignmentsData?.data.map((assignment) => (
                        <th key={assignment.id} className="text-center p-3 font-medium min-w-[100px]">
                          <div className="flex flex-col">
                            <span>{assignment.title}</span>
                            <span className="text-xs text-muted-foreground font-normal">
                              {assignment.points}pts
                            </span>
                          </div>
                        </th>
                      ))}
                      <th className="text-center p-3 font-medium">Average</th>
                      <th className="text-center p-3 font-medium">Grade</th>
                      <th className="text-center p-3 font-medium">Trend</th>
                      <th className="text-right p-3 font-medium sticky right-0 bg-background">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={100} className="text-center py-12 text-muted-foreground">
                          No students found
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((row) => (
                        <tr key={row.studentId} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium sticky left-0 bg-background">
                            {row.studentName}
                          </td>
                          {assignmentsData?.data.map((assignment) => {
                            const grade = row.assignmentGrades[assignment.id];
                            return (
                              <td 
                                key={assignment.id} 
                                className={`p-3 text-center ${getGradeColor(grade)} cursor-pointer hover:bg-muted/50`}
                                onClick={() => handleEditGrade(row.studentId, assignment.id, grade || undefined)}
                              >
                                {grade !== null ? grade : '-'}
                              </td>
                            );
                          })}
                          <td className={`p-3 text-center font-bold ${getGradeColor(row.average)}`}>
                            {row.average}%
                          </td>
                          <td className="p-3 text-center">
                            <Badge 
                              variant={
                                row.average >= 90 ? 'success' : 
                                row.average >= 80 ? 'instructor' : 
                                row.average >= 70 ? 'warning' : 
                                'destructive'
                              }
                            >
                              {getLetterGrade(row.average)}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            {row.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500 mx-auto" />}
                            {row.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500 mx-auto" />}
                            {row.trend === 'same' && <Minus className="h-4 w-4 text-gray-400 mx-auto" />}
                          </td>
                          <td className="p-3 text-right sticky right-0 bg-background">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="iconSm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit Grade Modal */}
      {editingGrade && (
        <Modal
          open={true}
          onOpenChange={(open) => !open && setEditingGrade(null)}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Score (0-100)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={gradeScore}
                onChange={(e) => setGradeScore(e.target.value)}
                placeholder="Enter score"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingGrade(null)}>
                Cancel
              </Button>
              <Button 
                variant="instructor" 
                onClick={handleSaveGrade}
                disabled={createGradeMutation.isPending}
              >
                {createGradeMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Grade'
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
