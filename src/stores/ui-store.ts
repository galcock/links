import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Modal {
  id: string;
  component: string;
  props?: Record<string, any>;
}

interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Modals
  modals: Modal[];
  
  // Theme
  theme: 'light' | 'dark' | 'auto';
  
  // Loading states
  globalLoading: boolean;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  openModal: (component: string, props?: Record<string, any>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  
  setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Initial state
      sidebarOpen: true,
      sidebarCollapsed: false,
      modals: [],
      theme: 'light',
      globalLoading: false,

      // Sidebar actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Modal actions
      openModal: (component, props) => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({
          modals: [...state.modals, { id, component, props }],
        }));
        return id;
      },
      
      closeModal: (id) =>
        set((state) => ({
          modals: state.modals.filter((modal) => modal.id !== id),
        })),
      
      closeAllModals: () => set({ modals: [] }),

      // Theme actions
      setTheme: (theme) => set({ theme }),

      // Loading actions
      setGlobalLoading: (loading) => set({ globalLoading: loading }),
    }),
    {
      name: 'links-ui',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
);
