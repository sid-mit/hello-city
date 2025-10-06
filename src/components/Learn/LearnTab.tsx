import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { SituationCard } from '@/components/Cards/SituationCard';
import { motion } from 'framer-motion';

export const LearnTab = () => {
  const { setActiveTab, favoritedSituations, guestName } = useAppStore();

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
    <div className="w-full h-full overflow-y-auto p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Greeting Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold mb-2">
            👤 Hello, {guestName || 'Guest'}!
          </h1>
          <p className="text-muted-foreground">
            📚 My Collection ({favoritedSituations.length})
          </p>
        </motion.div>

        {/* Saved Situation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoritedSituations.map((situation, index) => (
            <motion.div
              key={situation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SituationCard situation={situation} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
