import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChatBubble } from "./ChatBubble";
import { Button } from "@/components/ui/button";
import { generateNaturalSpeech, VoiceSource } from "@/utils/voiceManager";
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
}: ConversationReviewProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [phraseScores, setPhraseScores] = useState<PhraseScore[]>([]);
  const [voiceSources, setVoiceSources] = useState<Map<number, VoiceSource>>(new Map());
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

        // Show server response after user completes their phrase
        setTimeout(() => {
          setIsRecording(false);
          
          // Check if there's a server response for this phrase
          const serverResponse = serverResponses.find(
            (sr) => sr.afterUserPhraseIndex === currentPhraseIndex
          );

          if (serverResponse) {
            // Play server audio
            setTimeout(() => {
              // Use negative index for server responses to distinguish from user phrases
              handlePlayServerAudio(serverResponse, -(currentPhraseIndex + 1));
            }, 300);

            // Move to next phrase after server speaks
            setTimeout(() => {
              if (currentPhraseIndex < phrases.length - 1) {
                setCurrentPhraseIndex((prev) => prev + 1);
              } else {
                // All phrases completed
                onComplete(phraseScores.map((ps) => ps.score).concat(score));
              }
            }, 3000);
          } else {
            // No server response, move to next immediately
            if (currentPhraseIndex < phrases.length - 1) {
              setCurrentPhraseIndex((prev) => prev + 1);
            } else {
              onComplete(phraseScores.map((ps) => ps.score).concat(score));
            }
          }
        }, 2500);
      }, 500);
    };

    recognition.onresult = handleResult;

    return () => {
      recognition.onresult = null;
    };
  }, [recognition, currentPhraseIndex, phrases, phraseScores, onComplete]);

  const handlePlayAudio = async (phrase: Phrase, index: number) => {
    try {
      const result = await generateNaturalSpeech(phrase.native, cityId);
      setVoiceSources(prev => new Map(prev).set(index, result.source));
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handlePlayServerAudio = async (response: ServerResponse, index: number) => {
    try {
      const result = await generateNaturalSpeech(response.native, cityId);
      setVoiceSources(prev => new Map(prev).set(index, result.source));
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
    <div ref={scrollRef} className="space-y-6">
      <div className="text-center py-4 border-b">
        <h3 className="text-lg font-semibold">Full Conversation Practice</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Practice the complete conversation flow
        </p>
      </div>

      <div className="space-y-4 px-2">
        {conversationMessages.map((message, index) => {
          if (message.type === 'user' && message.phrase && message.phraseIndex !== undefined) {
            const score = getScoreForPhrase(message.phraseIndex);
            const isActive = message.phraseIndex === currentPhraseIndex && !score;
            const isPast = score !== undefined;
            const isFuture = message.phraseIndex > currentPhraseIndex && !score;

            return (
              <div
                key={`user-${message.phraseIndex}`}
                ref={isActive ? activeRef : null}
              >
                <ChatBubble
                  speaker="you"
                  phrase={message.phrase}
                  isActive={isActive}
                  isPast={isPast}
                  isFuture={isFuture}
                  onPlayAudio={() => handlePlayAudio(message.phrase!, message.phraseIndex!)}
                  onRecord={isActive ? handleRecord : undefined}
                  isRecording={isRecording && isActive}
                  isAnalyzing={isAnalyzing && isActive}
                  score={score}
                  voiceSource={voiceSources.get(message.phraseIndex!)}
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
                  onPlayAudio={() => handlePlayServerAudio(message.serverResponse!, index)}
                  voiceSource={voiceSources.get(index)}
                />
              </motion.div>
            );
          }
          return null;
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
