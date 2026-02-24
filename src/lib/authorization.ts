import { UserRole } from '@prisma/client';
import { AuthUser } from './auth';

export type Permission = 
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'students:read'
  | 'students:write'
  | 'courses:read'
  | 'courses:write'
  | 'courses:delete'
  | 'assignments:read'
  | 'assignments:write'
  | 'assignments:delete'
  | 'grades:read'
  | 'grades:write'
  | 'calendar:read'
  | 'calendar:write'
  | 'messages:read'
  | 'messages:write'
  | 'announcements:read'
  | 'announcements:write'
  | 'workspaces:read'
  | 'workspaces:write'
  | 'curriculum:read'
  | 'curriculum:write'
  | 'teams:read'
  | 'teams:write'
  | 'files:read'
  | 'files:write'
  | 'services:read'
  | 'services:write'
  | 'community:read'
  | 'community:write'
  | 'admin:all';

const rolePermissions: Record<UserRole, Permission[]> = {
  ADMINISTRATOR: [
    'admin:all',
    'users:read',
    'users:write',
    'users:delete',
    'students:read',
    'students:write',
    'courses:read',
    'courses:write',
    'courses:delete',
    'assignments:read',
    'assignments:write',
    'assignments:delete',
    'grades:read',
    'grades:write',
    'calendar:read',
    'calendar:write',
    'messages:read',
    'messages:write',
    'announcements:read',
    'announcements:write',
    'workspaces:read',
    'workspaces:write',
    'curriculum:read',
    'curriculum:write',
    'teams:read',
    'teams:write',
    'files:read',
    'files:write',
    'services:read',
    'services:write',
    'community:read',
    'community:write',
  ],
  INSTRUCTOR: [
    'students:read',
    'courses:read',
    'courses:write',
    'assignments:read',
    'assignments:write',
    'assignments:delete',
    'grades:read',
    'grades:write',
    'calendar:read',
    'calendar:write',
    'messages:read',
    'messages:write',
    'announcements:read',
    'workspaces:read',
    'workspaces:write',
    'curriculum:read',
    'curriculum:write',
    'teams:read',
    'files:read',
    'files:write',
  ],
  STUDENT: [
    'courses:read',
    'assignments:read',
    'grades:read',
    'calendar:read',
    'calendar:write',
    'messages:read',
    'messages:write',
    'announcements:read',
    'workspaces:read',
    'teams:read',
    'files:read',
    'files:write',
  ],
  PARENT: [
    'students:read',
    'courses:read',
    'assignments:read',
    'grades:read',
    'calendar:read',
    'messages:read',
    'messages:write',
    'announcements:read',
  ],
  STUDENT_SERVICES: [
    'students:read',
    'students:write',
    'services:read',
    'services:write',
    'calendar:read',
    'calendar:write',
    'messages:read',
    'messages:write',
    'announcements:read',
    'files:read',
    'files:write',
  ],
  COMMUNITY_SERVICES: [
    'community:read',
    'community:write',
    'calendar:read',
    'calendar:write',
    'messages:read',
    'messages:write',
    'announcements:read',
    'files:read',
  ],
  PUBLIC: [
    'announcements:read',
  ],
};

export function hasPermission(user: AuthUser, permission: Permission): boolean {
  const permissions = rolePermissions[user.role] || [];
  return permissions.includes('admin:all') || permissions.includes(permission);
}

export function hasAnyPermission(user: AuthUser, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(user, p));
}

export function hasAllPermissions(user: AuthUser, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(user, p));
}

export function canAccessResource(
  user: AuthUser,
  resource: { organizationId?: string; userId?: string; ownerId?: string }
): boolean {
  // Admin can access all resources in their organization
  if (user.role === 'ADMINISTRATOR') {
    return !resource.organizationId || resource.organizationId === user.organizationId;
  }

  // User can access their own resources
  if (resource.userId === user.id || resource.ownerId === user.id) {
    return true;
  }

  // Same organization check
  if (resource.organizationId && resource.organizationId !== user.organizationId) {
    return false;
  }

  return true;
}

export function filterByOrganization<T extends { organizationId?: string }>(
  user: AuthUser,
  query: T
): T {
  if (user.role === 'ADMINISTRATOR') {
    return { ...query, organizationId: user.organizationId };
  }
  return query;
}
