import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { Input } from '@/components/ui/input';

const slides = [
  {
    emoji: '👋',
    title: 'Welcome to HelloCity!',
    description: 'Learn languages naturally through real travel situations. Practice ordering food, asking for directions, and more in cities around the world.',
    showNameInput: false,
  },
  {
    emoji: '🗺️',
    title: 'Explore Cities',
    description: "Select a city on the map, choose a situation, and start learning phrases you'll actually use. Each phrase includes pronunciation help and cultural context.",
    showNameInput: false,
  },
  {
    emoji: '🎯',
    title: 'Practice & Perfect',
    description: 'Listen to native speakers, practice your pronunciation, and track your progress. Ready to start your language journey?',
    showNameInput: true,
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { setGuestName, setHasCompletedOnboarding } = useAppStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nameInput, setNameInput] = useState('');

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
    setHasCompletedOnboarding(true);
    navigate('/home');
  };

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-b from-white to-[#F5F8FF] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20"
      >
        {/* Progress indicators */}
        <div className="flex items-center justify-center gap-1.5 p-6 border-b border-gray-200">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-[#2A64EC]' : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
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
            <div className="text-6xl mb-6">{slides[currentSlide].emoji}</div>
            <h2 
              className="text-[#404040] text-2xl font-bold mb-4"
              style={{ fontFamily: 'Gilroy' }}
            >
              {slides[currentSlide].title}
            </h2>
            <p 
              className="text-[#404040] text-base leading-relaxed mb-6"
              style={{ fontFamily: 'Gilroy' }}
            >
              {slides[currentSlide].description}
            </p>

            {slides[currentSlide].showNameInput && (
              <div className="mb-6">
                <label 
                  className="block text-sm font-medium mb-2 text-left text-[#404040]"
                  style={{ fontFamily: 'Gilroy' }}
                >
                  What should we call you? (optional)
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="text-center border-[#BDD1FF] focus:border-[#2A64EC]"
                  onKeyPress={(e) => e.key === 'Enter' && handleGetStarted()}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentSlide === 0}
            className="flex items-center gap-1 px-4 py-2 text-[#2A64EC] font-semibold rounded-lg transition-colors hover:bg-[#BDD1FF]/20 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Outfit' }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {isLastSlide ? (
            <button 
              onClick={handleGetStarted} 
              className="flex items-center gap-1 px-6 py-2 bg-[#BDD1FF] text-[#2A64EC] font-semibold rounded-lg transition-transform hover:scale-105"
              style={{ fontFamily: 'Outfit' }}
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleNext} 
              className="flex items-center gap-1 px-6 py-2 bg-[#BDD1FF] text-[#2A64EC] font-semibold rounded-lg transition-transform hover:scale-105"
              style={{ fontFamily: 'Outfit' }}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
