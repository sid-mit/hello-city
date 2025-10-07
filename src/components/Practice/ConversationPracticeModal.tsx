import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useAppStore } from "@/stores/appStore";
import { analyzeSyllables, calculateOverallScore } from "@/utils/syllableAnalysis";
import { generateNaturalSpeech } from "@/utils/voiceManager";
import { ProgressDots } from "./ProgressDots";
import { CollapsiblePastSteps } from "./CollapsiblePastSteps";
import { CurrentStepCard } from "./CurrentStepCard";
import { RecordingButton } from "./RecordingButton";
import { ScoreDisplay } from "./ScoreDisplay";
import { NextStepPreview } from "./NextStepPreview";
import { ConversationReview } from "./ConversationReview";
import { PracticeStyleSelector } from "./PracticeStyleSelector";
import { SinglePhrasePractice } from "./SinglePhrasePractice";
import { SituationData } from "@/components/Cards/SituationCard";
import { GenderSelector, type LanguageCode } from "./GenderSelector";
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
  const { updatePracticeHistory, updateStreak, unlockBadge, genderPreference, setGenderPreference } = useAppStore();
  
  // Auto-generate conversation flow if none exists
  const conversationFlow = situation.conversationFlow || situation.phrases.map((phrase, index) => ([
    { step: index * 2 + 1, speaker: 'you' as const, phraseIndex: index },
    { step: index * 2 + 2, speaker: 'other' as const, action: 'Responds appropriately' }
  ])).flat();
  
  const [practiceMode, setPracticeMode] = useState<'conversation' | 'single-phrase' | 'selection'>('selection');
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [stepResults, setStepResults] = useState<StepResult[]>([]);
  const [showConversationReview, setShowConversationReview] = useState(false);
  const [conversationReviewScores, setConversationReviewScores] = useState<number[]>([]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      const languageMap: Record<string, LanguageCode> = {
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

  const handleListen = async (phraseIndex: number) => {
    try {
      const phrase = situation.phrases[phraseIndex];
      if (!phrase) return;
      await generateNaturalSpeech(phrase.native, situation.cityId);
    } catch (error) {
      console.error('Error playing audio:', error);
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

  const currentFlow = conversationFlow[currentStep];
  const isComplete = currentStep >= conversationFlow.length;
  const userSteps = conversationFlow
    .map((flow, index) => (flow.speaker === "you" ? index : -1))
    .filter((index) => index !== -1);
  const currentUserStepIndex = userSteps.indexOf(currentStep);

  const totalSteps = userSteps.length;
  const completedSteps = stepResults.length;
  const nextStepIndex = currentStep + 1;
  const nextFlow =
    nextStepIndex < conversationFlow.length
      ? conversationFlow[nextStepIndex]
      : null;
  const nextPhrase =
    nextFlow && nextFlow.speaker === "you" && nextFlow.phraseIndex !== undefined
      ? situation.phrases[nextFlow.phraseIndex].native
      : null;
  const remainingSteps = totalSteps - completedSteps;
  
  const isFinalComplete = conversationReviewScores.length > 0;

  const handleConversationReviewComplete = (scores: number[]) => {
    setConversationReviewScores(scores);
    unlockBadge('first-steps');
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
            <div className="flex items-center gap-2">
              {practiceMode !== 'selection' && (
                <GenderSelector
                  langCode={
                    ({
                      paris: "fr-FR",
                      seoul: "ko-KR",
                      beijing: "zh-CN",
                      "new-delhi": "hi-IN",
                      "mexico-city": "es-ES",
                    }[situation.cityId] || "en-US") as LanguageCode
                  }
                  currentGender={genderPreference}
                  onGenderChange={setGenderPreference}
                />
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Step {completedSteps + 1}/{totalSteps}
            </span>
            <ProgressDots total={totalSteps} current={completedSteps + 1} />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {practiceMode === 'selection' ? (
            <div className="space-y-6">
              {/* Individual Phrases Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  <h3 className="text-lg font-semibold">Practice Individual Phrases</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Master each phrase one at a time
                </p>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {situation.phrases.map((phrase, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedPhraseIndex(index);
                        setPracticeMode('single-phrase');
                      }}
                      className="w-full text-left p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
                    >
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {phrase.romanization}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "{phrase.english}"
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Conversation Section */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💬</span>
                  <h3 className="text-lg font-semibold">Feeling Confident?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice the entire conversation flow with realistic responses
                </p>
                <Button
                  onClick={() => setPracticeMode('conversation')}
                  className="w-full"
                  size="lg"
                >
                  Practice Full Conversation
                </Button>
              </div>
            </div>
          ) : practiceMode === 'single-phrase' && selectedPhraseIndex !== null ? (
            <SinglePhrasePractice
              phrase={situation.phrases[selectedPhraseIndex]}
              phraseIndex={selectedPhraseIndex}
              totalPhrases={situation.phrases.length}
              cityId={situation.cityId}
              recognition={recognition}
              onBack={() => {
                setSelectedPhraseIndex(null);
                setPracticeMode('selection');
              }}
              onNext={
                selectedPhraseIndex < situation.phrases.length - 1
                  ? () => setSelectedPhraseIndex(selectedPhraseIndex + 1)
                  : undefined
              }
            />
          ) : practiceMode === 'conversation' ? (
            <ConversationReview
              phrases={situation.phrases}
              serverResponses={situation.serverResponses}
              cityId={situation.cityId}
              recognition={recognition}
              onComplete={handleConversationReviewComplete}
            />
          ) : showConversationReview ? (
            <ConversationReview
              phrases={situation.phrases}
              serverResponses={situation.serverResponses}
              cityId={situation.cityId}
              recognition={recognition}
              onComplete={handleConversationReviewComplete}
            />
          ) : !isComplete ? (
            <>
              {/* Collapsible Past Steps */}
              <CollapsiblePastSteps
                results={stepResults}
                phrases={situation.phrases}
                userSteps={userSteps}
              />

              {/* AI/Other Person Response */}
              {currentFlow.speaker === "other" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-lg bg-muted border"
                >
                  <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                    <span>👥</span>
                    <span>OTHER PERSON RESPONDS</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    🎭 {currentFlow.action || "Responds appropriately"}
                  </p>
                  <Button
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    size="lg"
                    className="w-full mt-4"
                  >
                    Continue
                  </Button>
                </motion.div>
              )}

              {/* Current User Turn */}
              {currentFlow.speaker === "you" && currentFlow.phraseIndex !== undefined && (
                <>
                  <CurrentStepCard
                    phrase={situation.phrases[currentFlow.phraseIndex]}
                    onListen={() => handleListen(currentFlow.phraseIndex!)}
                  />

                  {/* Show score after recording */}
                  {stepResults[currentUserStepIndex] && !isRecording && !isAnalyzing && (
                    <ScoreDisplay score={stepResults[currentUserStepIndex].score} />
                  )}

                  {/* Recording Button */}
                  <RecordingButton
                    isRecording={isRecording}
                    isAnalyzing={isAnalyzing}
                    onRecord={handleRecord}
                    disabled={isRecording || isAnalyzing}
                  />
                </>
              )}

              {/* Next Step Preview */}
              <NextStepPreview
                nextPhrase={nextPhrase}
                remainingSteps={remainingSteps}
              />
            </>
          ) : isFinalComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <h3 className="text-3xl font-bold">🎉 Conversation Complete!</h3>

              <ScoreDisplay
                score={Math.round(
                  conversationReviewScores.reduce((sum, s) => sum + s, 0) /
                    conversationReviewScores.length
                )}
              />

              <div className="text-left bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  📊 Full Conversation Results:
                </p>
                <p className="text-sm">
                  • Perfect phrases:{" "}
                  {conversationReviewScores.filter((s) => s >= 90).length}/
                  {conversationReviewScores.length}
                </p>
                <p className="text-sm">
                  • Good phrases:{" "}
                  {conversationReviewScores.filter((s) => s >= 80 && s < 90).length}
                  /{conversationReviewScores.length}
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
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <h3 className="text-3xl font-bold">🎉 Practice Complete!</h3>

              <ScoreDisplay
                score={Math.round(
                  stepResults.reduce((sum, r) => sum + r.score, 0) /
                    stepResults.length
                )}
              />

              <div className="text-left bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  📊 Individual Practice Results:
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

              <div className="space-y-3">
                <Button
                  onClick={() => setShowConversationReview(true)}
                  className="w-full"
                  size="lg"
                >
                  Continue to Full Conversation 💬
                </Button>
                <div className="flex gap-3">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="flex-1"
                  >
                    Practice Again
                  </Button>
                  <Button onClick={onClose} variant="outline" className="flex-1">
                    Back to Learn
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
