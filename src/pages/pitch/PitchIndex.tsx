import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home } from 'lucide-react';

const PitchIndex = () => {
  const navigate = useNavigate();

  const slides = [
    { number: 1, title: 'Opening Hook', subtitle: 'The moment of connection', emoji: '✨' },
    { number: 2, title: 'Why This', subtitle: 'The shift in learning', emoji: '🌍' },
    { number: 3, title: 'How It Works', subtitle: 'Learning in motion', emoji: '🎯' },
    { number: 4, title: 'Execution', subtitle: 'Built, not imagined', emoji: '⚙️' },
    { number: 5, title: 'Future Vision', subtitle: "What's next", emoji: '🚀' },
    { number: 6, title: 'The Bridge', subtitle: 'Our mission', emoji: '❤️' },
  ];

  return (
    <div className="min-h-screen bg-background py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            HelloCity <span className="text-primary">Pitch Deck</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Even a few words can change how the world welcomes you.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/pitch/slide-1')}
              className="gap-2"
            >
              Start Presentation <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/home')}
              className="gap-2"
            >
              <Home className="h-5 w-5" /> Back to App
            </Button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              onClick={() => navigate(`/pitch/slide-${slide.number}`)}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:border-primary/50 transition-all text-left group"
            >
              <div className="text-5xl mb-4">{slide.emoji}</div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Slide</span>
                <span className="text-3xl font-bold text-primary">{slide.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {slide.title}
              </h3>
              <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Use arrow keys or click the navigation buttons to move between slides
          </p>
          <div className="flex items-center justify-center gap-2">
            <kbd className="px-3 py-1 bg-muted rounded text-sm">←</kbd>
            <span className="text-sm text-muted-foreground">Previous</span>
            <span className="text-muted-foreground">•</span>
            <kbd className="px-3 py-1 bg-muted rounded text-sm">→</kbd>
            <span className="text-sm text-muted-foreground">Next</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PitchIndex;
