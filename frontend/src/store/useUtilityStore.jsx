import { create } from "zustand";

export const useUtilityStore = create((set)=>({
    currentPage: 'conversation',
    navigate: (page) => set({ currentPage: page }),
}))