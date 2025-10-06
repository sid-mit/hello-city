import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
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
  if (typeof document === 'undefined') return null;
  
  return createPortal(
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

          {/* Centering Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl"
            >
              <div className="glass rounded-2xl pt-[80px] px-8 pb-[80px] shadow-large border border-border/50 relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute right-6 top-6 h-6 w-6"
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Header */}
                <div className="flex items-center justify-center mb-[40px]">
                  <h2 className="text-[48px] font-bold font-architects">Where do you plan to travel?</h2>
                </div>

                {/* City Pills */}
                <div className="flex flex-wrap justify-center gap-[10px] mb-6">
                  {cities.map((city) => (
                    <motion.button
                      key={city.id}
                      onClick={() => onCitySelect(city)}
                      className="h-[43px] px-[30px] rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/50 transition-all font-medium font-karla"
                      whileTap={{ scale: 0.95 }}
                    >
                      {city.name}
                    </motion.button>
                  ))}
                </div>

                {/* More Options Text */}
                <p className="text-center text-sm text-muted-foreground font-karla">
                  More options adding...
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
