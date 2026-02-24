'use client';

import { DashboardLayout } from '@/components/layout';

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="INSTRUCTOR">{children}</DashboardLayout>;
}
