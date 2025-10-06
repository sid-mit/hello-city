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
            <div className="glass rounded-2xl p-6 shadow-large border border-border/50">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Choose Your Destination</h2>
                  <p className="text-muted-foreground mt-1">
                    Select a city to learn essential phrases
                  </p>
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

              {/* City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cities.map((city) => (
                  <motion.button
                    key={city.id}
                    onClick={() => onCitySelect(city)}
                    className="glass rounded-xl p-4 border border-border/50 hover:border-primary/50 transition-all group text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{city.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {city.country} • {city.language}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
