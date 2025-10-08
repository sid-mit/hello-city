import { motion } from 'framer-motion';
import { UnifiedHeader } from '@/components/Header/UnifiedHeader';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Recent');
  const { guestName, favoritedSituations, badges, toggleFavorite, isSituationFavorited, practiceHistory } = useAppStore();

  const filters = ['Recent', 'By City', 'Most Practice', 'Alphabetical'];

  // Sort situations based on active filter
  const sortedSituations = [...favoritedSituations].sort((a, b) => {
    switch (activeFilter) {
      case 'Recent':
        return new Date(b.dateSaved).getTime() - new Date(a.dateSaved).getTime();
      case 'By City':
        return a.cityName.localeCompare(b.cityName);
      case 'Most Practice':
        const aCount = practiceHistory[a.id]?.attempts || 0;
        const bCount = practiceHistory[b.id]?.attempts || 0;
        return bCount - aCount;
      case 'Alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handlePracticeClick = (situation: typeof favoritedSituations[0]) => {
    // Navigate to home and trigger practice modal
    navigate('/home');
    // You may want to add logic to auto-open the practice modal here
  };

  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />
      
      <div className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
        {/* Greeting Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Hello, {guestName || 'Guest'}!
          </h1>
          <p className="text-base font-medium text-muted-foreground">
            {favoritedSituations.length} situation{favoritedSituations.length !== 1 ? 's' : ''} saved
          </p>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                className={`p-6 rounded-2xl border-2 ${
                  badge.unlocked 
                    ? 'bg-[#EEF4FF] border-primary/20' 
                    : 'bg-muted/20 border-muted-foreground/10'
                } flex flex-col items-center text-center`}
              >
                <div className="text-4xl mb-3">{badge.emoji}</div>
                <h3 className="text-base font-bold text-foreground mb-1">{badge.title}</h3>
                <p className="text-sm font-medium text-muted-foreground">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Liked Situations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Likes</h2>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/30 text-foreground hover:bg-muted/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Liked Situations Grid */}
          {sortedSituations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-muted-foreground mb-4">
                No saved situations yet
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Explore the map and tap the heart icon to save situations you want to practice
              </p>
              <button
                onClick={() => navigate('/home')}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Explore Map
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sortedSituations.map((situation, index) => {
                const isFavorited = isSituationFavorited(situation.id);
                const practiceCount = practiceHistory[situation.id]?.attempts || 0;
                
                return (
                  <motion.div
                    key={situation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                    className="p-6 rounded-2xl border-2 border-primary/20 bg-white relative"
                  >
                    <button 
                      onClick={() => toggleFavorite(situation)}
                      className="absolute top-4 right-4 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                    
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {situation.cityName}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2">{situation.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{situation.description}</p>
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      {situation.phrases.length} phrases
                      {practiceCount > 0 && ` • Practiced ${practiceCount}x`}
                    </p>
                    
                    <button 
                      onClick={() => handlePracticeClick(situation)}
                      className="w-full py-3 rounded-full bg-[#D2E0FF] text-primary text-base font-semibold hover:bg-[#D2E0FF]/80 transition-colors"
                    >
                      Practice
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Discover;
