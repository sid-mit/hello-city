import { motion } from "framer-motion";

interface ScoreBadgeProps {
  score: number;
}

export const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getMessage = (score: number) => {
    if (score >= 90) return { text: "Excellent!", icon: "🎉", color: "text-green-600" };
    if (score >= 80) return { text: "Great job!", icon: "✨", color: "text-blue-600" };
    if (score >= 70) return { text: "Good work!", icon: "👍", color: "text-orange-600" };
    return { text: "Try again", icon: "💪", color: "text-red-600" };
  };

  const { text, icon, color } = getMessage(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className="mt-2 pt-2 border-t border-border"
    >
      <span className={`text-xs font-semibold ${color}`}>
        ✓ {score}% {text} {icon}
      </span>
    </motion.div>
  );
};
