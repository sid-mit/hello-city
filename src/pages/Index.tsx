import { MapView } from '@/components/Map/MapView';
import { LearnTab } from '@/components/Learn/LearnTab';
import { BottomTabNavigation } from '@/components/Navigation/BottomTabNavigation';
import { useAppStore } from '@/stores/appStore';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const { activeTab } = useAppStore();

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Content Area (with padding for bottom nav) */}
      <div className="w-full h-full pb-16">
        <AnimatePresence mode="wait">
          {activeTab === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <MapView />
            </motion.div>
          )}
          
          {activeTab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <LearnTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Bottom Tab Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default Index;
