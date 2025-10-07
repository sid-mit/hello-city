import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Mic, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreBadge } from "./ScoreBadge";
import { analyzeSyllables, calculateOverallScore } from "@/utils/syllableAnalysis";
import { getHighQualityVoice, getLanguageCode } from "@/utils/voiceManager";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface Phrase {
  native: string;
  romanization: string;
  english: string;
}

interface SinglePhrasePracticeProps {
  phrase: Phrase;
  phraseIndex: number;
  totalPhrases: number;
  cityId: string;
  recognition: any;
  onBack: () => void;
  onNext?: () => void;
}

type Step = "listen" | "record" | "result";

export const SinglePhrasePractice = ({
  phrase,
  phraseIndex,
  totalPhrases,
  cityId,
  recognition,
  onBack,
  onNext,
}: SinglePhrasePracticeProps) => {
  const [step, setStep] = useState<Step>("listen");
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleListen = async () => {
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
      if (recognition) {
        recognition.stop();
      }
    }, 4000);
  };

  // Setup recognition result handler
  if (recognition) {
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsAnalyzing(true);

      setTimeout(() => {
        const syllableAnalyses = analyzeSyllables(
          transcript,
          phrase.native,
          phrase.romanization
        );
        const calculatedScore = Math.round(calculateOverallScore(syllableAnalyses));

        setScore(calculatedScore);
        setIsAnalyzing(false);
        setIsRecording(false);
        setStep("result");

        if (calculatedScore >= 90) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }, 500);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
      setIsAnalyzing(false);

      if (event.error === "no-speech") {
        toast.error("No speech detected. Please try again.");
      } else if (event.error === "not-allowed") {
        toast.error("Microphone access denied.");
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  }

  const handleTryAgain = () => {
    setScore(null);
    setStep("listen");
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <span className="text-sm font-medium text-muted-foreground">
          Phrase {phraseIndex + 1}/{totalPhrases}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === "listen" && (
          <motion.div
            key="listen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center py-8 space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase">
                Step 1: Listen
              </h3>
              <div className="space-y-3">
                <p className="text-3xl font-bold text-foreground">
                  {phrase.romanization}
                </p>
                <p className="text-xl text-muted-foreground">
                  "{phrase.english}"
                </p>
                <p className="text-base text-muted-foreground">{phrase.native}</p>
              </div>
            </div>

            <Button
              onClick={handleListen}
              variant="outline"
              size="lg"
              className="w-full h-16 text-lg"
            >
              <Volume2 className="mr-3 h-6 w-6" />
              Listen to Pronunciation
            </Button>

            <Button
              onClick={() => setStep("record")}
              size="lg"
              className="w-full h-16 text-lg"
            >
              Ready to Practice
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {step === "record" && (
          <motion.div
            key="record"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center py-8 space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase">
                Step 2: Record Yourself
              </h3>
              <div className="space-y-3">
                <p className="text-3xl font-bold text-foreground">
                  {phrase.romanization}
                </p>
                <p className="text-xl text-muted-foreground">
                  "{phrase.english}"
                </p>
                <p className="text-base text-muted-foreground">{phrase.native}</p>
              </div>
            </div>

            <Button
              onClick={handleListen}
              variant="outline"
              size="lg"
              className="w-full h-12"
              disabled={isRecording || isAnalyzing}
            >
              <Volume2 className="mr-2 h-5 w-5" />
              Listen Again
            </Button>

            <Button
              onClick={handleRecord}
              disabled={isRecording || isAnalyzing}
              size="lg"
              className="w-full h-20 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  Analyzing...
                </>
              ) : isRecording ? (
                <>
                  <Mic className="mr-3 h-6 w-6 animate-pulse" />
                  Recording...
                </>
              ) : (
                <>
                  <Mic className="mr-3 h-6 w-6" />
                  Tap to Record
                </>
              )}
            </Button>
          </motion.div>
        )}

        {step === "result" && score !== null && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            <div className="text-center py-8 space-y-6">
              <h3 className="text-sm font-medium text-muted-foreground uppercase">
                Your Result
              </h3>
              <div className="space-y-3">
                <p className="text-2xl font-bold text-foreground">
                  {phrase.romanization}
                </p>
                <p className="text-lg text-muted-foreground">
                  "{phrase.english}"
                </p>
              </div>

              <ScoreBadge score={score} />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleTryAgain}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Try Again
              </Button>
              {onNext && (
                <Button onClick={onNext} size="lg" className="flex-1">
                  Next Phrase
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>

            {!onNext && (
              <Button onClick={onBack} variant="outline" size="lg" className="w-full">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Phrase List
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
