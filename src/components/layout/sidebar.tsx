'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/lib/store';
import { NAV_ITEMS, ROLE_THEMES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { SimpleTooltip, TooltipProvider } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Calendar, MessageSquare, Briefcase, BookOpen, FileText, Rocket, Users, Bot,
  Settings, ClipboardList, Handshake, GraduationCap, Layout, Palette, Video, User,
  Heart, Building2, DollarSign, BarChart3, Database, Activity, Mic, HeartHandshake,
  Compass, Shield, Building, Library, Mail, PartyPopper, Newspaper, Image,
  ChevronLeft, ChevronRight, X, Menu
} from 'lucide-react';
import type { UserRole } from '@prisma/client';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, Calendar, MessageSquare, Briefcase, BookOpen, FileText, Rocket, Users, Bot,
  Settings, ClipboardList, Handshake, GraduationCap, Layout, Palette, Video, User,
  Heart, Building2, DollarSign, BarChart3, Database, Activity, Mic, HeartHandshake,
  Compass, Shield, Building, Library, Mail, PartyPopper, Newspaper, Image,
};

interface SidebarProps {
  role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, toggle, setMobileOpen } = useSidebarStore();
  const theme = ROLE_THEMES[role];
  const navItems = NAV_ITEMS[role] || NAV_ITEMS.PUBLIC;

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 72 },
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full flex-col border-r bg-background/95 backdrop-blur-xl transition-transform duration-300',
          'lg:relative lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl text-white text-lg',
                    `bg-gradient-to-br ${theme.gradient}`
                  )}
                >
                  {theme.icon}
                </div>
                <div>
                  <h2 className="font-bold text-lg">LINKS</h2>
                  <p className="text-xs text-muted-foreground">{theme.name}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            {/* Mobile close */}
            <Button
              variant="ghost"
              size="iconSm"
              className="lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Collapse toggle */}
            <Button
              variant="ghost"
              size="iconSm"
              className="hidden lg:flex"
              onClick={toggle}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || Home;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <SimpleTooltip
                  key={item.href}
                  content={isCollapsed ? item.name : null}
                  side="right"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      'hover:bg-muted',
                      isActive && [
                        'bg-gradient-to-r text-white shadow-md',
                        theme.gradient,
                      ],
                      isCollapsed && 'justify-center px-2'
                    )}
                  >
                    <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-white')} />
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="truncate"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </SimpleTooltip>
              );
            })}
          </TooltipProvider>
        </nav>

        {/* Footer */}
        <div className="border-t p-3">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-xs text-muted-foreground">
                  LINKS CES v1.0
                </p>
                <p className="text-[10px] text-muted-foreground">
                  © 2026 CES Links
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}
