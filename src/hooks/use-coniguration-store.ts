import { UserConfiguration } from "@/types";
import { create } from "zustand";

interface ConfigurationState {
  configuration: UserConfiguration | null;
  setConfiguration: (blob: UserConfiguration) => void;
}

export const UseConfigurationStore = create<ConfigurationState>()((set) => ({
  configuration: null,
  setConfiguration: (configuration) =>
    set((state) => ({ configuration: configuration })),
}));
