import { MapView } from '@/components/Map/MapView';
import { LearnTab } from '@/components/Learn/LearnTab';
import { UnifiedHeader } from '@/components/Header/UnifiedHeader';
import { WelcomeModal } from '@/components/Welcome/WelcomeModal';
import { useAppStore } from '@/stores/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutoImport } from '@/hooks/useAutoImport';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { activeTab } = useAppStore();
  const { isImporting, isChecking } = useAutoImport();

  // Show loading overlay during first-time import
  if (isChecking || isImporting) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">
            {isChecking ? 'Checking database...' : 'Setting up your data for the first time...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Welcome Modal */}
      <WelcomeModal />
      
      {/* Unified Header */}
      <UnifiedHeader />
      
      {/* Content Area */}
      <div className="w-full h-full">
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
    </div>
  );
};

export default Index;
