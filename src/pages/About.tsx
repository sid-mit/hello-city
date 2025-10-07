import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { MapPin, Headphones, Target, Mic, Globe, Navigation, Trophy, Brain } from 'lucide-react';

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
      name: 'Ananya',
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
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-20 px-6 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-6xl mb-4">🌍✨</div>
          <h1 className="text-5xl md:text-6xl font-architects font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Hello from HelloCity!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-karla">
            Where language learning meets wanderlust
          </p>
        </div>
      </motion.section>

      {/* What is HelloCity Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-architects font-bold mb-6 text-center">
              What is HelloCity?
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
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
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-architects font-bold mb-12 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
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
                    <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-4xl mb-2">{index + 1}</div>
                        <h3 className="text-xl font-architects font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why HelloCity Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-architects font-bold mb-12 text-center">
              Why HelloCity?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <Icon className="w-10 h-10 text-primary mb-4" />
                        <h3 className="text-lg font-architects font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-architects font-bold mb-12 text-center">
              Meet the Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 group">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-5xl mb-2">{member.flag}</div>
                        <div className="text-2xl font-architects mb-1 group-hover:scale-110 transition-transform">
                          {member.greeting}
                        </div>
                        <h3 className="text-2xl font-architects font-bold">{member.name}</h3>
                        <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed italic">
                        "{member.bio}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-architects font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We're on a mission to make every traveler feel a little less foreign and a little more at home, no matter where they go. Language learning shouldn't be intimidating—it should be an adventure.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="font-architects text-lg shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              Ready to Explore? 🚀
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t">
        <p className="text-sm text-muted-foreground">
          Built with ❤️ using React, AI, and lots of coffee ☕
        </p>
      </footer>
    </div>
  );
};

export default About;
