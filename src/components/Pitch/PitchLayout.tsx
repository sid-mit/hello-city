import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressDots from './ProgressDots';
import SlideNavigation from './SlideNavigation';
import { motion } from 'framer-motion';

interface PitchLayoutProps {
  children: React.ReactNode;
  currentSlide: number;
  totalSlides?: number;
}

const PitchLayout = ({ children, currentSlide, totalSlides = 6 }: PitchLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
        <button 
          onClick={() => navigate('/home')}
          className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          HelloCity
        </button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
          className="h-10 w-10 rounded-full hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center px-8 py-24"
      >
        {children}
      </motion.main>

      {/* Navigation */}
      <SlideNavigation currentSlide={currentSlide} totalSlides={totalSlides} />

      {/* Progress Dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <ProgressDots currentSlide={currentSlide} totalSlides={totalSlides} />
      </div>
    </div>
  );
};

export default PitchLayout;
