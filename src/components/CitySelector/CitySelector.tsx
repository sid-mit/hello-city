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
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Centering Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[550px]"
            >
              <div className="bg-background rounded-3xl py-10 px-10 shadow-xl border border-border/50 relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute right-5 top-5 h-9 w-9"
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Header */}
                <div className="flex items-center justify-center mb-8">
                  <h2 className="text-2xl font-semibold text-foreground text-center font-gilroy">
                    Where do you plan to travel?
                  </h2>
                </div>

                {/* City Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {cities.map((city) => (
                    <motion.button
                      key={city.id}
                      onClick={() => city.available && onCitySelect(city)}
                      disabled={!city.available}
                      className={`
                        px-8 py-3 text-base rounded-[30px] font-semibold font-gilroy
                        transition-all
                        ${city.available 
                          ? 'bg-primary/10 text-primary hover:bg-primary/15 cursor-pointer' 
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                        }
                      `}
                      whileTap={city.available ? { scale: 0.95 } : {}}
                    >
                      {city.name}
                    </motion.button>
                  ))}
                </div>

                {/* More Options Text */}
                <p className="text-center text-sm text-muted-foreground font-gilroy">
                  More destinations coming soon
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
