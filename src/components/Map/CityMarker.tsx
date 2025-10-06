import { motion } from 'framer-motion';
import { City } from '@/stores/appStore';

interface CityMarkerProps {
  city: City;
  onClick: () => void;
  isSelected: boolean;
}

export const CityMarker = ({ city, onClick, isSelected }: CityMarkerProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative group cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Pulse effect when selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Marker circle */}
      <div
        className={`relative w-12 h-12 rounded-full glass border-2 flex items-center justify-center transition-all ${
          isSelected
            ? 'border-primary shadow-[0_0_20px_rgba(102,126,234,0.5)]'
            : 'border-border/50 hover:border-primary/50'
        }`}
      >
        <span className="text-2xl">{city.emoji}</span>
      </div>

      {/* Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="glass rounded-lg px-3 py-2 whitespace-nowrap shadow-large">
          <p className="font-semibold text-sm">{city.name}</p>
          <p className="text-xs text-muted-foreground">Learn {city.language}</p>
        </div>
      </div>
    </motion.button>
  );
};
