import { Volume2, Mic, Loader2 } from "lucide-react";
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
  isPast?: boolean;
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
  isPast = false,
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
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-start gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && <ChatAvatar speaker="other" />}
      
      <div
        className={cn(
          "relative rounded-2xl p-4 max-w-[75%] transition-all",
          isUser
            ? "bg-blue-50 border-2 border-blue-200 rounded-tr-sm"
            : "bg-muted border-2 border-border rounded-tl-sm",
          isActive && isUser && !score && "ring-2 ring-primary shadow-lg",
          isRecording && "ring-2 ring-blue-400 animate-pulse",
          isPast && "opacity-70"
        )}
      >
        <div className="space-y-1 pr-8">
          <p className="text-base md:text-lg font-semibold">{phrase.native}</p>
          <p className="text-sm text-muted-foreground italic">{phrase.romanization}</p>
          <p className="text-xs text-muted-foreground">{phrase.english}</p>
        </div>

        {/* Audio Button - All bubbles */}
        <button
          onClick={onPlayAudio}
          className={cn(
            "absolute bottom-3 right-3 p-1.5 rounded-full transition-colors",
            "hover:bg-background/50"
          )}
          aria-label="Play audio"
        >
          <Volume2 className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Recording Button - User bubbles only */}
        {isUser && !score && onRecord && (
          <button
            onClick={onRecord}
            disabled={isRecording || isAnalyzing}
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
