import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Check, Sparkles } from 'lucide-react';
import { Phrase } from '@/stores/appStore';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAppStore } from '@/stores/appStore';
import { generateNaturalSpeech, VoiceSource } from '@/utils/voiceManager';

interface PhraseCardProps {
  phrase: Phrase;
}

export const PhraseCard = ({ phrase }: PhraseCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceSource, setVoiceSource] = useState<VoiceSource | null>(null);
  const { learnedPhrases, markPhraseAsLearned } = useAppStore();
  const isLearned = learnedPhrases.has(phrase.id);

  const handleSpeak = async () => {
    try {
      setIsPlaying(true);
      const result = await generateNaturalSpeech(phrase.text, 'paris'); // Default to French
      setVoiceSource(result.source);
      setIsPlaying(false);
      if (!isLearned) {
        markPhraseAsLearned(phrase.id);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setVoiceSource(null);
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
          {/* Native Phrase with Voice Source Badge */}
          <div className="flex items-center gap-2 mb-1">
            <p className="text-lg font-semibold text-foreground">
              {phrase.text}
            </p>
            {voiceSource === 'browser' && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                🎤
              </Badge>
            )}
            {voiceSource === 'elevenlabs' && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-primary/30">
                <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                AI
              </Badge>
            )}
          </div>
          
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
