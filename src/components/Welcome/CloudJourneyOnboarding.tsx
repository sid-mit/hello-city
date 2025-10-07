import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { CloudLayer } from './CloudLayer';
import { FloatingPlane } from './FloatingPlane';
import { JourneyStage } from './JourneyStage';
import sparklesImg from '@/assets/clouds/sparkles.png';

const stages = [
  {
    emoji: '👋',
    title: 'Welcome Aboard HelloCity Airways',
    description: 'Fasten your seatbelt as we take you on a whimsical journey through language learning and travel.',
    autoAdvance: true,
  },
  {
    emoji: '🌍',
    title: 'Where are we going?',
    description: 'Your interactive companion for learning languages through travel. Explore the world, one phrase at a time.',
    autoAdvance: false,
  },
  {
    emoji: '🗺️',
    title: 'What awaits you?',
    description: 'Explore cities, discover phrases organized by real-world situations, and practice pronunciation.',
    autoAdvance: false,
  },
  {
    emoji: '🎤',
    title: 'How will you learn?',
    description: 'AI-powered pronunciation practice to speak like a local. Save favorites and track your progress.',
    autoAdvance: false,
  },
  {
    emoji: '✈️',
    title: 'Ready to begin?',
    description: 'Let\'s make your language learning journey unforgettable!',
    autoAdvance: false,
    isLast: true,
  },
];

export const CloudJourneyOnboarding = () => {
  const { setGuestName, guestName } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hellocity-welcome-shown');
    if (!hasSeenWelcome && !guestName) {
      setIsVisible(true);
    }
  }, [guestName]);

  // Auto-advance first stage
  useEffect(() => {
    if (isVisible && stages[currentStage]?.autoAdvance) {
      const timer = setTimeout(() => {
        setCurrentStage(1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, currentStage]);

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handleBack = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleComplete = () => {
    if (nameInput.trim()) {
      setGuestName(nameInput.trim());
    } else {
      setGuestName('Guest');
    }
    localStorage.setItem('hellocity-welcome-shown', 'true');
    setIsVisible(false);
  };

  const handleSkip = () => {
    setGuestName('Guest');
    localStorage.setItem('hellocity-welcome-shown', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentStageData = stages[currentStage];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-[100] overflow-hidden"
      >
        {/* Sky Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F4F8] via-[#C5E3ED] to-[#A5D4E6]" />

        {/* Animated Cloud Layers */}
        <CloudLayer depth="back" speed="slow" opacity={0.6} />
        <CloudLayer depth="middle" speed="medium" opacity={0.4} />
        <CloudLayer depth="front" speed="fast" opacity={0.3} />

        {/* Sparkles Layer */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url(${sparklesImg})`,
            backgroundSize: '600px 600px',
            backgroundRepeat: 'repeat',
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating Plane */}
        {currentStage === 0 && <FloatingPlane />}

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-4 pt-20 pb-24">
          {/* Skip Button */}
          <motion.button
            onClick={handleSkip}
            className="absolute top-8 right-8 text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Skip Journey →
          </motion.button>

          {/* Stage Content */}
          <AnimatePresence mode="wait">
            <JourneyStage
              key={currentStage}
              emoji={currentStageData.emoji}
              title={currentStageData.title}
              description={currentStageData.description}
            >
              {currentStageData.isLast && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-left text-foreground">
                      What should we call you? (optional)
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="text-center bg-background border-border"
                      onKeyPress={(e) => e.key === 'Enter' && handleComplete()}
                    />
                  </div>
                  <Button 
                    onClick={handleComplete} 
                    size="lg"
                    className="w-full rounded-full text-lg py-6"
                  >
                    Start Your Journey
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </JourneyStage>
          </AnimatePresence>

          {/* Navigation */}
          {!currentStageData.isLast && (
            <motion.div
              className="flex items-center justify-between w-full max-w-lg mx-auto mt-8 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStage === 0}
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="flex gap-2">
                {stages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentStage 
                        ? 'w-8 bg-primary' 
                        : index < currentStage
                        ? 'w-2 bg-primary/50'
                        : 'w-2 bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
