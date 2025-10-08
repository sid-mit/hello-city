import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Target, Mic, Globe, Navigation, Trophy, Linkedin, Heart, Coffee } from 'lucide-react';
import { UnifiedHeader } from '@/components/Header/UnifiedHeader';
import logo from '@/assets/logo.svg';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Connection, not perfection',
      description: 'A few words can change how the world welcomes you. We make language about presence, not performance.'
    },
    {
      icon: MapPin,
      title: 'Culture meets context',
      description: 'Every phrase is tied to real places and local etiquette. Learning that feels natural, never abstract.'
    },
    {
      icon: Navigation,
      title: 'Learn as you go',
      description: "No courses, no schedules. Just quick lessons that fit your journey. Three minutes at a café? You've learned something new."
    },
    {
      icon: Trophy,
      title: 'Playful by design',
      description: "Maps, voice feedback, and achievements turn learning into a daily adventure. You're not completing tasks—you're collecting memories."
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
      description: 'Pick a city and explore its illustrated map. Every location has something to teach you.'
    },
    {
      icon: MapPin,
      title: 'Tap and learn',
      description: 'Tap cafés, metros, museums, and more. Each place reveals must-know phrases for real situations.'
    },
    {
      icon: Mic,
      title: 'Practice playfully',
      description: "Record your voice, get instant feedback. You don't need perfection, just courage."
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
        className="pt-40 pb-16 px-6 text-center"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-5xl font-bold tracking-wide flex items-center gap-3 flex-wrap justify-center">
            <span className="text-foreground">Hello from</span>
            <img src={logo} alt="HelloCity" className="h-14 inline-block" />
          </h1>
          <p className="text-xl font-medium text-foreground">
            A small word can open the world.
          </p>
        </div>
      </motion.section>

      {/* What is HelloCity Section */}
      <section className="relative py-16 px-6 bg-secondary/20">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-center text-foreground mb-6 tracking-wide">
              What is HelloCity?
            </h2>
            <div className="text-base font-medium text-foreground leading-relaxed text-center">
              <p>
                HelloCity is a map-based micro-learning app that transforms how you connect with new places.
              </p>
              <p className="mt-4">
                No long lessons. No grammar drills. Just short, practical phrases tied to real locations you'll actually visit—cafés, metros, museums, and more.
              </p>
              <p className="mt-4">
                We're not here to make you fluent. We're here to help you feel confident, curious, and connected.
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
            <h2 className="text-2xl font-bold text-center text-foreground mb-10 tracking-wide">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-32">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                      <Icon className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    <div className="text-4xl font-extrabold mb-6 text-[#D2E0FF] tracking-wide">{index + 1}</div>
                    <h3 className="text-base font-bold mb-3 text-foreground tracking-wide">{step.title}</h3>
                    <p className="text-sm font-medium text-foreground leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why HelloCity Section */}
      <section className="relative py-20 px-6 bg-secondary/20">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-center text-foreground mb-10 tracking-wide">
              Why HelloCity?
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-white rounded-xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      <div className="absolute top-8 left-8 w-72 h-36 bg-[#D2E0FF]/40 rounded-full blur-[70px]"></div>
                    </div>
                    <div className="relative flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[#D2E0FF] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold mb-2 text-foreground tracking-wide">{feature.title}</h3>
                        <p className="text-sm font-medium text-foreground leading-relaxed">{feature.description}</p>
                      </div>
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
            <h2 className="text-2xl font-bold text-center text-foreground mb-6 tracking-wide">
              Meet the Team
            </h2>
            <p className="text-base font-medium text-foreground leading-relaxed mb-16 text-center max-w-3xl mx-auto">
              Hello City is built by a small team of three designers who believe that technology can bring people closer, not apart. We come from different cities (New Delhi, Seoul, and Beijing) united by one shared curiosity: how a few simple words can open a whole new dimension of travel.
            </p>
            <div className="flex justify-center items-center gap-44">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 mb-6 rounded-full bg-muted overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.city}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-lg font-medium text-primary mb-4 tracking-wide">{member.greeting}</div>
                  <div className="flex flex-col gap-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-foreground tracking-wide hover:text-primary transition-colors group inline-block"
                    >
                      {member.name}
                      <span className="block h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left mt-1"></span>
                    </a>
                    <p className="text-sm font-medium text-foreground">{member.city}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 px-6 bg-secondary/20">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 tracking-wide">
              Our Mission
            </h2>
            <p className="text-base font-medium text-foreground leading-relaxed mb-10">
              To make travel more human. Helping people connect across cultures through small, meaningful words. Language isn't just communication. It's care, respect, and curiosity in motion.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="px-32 py-3 bg-[#D2E0FF] text-primary text-lg font-semibold rounded-full hover:bg-[#D2E0FF]/80 transition-colors"
            >
              Ready to Explore?
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t">
        <p className="text-xs font-medium text-foreground flex items-center justify-center gap-2">
          Built with <Heart className="w-4 h-4 text-primary" /> and a lot of <Coffee className="w-4 h-4 text-primary" />
        </p>
      </footer>
    </div>
  );
};

export default About;
