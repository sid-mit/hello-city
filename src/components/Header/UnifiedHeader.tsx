import { useAppStore, TabType } from '@/stores/appStore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.svg';
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
  return <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#D2E0FF]">
      <div className="container mx-auto px-10 py-4 flex items-center">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer"
          >
            <motion.img
              src={logo}
              alt="HelloCity Logo"
              className="w-[138px] h-10"
              animate={{
                x: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          <div>
            
            
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
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="relative flex-1 flex items-center justify-center transition-colors duration-200 z-10">
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