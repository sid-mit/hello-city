import React from 'react';
import { motion } from 'framer-motion';
import PitchLayout from '@/components/Pitch/PitchLayout';
import { MapPin } from 'lucide-react';

const Slide1 = () => {
  return (
    <PitchLayout currentSlide={0}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            "Even a few words can change<br />how the world welcomes you."
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-6xl mb-4">🍵</div>
            <p className="text-lg text-center text-muted-foreground">
              Traveler ordering chai,<br />looking unsure
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-accent/10 to-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-6xl mb-4">😊</div>
            <p className="text-lg text-center text-muted-foreground">
              Local smiling as they hear<br />"thank you"
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center space-y-6"
        >
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Most travelers want to connect — but language turns small moments into silence.
          </p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center gap-2 pt-8"
          >
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">HelloCity</span>
          </motion.div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4">
            <strong className="text-primary">80% of travelers</strong> want to learn local phrases — but most never do.
          </p>
        </motion.div>
      </div>
    </PitchLayout>
  );
};

export default Slide1;
