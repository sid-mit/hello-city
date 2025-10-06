import { motion } from "framer-motion";

interface ProgressDotsProps {
  total: number;
  current: number;
}

export const ProgressDots = ({ total, current }: ProgressDotsProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className={`h-2 w-2 rounded-full transition-colors ${
            index < current
              ? "bg-primary"
              : "bg-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
};
