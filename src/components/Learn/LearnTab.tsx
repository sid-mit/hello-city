import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { SituationCard } from '@/components/Cards/SituationCard';
import { StreakCounter } from '@/components/Gamification/StreakCounter';
import { BadgeSystem } from '@/components/Gamification/BadgeSystem';
import { motion } from 'framer-motion';
import { Trophy, SortAsc } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const LearnTab = () => {
  const { setActiveTab, favoritedSituations, guestName, practiceHistory } = useAppStore();
  const [sortBy, setSortBy] = useState('dateAdded');
  const [showBadges, setShowBadges] = useState(false);

  const sortedSituations = [...favoritedSituations].sort((a, b) => {
    switch (sortBy) {
      case 'city':
        return a.cityName.localeCompare(b.cityName);
      case 'mostPracticed':
        const aCount = practiceHistory[a.id]?.attempts || 0;
        const bCount = practiceHistory[b.id]?.attempts || 0;
        return bCount - aCount;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'dateAdded':
      default:
        return new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime();
    }
  });

  const groupedByCity = favoritedSituations.reduce((acc, situation) => {
    if (!acc[situation.cityName]) {
      acc[situation.cityName] = [];
    }
    acc[situation.cityName].push(situation);
    return acc;
  }, {} as Record<string, typeof favoritedSituations>);

  const recentlyPracticed = [...favoritedSituations]
    .filter(s => practiceHistory[s.id])
    .sort((a, b) => {
      const aDate = new Date(practiceHistory[a.id].lastPracticed).getTime();
      const bDate = new Date(practiceHistory[b.id].lastPracticed).getTime();
      return bDate - aDate;
    })
    .slice(0, 10);

  if (favoritedSituations.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
        {/* Empty State */}
        <div className="max-w-md space-y-6">
          <div className="text-6xl mb-4">📚</div>
          
          <h2 className="text-2xl font-bold text-foreground">
            No saved phrases yet
          </h2>
          
          <p className="text-muted-foreground text-base">
            Tap ⭐ on any situation card to save it for practice
          </p>
          
          <Button
            onClick={() => setActiveTab('explore')}
            className="bg-primary hover:bg-primary-dark text-primary-foreground"
          >
            ← Go to Explore
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto pt-20 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                👋 Hello, {guestName || 'Guest'}!
              </h1>
              <p className="text-muted-foreground">
                📚 {favoritedSituations.length} situations saved
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBadges(!showBadges)}
              className="gap-2"
            >
              <Trophy className="w-4 h-4" />
              Badges
            </Button>
          </div>
          
          <StreakCounter />
        </motion.div>

        {/* Badges Section */}
        {showBadges && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-card rounded-xl border border-border"
          >
            <h3 className="text-lg font-semibold mb-4">🏆 Your Badges</h3>
            <BadgeSystem />
          </motion.div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="byCity">By City</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dateAdded">Date Added</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="mostPracticed">Most Practiced</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: '240px' }}>
              {sortedSituations.map((situation, index) => (
                <motion.div
                  key={situation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SituationCard situation={situation} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="byCity">
            {Object.entries(groupedByCity).map(([cityName, situations]) => (
              <div key={cityName} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>{situations[0].cityEmoji}</span>
                  {cityName}
                  <span className="text-sm text-muted-foreground font-normal">
                    ({situations.length})
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: '240px' }}>
                  {situations.map((situation) => (
                    <SituationCard key={situation.id} situation={situation} />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="recent">
            {recentlyPracticed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: '240px' }}>
                {recentlyPracticed.map((situation) => (
                  <SituationCard key={situation.id} situation={situation} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No practice history yet. Start practicing!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
