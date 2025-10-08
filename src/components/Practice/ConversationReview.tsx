import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatBubble } from "./ChatBubble";
import { generateNaturalSpeech } from "@/utils/voiceManager";
import { analyzeSyllables, calculateOverallScore } from "@/utils/syllableAnalysis";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface Phrase {
  native: string;
  romanization: string;
  english: string;
}

interface ServerResponse {
  afterUserPhraseIndex: number;
  native: string;
  romanization: string;
  english: string;
}

interface ConversationReviewProps {
  phrases: Phrase[];
  serverResponses?: ServerResponse[];
  cityId: string;
  recognition: any;
  onComplete: (scores: number[]) => void;
  onBack?: () => void;
}

interface PhraseScore {
  phraseIndex: number;
  score: number;
}

export const ConversationReview = ({
  phrases,
  serverResponses = [],
  cityId,
  recognition,
  onComplete,
  onBack,
}: ConversationReviewProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [phraseScores, setPhraseScores] = useState<PhraseScore[]>([]);
  const [waitingForContinue, setWaitingForContinue] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active bubble
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentPhraseIndex]);

  // Setup speech recognition result handler
  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const currentPhrase = phrases[currentPhraseIndex];

      setIsAnalyzing(true);

      setTimeout(() => {
        const syllableAnalyses = analyzeSyllables(
          transcript,
          currentPhrase.native,
          currentPhrase.romanization
        );
        const score = Math.round(calculateOverallScore(syllableAnalyses));

        setPhraseScores((prev) => [
          ...prev,
          { phraseIndex: currentPhraseIndex, score },
        ]);

        if (score >= 90) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        }

        setIsAnalyzing(false);
        setIsRecording(false);
        setWaitingForContinue(true);
      }, 500);
    };

    recognition.onresult = handleResult;

    return () => {
      recognition.onresult = null;
    };
  }, [recognition, currentPhraseIndex, phrases, phraseScores, onComplete]);

  const handlePlayAudio = async (phrase: Phrase) => {
    try {
      await generateNaturalSpeech(phrase.native, cityId);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handlePlayServerAudio = async (response: ServerResponse) => {
    try {
      await generateNaturalSpeech(response.native, cityId);
    } catch (error) {
      console.error('Error playing server audio:', error);
    }
  };

  const handleRecord = () => {
    if (!recognition || isRecording || isAnalyzing) return;

    setIsRecording(true);
    recognition.start();

    setTimeout(() => {
      if (isRecording && recognition) {
        recognition.stop();
      }
    }, 4000);
  };

  const getScoreForPhrase = (phraseIndex: number): number | undefined => {
    return phraseScores.find((ps) => ps.phraseIndex === phraseIndex)?.score;
  };

  const handleRetry = (phraseIndex: number) => {
    setPhraseScores((prev) => prev.filter((ps) => ps.phraseIndex !== phraseIndex));
    setCurrentPhraseIndex(phraseIndex);
    setWaitingForContinue(false);
  };

  const handleContinue = () => {
    setWaitingForContinue(false);
    
    if (currentPhraseIndex < phrases.length - 1) {
      setCurrentPhraseIndex((prev) => prev + 1);
    } else {
      // All phrases completed
      onComplete(phraseScores.map((ps) => ps.score));
    }
  };

  // Build complete conversation with all messages visible from start
  const conversationMessages: Array<{
    type: 'user' | 'server';
    phraseIndex?: number;
    phrase?: Phrase;
    serverResponse?: ServerResponse;
  }> = [];

  phrases.forEach((phrase, index) => {
    // Add user message
    conversationMessages.push({
      type: 'user',
      phraseIndex: index,
      phrase,
    });

    // Add server response immediately (if exists)
    const serverResponse = serverResponses.find(
      (sr) => sr.afterUserPhraseIndex === index
    );
    if (serverResponse) {
      conversationMessages.push({
        type: 'server',
        serverResponse,
      });
    }
  });

  return (
    <div ref={scrollRef} className="space-y-4">
      {phraseScores.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-2 pb-2"
        >
          <div className="bg-secondary/30 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <p className="text-[15px] text-foreground leading-relaxed">
              <strong>Tip:</strong> Listen to each phrase first by clicking the speaker icon 🔊
            </p>
          </div>
        </motion.div>
      )}

      <div className="space-y-4 px-2">
        {conversationMessages.map((message, index) => {
          if (message.type === 'user' && message.phrase && message.phraseIndex !== undefined) {
            const score = getScoreForPhrase(message.phraseIndex);
            const isActive = message.phraseIndex === currentPhraseIndex && !score;
            const isPast = score !== undefined && message.phraseIndex < currentPhraseIndex;
            const isFuture = message.phraseIndex > currentPhraseIndex && !score;
            const showActions = message.phraseIndex === currentPhraseIndex && score !== undefined && waitingForContinue;

            return (
              <div
                key={`user-${message.phraseIndex}`}
                ref={isActive || showActions ? activeRef : null}
              >
                <ChatBubble
                  speaker="you"
                  phrase={message.phrase}
                  isActive={isActive}
                  isPast={isPast}
                  isFuture={isFuture}
                  onPlayAudio={() => handlePlayAudio(message.phrase!)}
                  onRecord={isActive ? handleRecord : undefined}
                  onRetry={showActions ? () => handleRetry(message.phraseIndex!) : undefined}
                  onContinue={showActions ? handleContinue : undefined}
                  isRecording={isRecording && isActive}
                  isAnalyzing={isAnalyzing && isActive}
                  score={score}
                />
              </div>
            );
          } else if (message.type === 'server' && message.serverResponse) {
            // Determine if this server message is "future" (comes after a future user phrase)
            const afterPhraseIndex = message.serverResponse.afterUserPhraseIndex;
            const afterPhraseScore = getScoreForPhrase(afterPhraseIndex);
            const isFuture = afterPhraseIndex >= currentPhraseIndex && !afterPhraseScore;
            
            return (
              <motion.div
                key={`server-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ChatBubble
                  speaker="other"
                  phrase={message.serverResponse}
                  isActive={false}
                  isPast={!isFuture}
                  isFuture={isFuture}
                  onPlayAudio={() => handlePlayServerAudio(message.serverResponse!)}
                />
              </motion.div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
