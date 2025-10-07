import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';

export default function Landing() {
  const navigate = useNavigate();
  const { hasCompletedOnboarding } = useAppStore();

  useEffect(() => {
    if (hasCompletedOnboarding) {
      navigate('/home');
    }
  }, [hasCompletedOnboarding, navigate]);

  const handleStart = () => {
    navigate('/onboarding');
  };

  return (
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-b from-white to-[#F5F8FF]">
      {/* Decorative greeting texts */}
      <div className="absolute left-[35px] top-[505px] text-[#E0EBFF] text-[64px] font-semibold" style={{ fontFamily: 'Outfit' }}>
        你好
      </div>
      
      <div className="absolute left-[260px] top-[636px] text-[#E6EEFF] text-[32px] font-semibold hidden lg:block" style={{ fontFamily: 'Outfit' }}>
        こんにちは
      </div>
      
      <div className="absolute left-[463px] top-[203px] text-[#EEF4FF] text-[24px] font-semibold hidden md:block" style={{ fontFamily: 'Outfit' }}>
        হ্যালো
      </div>
      
      <div className="absolute left-[525px] top-[522px] text-[#E9F1FF] text-[24px] font-semibold hidden lg:block" style={{ fontFamily: 'Outfit' }}>
        வணக்கம்
      </div>
      
      <div className="absolute right-[60px] top-[112px] text-[#EDF3FF] text-[96px] font-semibold hidden xl:block" style={{ fontFamily: 'Outfit' }}>
        Namaste
      </div>
      
      <div className="absolute left-[175px] top-[289px] text-[#E1EBFF] text-[40px] font-semibold hidden lg:block" style={{ fontFamily: 'Outfit' }}>
        Bonjour
      </div>
      
      <div className="absolute left-[-63px] top-[92px] text-[#F1F6FF] text-[64px] font-semibold hidden md:block" style={{ fontFamily: 'Outfit' }}>
        Kamusta
      </div>
      
      <div className="absolute right-[64px] bottom-[149px] text-[#DDE8FF] text-[36px] font-semibold hidden lg:block" style={{ fontFamily: 'Outfit' }}>
        안녕하세요
      </div>
      
      <div className="absolute right-[54px] top-[456px] text-[#ECF2FF] text-[64px] font-semibold hidden xl:block" style={{ fontFamily: 'Outfit' }}>
        Hujambo
      </div>

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[85%] md:w-full max-w-[570px] px-4 sm:px-6 md:px-0"
      >
        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
          <div className="flex flex-col items-center gap-6">
            <h1 
              className="text-center text-[#404040] text-2xl sm:text-3xl md:text-[40px] font-bold tracking-wide"
              style={{ fontFamily: 'Gilroy', letterSpacing: '0.8px' }}
            >
              Say Hello to Your Next City
            </h1>
            <p 
              className="text-center text-[#404040] text-sm sm:text-base md:text-[16px] font-medium"
              style={{ fontFamily: 'Gilroy' }}
            >
              Every city has its own rhythm. Start with a simple hello.
            </p>
          </div>

          <button
            onClick={handleStart}
            className="px-12 sm:px-16 md:px-20 py-3 bg-[#BDD1FF] rounded-[30px] transition-transform hover:scale-105"
          >
            <span 
              className="text-[#2A64EC] text-base md:text-lg font-semibold"
              style={{ fontFamily: 'Outfit' }}
            >
              Start
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
