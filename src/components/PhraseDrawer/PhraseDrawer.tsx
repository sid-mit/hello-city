import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Location } from '@/stores/appStore';
import { Button } from '../ui/button';
import { PhraseCard } from './PhraseCard';

interface PhraseDrawerProps {
  location: Location;
  onClose: () => void;
}

export const PhraseDrawer = ({ location, onClose }: PhraseDrawerProps) => {
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
        className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-large max-h-[70vh] md:max-h-[50vh] overflow-hidden"
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-muted rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{location.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold">{location.name}</h2>
              <p className="text-muted-foreground">{location.category}</p>
            </div>
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

        {/* Phrases List */}
        <div className="overflow-y-auto px-6 py-4 space-y-3" style={{ maxHeight: 'calc(70vh - 140px)' }}>
          {location.phrases.map((phrase, index) => (
            <motion.div
              key={phrase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PhraseCard phrase={phrase} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
