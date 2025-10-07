import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Mic, Play, ArrowRight, RotateCcw, Turtle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SituationData } from '@/components/Cards/SituationCard';
import { useAppStore } from '@/stores/appStore';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { analyzeSyllables, calculateOverallScore, SyllableAnalysis } from '@/utils/syllableAnalysis';
import { SyllableBreakdown } from '@/components/Practice/SyllableBreakdown';
import { generateNaturalSpeech } from '@/utils/voiceManager';
import { ConversationFlow } from '@/components/Practice/ConversationFlow';

interface PracticeModalProps {
  situation: SituationData;
  onClose: () => void;
}

type PracticeState = 'ready' | 'recording' | 'processing' | 'feedback';
type FeedbackLevel = 'excellent' | 'good' | 'needsWork';

interface PracticeResult {
  phraseIndex: number;
  spokenText: string;
  score: number;
  feedback: FeedbackLevel;
  syllableAnalyses?: SyllableAnalysis[];
}

export const PracticeModal = ({ situation, onClose }: PracticeModalProps) => {
  const { updatePracticeHistory, unlockBadge, updateStreak, practiceHistory, badges } = useAppStore();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [practiceState, setPracticeState] = useState<PracticeState>('ready');
  const [results, setResults] = useState<PracticeResult[]>([]);
  const [spokenText, setSpokenText] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [showConversationFlow, setShowConversationFlow] = useState(true);
  const [hasStartedPractice, setHasStartedPractice] = useState(false);

  const currentPhrase = situation.phrases[currentPhraseIndex];
  const progress = ((currentPhraseIndex + (results.length > currentPhraseIndex ? 1 : 0)) / situation.phrases.length) * 100;

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      // Set language based on city
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
        console.log('Recognized:', transcript, 'Confidence:', confidence);
        setSpokenText(transcript);
        setPracticeState('processing');
        
        // Calculate score and give feedback
        setTimeout(() => {
          // Analyze syllables
          const syllableAnalyses = analyzeSyllables(
            transcript,
            currentPhrase.native,
            currentPhrase.romanization
          );
          
          // Calculate overall score from syllable analyses
          const syllableScore = calculateOverallScore(syllableAnalyses);
          
          // Also use traditional scoring as a fallback/validation
          const traditionalScore = calculatePronunciationScore(transcript, currentPhrase.native, confidence);
          
          // Use weighted average (favor syllable analysis)
          const finalScore = Math.round(syllableScore * 0.7 + traditionalScore * 0.3);
          const feedback = getFeedbackLevel(finalScore);
          
          const newResult = {
            phraseIndex: currentPhraseIndex,
            spokenText: transcript,
            score: finalScore,
            feedback,
            syllableAnalyses,
          };
          setResults([...results, newResult]);
          
          // Update practice history with syllable data
          const syllableData = syllableAnalyses.map(a => ({
            syllable: a.syllable,
            score: a.score,
          }));
          updatePracticeHistory(situation.id, finalScore, currentPhrase.native, syllableData);
          updateStreak();
          
          // Check for badges
          if (finalScore === 100 && !badges.find(b => b.id === 'perfect-score')?.unlocked) {
            unlockBadge('perfect-score');
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          }
          
          if (Object.keys(practiceHistory).length === 0 && !badges.find(b => b.id === 'first-steps')?.unlocked) {
            unlockBadge('first-steps');
          }
          
          setPracticeState('feedback');
        }, 500);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setPracticeState('ready');
        
        if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try again.');
        } else if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please allow microphone access.');
        } else {
          toast.error('Speech recognition error. Please try again.');
        }
      };

      recognitionInstance.onend = () => {
        if (practiceState === 'recording') {
          setPracticeState('ready');
        }
      };

      setRecognition(recognitionInstance);
    } else {
      toast.error('Speech recognition not supported in this browser. Please use Chrome or Edge.');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const calculatePronunciationScore = (spoken: string, expected: string, confidence: number): number => {
    // Simple similarity calculation
    const spokenLower = spoken.toLowerCase().trim();
    const expectedLower = expected.toLowerCase().trim();
    
    // Calculate Levenshtein distance
    const distance = levenshteinDistance(spokenLower, expectedLower);
    const maxLength = Math.max(spokenLower.length, expectedLower.length);
    const similarity = maxLength === 0 ? 100 : ((maxLength - distance) / maxLength) * 100;
    
    // Weight with confidence score
    const finalScore = (similarity * 0.7) + (confidence * 100 * 0.3);
    
    return Math.round(Math.min(100, Math.max(0, finalScore)));
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const getFeedbackLevel = (score: number): FeedbackLevel => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    return 'needsWork';
  };

  const getFeedbackMessage = (level: FeedbackLevel): { emoji: string; title: string; color: string } => {
    switch (level) {
      case 'excellent':
        return { emoji: '🎉', title: 'Great job!', color: 'text-green-600' };
      case 'good':
        return { emoji: '👍', title: 'Good effort!', color: 'text-yellow-600' };
      case 'needsWork':
        return { emoji: '💪', title: 'Keep practicing!', color: 'text-orange-600' };
    }
  };

  const handleListen = async (slow = false, textOverride?: string) => {
    try {
      const text = textOverride || currentPhrase.native;
      await generateNaturalSpeech(text, situation.cityId);
    } catch (error) {
      console.error('Error speaking phrase:', error);
      toast.error('Speech synthesis not available');
    }
  };

  const handlePlaySyllable = (syllable: string) => {
    handleListen(true, syllable);
  };

  const handleRecord = () => {
    if (!hasStartedPractice) {
      setHasStartedPractice(true);
      setShowConversationFlow(false);
    }

    if (!recognition) {
      toast.error('Speech recognition not available');
      return;
    }

    if (practiceState === 'recording') {
      recognition.stop();
      setPracticeState('ready');
    } else {
      setSpokenText('');
      setPracticeState('recording');
      setIsRecording(true);
      recognition.start();
      
      // Simulate audio level animation
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      
      setTimeout(() => {
        clearInterval(interval);
        setIsRecording(false);
        setAudioLevel(0);
      }, 3000);
    }
  };

  const handleNext = () => {
    if (currentPhraseIndex < situation.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
      setPracticeState('ready');
      setSpokenText('');
      setShowConversationFlow(false);
    } else {
      setIsComplete(true);
    }
  };

  const handlePracticeAgain = () => {
    setPracticeState('ready');
    setSpokenText('');
  };

  const handleRestart = () => {
    setCurrentPhraseIndex(0);
    setResults([]);
    setPracticeState('ready');
    setSpokenText('');
    setIsComplete(false);
  };

  const averageScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
    : 0;

  const currentResult = results.find(r => r.phraseIndex === currentPhraseIndex);

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
            <h2 className="text-3xl font-bold mb-2">Complete!</h2>
            <p className="text-muted-foreground mb-6">
              You practiced {situation.phrases.length} phrases
            </p>

            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-2">Average Score</p>
              <div className="relative pt-4">
                <Progress value={averageScore} className="h-3 mb-2" />
                <div className="text-4xl font-bold text-primary">{averageScore}%</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Practice Again
              </Button>
              <Button onClick={onClose} className="flex-1">
                Back to Learn
              </Button>
            </div>
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
          className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-6 border-b border-border"
            style={situation.categoryColor ? {
              borderBottomColor: `${situation.categoryColor}30`,
            } : undefined}
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Phrase {currentPhraseIndex + 1} of {situation.phrases.length}
                </p>
                <div className="flex items-center gap-2">
                  {situation.conversationFlow && situation.conversationFlow.length > 0 && hasStartedPractice && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowConversationFlow(!showConversationFlow)}
                      className="text-xs"
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      {showConversationFlow ? 'Hide' : 'View'} Flow
                    </Button>
                  )}
                </div>
              </div>
              <Progress value={progress} className="h-1" />
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="ml-4">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-8">
            {practiceState === 'feedback' && currentResult ? (
              // Feedback Screen
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">
                  {getFeedbackMessage(currentResult.feedback).emoji}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${getFeedbackMessage(currentResult.feedback).color}`}>
                  {getFeedbackMessage(currentResult.feedback).title}
                </h3>
                <div className="text-5xl font-bold text-primary mb-6">
                  {currentResult.score}%
                </div>

                <div className="bg-muted rounded-xl p-4 mb-4">
                  <p className="text-sm text-muted-foreground mb-1">You said:</p>
                  <p className="font-medium mb-3">{currentResult.spokenText}</p>
                  <p className="text-sm text-muted-foreground mb-1">Expected:</p>
                  <p className="font-medium">{currentPhrase.native}</p>
                </div>

                {/* Syllable Breakdown */}
                {currentResult.syllableAnalyses && currentResult.syllableAnalyses.length > 0 && (
                  <div className="mb-6">
                    <SyllableBreakdown
                      syllableAnalyses={currentResult.syllableAnalyses}
                      language={recognition?.lang || 'en-US'}
                      onPlaySyllable={handlePlaySyllable}
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button onClick={handlePracticeAgain} variant="outline" className="flex-1">
                    <Mic className="w-4 h-4 mr-2" />
                    Practice Again
                  </Button>
                  <Button onClick={handleNext} className="flex-1">
                    {currentPhraseIndex < situation.phrases.length - 1 ? (
                      <>
                        Next Phrase
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      'Complete'
                    )}
                  </Button>
                </div>
              </motion.div>
            ) : (
              // Practice Screen
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                {/* Conversation Flow */}
                {situation.conversationFlow && situation.conversationFlow.length > 0 && showConversationFlow && (
                  <div className="mb-6 text-left">
                    <ConversationFlow
                      flow={situation.conversationFlow}
                      phrases={situation.phrases}
                      currentStep={hasStartedPractice ? situation.conversationFlow.find(s => s.phraseIndex === currentPhraseIndex)?.step : undefined}
                      onPlayPhrase={(index) => {
                        const phrase = situation.phrases[index];
                        if (phrase) handleListen(false, phrase.native);
                      }}
                    />
                    {!hasStartedPractice && (
                      <div className="mt-4 text-center">
                        <p className="text-xs text-muted-foreground mb-3">
                          Ready to start? Click "Record" below to begin practicing
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {(!showConversationFlow || !situation.conversationFlow) && (
                  <div className="mb-8">
                    <p className="text-3xl font-bold mb-3">{currentPhrase.native}</p>
                    <p className="text-lg text-muted-foreground mb-2">{currentPhrase.romanization}</p>
                    <p className="text-base text-muted-foreground">{currentPhrase.english}</p>
                  </div>
                )}

                <div className="flex justify-center gap-3 mb-6">
                  <Button
                    onClick={() => handleListen(false)}
                    variant="outline"
                    size="lg"
                    disabled={practiceState === 'recording'}
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Listen
                  </Button>
                  <Button
                    onClick={() => handleListen(true)}
                    variant="outline"
                    size="lg"
                    disabled={practiceState === 'recording'}
                  >
                    <Turtle className="w-5 h-5 mr-2" />
                    Slow
                  </Button>
                </div>

                {/* Waveform Visualization */}
                {isRecording && (
                  <div className="flex justify-center gap-1 mb-4 h-12 items-end">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 bg-primary rounded-full"
                        animate={{
                          height: [8, Math.random() * 40 + 10, 8],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="flex flex-col items-center">
                  <motion.button
                    onClick={handleRecord}
                    disabled={practiceState === 'processing'}
                    whileHover={{ scale: practiceState === 'recording' ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                      practiceState === 'recording'
                        ? 'bg-red-500 animate-pulse'
                        : 'bg-primary hover:bg-primary/90'
                    } ${practiceState === 'processing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {practiceState === 'processing' ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Mic className="w-10 h-10 text-white" />
                    )}
                  </motion.button>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {practiceState === 'recording' ? 'Recording...' : 
                     practiceState === 'processing' ? 'Analyzing pronunciation...' :
                     'Tap to record'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
