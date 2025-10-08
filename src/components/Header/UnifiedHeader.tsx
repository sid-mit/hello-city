import { useAppStore, TabType } from '@/stores/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import logo from '@/assets/logo-2.svg';
import animationUrl from '@/assets/Animation_for_Time-Tracking.lottie?url';
const tabs = [{
  id: 'explore' as TabType,
  label: 'Map'
}, {
  id: 'learn' as TabType,
  label: 'Discover'
}];
export const UnifiedHeader = () => {
  const {
    activeTab,
    setActiveTab
  } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);
  return <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#D2E0FF]">
      <div className="container mx-auto px-10 py-4 flex items-center">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <div
            className="cursor-pointer relative"
            style={{ height: '40px', width: '138px' }}
            onClick={() => {
              navigate('/home');
              setShowAnimation(true);
              setTimeout(() => setShowAnimation(false), 2500);
            }}
          >
            <AnimatePresence mode="wait">
              {!showAnimation ? (
                <motion.img
                  key="logo"
                  src={logo}
                  alt="HelloCity Logo"
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              ) : (
                <motion.div
                  key="animation"
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <DotLottieReact
                    src={animationUrl}
                    loop={false}
                    autoplay={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side Navigation Group */}
        <div className="ml-auto flex items-center" style={{
        gap: '50px'
      }}>
          {/* Navigation Toggle */}
          <div className="relative rounded-full p-1 flex gap-1" style={{
          width: '183px',
          height: '34px',
          backgroundColor: '#D2E0FF'
        }}>
            <motion.div layoutId="activeHeaderToggle" className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm" style={{
            width: 'calc(50% - 4px)'
          }} animate={{
            left: activeTab === 'explore' ? '4px' : 'calc(50% + 0px)'
          }} transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30
          }} />
            
            {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return <button 
              key={tab.id} 
              onClick={() => {
                setActiveTab(tab.id);
                if (location.pathname !== '/home') {
                  navigate('/home');
                }
              }} 
              className="relative flex-1 flex items-center justify-center transition-colors duration-200 z-10"
            >
              <span className="text-base font-semibold transition-colors duration-200 font-gilroy" style={{
                color: '#417CFF'
              }}>
                {tab.label}
              </span>
            </button>;
          })}
          </div>

          {/* Right Navigation Links */}
          <nav className="hidden md:flex items-center font-gilroy">
            <button onClick={() => navigate('/about')} className="text-base font-semibold transition-colors hover:opacity-80" style={{
            color: '#404040'
          }}>
              About Us
            </button>
          </nav>
        </div>
      </div>
    </header>;
};