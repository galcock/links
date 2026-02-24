'use client';

import { DashboardLayout } from '@/components/layout';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout role="COMMUNITY_SERVICES">{children}</DashboardLayout>;
}
