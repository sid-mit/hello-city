import { motion } from 'framer-motion';
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
        <div className="max-w-lg mx-auto flex flex-col items-center gap-6">
          <h1 className="text-5xl font-bold text-foreground tracking-wide">
            Hello from
          </h1>
          <div className="text-5xl font-bold text-primary tracking-wide">
            HelloCity
          </div>
          <p className="text-xl font-medium text-foreground">
            A small word can open the world.
          </p>
        </div>
      </motion.section>

      {/* What is HelloCity Section */}
      <section className="py-16 px-6 bg-secondary/20">
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
            <div className="text-base font-medium text-foreground leading-relaxed">
              <p>
                Hello City is a map-based micro-learning app that helps travelers feel more connected abroad.
              </p>
              <p className="mt-4">
                Instead of long lessons or grammar drills, Hello City teaches short, real-life expressions and cultural tips tied to the exact places you'll visit.
              </p>
              <p className="mt-4">
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
      <section className="py-20 px-6 bg-secondary/20">
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
              Hello City is built by a small team of three designers who believe that technology can bring people closer, not apart. We come from different cities — New Delhi, Seoul, and Beijing — united by one shared curiosity: how a few simple words can open a whole new dimension of travel.
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
                  <div className="text-2xl font-extrabold text-primary mb-8 tracking-wide">{member.greeting}</div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-bold text-foreground tracking-wide">{member.name}</h3>
                      <p className="text-sm font-medium text-foreground">{member.city}</p>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
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
            <h2 className="text-2xl font-bold text-foreground mb-6 tracking-wide">
              Our Mission
            </h2>
            <p className="text-base font-medium text-foreground leading-relaxed mb-10">
              To make travel more human by helping people connect across cultures through small, meaningful words. We believe language is more than communication. It's care, respect, and curiosity in motion.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-32 py-3 bg-[#D2E0FF] text-primary text-lg font-semibold rounded-full hover:bg-[#D2E0FF]/80 transition-colors"
            >
              Ready to Explore
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t">
        <p className="text-xs font-medium text-foreground">
          Built with care by the HelloCity team
        </p>
      </footer>
    </div>
  );
};

export default About;
