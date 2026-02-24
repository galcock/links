'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  FileText,
  Clock,
  Target,
  Loader2,
} from 'lucide-react';
import { useCurriculum, useCurriculumUnits, useCreateCurriculum } from '@/lib/hooks/use-curriculum';
import { useCourses } from '@/lib/hooks/use-courses';
import { useToast } from '@/components/ui/toast';

export default function InstructorCurriculum() {
  const { data: curriculumData, isLoading } = useCurriculum({ limit: 50 });
  const { data: coursesData } = useCourses({ limit: 100 });
  const [selectedPlanId, setSelectedPlanId] = React.useState<string | null>(null);
  const { data: unitsData } = useCurriculumUnits(selectedPlanId || '');
  const createMutation = useCreateCurriculum();
  const toast = useToast();

  const plans = curriculumData?.data || [];
  const units = unitsData?.data || [];
  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  React.useEffect(() => {
    if (plans.length > 0 && !selectedPlanId) {
      setSelectedPlanId(plans[0].id);
    }
  }, [plans, selectedPlanId]);

  if (isLoading) {
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
              <BookOpen className="h-8 w-8 text-instructor-600" />
              Curriculum Planning
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your course curriculum
            </p>
          </div>
          <Button variant="instructor">
            <Plus className="h-4 w-4 mr-2" />
            New Curriculum Plan
          </Button>
        </div>
      </motion.div>

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
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold">{plans.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-instructor-600" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Units</p>
                <p className="text-2xl font-bold">
                  {plans.reduce((sum, p) => sum + (p.units?.length || 0), 0)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card hover="lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Courses</p>
                <p className="text-2xl font-bold">{coursesData?.meta.total || 0}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {plans.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-lg mb-2">No Curriculum Plans</h3>
              <p className="text-muted-foreground mb-4">
                Create your first curriculum plan to get started
              </p>
              <Button variant="instructor">
                <Plus className="h-4 w-4 mr-2" />
                Create First Plan
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Curriculum Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedPlanId === plan.id
                        ? 'bg-instructor-50 dark:bg-instructor-900/20 border-instructor-500'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedPlanId(plan.id)}
                  >
                    <h4 className="font-semibold">{plan.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {plan.course?.name || 'No course'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" size="sm">
                        {plan.units?.length || 0} units
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        {plan.gradingPeriod}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {selectedPlan && (
              <>
                <Card variant="instructor">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedPlan.name}</h2>
                        <p className="text-muted-foreground mt-1">
                          {selectedPlan.description || 'No description'}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="instructor">
                            {selectedPlan.course?.name || 'No course'}
                          </Badge>
                          <Badge variant="secondary">
                            {selectedPlan.academicYear}
                          </Badge>
                          <Badge variant="secondary">
                            {selectedPlan.gradingPeriod}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Curriculum Units</CardTitle>
                      <Button variant="instructor" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Unit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {units.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No units defined yet
                      </p>
                    ) : (
                      units.map((unit, idx) => (
                        <div
                          key={unit.id}
                          className="p-4 rounded-lg border hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="instructor" size="sm">
                                  Unit {idx + 1}
                                </Badge>
                                <h4 className="font-semibold">{unit.name}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {unit.description || 'No description'}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {unit.learningObjectives && unit.learningObjectives.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium mb-2">Learning Objectives:</p>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {unit.learningObjectives.slice(0, 3).map((obj, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-instructor-600">•</span>
                                    {obj}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {unit.estimatedHours || 0} hours
                            </span>
                            <span>Order: {unit.orderIndex}</span>
                          </div>
                        </div>
                      ))
                    )}
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
