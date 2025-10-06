import { useAppStore, TabType } from '@/stores/appStore';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'explore' as TabType, label: 'Map' },
  { id: 'learn' as TabType, label: 'Discover' },
];

export const UnifiedHeader = () => {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <div>
            <h1 className="text-lg font-bold text-foreground font-architects">HelloCity</h1>
            <p className="text-xs text-muted-foreground hidden sm:block font-karla">Learn languages through travel</p>
          </div>
        </div>

        {/* Navigation Toggle */}
        <div className="relative bg-muted rounded-full p-1 flex gap-1" style={{ width: '200px', height: '34px' }}>
          <motion.div
            layoutId="activeHeaderToggle"
            className="absolute top-1 bottom-1 bg-card rounded-full shadow-md"
            style={{ width: 'calc(50% - 4px)' }}
            animate={{
              left: activeTab === 'explore' ? '4px' : 'calc(50% + 0px)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex-1 flex items-center justify-center transition-colors duration-200 z-10"
              >
                <span className={`text-sm font-medium transition-colors duration-200 font-karla ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Navigation Links */}
        <nav className="hidden md:flex items-center font-karla" style={{ gap: '50px' }}>
          <button
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About Us
          </button>
          <button
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Login
          </button>
        </nav>
      </div>
    </header>
  );
};
