import { useAppStore, TabType } from '@/stores/appStore';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
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
  return <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#D2E0FF]">
      <div className="container mx-auto px-10 py-4 flex items-center">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer"
            onClick={() => navigate('/home')}
          >
            <motion.svg
              width="138"
              height="40"
              viewBox="0 0 138 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                x: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <g clipPath="url(#clip0_1_2)">
                <motion.path
                  d="M10.4167 5H5.20833C3.43945 5 2 6.43945 2 8.20833V31.7917C2 33.5605 3.43945 35 5.20833 35H10.4167V5Z"
                  fill="#417CFF"
                  stroke="#417CFF"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <motion.path
                  d="M27.0833 5H21.875V20H27.0833V5Z"
                  fill="#417CFF"
                  stroke="#417CFF"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut", delay: 0.4 }}
                />
                <motion.path
                  d="M43.75 8.20833C43.75 6.43945 42.3105 5 40.5417 5H35.3333V20H40.5417C42.3105 20 43.75 18.5605 43.75 16.7917V8.20833Z"
                  fill="#417CFF"
                  stroke="#417CFF"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.7 }}
                />
                <motion.path
                  d="M52 8.33333C52 6.49238 53.4924 5 55.3333 5H66C67.841 5 69.3333 6.49238 69.3333 8.33333V16.6667C69.3333 18.5076 67.841 20 66 20H55.3333C53.4924 20 52 18.5076 52 16.6667V8.33333Z"
                  stroke="#417CFF"
                  strokeWidth="3"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1, fill: "#417CFF" }}
                  transition={{ 
                    pathLength: { duration: 0.5, ease: "easeInOut", delay: 1.0 },
                    fill: { duration: 0.3, delay: 1.3 }
                  }}
                />
              </g>
              <defs>
                <clipPath id="clip0_1_2">
                  <rect width="138" height="40" fill="white"/>
                </clipPath>
              </defs>
            </motion.svg>
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