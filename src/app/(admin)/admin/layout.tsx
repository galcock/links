'use client';

import { DashboardLayout } from '@/components/layout';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="ADMINISTRATOR">{children}</DashboardLayout>;
}
