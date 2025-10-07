import { useState } from 'react';
import { Star, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { toast } from 'sonner';
import { ConversationPracticeModal } from '@/components/Practice/ConversationPracticeModal';

export interface SituationData {
  id: string;
  cityId: string;
  cityName: string;
  cityEmoji: string;
  emoji: string;
  title: string;
  description: string;
  context: string;
  culturalTip?: string;
  categoryColor?: string;
  conversationFlow?: Array<{
    step: number;
    speaker: 'you' | 'other';
    phraseIndex?: number;
    action?: string;
  }>;
  // New format: unified conversation script
  conversationScript?: Array<{
    speaker: 'user' | 'server';
    native: string;
    romanization: string;
    english: string;
    needsRecording?: boolean;
  }>;
  // Legacy format (for backward compatibility)
  serverResponses?: Array<{
    afterUserPhraseIndex: number;
    native: string;
    romanization: string;
    english: string;
  }>;
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

  const borderColor = situation.categoryColor || 'transparent';
  const phrasesToShow = situation.phrases.slice(0, 3);
  const hasMorePhrases = situation.phrases.length > 3;

  return (
    <>
      <div 
        className="bg-card rounded-2xl p-4 shadow-md flex flex-col border-l-4 hover:shadow-lg transition-all duration-300 overflow-y-auto" 
        style={{ 
          width: '320px', 
          minWidth: '320px', 
          minHeight: '360px',
          maxHeight: '480px',
          borderLeftColor: borderColor,
          boxShadow: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`,
        }}
        onMouseEnter={(e) => {
          if (borderColor !== 'transparent') {
            e.currentTarget.style.boxShadow = `0 10px 15px -3px ${borderColor}20, 0 4px 6px -4px ${borderColor}30`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`;
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
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
        <p className="text-sm text-foreground mb-2 leading-5 line-clamp-2">
          {situation.description}
        </p>

        {/* Context Badge */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
            📍 {situation.context}
          </span>
        </div>

        {/* Phrase Preview */}
        <div className="mb-2 flex-1">
          <p className="text-xs font-semibold text-foreground mb-2">🗣️ You'll learn:</p>
          <ul className="space-y-1.5">
            {phrasesToShow.map((phrase, index) => (
              <li key={index} className="text-xs flex flex-col gap-0.5">
                <span className="text-foreground font-medium line-clamp-1">{phrase.english}</span>
                <span className="text-muted-foreground text-[10px] line-clamp-1">{phrase.native}</span>
              </li>
            ))}
            {hasMorePhrases && (
              <li className="text-xs text-primary font-medium">
                + {situation.phrases.length - 3} more
              </li>
            )}
          </ul>
        </div>

        {/* Cultural Tip */}
        {situation.culturalTip && (
          <div className="mb-2 p-2 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
              💡 Cultural Tip
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {situation.culturalTip}
            </p>
          </div>
        )}

        {/* Progress Indicator */}
        {hasPracticed && (
          <div className="flex items-center gap-2 mb-2 text-xs">
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
          style={borderColor !== 'transparent' ? {
            backgroundColor: `${borderColor}15`,
            color: borderColor,
          } : undefined}
          onMouseEnter={(e) => {
            if (borderColor !== 'transparent') {
              e.currentTarget.style.backgroundColor = `${borderColor}25`;
            }
          }}
          onMouseLeave={(e) => {
            if (borderColor !== 'transparent') {
              e.currentTarget.style.backgroundColor = `${borderColor}15`;
            }
          }}
        >
          <Mic className="w-4 h-4 mr-2" />
          Practice Now
        </Button>
      </div>

      {/* Practice Modal */}
      {showPracticeModal && (
        <ConversationPracticeModal
          situation={situation}
          onClose={() => setShowPracticeModal(false)}
        />
      )}
    </>
  );
};
