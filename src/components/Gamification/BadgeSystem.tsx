import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import firstStepsIcon from '@/assets/badges/first-steps.png';
import practiceMasterIcon from '@/assets/badges/practice-master.png';
import perfectScoreIcon from '@/assets/badges/perfect-score.png';
import polyglotIcon from '@/assets/badges/polyglot.png';
import dedicatedIcon from '@/assets/badges/dedicated.png';

export interface Badge {
  id: string;
  emoji: string;
  title: string;
  description: string;
  unlocked: boolean;
}

const badgeIcons: Record<string, string> = {
  'first-steps': firstStepsIcon,
  'practice-master': practiceMasterIcon,
  'perfect-score': perfectScoreIcon,
  'polyglot': polyglotIcon,
  'dedicated': dedicatedIcon,
};

export const BadgeSystem = () => {
  const { badges } = useAppStore();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className={`relative p-4 rounded-xl border-2 transition-all ${
            badge.unlocked
              ? 'bg-primary/10 border-primary shadow-md'
              : 'bg-muted border-border opacity-60'
          }`}
        >
          <div className="mb-2 flex items-center justify-center h-12">
            {badgeIcons[badge.id] ? (
              <img src={badgeIcons[badge.id]} alt={badge.title} className="w-12 h-12 object-contain" />
            ) : (
              <span className="text-3xl">{badge.emoji}</span>
            )}
          </div>
          <h4 className="text-xs font-semibold text-center mb-1">{badge.title}</h4>
          <p className="text-xs text-muted-foreground text-center line-clamp-2">
            {badge.description}
          </p>
          {badge.unlocked && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
