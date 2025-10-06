import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  const getStars = (score: number) => {
    if (score >= 90) return 3;
    if (score >= 80) return 2;
    return 1;
  };

  const getMessage = (score: number) => {
    if (score >= 90) return "Excellent! 🎉";
    if (score >= 80) return "Great job! ✨";
    if (score >= 70) return "Good work! 👍";
    return "Keep practicing! 💪";
  };

  const stars = getStars(score);
  const scoreColor = score >= 90 ? "text-green-600" : score >= 80 ? "text-blue-600" : "text-orange-600";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center p-4 rounded-lg bg-muted/50 border"
    >
      <p className="text-sm font-medium text-muted-foreground mb-2">
        {getMessage(score)}
      </p>
      
      <div className={`text-3xl font-bold ${scoreColor} mb-2`}>
        {score}%
      </div>
      
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <Star
            key={index}
            className={`h-6 w-6 ${
              index < stars
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};
