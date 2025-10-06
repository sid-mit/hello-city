import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Check } from 'lucide-react';
import { Phrase } from '@/stores/appStore';
import { Button } from '../ui/button';
import { useAppStore } from '@/stores/appStore';

interface PhraseCardProps {
  phrase: Phrase;
}

export const PhraseCard = ({ phrase }: PhraseCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { learnedPhrases, markPhraseAsLearned } = useAppStore();
  const isLearned = learnedPhrases.has(phrase.id);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(phrase.text);
      utterance.lang = 'fr-FR'; // French language
      utterance.rate = 0.8; // Slightly slower for learning
      
      utterance.onend = () => {
        setIsPlaying(false);
        if (!isLearned) {
          markPhraseAsLearned(phrase.id);
        }
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div
      className={`
        relative border-2 rounded-xl p-4 transition-all duration-300
        ${isLearned 
          ? 'bg-secondary/10 border-secondary' 
          : 'bg-card border-border hover:border-primary/50'
        }
      `}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start gap-3">
        <Button
          onClick={handleSpeak}
          variant="ghost"
          size="icon"
          className={`
            shrink-0 rounded-full transition-all
            ${isPlaying ? 'bg-primary text-primary-foreground scale-110' : ''}
          `}
        >
          <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
        </Button>

        <div className="flex-1 min-w-0">
          {/* Native Phrase */}
          <p className="text-lg font-semibold text-foreground mb-1">
            {phrase.text}
          </p>
          
          {/* Translation */}
          <p className="text-sm text-muted-foreground mb-1">
            {phrase.translation}
          </p>
          
          {/* Phonetic */}
          <p className="text-xs text-muted-foreground italic">
            {phrase.phonetic}
          </p>
        </div>

        {/* Learned Check */}
        {isLearned && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-secondary-foreground" />
          </motion.div>
        )}
      </div>

      {/* Playing animation */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  );
};
