'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import { ROLE_THEMES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell, Search, Sun, Moon, LogOut, User, Settings, HelpCircle, ChevronDown
} from 'lucide-react';

interface HeaderProps {
  role: string;
}

export function Header({ role }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  const roleKey = role.toUpperCase().replace('-', '_') as keyof typeof ROLE_THEMES;
  const roleTheme = ROLE_THEMES[roleKey] || ROLE_THEMES.STUDENT;
  
  const basePath = role === 'admin' ? '/admin' : 
                   role === 'services' ? '/services' :
                   role === 'community' ? '/community' :
                   `/${role}`;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const getInitials = () => {
    if (!user) return 'U';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'U';
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-xl px-4 lg:px-6">
      {/* Left side - Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="hidden md:block w-full max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </Button>
          
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-background border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="p-4 text-sm text-muted-foreground text-center">
                No new notifications
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <Button 
            variant="ghost" 
            className="gap-2 px-2"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-sm font-bold">
              {getInitials()}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium">
                {user ? `${user.firstName} ${user.lastName}` : 'User'}
              </span>
              <span className="text-xs text-muted-foreground">
                {roleTheme.name}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 hidden md:block" />
          </Button>
          
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-56 bg-background border rounded-lg shadow-lg z-50">
              <div className="p-3 border-b">
                <p className="font-medium text-sm">
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
              <div className="p-1">
                <Link 
                  href={`${basePath}/settings`}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Link 
                  href={`${basePath}/settings`}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <Link 
                  href="/help"
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted"
                  onClick={() => setShowUserMenu(false)}
                >
                  <HelpCircle className="h-4 w-4" />
                  Help
                </Link>
              </div>
              <div className="p-1 border-t">
                <button 
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted w-full text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Click outside to close menus */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => { setShowUserMenu(false); setShowNotifications(false); }}
        />
      )}
    </header>
  );
}
