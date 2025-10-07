import { motion } from 'framer-motion';
import planeImg from '@/assets/clouds/plane.png';

export const FloatingPlane = () => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/4 w-24 h-24 md:w-32 md:h-32 -translate-x-1/2 pointer-events-none z-10"
      initial={{ x: -300, y: 0, opacity: 0 }}
      animate={{ 
        x: [-300, 0],
        y: [0, 0],
        opacity: [0, 1],
      }}
      transition={{
        duration: 2,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      <motion.img
        src={planeImg}
        alt="Plane"
        className="w-full h-full object-contain drop-shadow-lg"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </motion.div>
  );
};
