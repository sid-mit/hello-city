import { motion } from 'framer-motion';
import { UnifiedHeader } from '@/components/Header/UnifiedHeader';
import { Heart, Star, Globe, Target, Flame, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const Discover = () => {
  const [activeFilter, setActiveFilter] = useState('Recent');

  const achievements = [
    { icon: '🌍', title: 'First Step', description: 'Complete your first practice', unlocked: true },
    { icon: '💯', title: 'First Step', description: 'Complete your first practice', unlocked: true },
    { icon: '🔥', title: 'First Step', description: 'Complete your first practice', unlocked: false },
    { icon: '⭐', title: 'First Step', description: 'Complete your first practice', unlocked: true },
    { icon: '🎓', title: 'First Step', description: 'Complete your first practice', unlocked: false },
    { icon: '🌟', title: 'First Step', description: 'Complete your first practice', unlocked: false },
    { icon: '🎯', title: 'First Step', description: 'Complete your first practice', unlocked: false },
    { icon: '🏆', title: 'First Step', description: 'Complete your first practice', unlocked: false },
  ];

  const likedSituations = [
    { title: 'Order Food', description: 'Place your order', phrases: 4 },
    { title: 'Order Food', description: 'Place your order', phrases: 4 },
    { title: 'Order Food', description: 'Place your order', phrases: 4 },
    { title: 'Order Food', description: 'Place your order', phrases: 4 },
  ];

  const filters = ['Recent', 'By City', 'Most Practice', 'Alphabetical'];

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
          <h1 className="text-4xl font-bold text-foreground mb-2">Hello, Guest!</h1>
          <p className="text-base font-medium text-muted-foreground">1 situations saved</p>
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
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                className={`p-6 rounded-2xl border-2 ${
                  achievement.unlocked 
                    ? 'bg-[#EEF4FF] border-primary/20' 
                    : 'bg-muted/20 border-muted-foreground/10'
                } flex flex-col items-center text-center`}
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="text-base font-bold text-foreground mb-1">{achievement.title}</h3>
                <p className="text-sm font-medium text-muted-foreground">{achievement.description}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {likedSituations.map((situation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                className="p-6 rounded-2xl border-2 border-primary/20 bg-white relative"
              >
                <button className="absolute top-4 right-4 text-foreground hover:text-primary transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                
                <h3 className="text-lg font-bold text-foreground mb-2">{situation.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-1">{situation.description}</p>
                <p className="text-sm font-medium text-muted-foreground mb-4">{situation.phrases} phrases</p>
                
                <button className="w-full py-3 rounded-full bg-[#D2E0FF] text-primary text-base font-semibold hover:bg-[#D2E0FF]/80 transition-colors">
                  Practice
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Discover;
