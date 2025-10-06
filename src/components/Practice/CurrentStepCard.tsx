import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CurrentStepCardProps {
  phrase: {
    native: string;
    romanization: string;
    english: string;
  };
  onListen: () => void;
}

export const CurrentStepCard = ({ phrase, onListen }: CurrentStepCardProps) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="border-2 border-primary/20 rounded-lg p-6 bg-card shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
        <span>👤</span>
        <span>NOW YOU SAY:</span>
      </div>
      
      <div className="space-y-3">
        <p className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
          {phrase.native}
        </p>
        
        <p className="text-base md:text-lg text-muted-foreground italic">
          {phrase.romanization}
        </p>
        
        <p className="text-sm text-muted-foreground">
          "{phrase.english}"
        </p>
      </div>
      
      <Button
        onClick={onListen}
        variant="outline"
        className="mt-4 w-full"
        size="lg"
      >
        <Volume2 className="mr-2 h-5 w-5" />
        Listen First
      </Button>
    </motion.div>
  );
};
