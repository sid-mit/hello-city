import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChatBubble } from "./ChatBubble";
import { Button } from "@/components/ui/button";
import { getHighQualityVoice, getLanguageCode } from "@/utils/voiceManager";
import { analyzeSyllables, calculateOverallScore } from "@/utils/syllableAnalysis";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface Phrase {
  native: string;
  romanization: string;
  english: string;
}

interface ConversationReviewProps {
  phrases: Phrase[];
  cityId: string;
  recognition: any;
  onComplete: (scores: number[]) => void;
}

interface PhraseScore {
  phraseIndex: number;
  score: number;
}

export const ConversationReview = ({
  phrases,
  cityId,
  recognition,
  onComplete,
}: ConversationReviewProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [phraseScores, setPhraseScores] = useState<PhraseScore[]>([]);
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

        // Move to next phrase after showing score
        setTimeout(() => {
          setIsRecording(false);
          if (currentPhraseIndex < phrases.length - 1) {
            setCurrentPhraseIndex((prev) => prev + 1);
          } else {
            // All phrases completed
            onComplete(phraseScores.map((ps) => ps.score).concat(score));
          }
        }, 2500);
      }, 500);
    };

    recognition.onresult = handleResult;

    return () => {
      recognition.onresult = null;
    };
  }, [recognition, currentPhraseIndex, phrases, phraseScores, onComplete]);

  const handlePlayAudio = async (phrase: Phrase) => {
    if (!("speechSynthesis" in window)) return;

    const languageCode = getLanguageCode(cityId);
    const voice = await getHighQualityVoice(languageCode);

    const utterance = new SpeechSynthesisUtterance(phrase.native);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    speechSynthesis.speak(utterance);
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

  return (
    <div ref={scrollRef} className="space-y-6">
      <div className="text-center py-4 border-b">
        <h3 className="text-lg font-semibold">Full Conversation Practice</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Practice the complete conversation flow
        </p>
      </div>

      <div className="space-y-4 px-2">
        {phrases.map((phrase, index) => {
          const score = getScoreForPhrase(index);
          const isActive = index === currentPhraseIndex && !score;
          const isPast = index < currentPhraseIndex || score !== undefined;

          return (
            <div
              key={index}
              ref={isActive ? activeRef : null}
            >
              <ChatBubble
                speaker="you"
                phrase={phrase}
                isActive={isActive}
                isPast={isPast}
                onPlayAudio={() => handlePlayAudio(phrase)}
                onRecord={isActive ? handleRecord : undefined}
                isRecording={isRecording && isActive}
                isAnalyzing={isAnalyzing && isActive}
                score={score}
              />
            </div>
          );
        })}
      </div>

      {currentPhraseIndex === 0 && phraseScores.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-medium">Tip:</span> Listen to each phrase first by clicking the speaker icon 🔊
          </p>
        </motion.div>
      )}
    </div>
  );
};
