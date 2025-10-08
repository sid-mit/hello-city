import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';

export default function Landing() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/onboarding');
  };

  return (
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-b from-white to-[#F5F8FF]">
      {/* Decorative greeting texts with floating animations */}
      <motion.div 
        className="absolute left-[35px] top-[505px] text-[#E0EBFF] text-[64px] font-semibold" 
        style={{ fontFamily: 'Outfit', fontWeight: 600 }}
        animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        你好
      </motion.div>
      
      <motion.div 
        className="absolute left-[260px] top-[636px] text-[#E6EEFF] text-[32px] font-semibold hidden lg:block" 
        style={{ fontFamily: 'Outfit', fontWeight: 600 }}
        animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        こんにちは
      </motion.div>
      
      <motion.div 
        className="absolute left-[463px] top-[203px] text-[#EEF4FF] text-[24px] font-semibold hidden md:block" 
        style={{ fontFamily: 'Outfit', fontWeight: 600 }}
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        হ্যালো
      </motion.div>
      
      <motion.div 
        className="absolute left-[525px] top-[522px] text-[#E9F1FF] text-[24px] font-semibold hidden lg:block" 
        style={{ fontFamily: 'Outfit', fontWeight: 600 }}
        animate={{ y: [0, 8, 0], x: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        வணக்கம்
      </motion.div>
      
      <motion.div 
        className="absolute right-[60px] top-[112px] text-[#EDF3FF] text-[96px] font-semibold hidden xl:block" 
        style={{ fontFamily: 'Outfit', fontWeight: 600 }}
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        Namaste
      </motion.div>
      
      <motion.div 
        className="absolute left-[175px] top-[289px] text-[#E1EBFF] text-[40px] font-semibold hidden lg:block" 
        style={{ fontFamily: 'Outfit', fontWeight: 600 }}
        animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
        transition={{ duration: 13, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        Bonjour
      </motion.div>
      
      <motion.div 
        className="absolute left-[-63px] top-[92px] text-[#F1F6FF] text-[64px] font-semibold hidden md:block" 
        style={{ fontFamily: 'Outfit', fontWeight: 600 }}
        animate={{ y: [0, -12, 0], x: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        Kamusta
      </motion.div>
      
      <motion.div 
        className="absolute right-[64px] bottom-[149px] text-[#DDE8FF] text-[36px] font-semibold hidden lg:block" 
        style={{ fontFamily: 'Outfit', fontWeight: 600 }}
        animate={{ y: [0, 10, 0], x: [0, -12, 0] }}
        transition={{ duration: 11.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        안녕하세요
      </motion.div>
      
      <motion.div 
        className="absolute right-[54px] top-[456px] text-[#ECF2FF] text-[64px] font-semibold hidden xl:block" 
        style={{ fontFamily: 'Outfit', fontWeight: 600 }}
        animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
        transition={{ duration: 13.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        Hujambo
      </motion.div>

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[85%] md:w-full max-w-[570px] px-4 sm:px-6 md:px-0"
      >
        <div className="flex flex-col items-center gap-20">
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
              className="text-[#2A64EC] text-[18px] font-semibold"
              style={{ fontFamily: 'Outfit', fontWeight: 600 }}
            >
              Continue
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
