import { create } from "zustand";

interface SectionState {
  section: number;
  increase: () => void;
  decrease: () => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  section: 0,
  increase: () => set((state) => ({ section: state.section + 1 })),
  decrease: () => set((state) => ({ section: state.section - 1 })),
}));
