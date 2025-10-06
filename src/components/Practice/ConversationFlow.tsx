import { motion } from 'framer-motion';
import { User, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConversationFlowStep {
  step: number;
  speaker: 'you' | 'other';
  phraseIndex?: number;
  action?: string;
}

interface ConversationFlowProps {
  flow: ConversationFlowStep[];
  phrases: Array<{
    native: string;
    romanization: string;
    english: string;
  }>;
  currentStep?: number;
  onPlayPhrase?: (phraseIndex: number) => void;
}

export const ConversationFlow = ({ flow, phrases, currentStep, onPlayPhrase }: ConversationFlowProps) => {
  return (
    <div className="bg-muted/30 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="text-sm font-semibold text-foreground">📖 Conversation Flow</h4>
      </div>
      
      <div className="space-y-2">
        {flow.map((step, index) => {
          const phrase = step.phraseIndex !== undefined ? phrases[step.phraseIndex] : null;
          const isActive = currentStep === step.step;
          const isPast = currentStep !== undefined && currentStep > step.step;
          
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative pl-8 pb-3 ${index !== flow.length - 1 ? 'border-l-2 ml-3' : ''}`}
              style={{
                borderColor: isActive 
                  ? 'hsl(var(--primary))' 
                  : isPast 
                  ? 'hsl(var(--primary) / 0.3)'
                  : 'hsl(var(--border))',
              }}
            >
              {/* Step Icon */}
              <div 
                className={`absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground scale-110 shadow-lg' 
                    : isPast
                    ? 'bg-primary/30 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.speaker === 'you' ? (
                  <User className="w-3 h-3" />
                ) : (
                  <Users className="w-3 h-3" />
                )}
              </div>

              {/* Content */}
              <div className={`transition-all duration-300 ${isActive ? 'scale-105' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className={`text-xs font-semibold mb-1 ${
                      step.speaker === 'you' ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.speaker === 'you' ? 'YOU SAY' : 'OTHER PERSON'}
                    </p>
                    
                    {phrase ? (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{phrase.english}</p>
                        <p className="text-xs text-muted-foreground">{phrase.native}</p>
                        <p className="text-xs text-muted-foreground italic">{phrase.romanization}</p>
                      </div>
                    ) : step.action ? (
                      <p className="text-xs text-muted-foreground italic">[{step.action}]</p>
                    ) : null}
                  </div>

                  {/* Play Button */}
                  {phrase && onPlayPhrase && step.phraseIndex !== undefined && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onPlayPhrase(step.phraseIndex!)}
                      className="shrink-0 h-7 w-7 p-0"
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
