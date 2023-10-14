import { create } from "zustand";

interface PreferenceNFT {
  imageUri: string;
  address: string;
}

interface MatchingState {
  preferences: PreferenceNFT[];
  setPreferences: (preferences: PreferenceNFT[]) => void;
  addPreference: (preference: PreferenceNFT) => void;
}

export const useMachingStore = create<MatchingState>((set) => ({
  preferences: [],
  setPreferences: (preferences: PreferenceNFT[]) =>
    set(() => ({ preferences })),
  addPreference: (preference: PreferenceNFT) =>
    set((state) => ({ preferences: [...state.preferences, preference] })),
}));
