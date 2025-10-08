import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { MapPin, Headphones, Target, Mic, Globe, Navigation, Trophy, Brain, Linkedin } from 'lucide-react';
import { UnifiedHeader } from '@/components/Header/UnifiedHeader';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Connection, not perfection',
      description: 'Even a few words can change how the world welcomes you. We make language less about performance, more about presence.'
    },
    {
      icon: MapPin,
      title: 'Culture meets context',
      description: 'Each phrase is tied to real places and local etiquette, so learning feels natural, not abstract.'
    },
    {
      icon: Navigation,
      title: 'Learn as you go',
      description: "No courses, no schedules—just short, on-the-spot lessons that fit the flow of your journey. Three minutes at a café, and you've already learned something new."
    },
    {
      icon: Trophy,
      title: 'Playful by design',
      description: 'Stickers, maps, and voice feedback turn language learning into a small daily adventure. Every interaction feels like collecting memories, not completing tasks.'
    }
  ];

  const team = [
    {
      name: 'Aninya',
      city: 'New Delhi',
      flag: '🇮🇳',
      greeting: 'नमस्ते',
      linkedin: 'https://www.linkedin.com/in/aninya/',
      image: '/team/aninya.jpg'
    },
    {
      name: 'Jiwon',
      city: 'Seoul',
      flag: '🇰🇷',
      greeting: '안녕하세요',
      linkedin: 'https://www.linkedin.com/in/jiwonpyo/',
      image: '/team/jiwon.jpg'
    },
    {
      name: 'Yuze',
      city: 'Beijing',
      flag: '🇨🇳',
      greeting: '你好',
      linkedin: 'https://www.linkedin.com/in/yuze-li-8a4659275/',
      image: '/team/yuze.jpg'
    }
  ];

  const steps = [
    {
      icon: Globe,
      title: 'Choose your destination',
      description: 'Spin the globe, pick a city, and zoom into its illustrated map.'
    },
    {
      icon: MapPin,
      title: 'Tap and learn',
      description: 'Each location—like café, subway, or museum—reveals a few must-know phrases in various situations.'
    },
    {
      icon: Mic,
      title: 'Practice playfully',
      description: "Record your voice and get instant feedback. You don't need to sound perfect, just willing."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />
      
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
            A small word can open the world.
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
                Hello City is a map-based micro-learning app that helps travelers feel more connected abroad.
              </p>
              <p>
                Instead of long lessons or grammar drills, Hello City teaches short, real-life expressions and cultural tips tied to the exact places you'll visit.
              </p>
              <p>
                It's not about fluency. It's about confidence, curiosity, and connection.
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
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-foreground font-karla">
              Meet the Team
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 text-center font-karla">
              Hello City is built by a small team of three designers who believe that technology can bring people closer, not apart. We come from different cities — New Delhi, Seoul, and Beijing — united by one shared curiosity: how a few simple words can open a whole new dimension of travel.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl p-8 h-full hover:shadow-lg hover:-translate-y-1 transition-all" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                    <div className="flex flex-col items-center gap-4">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary/10"
                      />
                      <div className="text-3xl font-bold text-primary font-karla">{member.greeting}</div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-foreground font-karla">{member.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1 font-karla">
                          <span>{member.flag}</span> {member.city}
                        </p>
                      </div>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Linkedin size={20} />
                        <span className="text-sm font-medium font-karla">Connect on LinkedIn</span>
                      </a>
                    </div>
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
              To make travel more human by helping people connect across cultures through small, meaningful words. We believe language is more than communication. It's care, respect, and curiosity in motion.
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
