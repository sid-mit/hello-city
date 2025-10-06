import { motion, AnimatePresence } from 'framer-motion';
import { City } from '@/stores/appStore';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface CitySelectorProps {
  cities: City[];
  onCitySelect: (city: City) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const CitySelector = ({ cities, onCitySelect, isVisible, onClose }: CitySelectorProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Selector Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <div className="glass rounded-2xl p-8 shadow-large border border-border/50">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Where do you plan to travel?</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="shrink-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* City Pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {cities.map((city) => (
                  <motion.button
                    key={city.id}
                    onClick={() => onCitySelect(city)}
                    className="px-6 py-3 rounded-full border border-border bg-background hover:bg-accent hover:border-primary/50 transition-all font-medium"
                    whileTap={{ scale: 0.95 }}
                  >
                    {city.name}
                  </motion.button>
                ))}
              </div>

              {/* More Options Text */}
              <p className="text-center text-sm text-muted-foreground">
                More options adding...
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
