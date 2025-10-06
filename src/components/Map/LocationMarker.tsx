import { motion } from 'framer-motion';
import { Location } from '@/stores/appStore';

interface LocationMarkerProps {
  location: Location;
  onClick: () => void;
  isSelected: boolean;
}

export const LocationMarker = ({ location, onClick, isSelected }: LocationMarkerProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="group relative cursor-pointer"
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {/* Marker Card */}
      <div
        className={`
          relative bg-card border-2 rounded-2xl p-3 shadow-medium
          transition-all duration-300
          ${isSelected ? 'border-primary shadow-glow' : 'border-border'}
        `}
      >
        {/* Emoji Icon */}
        <div className="text-3xl mb-1">{location.emoji}</div>
        
        {/* Category Label */}
        <div className="text-xs font-semibold text-foreground whitespace-nowrap">
          {location.category}
        </div>

        {/* Pulse effect when selected */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-2 border-primary rounded-2xl"
            animate={{
              scale: [1, 1.2],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </div>

      {/* Pointer arrow */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full
          w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent
          ${isSelected ? 'border-t-primary' : 'border-t-card'}
          transition-colors duration-300
        `}
      />

      {/* Tooltip on hover */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="glass rounded-lg px-3 py-1.5 whitespace-nowrap text-sm font-medium shadow-medium">
          {location.name}
        </div>
      </div>
    </motion.button>
  );
};
