'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ROLE_THEMES } from '@/lib/constants';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
} from 'lucide-react';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  confirmPassword: z.string(),
  organizationCode: z.string().optional(),
  role: z.enum(['STUDENT', 'INSTRUCTOR', 'PARENT', 'ADMINISTRATOR', 'STUDENT_SERVICES', 'COMMUNITY_SERVICES']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

const roles = [
  { value: 'STUDENT', label: 'Student', icon: '📚', description: 'I am a student' },
  { value: 'INSTRUCTOR', label: 'Instructor', icon: '🎓', description: 'I am an educator' },
  { value: 'PARENT', label: 'Parent', icon: '👨‍👩‍👧‍👦', description: 'I am a parent/guardian' },
  { value: 'ADMINISTRATOR', label: 'Administrator', icon: '⚙️', description: 'I manage a school' },
  { value: 'STUDENT_SERVICES', label: 'Student Services', icon: '💙', description: 'I provide student services' },
  { value: 'COMMUNITY_SERVICES', label: 'Community', icon: '🤝', description: 'I am a community partner' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  const passwordRequirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(password), text: 'One lowercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
  ];

  const selectRole = (role: string) => {
    setSelectedRole(role);
    setValue('role', role as RegisterForm['role']);
    setStep(2);
  };

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      router.push('/login?registered=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const theme = ROLE_THEMES[selectedRole as keyof typeof ROLE_THEMES] || ROLE_THEMES.STUDENT;

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50 dark:from-slate-950 dark:via-purple-950 dark:to-violet-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Link href="/" className="flex items-center gap-3 mb-8 justify-center">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <span className="font-bold text-2xl">LINKS</span>
        </Link>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>
              {step === 1 ? 'Choose your role to get started' : 'Complete your registration'}
            </CardDescription>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-purple-500' : 'bg-muted'}`} />
              <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-purple-500' : 'bg-muted'}`} />
            </div>
          </CardHeader>

          <CardContent>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 gap-4"
              >
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => selectRole(role.value)}
                    className="p-6 rounded-xl border-2 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all text-left group"
                  >
                    <span className="text-4xl mb-3 block">{role.icon}</span>
                    <h3 className="font-semibold text-lg">{role.label}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Badge variant={selectedRole.toLowerCase() as "student"}>
                    {theme.icon} {theme.name}
                  </Badge>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input
                        {...register('firstName')}
                        placeholder="John"
                        leftIcon={<User className="h-4 w-4" />}
                        error={errors.firstName?.message}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input
                        {...register('lastName')}
                        placeholder="Doe"
                        error={errors.lastName?.message}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="you@school.edu"
                      leftIcon={<Mail className="h-4 w-4" />}
                      error={errors.email?.message}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Organization Code (Optional)</label>
                    <Input
                      {...register('organizationCode')}
                      placeholder="e.g., SCHOOL123"
                      leftIcon={<Building className="h-4 w-4" />}
                      hint="Enter your school's code to join automatically"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      {...register('password')}
                      type="password"
                      placeholder="••••••••"
                      leftIcon={<Lock className="h-4 w-4" />}
                      error={errors.password?.message}
                    />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {passwordRequirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs">
                          <div className={`h-4 w-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500' : 'bg-muted'}`}>
                            {req.met && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <Input
                      {...register('confirmPassword')}
                      type="password"
                      placeholder="••••••••"
                      leftIcon={<Lock className="h-4 w-4" />}
                      error={errors.confirmPassword?.message}
                    />
                  </div>

                  <Button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${theme.gradient} hover:opacity-90`}
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </form>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="underline">Terms of Service</Link> and{' '}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}
