import React from 'react';
import { motion } from 'framer-motion';

interface ProgressDotsProps {
  currentSlide: number;
  totalSlides: number;
}

const ProgressDots = ({ currentSlide, totalSlides }: ProgressDotsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <motion.div
          key={index}
          className={`h-2 rounded-full transition-all ${
            index === currentSlide
              ? 'bg-primary w-8'
              : 'bg-muted w-2'
          }`}
          initial={{ scale: 0.8 }}
          animate={{ scale: index === currentSlide ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
