import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubble } from "./ChatBubble";
import { Button } from "@/components/ui/button";
import { getHighQualityVoice, getLanguageCode } from "@/utils/voiceManager";
import { analyzeSyllables, calculateOverallScore } from "@/utils/syllableAnalysis";
import confetti from "canvas-confetti";

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

type ConversationMessage = {
  type: 'user' | 'server';
  userPhraseIndex?: number;
  phrase: Phrase;
  needsRecording: boolean;
};

type MessageState = 'completed' | 'active' | 'future' | 'server-playing';

export const ConversationReview = ({
  phrases,
  serverResponses = [],
  cityId,
  recognition,
  onComplete,
}: ConversationReviewProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [phraseScores, setPhraseScores] = useState<PhraseScore[]>([]);
  const [isServerSpeaking, setIsServerSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  // Build complete conversation script with interleaved user and server messages
  const conversationScript: ConversationMessage[] = [];
  phrases.forEach((phrase, index) => {
    conversationScript.push({
      type: 'user',
      userPhraseIndex: index,
      phrase,
      needsRecording: true,
    });

    const serverResponse = serverResponses.find(sr => sr.afterUserPhraseIndex === index);
    if (serverResponse) {
      conversationScript.push({
        type: 'server',
        phrase: serverResponse,
        needsRecording: false,
      });
    }
  });

  // Auto-scroll to active bubble
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStepIndex]);

  // Setup speech recognition result handler
  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const currentMessage = conversationScript[currentStepIndex];
      
      if (currentMessage.type !== 'user' || currentMessage.userPhraseIndex === undefined) return;
      
      const currentPhrase = phrases[currentMessage.userPhraseIndex];
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
          { phraseIndex: currentMessage.userPhraseIndex!, score },
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

        // Move to next step after score is shown
        setTimeout(() => {
          const nextStepIndex = currentStepIndex + 1;
          
          if (nextStepIndex < conversationScript.length) {
            setCurrentStepIndex(nextStepIndex);
            
            // If next step is server, auto-play their message
            if (conversationScript[nextStepIndex]?.type === 'server') {
              setIsServerSpeaking(true);
              setTimeout(() => {
                handlePlayServerAudio(conversationScript[nextStepIndex].phrase);
                
                // Auto-advance after server speaks (2.5 seconds)
                setTimeout(() => {
                  setIsServerSpeaking(false);
                  if (nextStepIndex + 1 < conversationScript.length) {
                    setCurrentStepIndex(nextStepIndex + 1);
                  }
                }, 2500);
              }, 300);
            }
          } else {
            // Conversation complete
            onComplete(phraseScores.map((ps) => ps.score).concat(score));
          }
        }, 1500);
      }, 500);
    };

    recognition.onresult = handleResult;

    return () => {
      recognition.onresult = null;
    };
  }, [recognition, currentStepIndex, conversationScript, phrases, phraseScores, onComplete]);

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

  const handlePlayServerAudio = async (phrase: Phrase) => {
    if (!("speechSynthesis" in window)) return;

    const languageCode = getLanguageCode(cityId);
    const voice = await getHighQualityVoice(languageCode);

    const utterance = new SpeechSynthesisUtterance(phrase.native);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = 0.85;
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

  const getScoreForPhrase = (userPhraseIndex: number): number | undefined => {
    return phraseScores.find((ps) => ps.phraseIndex === userPhraseIndex)?.score;
  };

  const getMessageState = (messageIndex: number, message: ConversationMessage): MessageState => {
    if (messageIndex < currentStepIndex) return 'completed';
    if (messageIndex === currentStepIndex && message.type === 'server' && isServerSpeaking) return 'server-playing';
    if (messageIndex === currentStepIndex) return 'active';
    return 'future';
  };

  return (
    <div ref={scrollRef} className="space-y-6 pb-6">
      <div className="text-center py-4 border-b">
        <h3 className="text-lg font-semibold">Full Conversation Practice</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Practice the complete conversation flow • Step {currentStepIndex + 1}/{conversationScript.length}
        </p>
      </div>

      <div className="space-y-4 px-2">
        {conversationScript.map((message, index) => {
          const state = getMessageState(index, message);
          const isActive = state === 'active' && message.needsRecording;
          const isFuture = state === 'future';
          const isCompleted = state === 'completed';
          const isServerPlaying = state === 'server-playing';
          
          const score = message.userPhraseIndex !== undefined 
            ? getScoreForPhrase(message.userPhraseIndex) 
            : undefined;

          return (
            <div
              key={`${message.type}-${index}`}
              ref={isActive ? activeRef : null}
            >
              <ChatBubble
                speaker={message.type === 'user' ? 'you' : 'other'}
                phrase={message.phrase}
                isActive={isActive}
                isFuture={isFuture}
                isCompleted={isCompleted}
                isLocked={isFuture}
                isServerSpeaking={isServerPlaying}
                onPlayAudio={() => 
                  message.type === 'user' 
                    ? handlePlayAudio(message.phrase) 
                    : handlePlayServerAudio(message.phrase)
                }
                onRecord={isActive && message.needsRecording ? handleRecord : undefined}
                isRecording={isRecording && isActive}
                isAnalyzing={isAnalyzing && isActive}
                score={score}
              />
            </div>
          );
        })}
      </div>

      {currentStepIndex === 0 && phraseScores.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4 px-4"
        >
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-medium">Tip:</span> You can see the full conversation below. Grayed-out messages will unlock as you progress!
          </p>
        </motion.div>
      )}
    </div>
  );
};
