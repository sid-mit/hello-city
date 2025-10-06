import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Volume2, Check, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SituationData } from '@/components/Cards/SituationCard';
import { useAppStore } from '@/stores/appStore';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { analyzeSyllables, calculateOverallScore } from '@/utils/syllableAnalysis';
import { getHighQualityVoice, getLanguageCode } from '@/utils/voiceManager';

interface ConversationPracticeModalProps {
  situation: SituationData;
  onClose: () => void;
}

interface StepResult {
  stepIndex: number;
  score: number;
  spokenText: string;
}

export const ConversationPracticeModal = ({ situation, onClose }: ConversationPracticeModalProps) => {
  const { updatePracticeHistory, updateStreak, unlockBadge } = useAppStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepResults, setStepResults] = useState<Map<number, StepResult>>(new Map());
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversationFlow = situation.conversationFlow || [];
  const currentStep = conversationFlow[currentStepIndex];
  const isUserTurn = currentStep?.speaker === 'you';
  const currentPhrase = isUserTurn && currentStep.phraseIndex !== undefined 
    ? situation.phrases[currentStep.phraseIndex] 
    : null;

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      const languageMap: Record<string, string> = {
        'paris': 'fr-FR',
        'seoul': 'ko-KR',
        'beijing': 'zh-CN',
        'new-delhi': 'hi-IN',
        'mexico-city': 'es-MX',
      };
      recognitionInstance.lang = languageMap[situation.cityId] || 'en-US';
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        
        if (currentPhrase) {
          const syllableAnalyses = analyzeSyllables(
            transcript,
            currentPhrase.native,
            currentPhrase.romanization
          );
          const score = calculateOverallScore(syllableAnalyses);
          
          const newResult: StepResult = {
            stepIndex: currentStepIndex,
            score: Math.round(score),
            spokenText: transcript,
          };
          
          setStepResults(new Map(stepResults.set(currentStepIndex, newResult)));
          updatePracticeHistory(situation.id, Math.round(score), currentPhrase.native, 
            syllableAnalyses.map(a => ({ syllable: a.syllable, score: a.score }))
          );
          updateStreak();
          
          if (score >= 90) {
            confetti({ particleCount: 50, spread: 40, origin: { y: 0.7 } });
          }
          
          // Auto-advance after a short delay
          setTimeout(() => {
            if (currentStepIndex < conversationFlow.length - 1) {
              setCurrentStepIndex(currentStepIndex + 1);
            } else {
              setIsComplete(true);
              unlockBadge('first-steps');
            }
          }, 1500);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try again.');
        } else if (event.error === 'not-allowed') {
          toast.error('Microphone access denied.');
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
  }, []);

  // Auto-scroll to current step
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector(`[data-step="${currentStepIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStepIndex]);

  const handleListen = async (phrase: typeof currentPhrase) => {
    if (!phrase || !('speechSynthesis' in window)) return;
    
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
    if (!recognition || !isUserTurn || !currentPhrase) return;

    if (isRecording) {
      recognition.stop();
    } else {
      setIsRecording(true);
      recognition.start();
      
      setTimeout(() => {
        if (isRecording) {
          recognition.stop();
        }
      }, 4000);
    }
  };

  const handleSkipToNext = () => {
    if (currentStepIndex < conversationFlow.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const averageScore = stepResults.size > 0
    ? Math.round(Array.from(stepResults.values()).reduce((sum, r) => sum + r.score, 0) / stepResults.size)
    : 0;

  if (isComplete) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-3xl shadow-2xl w-full max-w-md p-8 text-center"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Conversation Complete!</h2>
            <p className="text-muted-foreground mb-6">
              You practiced the full conversation flow
            </p>

            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-2">Average Score</p>
              <div className="text-4xl font-bold text-primary">{averageScore}%</div>
            </div>

            <Button onClick={onClose} className="w-full">
              Back to Learn
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: '85vh' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{situation.emoji}</span>
              <h2 className="text-lg font-semibold">{situation.title}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Conversation Flow */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversationFlow.map((step, index) => {
              const phrase = step.phraseIndex !== undefined ? situation.phrases[step.phraseIndex] : null;
              const result = stepResults.get(index);
              const isPast = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isFuture = index > currentStepIndex;
              const isLocked = isFuture && !result;

              if (step.speaker === 'you' && phrase) {
                // User bubble (left side)
                return (
                  <motion.div
                    key={index}
                    data-step={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-2 ${isCurrent ? 'scale-105' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-sm">👤</span>
                    </div>
                    <div className="flex-1">
                      <div 
                        className={`rounded-2xl rounded-tl-sm p-3 ${
                          isCurrent ? 'bg-primary/20 border-2 border-primary' : 'bg-muted'
                        } ${isLocked ? 'opacity-50' : ''}`}
                      >
                        <div className="text-sm font-medium mb-1">{phrase.native}</div>
                        <div className="text-xs text-muted-foreground italic mb-1">{phrase.romanization}</div>
                        <div className="text-xs text-muted-foreground">{phrase.english}</div>
                        
                        {result && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className={`text-xs font-semibold ${
                              result.score >= 80 ? 'text-green-600' : 
                              result.score >= 60 ? 'text-yellow-600' : 'text-orange-600'
                            }`}>
                              <Check className="w-3 h-3 inline mr-1" />
                              {result.score}%
                            </div>
                          </div>
                        )}
                        
                        {isLocked && (
                          <div className="mt-2">
                            <Lock className="w-3 h-3 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      
                      {(isCurrent || isPast) && !isLocked && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleListen(phrase)}
                          className="mt-1 h-6 text-xs"
                        >
                          <Volume2 className="w-3 h-3 mr-1" />
                          Listen
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              } else {
                // Other person bubble or action (right side)
                return (
                  <motion.div
                    key={index}
                    data-step={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2 justify-end"
                  >
                    <div className="flex-1 flex justify-end">
                      <div 
                        className="rounded-2xl rounded-tr-sm p-3 max-w-[80%]"
                        style={{ 
                          backgroundColor: situation.categoryColor ? `${situation.categoryColor}20` : undefined,
                          borderColor: situation.categoryColor ? `${situation.categoryColor}40` : undefined,
                          borderWidth: '1px'
                        }}
                      >
                        <div className="text-sm text-foreground italic">
                          {step.action || 'Other person responds'}
                        </div>
                      </div>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
                      style={{ 
                        backgroundColor: situation.categoryColor ? `${situation.categoryColor}30` : undefined 
                      }}
                    >
                      <span className="text-sm">👥</span>
                    </div>
                  </motion.div>
                );
              }
            })}
          </div>

          {/* Recording Controls */}
          {isUserTurn && currentPhrase && (
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleRecord}
                  disabled={!recognition}
                  className={`flex-1 h-12 ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                >
                  <Mic className="w-5 h-5 mr-2" />
                  {isRecording ? 'Recording...' : 'Hold to Record'}
                </Button>
                
                {currentStepIndex < conversationFlow.length - 1 && (
                  <Button
                    variant="outline"
                    onClick={handleSkipToNext}
                    className="h-12"
                  >
                    Skip
                  </Button>
                )}
              </div>
              
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-center text-xs text-muted-foreground"
                >
                  Listening...
                </motion.div>
              )}
            </div>
          )}
          
          {/* Auto-advance for other person's turn */}
          {!isUserTurn && currentStepIndex < conversationFlow.length - 1 && (
            <div className="p-4 border-t border-border">
              <Button onClick={handleSkipToNext} className="w-full">
                Continue
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
