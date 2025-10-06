import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeView } from './Globe/GlobeView';
import { useAppStore, City } from '@/stores/appStore';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [showNameInput, setShowNameInput] = useState(true);
  const { userName, setUserName, selectCity, setIsTransitioning } = useAppStore();

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setShowNameInput(false);
    }
  };

  const handleCityClick = (city: City) => {
    selectCity(city);
    setIsTransitioning(true);
    
    // Simulate globe-to-map transition
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-surface">
      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showNameInput ? 1 : 0, y: showNameInput ? 0 : -40 }}
        className="absolute top-12 left-0 right-0 z-20 text-center px-4"
      >
        <h1 className="heading-1 bg-gradient-primary bg-clip-text text-transparent mb-2">
          Welcome to TravelSpeak
        </h1>
        <p className="text-muted-foreground text-lg">
          Learn essential phrases for your journey
        </p>
      </motion.div>

      {/* Name Input Card */}
      <AnimatePresence>
        {showNameInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4"
          >
            <div className="glass rounded-2xl p-8 shadow-large">
              <h2 className="heading-3 mb-4 text-center">What's your name?</h2>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                  className="text-lg h-12"
                  autoFocus
                />
                <Button
                  onClick={handleNameSubmit}
                  disabled={!userName.trim()}
                  className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90 transition-smooth"
                  size="lg"
                >
                  Let's Start Learning
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showNameInput ? 0 : 1 }}
        className="absolute bottom-32 left-0 right-0 z-20 text-center px-4"
      >
        <p className="text-lg text-foreground font-medium mb-2">
          {userName && `Hi ${userName}! `}Choose a city to begin
        </p>
        <p className="text-muted-foreground">
          Click on any glowing pin on the globe
        </p>
      </motion.div>

      {/* Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl max-h-[600px]">
          <GlobeView onCityClick={handleCityClick} />
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};
