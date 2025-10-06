import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { SituationCard, SituationData } from '@/components/Cards/SituationCard';

interface PhraseDrawerProps {
  categoryTitle: string;
  categoryEmoji: string;
  situations: SituationData[];
  onClose: () => void;
}

export const PhraseDrawer = ({ categoryTitle, categoryEmoji, situations, onClose }: PhraseDrawerProps) => {
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
        style={{ height: '400px', maxHeight: '40vh' }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-muted rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{categoryEmoji}</span>
            <h2 className="text-xl font-bold">{categoryTitle}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Horizontal Scrollable Situation Cards */}
        <div 
          className="flex overflow-x-auto gap-4 px-5 py-5 snap-x snap-mandatory scrollbar-hide"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
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
      </motion.div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </AnimatePresence>
  );
};
