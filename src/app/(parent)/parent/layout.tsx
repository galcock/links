'use client';

import { DashboardLayout } from '@/components/layout';

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="PARENT">{children}</DashboardLayout>;
}
