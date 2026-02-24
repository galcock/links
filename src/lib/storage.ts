// Client-side storage for demo mode
// In production, this would be replaced with database calls

export interface StoredUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  organization?: string;
  createdAt: string;
}

const STORAGE_KEY = 'links_users';
const CURRENT_USER_KEY = 'links_current_user';

// Get all users from localStorage
export function getUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save users to localStorage
export function saveUsers(users: StoredUser[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Find user by email
export function findUserByEmail(email: string): StoredUser | undefined {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Create new user
export function createUser(userData: Omit<StoredUser, 'id' | 'createdAt'>): StoredUser {
  const users = getUsers();
  
  // Check if email already exists
  if (findUserByEmail(userData.email)) {
    throw new Error('Email already exists');
  }
  
  const newUser: StoredUser = {
    ...userData,
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
}

// Update user
export function updateUser(userId: string, updates: Partial<StoredUser>): StoredUser | null {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  
  // Update current user if it's the same
  const currentUser = getCurrentUser();
  if (currentUser?.id === userId) {
    setCurrentUser(users[index]);
  }
  
  return users[index];
}

// Get current logged-in user
export function getCurrentUser(): StoredUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Set current user (login)
export function setCurrentUser(user: StoredUser | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    // Also set a cookie for server-side checks
    document.cookie = `links_session=${encodeURIComponent(JSON.stringify({ userId: user.id, role: user.role }))};path=/;max-age=${60 * 60 * 24 * 7}`;
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
    document.cookie = 'links_session=;path=/;max-age=0';
  }
}

// Logout
export function logout(): void {
  setCurrentUser(null);
}

// Simple password hashing (for demo - use bcrypt in production)
export function hashPassword(password: string): string {
  // Simple hash for demo - NOT secure for production
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `demo_hash_${Math.abs(hash).toString(16)}`;
}

// Password storage
const PASSWORD_KEY = 'links_passwords';

export function storePassword(userId: string, password: string): void {
  if (typeof window === 'undefined') return;
  try {
    const passwords = JSON.parse(localStorage.getItem(PASSWORD_KEY) || '{}');
    passwords[userId] = hashPassword(password);
    localStorage.setItem(PASSWORD_KEY, JSON.stringify(passwords));
  } catch {}
}

export function verifyPassword(userId: string, password: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const passwords = JSON.parse(localStorage.getItem(PASSWORD_KEY) || '{}');
    return passwords[userId] === hashPassword(password);
  } catch {
    return false;
  }
}

// Initialize with demo users if empty
export function initializeDemoData(): void {
  if (typeof window === 'undefined') return;
  
  const users = getUsers();
  if (users.length > 0) return; // Already initialized
  
  const demoUsers = [
    { email: 'student@demo.com', firstName: 'Alex', lastName: 'Student', role: 'STUDENT' },
    { email: 'instructor@demo.com', firstName: 'Sarah', lastName: 'Teacher', role: 'INSTRUCTOR' },
    { email: 'parent@demo.com', firstName: 'John', lastName: 'Parent', role: 'PARENT' },
    { email: 'admin@demo.com', firstName: 'Mary', lastName: 'Admin', role: 'ADMINISTRATOR' },
  ];
  
  demoUsers.forEach(user => {
    try {
      const created = createUser(user);
      storePassword(created.id, 'Demo1234');
    } catch {}
  });
}
