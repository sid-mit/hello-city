import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SituationData } from '@/components/Cards/SituationCard';

export type GenderVariant = 'neutral' | 'female' | 'male';

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

export interface Badge {
  id: string;
  emoji: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface SyllableHistory {
  syllable: string;
  attempts: number;
  successRate: number;
  lastScore: number;
  improvementTrend: 'improving' | 'stable' | 'declining';
}

export interface PracticeHistory {
  [situationId: string]: {
    attempts: number;
    bestScore: number;
    lastPracticed: string;
    phraseScores: { [phraseId: string]: number };
    syllableHistory: { [syllableKey: string]: SyllableHistory };
  };
}

export type TabType = 'explore' | 'learn';

interface SavedSituation extends SituationData {
  dateSaved: string;
}

interface AppState {
  userName: string;
  guestName: string;
  genderPreference: GenderVariant;
  selectedCity: City | null;
  selectedLocation: Location | null;
  selectedCategory: string | null;
  learnedPhrases: Set<string>;
  favoritedSituations: SavedSituation[];
  activeTab: TabType;
  hasShownFavoriteModal: boolean;
  practiceHistory: PracticeHistory;
  badges: Badge[];
  practiceStreak: number;
  lastPracticeDate: string | null;
  setUserName: (name: string) => void;
  setGuestName: (name: string) => void;
  setGenderPreference: (gender: GenderVariant) => void;
  selectCity: (city: City | null) => void;
  selectLocation: (location: Location | null) => void;
  selectCategory: (categoryId: string | null) => void;
  markPhraseAsLearned: (phraseId: string) => void;
  setActiveTab: (tab: TabType) => void;
  toggleFavorite: (situation: SituationData) => void;
  isSituationFavorited: (situationId: string) => boolean;
  setHasShownFavoriteModal: (shown: boolean) => void;
  updatePracticeHistory: (
    situationId: string,
    score: number,
    phraseId: string,
    syllableData?: Array<{ syllable: string; score: number }>
  ) => void;
  getProblemSyllables: () => Array<{ syllable: string; data: SyllableHistory }>;
  getMasteredSyllables: () => Array<{ syllable: string; data: SyllableHistory }>;
  unlockBadge: (badgeId: string) => void;
  updateStreak: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userName: '',
      guestName: '',
      genderPreference: 'female',
      selectedCity: null,
      selectedLocation: null,
      selectedCategory: null,
      learnedPhrases: new Set(),
      favoritedSituations: [],
      activeTab: 'explore',
      hasShownFavoriteModal: false,
      practiceHistory: {},
      practiceStreak: 0,
      lastPracticeDate: null,
      badges: [
        { id: 'first-steps', emoji: '👶', title: 'First Steps', description: 'Complete your first practice', unlocked: false },
        { id: 'polyglot', emoji: '🌍', title: 'Polyglot', description: 'Practice in 3 different cities', unlocked: false },
        { id: 'perfect-score', emoji: '💯', title: 'Perfect Score', description: 'Get 100% on any phrase', unlocked: false },
        { id: 'dedicated', emoji: '🔥', title: 'Dedicated Learner', description: '7-day practice streak', unlocked: false },
        { id: 'collector', emoji: '⭐', title: 'Collector', description: 'Save 10 situations', unlocked: false },
        { id: 'practice-master', emoji: '🎓', title: 'Practice Master', description: 'Complete 50 practice sessions', unlocked: false },
        { id: 'early-bird', emoji: '🌅', title: 'Early Bird', description: 'Practice before 8am', unlocked: false },
        { id: 'night-owl', emoji: '🦉', title: 'Night Owl', description: 'Practice after 10pm', unlocked: false },
      ],
      setUserName: (name) => set({ userName: name }),
      setGuestName: (name) => set({ guestName: name }),
      setGenderPreference: (gender) => set({ genderPreference: gender }),
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
      updatePracticeHistory: (situationId, score, phraseId, syllableData) =>
        set((state) => {
          const existing = state.practiceHistory[situationId] || {
            attempts: 0,
            bestScore: 0,
            lastPracticed: new Date().toISOString(),
            phraseScores: {},
            syllableHistory: {},
          };
          
          // Update syllable history if provided
          const updatedSyllableHistory = { ...existing.syllableHistory };
          if (syllableData) {
            syllableData.forEach(({ syllable, score: syllableScore }) => {
              const existingSyllable = updatedSyllableHistory[syllable] || {
                syllable,
                attempts: 0,
                successRate: 0,
                lastScore: 0,
                improvementTrend: 'stable' as const,
              };
              
              const newAttempts = existingSyllable.attempts + 1;
              const newSuccessCount = existingSyllable.successRate * existingSyllable.attempts + (syllableScore >= 80 ? 1 : 0);
              const newSuccessRate = newSuccessCount / newAttempts;
              
              // Determine trend
              let trend: 'improving' | 'stable' | 'declining' = 'stable';
              if (existingSyllable.attempts >= 2) {
                if (syllableScore > existingSyllable.lastScore + 10) trend = 'improving';
                else if (syllableScore < existingSyllable.lastScore - 10) trend = 'declining';
              }
              
              updatedSyllableHistory[syllable] = {
                syllable,
                attempts: newAttempts,
                successRate: newSuccessRate,
                lastScore: syllableScore,
                improvementTrend: trend,
              };
            });
          }
          
          return {
            practiceHistory: {
              ...state.practiceHistory,
              [situationId]: {
                attempts: existing.attempts + 1,
                bestScore: Math.max(existing.bestScore, score),
                lastPracticed: new Date().toISOString(),
                phraseScores: {
                  ...existing.phraseScores,
                  [phraseId]: score,
                },
                syllableHistory: updatedSyllableHistory,
              },
            },
          };
        }),
      getProblemSyllables: () => {
        const state = get();
        const allSyllables: { [key: string]: SyllableHistory } = {};
        
        // Aggregate syllable data across all situations
        Object.values(state.practiceHistory).forEach((history) => {
          Object.entries(history.syllableHistory || {}).forEach(([syllable, data]) => {
            if (!allSyllables[syllable]) {
              allSyllables[syllable] = data;
            } else {
              // Merge data
              const existing = allSyllables[syllable];
              const totalAttempts = existing.attempts + data.attempts;
              const combinedSuccessRate = 
                (existing.successRate * existing.attempts + data.successRate * data.attempts) / totalAttempts;
              
              allSyllables[syllable] = {
                syllable,
                attempts: totalAttempts,
                successRate: combinedSuccessRate,
                lastScore: data.lastScore, // Use most recent
                improvementTrend: data.improvementTrend,
              };
            }
          });
        });
        
        // Filter to problem syllables (success rate < 70%)
        return Object.entries(allSyllables)
          .filter(([_, data]) => data.successRate < 0.7 && data.attempts >= 2)
          .map(([syllable, data]) => ({ syllable, data }))
          .sort((a, b) => a.data.successRate - b.data.successRate);
      },
      getMasteredSyllables: () => {
        const state = get();
        const allSyllables: { [key: string]: SyllableHistory } = {};
        
        // Aggregate syllable data across all situations
        Object.values(state.practiceHistory).forEach((history) => {
          Object.entries(history.syllableHistory || {}).forEach(([syllable, data]) => {
            if (!allSyllables[syllable]) {
              allSyllables[syllable] = data;
            } else {
              // Merge data
              const existing = allSyllables[syllable];
              const totalAttempts = existing.attempts + data.attempts;
              const combinedSuccessRate = 
                (existing.successRate * existing.attempts + data.successRate * data.attempts) / totalAttempts;
              
              allSyllables[syllable] = {
                syllable,
                attempts: totalAttempts,
                successRate: combinedSuccessRate,
                lastScore: data.lastScore,
                improvementTrend: data.improvementTrend,
              };
            }
          });
        });
        
        // Filter to mastered syllables (success rate >= 90%)
        return Object.entries(allSyllables)
          .filter(([_, data]) => data.successRate >= 0.9 && data.attempts >= 3)
          .map(([syllable, data]) => ({ syllable, data }))
          .sort((a, b) => b.data.successRate - a.data.successRate);
      },
      unlockBadge: (badgeId) =>
        set((state) => ({
          badges: state.badges.map((badge) =>
            badge.id === badgeId ? { ...badge, unlocked: true } : badge
          ),
        })),
      updateStreak: () =>
        set((state) => {
          const today = new Date().toDateString();
          const lastDate = state.lastPracticeDate ? new Date(state.lastPracticeDate).toDateString() : null;
          
          if (lastDate === today) {
            return state;
          }
          
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toDateString();
          
          let newStreak = state.practiceStreak;
          if (lastDate === yesterdayStr) {
            newStreak += 1;
          } else if (lastDate !== today) {
            newStreak = 1;
          }
          
          return {
            practiceStreak: newStreak,
            lastPracticeDate: today,
          };
        }),
    }),
    {
      name: 'hellocity-storage',
      partialize: (state) => ({
        guestName: state.guestName,
        genderPreference: state.genderPreference,
        favoritedSituations: state.favoritedSituations,
        hasShownFavoriteModal: state.hasShownFavoriteModal,
        practiceHistory: state.practiceHistory,
        badges: state.badges,
        practiceStreak: state.practiceStreak,
        lastPracticeDate: state.lastPracticeDate,
      }),
    }
  )
);
