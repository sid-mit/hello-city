import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useAppStore } from "@/stores/appStore";
import { analyzeSyllables, calculateOverallScore } from "@/utils/syllableAnalysis";
import { getHighQualityVoice, getLanguageCode } from "@/utils/voiceManager";
import { ProgressDots } from "./ProgressDots";
import { ChatBubble } from "./ChatBubble";
import { ScoreDisplay } from "./ScoreDisplay";
import { SituationData } from "@/components/Cards/SituationCard";
import { toast } from "sonner";

interface ConversationPracticeModalProps {
  situation: SituationData;
  onClose: () => void;
}

interface StepResult {
  score: number;
  spokenText: string;
}

export const ConversationPracticeModal = ({
  situation,
  onClose,
}: ConversationPracticeModalProps) => {
  const { updatePracticeHistory, updateStreak, unlockBadge } = useAppStore();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const activeMessageRef = useRef<HTMLDivElement>(null);
  
  // Auto-generate conversation flow if none exists
  const conversationFlow = situation.conversationFlow || situation.phrases.map((phrase, index) => ([
    { step: index * 2 + 1, speaker: 'you' as const, phraseIndex: index },
    { step: index * 2 + 2, speaker: 'other' as const, action: 'Responds appropriately' }
  ])).flat();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [stepResults, setStepResults] = useState<StepResult[]>([]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      const languageMap: Record<string, string> = {
        paris: "fr-FR",
        seoul: "ko-KR",
        beijing: "zh-CN",
        "new-delhi": "hi-IN",
        "mexico-city": "es-MX",
      };
      recognitionInstance.lang = languageMap[situation.cityId] || "en-US";
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const currentFlow = conversationFlow[currentStep];
        
        if (currentFlow.phraseIndex !== undefined) {
          const currentPhrase = situation.phrases[currentFlow.phraseIndex];
          
          setIsAnalyzing(true);

          setTimeout(() => {
            const syllableAnalyses = analyzeSyllables(
              transcript,
              currentPhrase.native,
              currentPhrase.romanization
            );
            const score = Math.round(calculateOverallScore(syllableAnalyses));

            setStepResults((prev) => [...prev, { score, spokenText: transcript }]);

            updatePracticeHistory(
              situation.id,
              score,
              currentPhrase.native,
              syllableAnalyses.map((a) => ({ syllable: a.syllable, score: a.score }))
            );

            updateStreak();

            if (score >= 90) {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
              });
            }

            setIsAnalyzing(false);

            setTimeout(() => {
              setIsRecording(false);
              if (currentStep < conversationFlow.length - 1) {
                setCurrentStep((prev) => prev + 1);
              } else {
                unlockBadge('first-steps');
              }
            }, 2000);
          }, 500);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        setIsAnalyzing(false);

        if (event.error === "no-speech") {
          toast.error("No speech detected. Please try again.");
        } else if (event.error === "not-allowed") {
          toast.error("Microphone access denied.");
        }
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [currentStep]);

  // Auto-scroll to active message
  useEffect(() => {
    if (activeMessageRef.current) {
      activeMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, stepResults]);

  const handleListen = async (phraseIndex: number) => {
    const phrase = situation.phrases[phraseIndex];
    if (!phrase || !("speechSynthesis" in window)) return;

    const languageCode = getLanguageCode(situation.cityId);
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

  const currentFlow = conversationFlow[currentStep];
  const isComplete = currentStep >= conversationFlow.length;
  const userSteps = conversationFlow
    .map((flow, index) => (flow.speaker === "you" ? index : -1))
    .filter((index) => index !== -1);

  const totalSteps = userSteps.length;
  const completedSteps = stepResults.length;

  // Get result for a specific step
  const getStepResult = (stepIndex: number): StepResult | undefined => {
    const userStepIndex = userSteps.indexOf(stepIndex);
    return userStepIndex !== -1 ? stepResults[userStepIndex] : undefined;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{situation.emoji}</span>
              <h2 className="text-xl font-bold">{situation.title}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Step {completedSteps + 1}/{totalSteps}
            </span>
            <ProgressDots total={totalSteps} current={completedSteps + 1} />
          </div>
        </div>

        <div ref={chatContainerRef} className="p-6 space-y-2 min-h-[400px]">
          {!isComplete ? (
            <>
              {/* Chat-style conversation flow */}
              {conversationFlow.map((flow, index) => {
                const isActive = index === currentStep;
                const isPast = index < currentStep;
                const isFuture = index > currentStep;
                
                // Skip future "other" responses for cleaner UI
                if (isFuture && flow.speaker === 'other') return null;

                // For "other" speaker with action only
                if (flow.speaker === 'other' && !flow.phraseIndex) {
                  if (isPast) return null; // Don't show past actions
                  
                  return (
                    <motion.div
                      key={index}
                      ref={isActive ? activeMessageRef : null}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center py-4"
                    >
                      <div className="bg-muted/50 px-4 py-2 rounded-full text-sm text-muted-foreground">
                        {flow.action || "Responds appropriately"} 🎭
                      </div>
                      {isActive && (
                        <Button
                          onClick={() => setCurrentStep((prev) => prev + 1)}
                          size="sm"
                          className="ml-3"
                        >
                          Continue
                        </Button>
                      )}
                    </motion.div>
                  );
                }

                // For messages with phrases
                if (flow.phraseIndex !== undefined) {
                  const phrase = situation.phrases[flow.phraseIndex];
                  const result = getStepResult(index);
                  
                  return (
                    <div
                      key={index}
                      ref={isActive ? activeMessageRef : null}
                      className={isFuture ? 'opacity-40 pointer-events-none' : ''}
                    >
                      <ChatBubble
                        speaker={flow.speaker}
                        phrase={phrase}
                        isActive={isActive}
                        isPast={isPast}
                        onPlayAudio={() => handleListen(flow.phraseIndex!)}
                        onRecord={flow.speaker === 'you' ? handleRecord : undefined}
                        isRecording={isActive && isRecording}
                        isAnalyzing={isActive && isAnalyzing}
                        score={result?.score}
                      />
                    </div>
                  );
                }

                return null;
              })}

              {/* Helper text at bottom */}
              {currentFlow.speaker === 'you' && !isRecording && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center pt-4"
                >
                  <p className="text-sm text-muted-foreground">
                    💡 Tap the speaker icon to listen, then tap the microphone to practice
                  </p>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <h3 className="text-3xl font-bold">🎉 Well Done!</h3>

              <ScoreDisplay
                score={Math.round(
                  stepResults.reduce((sum, r) => sum + r.score, 0) /
                    stepResults.length
                )}
              />

              <div className="text-left bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  📊 Your Progress:
                </p>
                <p className="text-sm">
                  • Perfect phrases:{" "}
                  {stepResults.filter((r) => r.score >= 90).length}/
                  {stepResults.length}
                </p>
                <p className="text-sm">
                  • Good phrases:{" "}
                  {
                    stepResults.filter((r) => r.score >= 80 && r.score < 90)
                      .length
                  }
                  /{stepResults.length}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex-1"
                >
                  Practice Again
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Back to Learn
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
