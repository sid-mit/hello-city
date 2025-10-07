import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface JourneyStageProps {
  emoji: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export const JourneyStage = ({ emoji, title, description, children }: JourneyStageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-background/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-border/50">
        {/* Emoji */}
        <motion.div
          className="text-6xl md:text-7xl mb-6 text-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          {emoji}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground font-karla"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-muted-foreground text-center leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {description}
        </motion.p>

        {/* Children (input, buttons, etc) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
