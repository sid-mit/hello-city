import { Flame } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

export const StreakCounter = () => {
  const { practiceStreak } = useAppStore();

  if (practiceStreak === 0) return null;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-500/30">
      <Flame className="w-5 h-5 text-orange-500" />
      <span className="font-bold text-foreground">{practiceStreak} day streak!</span>
    </div>
  );
};
