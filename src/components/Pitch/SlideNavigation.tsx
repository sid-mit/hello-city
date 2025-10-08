import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
}

const SlideNavigation = ({ currentSlide, totalSlides }: SlideNavigationProps) => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    if (currentSlide > 0) {
      navigate(`/pitch/slide-${currentSlide}`);
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      navigate(`/pitch/slide-${currentSlide + 2}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <>
      {currentSlide > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}
      
      {currentSlide < totalSlides - 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};

export default SlideNavigation;
