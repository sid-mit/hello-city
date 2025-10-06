import { motion } from 'framer-motion';
import { GlobeView } from './Globe/GlobeView';
import { useAppStore, City } from '@/stores/appStore';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const { selectCity, setIsTransitioning } = useAppStore();

  const handleCityClick = (city: City) => {
    selectCity(city);
    setIsTransitioning(true);
    
    // Simulate globe-to-map transition
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-surface">
      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-12 left-0 right-0 z-20 text-center px-4"
      >
        <h1 className="heading-1 bg-gradient-primary bg-clip-text text-transparent mb-2">
          Welcome to TravelSpeak
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore cities and learn essential phrases
        </p>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-32 left-0 right-0 z-20 text-center px-4"
      >
        <p className="text-lg text-foreground font-medium mb-2">
          Choose a city to explore
        </p>
        <p className="text-muted-foreground">
          Click on any glowing marker on the globe
        </p>
      </motion.div>

      {/* Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl max-h-[600px]">
          <GlobeView onCityClick={handleCityClick} />
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};
