import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SituationData } from '@/components/Cards/SituationCard';

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

export type TabType = 'explore' | 'learn';

interface SavedSituation extends SituationData {
  dateSaved: string;
}

interface AppState {
  userName: string;
  guestName: string;
  selectedCity: City | null;
  selectedLocation: Location | null;
  selectedCategory: string | null;
  learnedPhrases: Set<string>;
  favoritedSituations: SavedSituation[];
  activeTab: TabType;
  hasShownFavoriteModal: boolean;
  setUserName: (name: string) => void;
  setGuestName: (name: string) => void;
  selectCity: (city: City | null) => void;
  selectLocation: (location: Location | null) => void;
  selectCategory: (categoryId: string | null) => void;
  markPhraseAsLearned: (phraseId: string) => void;
  setActiveTab: (tab: TabType) => void;
  toggleFavorite: (situation: SituationData) => void;
  isSituationFavorited: (situationId: string) => boolean;
  setHasShownFavoriteModal: (shown: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userName: '',
      guestName: '',
      selectedCity: null,
      selectedLocation: null,
      selectedCategory: null,
      learnedPhrases: new Set(),
      favoritedSituations: [],
      activeTab: 'explore',
      hasShownFavoriteModal: false,
      setUserName: (name) => set({ userName: name }),
      setGuestName: (name) => set({ guestName: name }),
      selectCity: (city) => set({ selectedCity: city }),
      selectLocation: (location) => set({ selectedLocation: location }),
      selectCategory: (categoryId) => set({ selectedCategory: categoryId }),
      markPhraseAsLearned: (phraseId) =>
        set((state) => ({
          learnedPhrases: new Set(state.learnedPhrases).add(phraseId),
        })),
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleFavorite: (situation) =>
        set((state) => {
          const exists = state.favoritedSituations.some(
            (s) => s.id === situation.id
          );
          
          if (exists) {
            return {
              favoritedSituations: state.favoritedSituations.filter(
                (s) => s.id !== situation.id
              ),
            };
          } else {
            return {
              favoritedSituations: [
                ...state.favoritedSituations,
                {
                  ...situation,
                  dateSaved: new Date().toISOString(),
                },
              ],
            };
          }
        }),
      isSituationFavorited: (situationId) => {
        return get().favoritedSituations.some((s) => s.id === situationId);
      },
      setHasShownFavoriteModal: (shown) => set({ hasShownFavoriteModal: shown }),
    }),
    {
      name: 'hellocity-storage',
      partialize: (state) => ({
        guestName: state.guestName,
        favoritedSituations: state.favoritedSituations,
        hasShownFavoriteModal: state.hasShownFavoriteModal,
      }),
    }
  )
);
