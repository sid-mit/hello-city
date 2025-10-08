import { Volume2, Mic, Loader2, Lock, RotateCcw, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatAvatar } from "./ChatAvatar";
import { ScoreBadge } from "./ScoreBadge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
  isFuture?: boolean;
  onPlayAudio: () => void;
  onRecord?: () => void;
  onRetry?: () => void;
  onContinue?: () => void;
  onRetryPast?: () => void;
  isRecording?: boolean;
  isAnalyzing?: boolean;
  score?: number;
}

export const ChatBubble = ({
  speaker,
  phrase,
  isActive = false,
  isPast = false,
  isFuture = false,
  onPlayAudio,
  onRecord,
  onRetry,
  onContinue,
  onRetryPast,
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
            ? "bg-primary/10 border-2 border-primary/30 rounded-tr-sm"
            : "bg-muted/80 border-2 border-border rounded-tl-sm",
          isActive && isUser && !score && "ring-2 ring-primary shadow-lg",
          isRecording && "ring-2 ring-primary/50 animate-pulse",
          isPast && "opacity-70",
          isFuture && "opacity-40 grayscale"
        )}
      >
        {/* Lock icon overlay for future messages */}
        {isFuture && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 rounded-2xl backdrop-blur-[2px]">
            <Lock className="w-6 h-6 text-muted-foreground/50" />
          </div>
        )}
        
        <div className={cn("space-y-1.5 pr-8", isFuture && "blur-[1px]")}>
          <p className="text-[17px] md:text-lg font-semibold leading-tight">{phrase.romanization}</p>
          <p className="text-[13px] text-muted-foreground">"{phrase.english}"</p>
          <p className="text-[11px] text-muted-foreground/70">{phrase.native}</p>
        </div>

        {/* Speaker Button - Top right */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onPlayAudio}
                disabled={isFuture}
                className={cn(
                  "absolute top-2.5 right-2.5 p-1.5 rounded-full transition-colors",
                  "hover:bg-background/50",
                  isFuture && "opacity-30 cursor-not-allowed"
                )}
                aria-label="Play audio"
              >
                <Volume2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>🔊 Listen</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Recording Button - Bottom right (User bubbles only, when no score) */}
        {isUser && !score && onRecord && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onRecord}
                  disabled={isRecording || isAnalyzing || isFuture}
                  className={cn(
                    "absolute bottom-2.5 right-2.5 p-2.5 rounded-full transition-all",
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    "disabled:opacity-50 disabled:cursor-not-allowed shadow-md",
                    isRecording && "scale-110"
                  )}
                  aria-label="Record audio"
                >
                  {isAnalyzing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>🎤 Record</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Score Badge with Actions - After recording */}
        {isUser && score !== undefined && (
          <div className="mt-3 pt-3 border-t border-primary/20 space-y-2">
            <div className="flex items-center gap-2">
              <ScoreBadge score={score} />
              {isPast && onRetryPast && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={onRetryPast}
                        className="p-1 rounded-full hover:bg-background/50 transition-colors"
                        aria-label="Retry from here"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Retry from here</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {(onRetry || onContinue) && (
              <div className="flex gap-2">
                {onRetry && (
                  <Button
                    onClick={onRetry}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Try Again
                  </Button>
                )}
                {onContinue && (
                  <Button
                    onClick={onContinue}
                    size="sm"
                    className="flex-1 gap-1"
                  >
                    Continue
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {isUser && <ChatAvatar speaker="you" />}
    </motion.div>
  );
};
