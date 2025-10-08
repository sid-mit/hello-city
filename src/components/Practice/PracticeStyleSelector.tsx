import { motion } from "framer-motion";
import { MessageSquare, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Phrase {
  native: string;
  romanization: string;
  english: string;
}

interface PracticeStyleSelectorProps {
  phrases: Phrase[];
  onSelectConversation: () => void;
  onSelectIndividualPhrase: (phraseIndex: number) => void;
}

export const PracticeStyleSelector = ({
  phrases,
  onSelectConversation,
  onSelectIndividualPhrase,
}: PracticeStyleSelectorProps) => {
  return (
    <div className="space-y-6 py-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Choose Your Practice Style</h3>
        <p className="text-sm text-muted-foreground">
          Practice the full conversation or individual phrases
        </p>
      </div>

      {/* Full Conversation Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={onSelectConversation}
          className="w-full h-20 text-lg"
          size="lg"
        >
          <MessageSquare className="mr-3 h-6 w-6" />
          Practice Full Conversation
        </Button>
      </motion.div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      {/* Individual Phrases List */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Practice Individual Phrases:</p>
        <div className="space-y-3 max-h-[400px] overflow-y-auto px-2">
          {phrases.map((phrase, index) => (
            <motion.button
              key={index}
              onClick={() => onSelectIndividualPhrase(index)}
              className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-border hover:border-primary/50 bg-card shadow-sm transition-all"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-2.5">
                <div className="shrink-0 mt-1">
                  <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm sm:text-base font-medium break-words">{phrase.romanization}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">"{phrase.english}"</p>
                  <p className="text-xs text-muted-foreground">{phrase.native}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
