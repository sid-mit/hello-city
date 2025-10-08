import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MapPin, Target, Mic, Globe, Navigation, Trophy, Linkedin } from 'lucide-react';
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
      greeting: 'नमस्ते',
      linkedin: 'https://www.linkedin.com/in/aninya/',
      image: '/team/aninya.jpg'
    },
    {
      name: 'Jiwon',
      city: 'Seoul',
      greeting: '안녕하세요',
      linkedin: 'https://www.linkedin.com/in/jiwonpyo/',
      image: '/team/jiwon.jpg'
    },
    {
      name: 'Yuze',
      city: 'Beijing',
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Hello from <span className="text-primary">HelloCity</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A small word can open the world.
          </p>
        </div>
      </motion.section>

      {/* What is HelloCity Section */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-h2 mb-6 text-center text-foreground">
              What is <span className="text-primary">HelloCity</span>?
            </h2>
            <div className="space-y-4 text-body text-muted-foreground leading-relaxed">
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
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-h2 mb-12 text-center text-foreground">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/5 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-6xl font-bold mb-4 text-primary">{index + 1}</div>
                    <h3 className="text-h3 mb-3 text-foreground">{step.title}</h3>
                    <p className="text-body-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why HelloCity Section */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-h2 mb-12 text-center text-foreground">
              Why <span className="text-primary">HelloCity</span>?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-h3 mb-3 text-foreground">{feature.title}</h3>
                      <p className="text-body-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-h2 mb-6 text-center text-foreground">
              Meet the Team
            </h2>
            <p className="text-body text-muted-foreground leading-relaxed mb-12 text-center max-w-3xl mx-auto">
              Hello City is built by a small team of three designers who believe that technology can bring people closer, not apart. We come from different cities — New Delhi, Seoul, and Beijing — united by one shared curiosity: how a few simple words can open a whole new dimension of travel.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.city}`}
                    className="w-48 h-48 rounded-full object-cover mx-auto mb-6 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all"
                  />
                  <div className="text-3xl font-bold text-primary mb-3">{member.greeting}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-base text-muted-foreground mb-4">{member.city}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-h2 mb-6 text-foreground">
              Our Mission
            </h2>
            <p className="text-body text-muted-foreground leading-relaxed mb-8">
              To make travel more human by helping people connect across cultures through small, meaningful words. We believe language is more than communication. It's care, respect, and curiosity in motion.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="text-base rounded-xl"
            >
              Ready to Explore?
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t">
        <p className="text-body-sm text-muted-foreground">
          Built with care by the HelloCity team
        </p>
      </footer>
    </div>
  );
};

export default About;
