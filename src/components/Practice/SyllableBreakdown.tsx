import { motion } from 'framer-motion';
import { Volume2, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { SyllableAnalysis } from '@/utils/syllableAnalysis';
import { getPronunciationTip } from '@/data/pronunciationTips';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

interface SyllableBreakdownProps {
  syllableAnalyses: SyllableAnalysis[];
  language: string;
  onPlaySyllable?: (syllable: string) => void;
}

export const SyllableBreakdown = ({
  syllableAnalyses,
  language,
  onPlaySyllable,
}: SyllableBreakdownProps) => {
  const [openTips, setOpenTips] = useState<Set<number>>(new Set());

  const toggleTip = (index: number) => {
    const newOpenTips = new Set(openTips);
    if (newOpenTips.has(index)) {
      newOpenTips.delete(index);
    } else {
      newOpenTips.add(index);
    }
    setOpenTips(newOpenTips);
  };

  const getFeedbackColor = (feedback: string) => {
    switch (feedback) {
      case 'excellent':
        return 'bg-green-100 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-100';
      case 'good':
        return 'bg-yellow-100 dark:bg-yellow-950 border-yellow-500 text-yellow-900 dark:text-yellow-100';
      case 'needsWork':
        return 'bg-red-100 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-100';
      default:
        return 'bg-muted border-border text-foreground';
    }
  };

  const getFeedbackIcon = (feedback: string) => {
    switch (feedback) {
      case 'excellent':
        return <CheckCircle className="w-3 h-3" />;
      case 'good':
        return <TrendingUp className="w-3 h-3" />;
      case 'needsWork':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">
          Syllable-by-Syllable Analysis
        </h4>
        <div className="flex flex-wrap gap-2">
          {syllableAnalyses.map((analysis, index) => {
            const tip = getPronunciationTip(analysis.syllable, language, analysis.score);
            const hasTip = tip !== null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                <div
                  className={`
                    px-3 py-2 rounded-lg border-2 font-medium text-sm
                    transition-all cursor-pointer hover:scale-105
                    ${getFeedbackColor(analysis.feedback)}
                  `}
                  onClick={() => onPlaySyllable?.(analysis.syllable)}
                >
                  <div className="flex items-center gap-1.5">
                    {getFeedbackIcon(analysis.feedback)}
                    <span>{analysis.syllable}</span>
                    {onPlaySyllable && (
                      <Volume2 className="w-3 h-3 opacity-50" />
                    )}
                  </div>
                  <div className="text-xs opacity-70 mt-0.5">
                    {analysis.score}%
                  </div>
                </div>
                
                {hasTip && analysis.feedback === 'needsWork' && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pronunciation Tips for Problem Syllables */}
      <div className="space-y-2">
        {syllableAnalyses
          .filter(a => a.feedback === 'needsWork' || a.feedback === 'good')
          .map((analysis, index) => {
            const tip = getPronunciationTip(analysis.syllable, language, analysis.score);
            if (!tip) return null;

            const isOpen = openTips.has(index);

            return (
              <Collapsible
                key={index}
                open={isOpen}
                onOpenChange={() => toggleTip(index)}
              >
                <CollapsibleTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-between text-left hover:bg-blue-50 dark:hover:bg-blue-950"
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-lg">💡</div>
                        <div>
                          <div className="font-medium text-sm">
                            {tip.tip}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            "{analysis.syllable}" needs practice
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▼
                      </motion.div>
                    </Button>
                  </motion.div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg space-y-3"
                  >
                    <div>
                      <div className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">
                        📖 Guidance:
                      </div>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {tip.guidance}
                      </p>
                    </div>
                    
                    {tip.mouthPosition && (
                      <div>
                        <div className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">
                          👄 Mouth Position:
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {tip.mouthPosition}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">
                        💬 Example:
                      </div>
                      <p className="text-sm font-mono text-blue-800 dark:text-blue-200">
                        {tip.example}
                      </p>
                    </div>

                    {onPlaySyllable && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-full"
                        onClick={() => onPlaySyllable(analysis.syllable)}
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Listen (Slow)
                      </Button>
                    )}
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
      </div>

      {/* Summary */}
      <div className="pt-2 border-t border-border">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            ✓ {syllableAnalyses.filter(a => a.feedback === 'excellent').length} excellent
          </span>
          <span>
            ⚠ {syllableAnalyses.filter(a => a.feedback === 'good').length} good
          </span>
          <span>
            ⚡ {syllableAnalyses.filter(a => a.feedback === 'needsWork').length} needs practice
          </span>
        </div>
      </div>
    </div>
  );
};
