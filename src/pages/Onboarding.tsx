import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { CloudBackground } from '@/components/Onboarding/CloudBackground';

const slides = [
  {
    title: 'Say Hello to Your Next City',
    description: 'Every city has its own rhythm. Start with a simple hello.',
  },
  {
    title: 'Explore the World Naturally',
    description: 'Learn languages through real travel moments - from ordering coffee to finding your way around.',
  },
  {
    title: 'Practice & Perfect',
    description: 'Listen to locals, speak with confidence, and track your progress at your own pace.',
  },
  {
    title: 'Welcome to HelloCity!',
    description: "You're all set to explore, learn, and connect - one city at a time.",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { setHasCompletedOnboarding } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay decorative elements to ensure main content paints first
    const timer = setTimeout(() => {
      setMounted(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setHasCompletedOnboarding(true);
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="w-full min-h-[100svh] overflow-hidden relative bg-gradient-to-b from-white to-[#F5F8FF] grid place-items-center px-4">
      {/* Cloud background graphics */}
      {mounted && <CloudBackground />}
      
      {/* Floating greetings in background */}
      {mounted && <motion.div
        className="absolute pointer-events-none"
        style={{ left: '3vw', top: '70vh' }}
        animate={{ x: [0, -15, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span style={{ color: '#E0EBFF', fontSize: 'clamp(40px, 5vw, 64px)', fontFamily: 'Outfit', fontWeight: 600 }}>
          你好
        </span>
      </motion.div>}
      {mounted && <motion.div
        className="absolute pointer-events-none"
        style={{ left: '18vw', top: '88vh' }}
        animate={{ x: [0, 10, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span style={{ color: '#E6EEFF', fontSize: 'clamp(20px, 2.5vw, 32px)', fontFamily: 'Outfit', fontWeight: 600 }}>
          こんにちは
        </span>
      </motion.div>}
      {mounted && <motion.div
        className="absolute pointer-events-none"
        style={{ left: '32vw', top: '28vh' }}
        animate={{ x: [0, -8, 0], y: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span style={{ color: '#EEF4FF', fontSize: 'clamp(16px, 2vw, 24px)', fontFamily: 'Outfit', fontWeight: 600 }}>
          হ্যালো
        </span>
      </motion.div>}
      {mounted && <motion.div
        className="absolute pointer-events-none"
        style={{ left: '36vw', top: '72vh' }}
        animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span style={{ color: '#E9F1FF', fontSize: 'clamp(16px, 2vw, 24px)', fontFamily: 'Outfit', fontWeight: 600 }}>
          வணக்கம்
        </span>
      </motion.div>}
      {mounted && <motion.div
        className="absolute pointer-events-none"
        style={{ right: '4vw', top: '15vh' }}
        animate={{ x: [0, 18, 0], y: [0, -25, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span style={{ color: '#EDF3FF', fontSize: 'clamp(56px, 7vw, 96px)', fontFamily: 'Outfit', fontWeight: 600 }}>
          Namaste
        </span>
      </motion.div>}
      {mounted && <motion.div
        className="absolute pointer-events-none"
        style={{ left: '12vw', top: '40vh' }}
        animate={{ x: [0, -12, 0], y: [0, 15, 0] }}
        transition={{ duration: 13, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span style={{ color: '#E1EBFF', fontSize: 'clamp(28px, 3.5vw, 40px)', fontFamily: 'Outfit', fontWeight: 600 }}>
          Bonjour
        </span>
      </motion.div>}
      {mounted && <motion.div
        className="absolute pointer-events-none"
        style={{ left: '-4vw', top: '12vh' }}
        animate={{ x: [0, 15, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span style={{ color: '#F1F6FF', fontSize: 'clamp(40px, 5vw, 64px)', fontFamily: 'Outfit', fontWeight: 600 }}>
          Kamusta
        </span>
      </motion.div>}
      {mounted && <motion.div
        className="absolute pointer-events-none"
        style={{ right: '4vw', bottom: '20vh' }}
        animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span style={{ color: '#DDE8FF', fontSize: 'clamp(24px, 3vw, 36px)', fontFamily: 'Outfit', fontWeight: 600 }}>
          안녕하세요
        </span>
      </motion.div>}
      {mounted && <motion.div
        className="absolute pointer-events-none"
        style={{ right: '3.5vw', top: '63vh' }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 13, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <span style={{ color: '#ECF2FF', fontSize: 'clamp(40px, 5vw, 64px)', fontFamily: 'Outfit', fontWeight: 600 }}>
          Hujambo
        </span>
      </motion.div>}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10"
        >
          <h1 
            className="mb-6 mx-auto px-4 md:px-6 lg:px-8"
            style={{ color: '#404040', fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Gilroy', fontWeight: 700, letterSpacing: '0.8px' }}
          >
            {slides[currentSlide].title}
          </h1>
          <p 
            className="mb-12 max-w-2xl mx-auto px-4 md:px-6 lg:px-8"
            style={{ color: '#404040', fontSize: 'clamp(14px, 2vw, 18px)', fontFamily: 'Gilroy', fontWeight: 500 }}
          >
            {slides[currentSlide].description}
          </p>

          <div className="flex items-center justify-center gap-4">
            {!isFirstSlide && (
              <button
                onClick={handleBack}
                className="min-w-[140px] px-12 py-1.5 border-2 border-[#2A64EC] bg-transparent rounded-full transition-all hover:bg-[#2A64EC]/5"
                style={{ color: '#2A64EC', fontFamily: 'Outfit', fontWeight: 600, fontSize: '16px' }}
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext} 
              className="min-w-[140px] px-12 py-1.5 bg-[#BDD1FF] rounded-full transition-all hover:bg-[#BDD1FF]/80"
              style={{ color: '#2A64EC', fontFamily: 'Outfit', fontWeight: 600, fontSize: '16px' }}
            >
              {isFirstSlide ? 'Continue' : isLastSlide ? 'Get Started' : 'Next'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Skip Onboarding button - show on all slides after first */}
      {currentSlide >= 1 && (
        <button
          onClick={() => {
            setHasCompletedOnboarding(true);
            navigate('/home');
          }}
          className="absolute bottom-8 right-8 transition-all hover:underline z-20"
          style={{ color: '#6B7280', fontFamily: 'Outfit', fontWeight: 600, fontSize: '16px' }}
        >
          Skip Onboarding →
        </button>
      )}
    </div>
  );
}
