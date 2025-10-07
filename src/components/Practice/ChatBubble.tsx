import { Volume2, Mic, Loader2, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatAvatar } from "./ChatAvatar";
import { ScoreBadge } from "./ScoreBadge";

interface Phrase {
  native: string;
  romanization: string;
  english: string;
}

interface ChatBubbleProps {
  speaker: 'you' | 'other';
  phrase: Phrase;
  isActive?: boolean;
  isFuture?: boolean;
  isCompleted?: boolean;
  isLocked?: boolean;
  isServerSpeaking?: boolean;
  onPlayAudio: () => void;
  onRecord?: () => void;
  isRecording?: boolean;
  isAnalyzing?: boolean;
  score?: number;
}

export const ChatBubble = ({
  speaker,
  phrase,
  isActive = false,
  isFuture = false,
  isCompleted = false,
  isLocked = false,
  isServerSpeaking = false,
  onPlayAudio,
  onRecord,
  isRecording = false,
  isAnalyzing = false,
  score,
}: ChatBubbleProps) => {
  const isUser = speaker === 'you';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: isFuture ? 0.35 : 1, 
        y: 0, 
        scale: 1,
        filter: isFuture ? "grayscale(0.5)" : "grayscale(0)"
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-start gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && <ChatAvatar speaker="other" />}
      
      <div
        className={cn(
          "relative rounded-2xl p-4 max-w-[75%] transition-all duration-300",
          isUser
            ? "bg-blue-50 border-2 border-blue-200 rounded-tr-sm"
            : "bg-muted border-2 border-border rounded-tl-sm",
          isActive && isUser && !score && "ring-2 ring-primary shadow-lg",
          isRecording && "ring-2 ring-blue-400 animate-pulse",
          isServerSpeaking && "ring-2 ring-green-400 animate-pulse",
          isCompleted && "opacity-80",
          isFuture && "opacity-40 cursor-not-allowed"
        )}
      >
        {/* Lock Icon for Future Messages */}
        {isLocked && (
          <div className="absolute top-2 left-2">
            <Lock className="w-4 h-4 text-muted-foreground/50" />
          </div>
        )}

        <div className={cn("space-y-1", isUser ? "pr-8" : "pr-4", isLocked && "pl-6")}>
          <p className={cn(
            "text-base md:text-lg font-semibold",
            isFuture && "blur-sm select-none"
          )}>
            {phrase.native}
          </p>
          <p className={cn(
            "text-sm text-muted-foreground italic",
            isFuture && "blur-sm select-none"
          )}>
            {phrase.romanization}
          </p>
          <p className="text-xs text-muted-foreground">{phrase.english}</p>
        </div>

        {/* Audio Button - All bubbles (disabled if locked) */}
        {!isLocked && (
          <button
            onClick={onPlayAudio}
            disabled={isFuture}
            className={cn(
              "absolute bottom-3 right-3 p-1.5 rounded-full transition-colors",
              "hover:bg-background/50",
              isFuture && "opacity-30 cursor-not-allowed"
            )}
            aria-label="Play audio"
          >
            <Volume2 className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* Recording Button - User bubbles only */}
        {isUser && !score && onRecord && !isLocked && (
          <button
            onClick={onRecord}
            disabled={isRecording || isAnalyzing || !isActive}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Record audio"
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Checkmark for Completed Messages */}
        {isCompleted && !isUser && (
          <div className="absolute top-2 right-2">
            <div className="bg-green-500 rounded-full p-0.5">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}

        {/* Score Badge - After recording */}
        {isUser && score !== undefined && (
          <div className="mt-3 pt-3 border-t border-blue-300">
            <ScoreBadge score={score} />
          </div>
        )}
      </div>

      {isUser && <ChatAvatar speaker="you" />}
    </motion.div>
  );
};
