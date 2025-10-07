import { motion } from 'framer-motion';

interface CloudLayerProps {
  depth: 'back' | 'middle' | 'front';
  speed: 'slow' | 'medium' | 'fast';
  opacity?: number;
}

export const CloudLayer = ({ depth, speed, opacity = 1 }: CloudLayerProps) => {
  const cloudImages = {
    back: '/src/assets/clouds/cloud-layer-1.png',
    middle: '/src/assets/clouds/cloud-layer-2.png',
    front: '/src/assets/clouds/cloud-layer-3.png',
  };

  const animationDurations = {
    slow: 90,
    medium: 60,
    fast: 40,
  };

  const zIndexes = {
    back: 1,
    middle: 2,
    front: 3,
  };

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ 
        zIndex: zIndexes[depth],
        opacity,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute inset-0 w-[200%] h-full bg-repeat-x"
        style={{
          backgroundImage: `url(${cloudImages[depth]})`,
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
        }}
        animate={{
          x: ['-50%', '0%'],
        }}
        transition={{
          duration: animationDurations[speed],
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
};
