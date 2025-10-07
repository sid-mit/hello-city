import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, AlertCircle, Play, Trophy } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ProblemSyllablesDashboard = () => {
  const { getProblemSyllables, getMasteredSyllables, favoritedSituations } = useAppStore();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  
  const problemSyllables = getProblemSyllables();
  const masteredSyllables = getMasteredSyllables();

  // Group syllables by language/city
  const languages = Array.from(new Set(favoritedSituations.map(s => s.cityName)));
  
  const filteredProblems = selectedLanguage === 'all' 
    ? problemSyllables 
    : problemSyllables.filter(({ syllable }) => {
        // Find situations containing this syllable in the selected city
        return favoritedSituations.some(s => 
          s.cityName === selectedLanguage && 
          s.phrases.some(p => p.native.includes(syllable) || p.romanization.includes(syllable))
        );
      });

  if (problemSyllables.length === 0 && masteredSyllables.length === 0) {
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

  const getSituationsForSyllable = (syllable: string) => {
    return favoritedSituations.filter(s => 
      s.phrases.some(p => 
        p.native.includes(syllable) || p.romanization.includes(syllable)
      )
    ).slice(0, 3);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="p-6">
        <Tabs defaultValue="challenging" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="challenging" className="gap-2">
                <AlertCircle className="w-4 h-4" />
                Challenging
                {problemSyllables.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-orange-500 text-white rounded-full">
                    {problemSyllables.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="mastered" className="gap-2">
                <Trophy className="w-4 h-4" />
                Mastered
                {masteredSyllables.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-500 text-white rounded-full">
                    {masteredSyllables.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {languages.length > 1 && (
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-xs border border-border rounded-md px-2 py-1 bg-background"
              >
                <option value="all">All Languages</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            )}
          </div>

          <TabsContent value="challenging" className="space-y-3 mt-4">
            {filteredProblems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                🎉 No challenging sounds in this language!
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  These sounds need more practice. Click "Practice Now" to improve!
                </p>
                {filteredProblems.slice(0, 5).map(({ syllable, data }, index) => {
                  const situations = getSituationsForSyllable(syllable);
                  return (
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
                      
                      <div className="space-y-2">
                        <Progress 
                          value={data.successRate * 100} 
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Last score: {data.lastScore}%</span>
                          <span>Target: 80%</span>
                        </div>
                      </div>

                      {situations.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-2">
                            Practice in these situations:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {situations.map(s => (
                              <span key={s.id} className="text-xs bg-background px-2 py-1 rounded border border-border">
                                {s.emoji} {s.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
                {filteredProblems.length > 5 && (
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    +{filteredProblems.length - 5} more sounds to master
                  </p>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="mastered" className="space-y-3 mt-4">
            {masteredSyllables.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Keep practicing to master more sounds! 🎯
              </p>
            ) : (
              <>
                <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                  🎉 Great job! You've mastered these sounds with 90%+ accuracy
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {masteredSyllables.map(({ syllable, data }) => (
                    <motion.div
                      key={syllable}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center"
                    >
                      <div className="font-mono font-bold text-lg">{syllable}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round(data.successRate * 100)}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};
