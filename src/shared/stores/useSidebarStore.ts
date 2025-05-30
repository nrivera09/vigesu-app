import { create } from "zustand";

// 1. Define la interfaz para el estado
interface SidebarState {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

// 2. Crea el store usando Zustand con tipado explícito
export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,

  openSidebar: () => set({ isSidebarOpen: true }),

  closeSidebar: () => set({ isSidebarOpen: false }),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
