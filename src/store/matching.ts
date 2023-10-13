import { create } from 'zustand';

interface MatchingState {
    preferences: string[];   
    setPreferences: (preferences: string[]) => void;
}

export const useMachingStore = create<MatchingState>((set) => ({
    preferences: [],
    setPreferences: (preferences: string[]) => set(() => ({ preferences })),
}));