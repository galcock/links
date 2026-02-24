'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/lib/store';
import { ROLE_THEMES } from '@/lib/constants';
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const selectedRole = searchParams.get('role')?.toUpperCase() || 'STUDENT';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      setUser(result.user);
      
      // Redirect based on role
      const roleRoutes: Record<string, string> = {
        STUDENT: '/student',
        INSTRUCTOR: '/instructor',
        PARENT: '/parent',
        ADMINISTRATOR: '/admin',
        STUDENT_SERVICES: '/services',
        COMMUNITY_SERVICES: '/community',
        PUBLIC: '/public',
      };
      
      router.push(roleRoutes[result.user.role] || '/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const theme = ROLE_THEMES[selectedRole as keyof typeof ROLE_THEMES] || ROLE_THEMES.STUDENT;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl">LINKS</span>
              <Badge className="ml-2" variant={selectedRole.toLowerCase() as "student"}>
                {theme.name}
              </Badge>
            </div>
          </Link>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your {theme.name.toLowerCase()} account
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    {...register('password')}
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock className="h-4 w-4" />}
                    error={errors.password?.message}
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
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="underline">Terms of Service</Link> and{' '}
            <Link href="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Branding */}
      <div className={`hidden lg:flex flex-1 bg-gradient-to-br ${theme.gradient} items-center justify-center p-12`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white max-w-lg"
        >
          <div className="text-8xl mb-8">{theme.icon}</div>
          <h2 className="text-4xl font-bold mb-4">
            {theme.name} Portal
          </h2>
          <p className="text-xl text-white/80">
            Access your personalized dashboard with all the tools you need for success.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4">
            {['Real-time Updates', 'Secure Access', 'AI Assistant', '24/7 Support'].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-white/90">
                <div className="h-2 w-2 rounded-full bg-white" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
