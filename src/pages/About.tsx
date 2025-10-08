import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { MapPin, Headphones, Target, Mic, Globe, Navigation, Trophy, Brain, ArrowLeft, Home } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Mic,
      title: 'Real Pronunciation Practice',
      description: 'AI-powered speech recognition gives you instant feedback'
    },
    {
      icon: Globe,
      title: 'Multiple Languages',
      description: 'Hindi, Mandarin, Korean, French, Spanish, and more'
    },
    {
      icon: Navigation,
      title: 'City-Specific Context',
      description: 'Learn the phrases locals actually use in each city'
    },
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Streaks, badges, and progress tracking keep you motivated'
    },
    {
      icon: Brain,
      title: 'Smart Practice',
      description: 'Focus on your challenging sounds with personalized recommendations'
    }
  ];

  const team = [
    {
      name: 'Jiwon',
      flag: '🇰🇷',
      greeting: '안녕하세요',
      role: 'Co-founder & Language Architect',
      bio: "Growing up between Seoul and California, I experienced firsthand how the right phrase can turn a confusing moment into a connection. HelloCity is my way of giving travelers that confidence before they even step off the plane."
    },
    {
      name: 'Yuze',
      flag: '🇨🇳',
      greeting: '你好',
      role: 'Co-founder & Experience Designer',
      bio: "I've navigated countless cities where I didn't speak the language, and I learned that you don't need fluency—you need the *right* phrases. HelloCity distills years of travel mishaps and victories into bite-sized, practical lessons."
    },
    {
      name: 'Aninya',
      flag: '🇮🇳',
      greeting: 'नमस्ते',
      role: 'Co-founder & Tech Lead',
      bio: "As someone who's taught Hindi to travelers in India, I saw how traditional language apps fall short for real-world scenarios. We built HelloCity to bridge that gap—combining authentic local knowledge with smart technology."
    }
  ];

  const steps = [
    {
      icon: MapPin,
      title: 'Explore',
      description: 'Choose a city and pick a real-world situation (restaurant, transit, shopping, etc.)'
    },
    {
      icon: Headphones,
      title: 'Learn',
      description: 'Listen to native speakers and practice phrases with syllable-by-syllable breakdowns'
    },
    {
      icon: Target,
      title: 'Master',
      description: 'Get instant pronunciation feedback, track your progress, and unlock achievements'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-16 px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-6">🌍✨</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-karla">
            Hello from HelloCity!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-karla">
            Where language learning meets wanderlust
          </p>
        </div>
      </motion.section>

      {/* What is HelloCity Section */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-foreground font-karla">
              What is HelloCity?
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed font-karla">
              <p>
                HelloCity is your passport to confident communication in any corner of the world. We believe the best way to learn a language isn't through endless grammar drills—it's by diving into real conversations you'll actually have while traveling.
              </p>
              <p>
                From ordering street food in Delhi to navigating the metro in Paris, we've curated authentic travel situations across 10+ cities and 8+ languages. Each phrase comes with native pronunciation, cultural context, and AI-powered feedback to help you sound like a local, not a tourist.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center text-foreground font-karla">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-white rounded-2xl p-6 text-center h-full" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/5 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="text-3xl font-semibold mb-3 text-muted-foreground">{index + 1}</div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground font-karla">{step.title}</h3>
                      <p className="text-sm text-muted-foreground font-karla leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why HelloCity Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center text-foreground font-karla">
              Why HelloCity?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-white rounded-2xl p-5 h-full" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                      <Icon className="w-8 h-8 text-primary mb-3" />
                      <h3 className="text-base font-semibold mb-2 text-foreground font-karla">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground font-karla leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center text-foreground font-karla">
              Meet the Team
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl p-6 h-full" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{member.flag}</div>
                      <div className="text-xl mb-1 font-karla">
                        {member.greeting}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground font-karla">{member.name}</h3>
                      <p className="text-xs text-primary font-medium mt-1 font-karla">{member.role}</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed italic font-karla">
                      "{member.bio}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground font-karla">
              Our Mission
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 font-karla">
              We're on a mission to make every traveler feel a little less foreign and a little more at home, no matter where they go. Language learning shouldn't be intimidating—it should be an adventure.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="font-karla text-base rounded-xl"
            >
              Ready to Explore? 🚀
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t">
        <p className="text-sm text-muted-foreground font-karla">
          Built with ❤️ using React, AI, and lots of coffee ☕
        </p>
      </footer>
    </div>
  );
};

export default About;
