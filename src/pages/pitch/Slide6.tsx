import React from 'react';
import { motion } from 'framer-motion';
import PitchLayout from '@/components/Pitch/PitchLayout';
import { MapPin } from 'lucide-react';

const Slide6 = () => {
  const team = [
    { name: 'Jiwon', city: 'Seoul', flag: '/flags/south-korea.png', image: '/team/jiwon.jpg' },
    { name: 'Yuze', city: 'Beijing', flag: '/flags/china.png', image: '/team/yuze.jpg' },
    { name: 'Aninya', city: 'Delhi', flag: '/flags/india.png', image: '/team/aninya.jpg' },
  ];

  return (
    <PitchLayout currentSlide={5}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            "Travel that speaks."
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            From three continents, one shared belief —<br />
            technology should bring people closer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16 relative"
        >
          {/* Paper plane animation path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <motion.path
              d="M 150 150 Q 300 100, 450 150 Q 600 200, 750 150"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 2 }}
            />
          </svg>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">{member.name}</h3>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <img src={member.flag} alt={`${member.city} flag`} className="w-8 h-8 object-contain" />
                  <span>{member.city}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center space-y-8"
        >
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Hello City isn't just an app — it's a bridge between cultures,
            between strangers, and between the traveler you are and the
            global citizen you want to be.
          </p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 200 }}
            className="pt-8"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full px-8 py-4">
              <MapPin className="h-10 w-10 text-primary" />
              <span className="text-3xl font-bold text-primary">HelloCity</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PitchLayout>
  );
};

export default Slide6;
