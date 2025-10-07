import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';

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
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-b from-white to-[#F5F8FF] flex items-center justify-center px-4">
      {/* Floating greetings in background */}
      <motion.div
        className="absolute left-[35px] top-[505px] pointer-events-none"
        animate={{ x: [0, -15, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ color: '#E0EBFF', fontSize: '64px', fontFamily: 'Outfit', fontWeight: 600 }}
      >
        你好
      </motion.div>
      <motion.div
        className="absolute left-[260px] top-[636px] pointer-events-none"
        animate={{ x: [0, 10, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ color: '#E6EEFF', fontSize: '32px', fontFamily: 'Outfit', fontWeight: 600 }}
      >
        こんにちは
      </motion.div>
      <motion.div
        className="absolute left-[463px] top-[203px] pointer-events-none"
        animate={{ x: [0, -8, 0], y: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ color: '#EEF4FF', fontSize: '24px', fontFamily: 'Outfit', fontWeight: 600 }}
      >
        হ্যালো
      </motion.div>
      <motion.div
        className="absolute left-[525px] top-[522px] pointer-events-none"
        animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ color: '#E9F1FF', fontSize: '24px', fontFamily: 'Outfit', fontWeight: 600 }}
      >
        வணக்கம்
      </motion.div>
      <motion.div
        className="absolute right-[60px] top-[112px] pointer-events-none"
        animate={{ x: [0, 18, 0], y: [0, -25, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ color: '#EDF3FF', fontSize: '96px', fontFamily: 'Outfit', fontWeight: 600 }}
      >
        Namaste
      </motion.div>
      <motion.div
        className="absolute left-[175px] top-[289px] pointer-events-none"
        animate={{ x: [0, -12, 0], y: [0, 15, 0] }}
        transition={{ duration: 13, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ color: '#E1EBFF', fontSize: '40px', fontFamily: 'Outfit', fontWeight: 600 }}
      >
        Bonjour
      </motion.div>
      <motion.div
        className="absolute left-[-63px] top-[92px] pointer-events-none"
        animate={{ x: [0, 15, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ color: '#F1F6FF', fontSize: '64px', fontFamily: 'Outfit', fontWeight: 600 }}
      >
        Kamusta
      </motion.div>
      <motion.div
        className="absolute right-[64px] bottom-[149px] pointer-events-none"
        animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ color: '#DDE8FF', fontSize: '36px', fontFamily: 'Outfit', fontWeight: 600 }}
      >
        안녕하세요
      </motion.div>
      <motion.div
        className="absolute right-[54px] top-[456px] pointer-events-none"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 13, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{ color: '#ECF2FF', fontSize: '64px', fontFamily: 'Outfit', fontWeight: 600 }}
      >
        Hujambo
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl flex flex-col items-center justify-center text-center relative z-10"
        >
          <h1 
            className="text-[#404040] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4"
            style={{ fontFamily: 'Gilroy', fontWeight: 700, letterSpacing: '0.8px' }}
          >
            {slides[currentSlide].title}
          </h1>
          <p 
            className="text-[#404040] text-lg md:text-xl leading-relaxed mb-12 max-w-xl px-4"
            style={{ fontFamily: 'Gilroy', fontWeight: 500 }}
          >
            {slides[currentSlide].description}
          </p>

          <div className="flex items-center gap-4">
            {!isFirstSlide && (
              <button
                onClick={handleBack}
                className="px-8 py-3 border-2 border-[#2A64EC] text-[#2A64EC] font-semibold rounded-full transition-all hover:bg-[#2A64EC]/5"
                style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '18px' }}
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext} 
              className="px-12 py-3 bg-[#BDD1FF] text-[#2A64EC] font-semibold rounded-full transition-all hover:bg-[#BDD1FF]/80"
              style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '18px' }}
            >
              {isFirstSlide ? 'Continue →' : isLastSlide ? 'Get Started →' : 'Next'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
