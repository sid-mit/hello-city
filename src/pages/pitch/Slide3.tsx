import React from 'react';
import { motion } from 'framer-motion';
import PitchLayout from '@/components/Pitch/PitchLayout';
import { Globe, Building2, MapPin, MessageCircle, Sparkles } from 'lucide-react';

const Slide3 = () => {
  const steps = [
    { icon: Globe, label: 'Spin the globe' },
    { icon: Building2, label: 'Choose a city' },
    { icon: MapPin, label: 'Tap a location' },
    { icon: MessageCircle, label: 'Practice phrases' },
    { icon: Sparkles, label: 'AI feedback' },
  ];

  return (
    <PitchLayout currentSlide={2}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            "Learn as you explore."
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            The globe becomes your syllabus — the world becomes your classroom.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-primary/10 rounded-full p-6 mb-3">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center max-w-[100px]">
                    {step.label}
                  </p>
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7 + index * 0.2, duration: 0.3 }}
                    className="text-2xl text-muted-foreground"
                  >
                    →
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl p-8">
            <ol className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                <span className="text-muted-foreground">Spin globe → Choose city</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                <span className="text-muted-foreground">Tap location → See phrases with native audio and tips</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                <span className="text-muted-foreground">Practice with AI feedback — word by word or full dialogue</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                <span className="text-muted-foreground">Unlock full conversations that adapt to the situation</span>
              </li>
            </ol>
          </div>

          <p className="text-center text-xl text-foreground font-medium italic pt-4">
            "This is language that listens back."
          </p>
        </motion.div>
      </div>
    </PitchLayout>
  );
};

export default Slide3;
