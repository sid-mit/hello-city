import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  className?: string;
}

export const ScoreBadge = ({ score, className }: ScoreBadgeProps) => {
  const getScoreTier = (score: number) => {
    if (score >= 90) return {
      text: 'Excellent! 🎉',
      color: 'text-green-600 bg-green-50 border-green-200'
    };
    if (score >= 80) return {
      text: 'Great job! ✨',
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    };
    if (score >= 70) return {
      text: 'Good work! 👍',
      color: 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return {
      text: 'Try again 💪',
      color: 'text-red-600 bg-red-50 border-red-200'
    };
  };

  const tier = getScoreTier(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-semibold",
        tier.color,
        className
      )}
    >
      <span>✓</span>
      <span>{score}%</span>
      <span>{tier.text}</span>
    </motion.div>
  );
};
