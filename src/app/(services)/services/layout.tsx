'use client';

import { DashboardLayout } from '@/components/layout';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="STUDENT_SERVICES">{children}</DashboardLayout>;
}
