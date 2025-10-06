import { Map, BookOpen } from 'lucide-react';
import { useAppStore, TabType } from '@/stores/appStore';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'explore' as TabType, icon: Map },
  { id: 'learn' as TabType, icon: BookOpen },
];

export const TopToggleNavigation = () => {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="relative bg-muted rounded-full p-1 flex gap-1" style={{ width: '160px', height: '48px' }}>
        {/* Sliding background indicator */}
        <motion.div
          layoutId="activeToggle"
          className="absolute top-1 bottom-1 bg-card rounded-full shadow-md"
          style={{ width: 'calc(50% - 4px)' }}
          animate={{
            left: activeTab === 'explore' ? '4px' : 'calc(50% + 0px)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
        
        {/* Toggle buttons */}
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex-1 flex items-center justify-center transition-colors duration-200 z-10"
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
