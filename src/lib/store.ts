import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRole } from '@prisma/client';

// User Store
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId: string;
  avatarUrl: string | null;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'user-storage' }
  )
);

// Theme Store
interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'theme-storage' }
  )
);

// Sidebar Store
interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (isCollapsed) => set({ isCollapsed }),
      setMobileOpen: (isMobileOpen) => set({ isMobileOpen }),
    }),
    { name: 'sidebar-storage' }
  )
);

// Notifications Store
interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  setNotifications: (notifications: Notification[]) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      isRead: false,
      createdAt: new Date(),
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
  },
  removeNotification: (id) => {
    const notification = get().notifications.find((n) => n.id === id);
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: notification && !notification.isRead
        ? state.unreadCount - 1
        : state.unreadCount,
    }));
  },
  setNotifications: (notifications) => {
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    });
  },
}));

// Calendar Store
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
}

type CalendarView = 'day' | 'week' | 'month';

interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  events: CalendarEvent[];
  selectedEvent: CalendarEvent | null;
  setCurrentDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  setEvents: (events: CalendarEvent[]) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  selectEvent: (event: CalendarEvent | null) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(),
  view: 'month',
  events: [],
  selectedEvent: null,
  setCurrentDate: (currentDate) => set({ currentDate }),
  setView: (view) => set({ view }),
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),
  deleteEvent: (id) =>
    set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
  selectEvent: (selectedEvent) => set({ selectedEvent }),
}));

// Chat/Messaging Store
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
}

interface Conversation {
  id: string;
  name?: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

interface ChatState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: Record<string, Message[]>;
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (id: string | null) => void;
  addMessage: (conversationId: string, message: Message) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversation: null,
  messages: {},
  setConversations: (conversations) => set({ conversations }),
  setActiveConversation: (activeConversation) => set({ activeConversation }),
  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
    })),
  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages },
    })),
}));

// Modal Store
interface ModalState {
  modals: Record<string, boolean>;
  modalData: Record<string, unknown>;
  openModal: (id: string, data?: unknown) => void;
  closeModal: (id: string) => void;
  isModalOpen: (id: string) => boolean;
  getModalData: <T>(id: string) => T | undefined;
}

export const useModalStore = create<ModalState>((set, get) => ({
  modals: {},
  modalData: {},
  openModal: (id, data) =>
    set((state) => ({
      modals: { ...state.modals, [id]: true },
      modalData: { ...state.modalData, [id]: data },
    })),
  closeModal: (id) =>
    set((state) => ({
      modals: { ...state.modals, [id]: false },
    })),
  isModalOpen: (id) => !!get().modals[id],
  getModalData: <T>(id: string) => get().modalData[id] as T | undefined,
}));
