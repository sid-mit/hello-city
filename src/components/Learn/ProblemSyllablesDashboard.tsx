import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export const ProblemSyllablesDashboard = () => {
  const { getProblemSyllables } = useAppStore();
  const problemSyllables = getProblemSyllables();

  if (problemSyllables.length === 0) {
    return null;
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'declining':
        return <TrendingDown className="w-3 h-3 text-red-600" />;
      default:
        return <Minus className="w-3 h-3 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving':
        return 'text-green-600 dark:text-green-400';
      case 'declining':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-semibold">Your Challenging Sounds</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          These syllables need more practice. Focus on them to improve your pronunciation.
        </p>

        <div className="space-y-3">
          {problemSyllables.slice(0, 5).map(({ syllable, data }, index) => (
            <motion.div
              key={syllable}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-muted rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-lg">{syllable}</span>
                  <div className={`flex items-center gap-1 ${getTrendColor(data.improvementTrend)}`}>
                    {getTrendIcon(data.improvementTrend)}
                    <span className="text-xs font-medium capitalize">
                      {data.improvementTrend}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {Math.round(data.successRate * 100)}% success
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {data.attempts} attempts
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <Progress 
                  value={data.successRate * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Last score: {data.lastScore}%</span>
                  <span>Target: 80%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {problemSyllables.length > 5 && (
          <p className="text-xs text-muted-foreground mt-3 text-center">
            +{problemSyllables.length - 5} more syllables need practice
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">
            💡 Tip: Practice situations with these syllables to improve your mastery
          </p>
        </div>
      </Card>
    </motion.div>
  );
};
