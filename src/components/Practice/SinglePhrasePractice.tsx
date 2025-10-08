import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Mic, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreBadge } from "./ScoreBadge";
import { analyzeSyllables, calculateOverallScore } from "@/utils/syllableAnalysis";
import { generateNaturalSpeech } from "@/utils/voiceManager";
import { GenderSelector, type LanguageCode } from "./GenderSelector";
import { useAppStore } from "@/stores/appStore";
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

type Step = "record" | "result";

export const SinglePhrasePractice = ({
  phrase,
  phraseIndex,
  totalPhrases,
  cityId,
  recognition,
  onBack,
  onNext,
}: SinglePhrasePracticeProps) => {
  const { genderPreference, setGenderPreference } = useAppStore();
  const [step, setStep] = useState<Step>("record");
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleListen = async () => {
    try {
      setIsPlaying(true);
      await generateNaturalSpeech(phrase.native, cityId);
      setIsPlaying(false);
    } catch (error) {
      console.error('Error speaking phrase:', error);
      setIsPlaying(false);
    }
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
    setStep("record");
  };

  const langCode = ({
    paris: "fr-FR",
    seoul: "ko-KR",
    beijing: "zh-CN",
    "new-delhi": "hi-IN",
    "mexico-city": "es-ES",
  }[cityId] || "en-US") as LanguageCode;

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2 pb-4">
        <button
          onClick={onBack}
          className="text-foreground hover:text-muted-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <span className="text-sm font-medium text-muted-foreground">
          {phraseIndex + 1}/{totalPhrases}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === "record" && (
          <motion.div
            key="record"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center py-4 space-y-1">
              <p className="text-4xl font-bold text-foreground">
                {phrase.romanization}
              </p>
              <p className="text-xl text-muted-foreground">
                {phrase.english}
              </p>
              <p className="text-sm text-muted-foreground">{phrase.native}</p>
            </div>

            <Button
              onClick={handleListen}
              variant="outline"
              size="lg"
              className="w-full h-14"
              disabled={isRecording || isAnalyzing || isPlaying}
            >
              <Volume2 className="mr-2 h-5 w-5" />
              Listen
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
                  Analyzing
                </>
              ) : isRecording ? (
                <>
                  <Mic className="mr-3 h-6 w-6 animate-pulse" />
                  Recording
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
