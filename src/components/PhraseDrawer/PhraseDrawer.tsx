import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { SituationCard, SituationData } from '@/components/Cards/SituationCard';

interface PhraseDrawerProps {
  categoryTitle: string;
  categoryEmoji: string;
  categoryColor?: string;
  categoryDescription?: string;
  categoryIconImage?: string;
  situations: SituationData[];
  onClose: () => void;
}

export const PhraseDrawer = ({ categoryTitle, categoryEmoji, categoryColor, categoryDescription, categoryIconImage, situations, onClose }: PhraseDrawerProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const cardWidth = 280 + 16; // card width + gap
    const scrollPosition = container.scrollLeft;
    const newIndex = Math.round(scrollPosition / cardWidth);
    setCurrentCardIndex(newIndex);
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
      />

      {/* Drawer */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y > 100) {
            onClose();
          }
        }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-large overflow-hidden"
        style={{ 
          height: 'auto',
          maxHeight: 'min(60vh, 600px)',
        }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-muted rounded-full" />
        </div>

        {/* Category Header */}
        <div className="px-5 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            {categoryIconImage ? (
              <img src={categoryIconImage} alt={categoryTitle} className="w-9 h-9 object-contain" />
            ) : (
              <span className="text-[28px] leading-none">{categoryEmoji}</span>
            )}
            <h2 className="text-[20px] font-semibold text-foreground">
              {categoryTitle}
            </h2>
          </div>
          {categoryDescription && (
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {categoryDescription}
            </p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-[44px] h-[44px] flex items-center justify-center transition-colors hover:bg-muted rounded-full"
        >
          <X className="w-[28px] h-[28px] text-muted-foreground" />
        </button>

        {/* Horizontal Scrollable Situation Cards */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto px-3 sm:px-5 py-5 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              gap: '16px',
            }}
          >
            {situations.map((situation, index) => (
              <motion.div
                key={situation.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="snap-start"
              >
                <SituationCard situation={situation} />
              </motion.div>
            ))}
          </div>

          {/* Fade Gradient on Right */}
          {currentCardIndex < situations.length - 1 && (
            <div 
              className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
              style={{
                background: 'linear-gradient(to left, #FFFFFF, transparent)',
              }}
            />
          )}
        </div>
      </motion.div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @media (max-width: 768px) {
          .fixed.bottom-0 {
            max-height: 70vh !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .fixed.bottom-0 {
            max-height: 65vh !important;
          }
        }
        
        @media (min-width: 1025px) {
          .fixed.bottom-0 {
            max-height: 60vh !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};
