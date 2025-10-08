import React from 'react';
import { motion } from 'framer-motion';
import PitchLayout from '@/components/Pitch/PitchLayout';

const Slide2 = () => {
  return (
    <PitchLayout currentSlide={1}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            "From learning <em>about</em> language<br />to living <em>inside</em> it."
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Travel is back — and people crave belonging, not just translation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mb-16 h-[400px] flex items-center justify-center"
        >
          {/* Triangle Positioning Diagram */}
          <svg viewBox="0 0 600 400" className="w-full h-full">
            {/* Triangle lines */}
            <motion.line
              x1="100" y1="100" x2="500" y2="100"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <motion.line
              x1="100" y1="100" x2="300" y2="350"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            />
            <motion.line
              x1="500" y1="100" x2="300" y2="350"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            />
            
            {/* Corner Labels */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <text x="100" y="80" textAnchor="middle" className="fill-foreground text-sm font-medium">
                Duolingo
              </text>
              <text x="100" y="95" textAnchor="middle" className="fill-muted-foreground text-xs">
                structured learning
              </text>
            </motion.g>
            
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
              <text x="500" y="80" textAnchor="middle" className="fill-foreground text-sm font-medium">
                Guidebooks
              </text>
              <text x="500" y="95" textAnchor="middle" className="fill-muted-foreground text-xs">
                cultural depth
              </text>
            </motion.g>
            
            {/* Center - HelloCity */}
            <motion.circle
              cx="300" cy="225"
              r="80"
              fill="hsl(var(--primary))"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
            />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
              <text x="300" y="220" textAnchor="middle" className="fill-primary-foreground text-lg font-bold">
                HelloCity
              </text>
              <text x="300" y="240" textAnchor="middle" className="fill-primary-foreground text-xs">
                real-time, place-based
              </text>
            </motion.g>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-3xl font-bold text-primary mb-2">1.4B</div>
            <p className="text-sm text-muted-foreground">trips in 2024</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-3xl font-bold text-primary mb-2">✓</div>
            <p className="text-sm text-muted-foreground">Travelers want authentic connection, not checklists</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="text-3xl font-bold text-primary mb-2">NOW</div>
            <p className="text-sm text-muted-foreground">Gen AI makes contextual learning possible</p>
          </div>
        </motion.div>
      </div>
    </PitchLayout>
  );
};

export default Slide2;
