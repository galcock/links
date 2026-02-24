'use client';

import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/lib/store';
import type { UserRole } from '@prisma/client';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar role={role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header role={role} />
        <main
          className={cn(
            'flex-1 overflow-y-auto p-4 lg:p-6 transition-all duration-300',
            'animate-in fade-in slide-in-from-bottom-4 duration-500'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
