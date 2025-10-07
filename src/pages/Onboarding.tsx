import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';

const slides = [
  {
    title: 'Welcome to HelloCity!',
    description: 'Learn languages naturally through real travel situations. Practice ordering food, asking for directions, and more in cities around the world.',
  },
  {
    title: 'Explore Cities',
    description: "Select a city on the map, choose a situation, and start learning phrases you'll actually use. Each phrase includes pronunciation help and cultural context.",
  },
  {
    title: 'Practice & Perfect',
    description: 'Listen to native speakers, practice your pronunciation, and track your progress. Ready to start your language journey?',
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

  return (
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-b from-white to-[#F5F8FF] flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl flex flex-col items-center justify-center text-center"
        >
          <h1 
            className="text-[#404040] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4"
            style={{ fontFamily: 'Gilroy' }}
          >
            {slides[currentSlide].title}
          </h1>
          <p 
            className="text-[#404040] text-lg md:text-xl leading-relaxed mb-12 max-w-xl px-4"
            style={{ fontFamily: 'Gilroy' }}
          >
            {slides[currentSlide].description}
          </p>

          <div className="flex items-center gap-4">
            {!isFirstSlide && (
              <button
                onClick={handleBack}
                className="px-8 py-3 border-2 border-[#2A64EC] text-[#2A64EC] font-semibold rounded-full transition-all hover:bg-[#2A64EC]/5"
                style={{ fontFamily: 'Outfit' }}
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext} 
              className="px-12 py-3 bg-[#BDD1FF] text-[#2A64EC] font-semibold rounded-full transition-all hover:bg-[#BDD1FF]/80"
              style={{ fontFamily: 'Outfit' }}
            >
              Next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
