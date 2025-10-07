import { useState } from 'react';
import { Star } from 'lucide-react';
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

  // Calculate difficulty based on phrase count
  const getDifficulty = () => {
    const count = situation.phrases.length;
    if (count <= 3) return 'Essential';
    if (count <= 5) return 'Important';
    return 'Advanced';
  };

  return (
    <>
      <div 
        className="bg-white rounded-2xl flex flex-col transition-transform active:scale-[0.99]" 
        style={{ 
          width: '280px', 
          minWidth: '280px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        {/* Header Row: Emoji + Title + Star */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-[28px] leading-none">{situation.emoji}</span>
            <h3 className="text-[17px] font-semibold leading-tight" style={{ color: '#1a1a1a' }}>
              {situation.title}
            </h3>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="shrink-0 w-[44px] h-[44px] flex items-center justify-center -mr-2 transition-transform active:scale-95"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                isFavorited
                  ? 'fill-[#fbbf24] text-[#fbbf24]'
                  : 'text-[#d1d5db]'
              }`}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Description (optional, can be removed if redundant) */}
        <p className="text-[14px] leading-[1.5] mb-3 line-clamp-2" style={{ color: '#6b7280' }}>
          {situation.description}
        </p>

        {/* Phrase Count with Difficulty */}
        <div className="mb-4">
          <span className="text-[13px]" style={{ color: '#9ca3af' }}>
            💬 {situation.phrases.length} phrases • {getDifficulty()}
          </span>
        </div>

        {/* Practice Button */}
        <Button
          onClick={handlePracticeClick}
          className="w-full h-[44px] rounded-[10px] text-[15px] font-medium transition-all active:scale-[0.98]"
          style={{ 
            backgroundColor: '#f3f4f6',
            color: '#1a1a1a',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
        >
          🎤 Practice Now
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
