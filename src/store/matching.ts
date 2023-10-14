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
  // add prefernce without duplicates
  addPreference: (preference: PreferenceNFT) =>
    set((state) => {
      if (state.preferences.find((p) => p.address === preference.address)) {
        return state;
      }
      return { ...state, preferences: [...state.preferences, preference] };
    }),
}));
