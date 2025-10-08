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
              className="w-full max-w-[480px]"
            >
              <div className="bg-background rounded-2xl py-8 px-8 shadow-xl border border-border/50 relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute right-4 top-4 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Header */}
                <div className="flex items-center justify-center mb-6">
                  <h2 className="text-xl font-medium text-foreground text-center font-gilroy">
                    Where do you plan to travel?
                  </h2>
                </div>

                {/* City Pills - Grid Layout */}
                <div className="flex flex-col items-center gap-2.5 mb-5">
                  {/* First Row */}
                  <div className="flex gap-2.5">
                    {cities.slice(0, 3).map((city) => (
                      <motion.button
                        key={city.id}
                        onClick={() => city.available && onCitySelect(city)}
                        disabled={!city.available}
                        className={`
                          px-6 py-2.5 text-sm rounded-lg font-medium font-gilroy
                          transition-all
                          ${city.available 
                            ? 'bg-primary/15 text-primary hover:bg-primary/20 cursor-pointer' 
                            : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                          }
                        `}
                        whileTap={city.available ? { scale: 0.95 } : {}}
                      >
                        {city.name}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Second Row */}
                  <div className="flex gap-2.5">
                    {cities.slice(3).map((city) => (
                      <motion.button
                        key={city.id}
                        onClick={() => city.available && onCitySelect(city)}
                        disabled={!city.available}
                        className={`
                          px-6 py-2.5 text-sm rounded-lg font-medium font-gilroy
                          transition-all
                          ${city.available 
                            ? 'bg-primary/15 text-primary hover:bg-primary/20 cursor-pointer' 
                            : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                          }
                        `}
                        whileTap={city.available ? { scale: 0.95 } : {}}
                      >
                        {city.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* More Options Text */}
                <p className="text-center text-xs text-muted-foreground font-gilroy">
                  More destinations coming soon!
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
