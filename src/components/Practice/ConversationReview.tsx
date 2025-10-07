import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChatBubble } from "./ChatBubble";
import { getHighQualityVoice, getLanguageCode } from "@/utils/voiceManager";
import { analyzeSyllables, calculateOverallScore } from "@/utils/syllableAnalysis";
import confetti from "canvas-confetti";

interface Phrase {
  native: string;
  romanization: string;
  english: string;
}

interface ConversationMessage {
  speaker: 'user' | 'server';
  native: string;
  romanization: string;
  english: string;
  needsRecording?: boolean;
}

interface ConversationReviewProps {
  phrases: Phrase[];
  conversationScript?: ConversationMessage[];
  serverResponses?: Array<{
    afterUserPhraseIndex: number;
    native: string;
    romanization: string;
    english: string;
  }>;
  cityId: string;
  recognition: any;
  onComplete: (scores: number[]) => void;
}

interface PhraseScore {
  userPhraseIndex: number;
  score: number;
}

type MessageState = 'completed' | 'active' | 'future' | 'server-playing';

export const ConversationReview = ({
  phrases,
  conversationScript,
  serverResponses = [],
  cityId,
  recognition,
  onComplete,
}: ConversationReviewProps) => {
  // Use new format if available, otherwise build from legacy format
  const script: ConversationMessage[] = conversationScript || buildLegacyScript(phrases, serverResponses);
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [phraseScores, setPhraseScores] = useState<PhraseScore[]>([]);
  const [isServerSpeaking, setIsServerSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  // Build legacy script from old format
  function buildLegacyScript(
    legacyPhrases: Phrase[],
    legacyServerResponses: Array<{ afterUserPhraseIndex: number; native: string; romanization: string; english: string }>
  ): ConversationMessage[] {
    const result: ConversationMessage[] = [];
    
    legacyPhrases.forEach((phrase, index) => {
      result.push({
        speaker: 'user',
        ...phrase,
        needsRecording: true,
      });
      
      const serverResponse = legacyServerResponses.find(sr => sr.afterUserPhraseIndex === index);
      if (serverResponse) {
        result.push({
          speaker: 'server',
          native: serverResponse.native,
          romanization: serverResponse.romanization,
          english: serverResponse.english,
        });
      }
    });
    
    return result;
  }

  // Get current user phrase index (counting only user messages that need recording)
  const getCurrentUserPhraseIndex = () => {
    let count = 0;
    for (let i = 0; i <= currentStepIndex && i < script.length; i++) {
      if (script[i].speaker === 'user' && script[i].needsRecording) {
        count++;
      }
    }
    return count - 1;
  };

  const getUserPhraseIndexAtStep = (stepIndex: number) => {
    let count = 0;
    for (let i = 0; i <= stepIndex && i < script.length; i++) {
      if (script[i].speaker === 'user' && script[i].needsRecording) {
        count++;
      }
    }
    return count - 1;
  };

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
      const currentMessage = script[currentStepIndex];
      
      if (currentMessage.speaker !== 'user' || !currentMessage.needsRecording) return;

      setIsAnalyzing(true);

      setTimeout(() => {
        const syllableAnalyses = analyzeSyllables(
          transcript,
          currentMessage.native,
          currentMessage.romanization
        );
        const score = Math.round(calculateOverallScore(syllableAnalyses));

        const userPhraseIndex = getCurrentUserPhraseIndex();
        setPhraseScores((prev) => [
          ...prev,
          { userPhraseIndex, score },
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

        // Move to next step after a delay
        setTimeout(() => {
          const nextStepIndex = currentStepIndex + 1;
          
          if (nextStepIndex < script.length) {
            setCurrentStepIndex(nextStepIndex);
            
            // If next is a server message, auto-play it
            if (script[nextStepIndex].speaker === 'server') {
              setTimeout(() => {
                handlePlayAudio(script[nextStepIndex]);
              }, 300);
            }
          } else {
            // Conversation complete
            onComplete(phraseScores.map((ps) => ps.score).concat(score));
          }
        }, 2000);
      }, 500);
    };

    recognition.onresult = handleResult;

    return () => {
      recognition.onresult = null;
    };
  }, [recognition, currentStepIndex, script, phraseScores, onComplete]);

  const handlePlayAudio = async (message: ConversationMessage) => {
    if (!("speechSynthesis" in window)) return;

    const languageCode = getLanguageCode(cityId);
    const voice = await getHighQualityVoice(languageCode);

    const utterance = new SpeechSynthesisUtterance(message.native);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = message.speaker === 'server' ? 0.85 : 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (message.speaker === 'server') {
      setIsServerSpeaking(true);
      utterance.onend = () => {
        setIsServerSpeaking(false);
      };
    }

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

  const getMessageState = (stepIndex: number): MessageState => {
    const message = script[stepIndex];
    
    if (stepIndex < currentStepIndex) {
      return 'completed';
    }
    
    if (stepIndex === currentStepIndex) {
      if (message.speaker === 'user' && message.needsRecording) {
        return 'active';
      }
      if (message.speaker === 'server') {
        return 'server-playing';
      }
    }
    
    return 'future';
  };

  const getScoreForStep = (stepIndex: number): number | undefined => {
    const userPhraseIndex = getUserPhraseIndexAtStep(stepIndex);
    return phraseScores.find((ps) => ps.userPhraseIndex === userPhraseIndex)?.score;
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
        {script.map((message, stepIndex) => {
          const state = getMessageState(stepIndex);
          const score = message.speaker === 'user' ? getScoreForStep(stepIndex) : undefined;
          const isActive = state === 'active';
          const isCompleted = state === 'completed';
          const isFuture = state === 'future';
          const isCurrentServer = state === 'server-playing';

          return (
            <div
              key={`${message.speaker}-${stepIndex}`}
              ref={isActive ? activeRef : null}
            >
              <ChatBubble
                speaker={message.speaker === 'user' ? 'you' : 'other'}
                phrase={message}
                isActive={isActive}
                isPast={isCompleted}
                isFuture={isFuture}
                isLocked={isFuture}
                isCompleted={isCompleted && message.speaker === 'server'}
                isServerSpeaking={isCurrentServer && isServerSpeaking}
                onPlayAudio={() => handlePlayAudio(message)}
                onRecord={isActive && message.speaker === 'user' ? handleRecord : undefined}
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