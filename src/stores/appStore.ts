import { create } from 'zustand';

export interface City {
  id: string;
  name: string;
  country: string;
  language: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  emoji: string;
}

export interface Location {
  id: string;
  name: string;
  category: string;
  emoji: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phrases: Phrase[];
}

export interface Phrase {
  id: string;
  text: string;
  translation: string;
  phonetic: string;
}

interface AppState {
  userName: string;
  selectedCity: City | null;
  selectedLocation: Location | null;
  isTransitioning: boolean;
  showMap: boolean;
  learnedPhrases: Set<string>;
  setUserName: (name: string) => void;
  selectCity: (city: City) => void;
  selectLocation: (location: Location | null) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  setShowMap: (show: boolean) => void;
  markPhraseAsLearned: (phraseId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  userName: '',
  selectedCity: null,
  selectedLocation: null,
  isTransitioning: false,
  showMap: false,
  learnedPhrases: new Set(),
  setUserName: (name) => set({ userName: name }),
  selectCity: (city) => set({ selectedCity: city }),
  selectLocation: (location) => set({ selectedLocation: location }),
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  setShowMap: (show) => set({ showMap: show }),
  markPhraseAsLearned: (phraseId) =>
    set((state) => ({
      learnedPhrases: new Set(state.learnedPhrases).add(phraseId),
    })),
}));
