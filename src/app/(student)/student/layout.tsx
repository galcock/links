'use client';

import { DashboardLayout } from '@/components/layout';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="STUDENT">{children}</DashboardLayout>;
}
