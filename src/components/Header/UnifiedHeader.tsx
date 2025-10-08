import { useAppStore, TabType } from '@/stores/appStore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.svg';

const tabs = [
  { id: 'explore' as TabType, label: 'Map' },
  { id: 'learn' as TabType, label: 'Discover' },
];

export const UnifiedHeader = () => {
  const { activeTab, setActiveTab } = useAppStore();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="container mx-auto pl-4 pr-10 h-16 flex items-center">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="HelloCity Logo" className="w-8 h-8" />
          <div>
            <h1 className="text-lg font-bold font-architects" style={{ color: '#404040' }}>HelloCity</h1>
            <p className="text-xs hidden sm:block font-karla" style={{ color: '#6B7280' }}>Learn languages through travel</p>
          </div>
        </div>

        {/* Right Side Navigation Group */}
        <div className="ml-auto flex items-center" style={{ gap: '50px' }}>
          {/* Navigation Toggle */}
          <div className="relative rounded-full p-1 flex gap-1" style={{ width: '200px', height: '34px', backgroundColor: '#F5F7FA' }}>
            <motion.div
              layoutId="activeHeaderToggle"
              className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm"
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
                  <span 
                    className="text-sm font-medium transition-colors duration-200 font-karla"
                    style={{ color: isActive ? '#2A64EC' : '#6B7280' }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Navigation Links */}
          <nav className="hidden md:flex items-center font-karla" style={{ gap: '50px' }}>
            <button
              onClick={() => navigate('/about')}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: '#6B7280' }}
            >
              About Us
            </button>
            <button
              className="px-6 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#2A64EC' }}
            >
              Login
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
