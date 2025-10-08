import React from 'react';
import { motion } from 'framer-motion';
import PitchLayout from '@/components/Pitch/PitchLayout';
import { Globe, Database, Mic, Trophy, Users } from 'lucide-react';

const Slide4 = () => {
  const techStack = [
    { icon: Globe, label: '3D Globe', description: 'Interactive world map' },
    { icon: Database, label: 'Lovable Cloud', description: 'Real-time database' },
    { icon: Mic, label: 'Speech AI', description: 'Voice recognition' },
    { icon: Trophy, label: 'Gamification', description: 'Streaks & badges' },
    { icon: Users, label: 'Gender Logic', description: 'Context-aware' },
  ];

  return (
    <PitchLayout currentSlide={3}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            "Fully functional.<br />Built in <span className="text-primary">48 hours</span>."
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Design, tech, and culture — working seamlessly together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <div className="grid grid-cols-5 gap-6 mb-12">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center"
              >
                <div className="bg-primary/10 hover:bg-primary/20 transition-colors rounded-2xl p-8 mb-4 w-full aspect-square flex items-center justify-center">
                  <tech.icon className="h-16 w-16 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-center mb-1">{tech.label}</h3>
                <p className="text-xs text-muted-foreground text-center">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl p-8"
        >
          <ul className="grid md:grid-cols-2 gap-4 text-lg">
            <li className="flex items-center gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-muted-foreground">3D rotating globe with 5 cities</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-muted-foreground">Real-time speech recognition</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-muted-foreground">AI conversation engine</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary text-xl">✓</span>
              <span className="text-muted-foreground">Powered by Lovable Cloud + React</span>
            </li>
          </ul>
          
          <p className="text-center text-xl text-foreground font-medium pt-8">
            It's <span className="text-primary font-bold">live</span>, not just slides.
          </p>
        </motion.div>
      </div>
    </PitchLayout>
  );
};

export default Slide4;
