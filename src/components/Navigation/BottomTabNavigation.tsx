import { Map, BookOpen } from 'lucide-react';
import { useAppStore, TabType } from '@/stores/appStore';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'explore' as TabType, label: 'Explore', icon: Map, emoji: '🗺' },
  { id: 'learn' as TabType, label: 'Learn', icon: BookOpen, emoji: '📚' },
];

export const BottomTabNavigation = () => {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-large">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative transition-smooth"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              
              {/* Icon */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                } transition-colors duration-200`}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              
              {/* Label */}
              <motion.span
                animate={{
                  scale: isActive ? 1 : 0.95,
                }}
                className={`text-xs font-medium mt-1 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                } transition-colors duration-200`}
              >
                {tab.label} {tab.emoji}
              </motion.span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
