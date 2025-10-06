import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface StepResult {
  score: number;
  spokenText: string;
}

interface CollapsiblePastStepsProps {
  results: StepResult[];
  phrases: any[];
  userSteps: number[];
}

export const CollapsiblePastSteps = ({ results, phrases, userSteps }: CollapsiblePastStepsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (results.length === 0) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    return "text-orange-600";
  };

  return (
    <div className="border-b pb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
          <span>Completed ({results.length})</span>
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 mt-3">
              {results.map((result, index) => {
                const phraseIndex = userSteps[index];
                const phrase = phrases[phraseIndex];
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-foreground">{phrase.native}</span>
                    </div>
                    <span className={`font-semibold ${getScoreColor(result.score)}`}>
                      {result.score}%
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
