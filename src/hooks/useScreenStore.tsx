import { create } from "zustand";

interface ScreenState {
  screenHeight: number;
  screenWidth: number;
  setScreenHeight: (y: number) => void;
  setScreenWidth: (x: number) => void;
}

export const useScreenStore = create<ScreenState>((set) => ({
  screenHeight: 0,
  screenWidth: 0,
  setScreenHeight: (y: number) => set(() => ({ screenHeight: y })),
  setScreenWidth: (x: number) => set(() => ({ screenWidth: x })),
}));
