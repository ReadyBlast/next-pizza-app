import { create } from "zustand";

export type SortOption = 'price' | 'popularity' | 'alphabet'

interface State {
  activeId: number;
  setActiveId: (activeId: number) => void;
}

interface SortState {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

export const useCategoryStore = create<State>()((set) => ({
  activeId: 1,
  setActiveId: (activeId: number) => set({activeId})
}))

export const useSortStore = create<SortState>((set) => ({
  sortOption: 'popularity', // Значение по умолчанию
  setSortOption: (option) => set({ sortOption: option }),
}));