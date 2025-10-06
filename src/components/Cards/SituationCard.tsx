import { useState } from 'react';
import { Star, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { toast } from 'sonner';
import { PracticeModal } from '@/components/Practice/PracticeModal';

export interface SituationData {
  id: string;
  cityId: string;
  cityName: string;
  cityEmoji: string;
  emoji: string;
  title: string;
  description: string;
  context: string;
  phrases: Array<{
    native: string;
    romanization: string;
    english: string;
  }>;
}

interface SituationCardProps {
  situation: SituationData;
  onFavoriteClick?: () => void;
}

export const SituationCard = ({ situation, onFavoriteClick }: SituationCardProps) => {
  const { isSituationFavorited, toggleFavorite } = useAppStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const isFavorited = isSituationFavorited(situation.id);

  const handleFavoriteClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    toggleFavorite(situation);
    
    if (!isFavorited) {
      toast.success('✓ Added to Learn tab');
    } else {
      toast.success('Removed from collection');
    }
    
    onFavoriteClick?.();
  };

  const handlePracticeClick = () => {
    setShowPracticeModal(true);
  };

  const practiceHistory = useAppStore((state) => state.practiceHistory[situation.id]);
  const hasPracticed = !!practiceHistory;
  const needsReview = hasPracticed && practiceHistory.lastPracticed 
    ? (new Date().getTime() - new Date(practiceHistory.lastPracticed).getTime()) / (1000 * 60 * 60 * 24) > 7
    : false;

  return (
    <>
      <div className="bg-card rounded-2xl p-5 shadow-md flex flex-col justify-between" style={{ width: '280px', minWidth: '280px', height: '240px', maxHeight: '240px' }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-2xl shrink-0">{situation.emoji}</span>
            <h3 className="text-base font-semibold text-foreground line-clamp-1">{situation.title}</h3>
          </div>
          <motion.button
            onClick={handleFavoriteClick}
            className="shrink-0"
            animate={{
              scale: isAnimating ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                isFavorited
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
              strokeWidth={2}
            />
          </motion.button>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground mb-2 leading-5 line-clamp-2" style={{ height: '40px' }}>
          {situation.description}
        </p>

        {/* Context */}
        <p className="text-xs text-muted-foreground mb-3 leading-4 line-clamp-2" style={{ height: '32px' }}>
          {situation.context}
        </p>

        {/* Progress Indicator */}
        {hasPracticed && (
          <div className="flex items-center gap-2 mb-3 text-xs">
            {needsReview ? (
              <span className="flex items-center gap-1 text-yellow-600">
                ⚠️ Review needed
              </span>
            ) : (
              <span className="flex items-center gap-1 text-green-600">
                ✓ {practiceHistory.bestScore}% best
              </span>
            )}
          </div>
        )}

        {/* Practice Button */}
        <Button
          onClick={handlePracticeClick}
          className="w-full h-12 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl mt-auto"
          variant="ghost"
        >
          <Mic className="w-4 h-4 mr-2" />
          Practice Now
        </Button>
      </div>

      {/* Practice Modal */}
      {showPracticeModal && (
        <PracticeModal
          situation={situation}
          onClose={() => setShowPracticeModal(false)}
        />
      )}
    </>
  );
};
