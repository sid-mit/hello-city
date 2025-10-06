import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

const slides = [
  {
    emoji: '👋',
    title: 'Welcome to HelloCity!',
    description: 'Your interactive companion for learning languages through travel. Master essential phrases for any destination.',
  },
  {
    emoji: '🗺️',
    title: 'Explore Cities',
    description: 'Browse the interactive map, select a city, and discover phrases organized by real-world situations.',
  },
  {
    emoji: '🎤',
    title: 'Practice & Perfect',
    description: 'Use AI-powered pronunciation practice to speak like a local. Save favorites and track your progress.',
  },
];

export const WelcomeModal = () => {
  const { setGuestName, guestName } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hellocity-welcome-shown');
    if (!hasSeenWelcome && !guestName) {
      setIsVisible(true);
    }
  }, [guestName]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
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

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex gap-1.5">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-8 bg-primary' : 'w-1.5 bg-muted'
                  }`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={handleSkip}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 text-center"
            >
              <div className="text-6xl mb-4">{slides[currentSlide].emoji}</div>
              <h2 className="text-2xl font-bold mb-3 text-foreground">
                {slides[currentSlide].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {slides[currentSlide].description}
              </p>

              {isLastSlide && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-left">
                    What should we call you? (optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="text-center"
                    onKeyPress={(e) => e.key === 'Enter' && handleGetStarted()}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentSlide === 0}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            {isLastSlide ? (
              <Button onClick={handleGetStarted} className="gap-1">
                Get Started
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleNext} className="gap-1">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
