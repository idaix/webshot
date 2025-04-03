import { create } from "zustand";

interface ScreenshotState {
  screenBlob: string | null;
  setScreenBlob: (blob: string) => void;
}

export const useScreenshotStore = create<ScreenshotState>()((set) => ({
  screenBlob: null,
  setScreenBlob: (blob) => set((state) => ({ screenBlob: blob })),
}));
