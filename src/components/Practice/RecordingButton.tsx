import { Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface RecordingButtonProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  onRecord: () => void;
  disabled?: boolean;
}

export const RecordingButton = ({ 
  isRecording, 
  isAnalyzing, 
  onRecord, 
  disabled 
}: RecordingButtonProps) => {
  return (
    <div className="space-y-3">
      <Button
        onClick={onRecord}
        disabled={disabled}
        size="lg"
        className={`w-full h-14 text-base font-semibold transition-all ${
          isRecording
            ? "bg-blue-600 hover:bg-blue-700 animate-pulse"
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing
          </>
        ) : (
          <>
            <Mic className="mr-2 h-5 w-5" />
            {isRecording ? "Recording" : "Tap to Record"}
          </>
        )}
      </Button>
      
      {isRecording && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-1"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-blue-600 rounded-full"
              animate={{
                height: ["8px", "24px", "8px"],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};
