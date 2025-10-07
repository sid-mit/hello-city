import { Volume2, Mic, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { ChatAvatar } from "./ChatAvatar";
import { ScoreBadge } from "./ScoreBadge";
import { Button } from "@/components/ui/button";

interface Phrase {
  native: string;
  romanization: string;
  english: string;
}

interface ChatBubbleProps {
  speaker: 'you' | 'other';
  phrase: Phrase;
  isActive: boolean;
  isPast: boolean;
  onPlayAudio: () => void;
  onRecord?: () => void;
  isRecording?: boolean;
  isAnalyzing?: boolean;
  score?: number;
}

export const ChatBubble = ({
  speaker,
  phrase,
  isActive,
  isPast,
  onPlayAudio,
  onRecord,
  isRecording,
  isAnalyzing,
  score
}: ChatBubbleProps) => {
  const isUser = speaker === 'you';
  
  const bubbleVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
  };

  const getBubbleClasses = () => {
    if (isUser) {
      if (isActive && !score) {
        return "bg-blue-50 border-2 border-blue-200 ring-2 ring-primary ring-offset-2";
      }
      if (score && score >= 80) {
        return "bg-green-50 border-2 border-green-200";
      }
      if (score && score >= 70) {
        return "bg-orange-50 border-2 border-orange-200";
      }
      if (score) {
        return "bg-red-50 border-2 border-red-200";
      }
      return "bg-blue-50 border-2 border-blue-200";
    }
    return "bg-muted border border-border";
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'} ${
        isPast && !score ? 'opacity-60' : ''
      }`}
    >
      {!isUser && <ChatAvatar speaker="other" />}
      
      <div
        className={`rounded-2xl p-4 max-w-[70%] relative ${
          isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
        } ${getBubbleClasses()} ${
          isRecording ? 'animate-pulse' : ''
        }`}
      >
        <p className="text-lg md:text-xl font-semibold mb-1">{phrase.native}</p>
        <p className="text-sm text-muted-foreground italic mb-0.5">{phrase.romanization}</p>
        <p className="text-xs text-muted-foreground">{phrase.english}</p>
        
        {/* Action buttons */}
        <div className="absolute bottom-2 right-2">
          {!isUser && (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 hover:bg-background/50"
              onClick={onPlayAudio}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
          
          {isUser && !score && !isAnalyzing && (
            <Button
              size="icon"
              variant="ghost"
              className={`h-8 w-8 hover:bg-background/50 ${isActive ? 'animate-pulse' : ''}`}
              onClick={onRecord}
              disabled={!isActive}
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
          
          {isUser && isAnalyzing && (
            <div className="h-8 w-8 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
        
        {/* Score display */}
        {isUser && score !== undefined && (
          <ScoreBadge score={score} />
        )}
      </div>
      
      {isUser && <ChatAvatar speaker="you" />}
    </motion.div>
  );
};
