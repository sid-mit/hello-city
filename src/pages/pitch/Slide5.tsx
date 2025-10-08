import React from 'react';
import { motion } from 'framer-motion';
import PitchLayout from '@/components/Pitch/PitchLayout';
import { Mic, Package, Heart } from 'lucide-react';

const Slide5 = () => {
  const futureFeatures = [
    {
      icon: Mic,
      emoji: '🎙️',
      title: 'Hello Voice',
      description: 'AI pronunciation coach with real-time feedback',
    },
    {
      icon: Package,
      emoji: '📦',
      title: 'City Drops',
      description: 'Seasonal phrase packs from local creators',
    },
    {
      icon: Heart,
      emoji: '💌',
      title: 'Hello Club',
      description: 'Creator community network for authentic content',
    },
  ];

  return (
    <PitchLayout currentSlide={4}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            "Building a world that speaks<br />to each other."
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            From five cities today to a global network of voices tomorrow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16 relative"
        >
          <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl p-12 relative overflow-hidden">
            {/* Animated expanding dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-primary rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: [0.3, 0.7, 0.3],
                    x: Math.cos((i * Math.PI * 2) / 12) * (100 + i * 20),
                    y: Math.sin((i * Math.PI * 2) / 12) * (100 + i * 20),
                  }}
                  transition={{ 
                    delay: i * 0.1,
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1 
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-6">🌍</div>
              <div className="flex items-center justify-center gap-4 text-3xl font-bold">
                <span className="text-muted-foreground">5 cities</span>
                <span className="text-primary">→</span>
                <span className="text-primary">20+ cities</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {futureFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 200 }}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.emoji}</div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center text-xl text-muted-foreground mt-12 italic"
        >
          Because even a few words can change how the world welcomes you.
        </motion.p>
      </div>
    </PitchLayout>
  );
};

export default Slide5;
