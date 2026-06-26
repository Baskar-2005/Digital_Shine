import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, FiCode, FiLayout, FiMonitor, FiSearch, FiSmartphone, FiStar, 
  FiCheckCircle, FiMail, FiMapPin, FiPhone, FiGithub, FiTwitter, FiLinkedin, FiInstagram 
} from 'react-icons/fi';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiFirebase, SiFramer, SiGreensock, SiWordpress, SiFigma 
} from 'react-icons/si';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816]"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter flex overflow-hidden">
        <motion.span 
          initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
          className="text-white inline-block"
        >DIGITAL</motion.span>
        <motion.span 
          initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#6C63FF] inline-block"
        >SHINE</motion.span>
      </div>
      <div className="w-64 md:w-96 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#6C63FF] to-[#06B6D4]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-6 text-[#94A3B8] font-mono text-xl">{progress}%</div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, input, textarea, [role="button"], .interactive, .cursor-pointer'));
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#6C63FF] pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? "rgba(108, 99, 255, 0.2)" : "transparent"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <motion.div 
        className="w-2 h-2 bg-[#06B6D4] rounded-full"
        animate={{ opacity: isHovering ? 0 : 1 }}
      />
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-4 glass-card shadow-lg shadow-[#050816]/50' : 'py-6 bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tighter interactive">
          <span className="text-white">DIGITAL</span>
          <span className="text-[#6C63FF]">SHINE</span>
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#94A3B8]">
          {['Services', 'Work', 'About', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group py-2 interactive">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <a href="#contact" className="interactive px-6 py-2.5 rounded-full bg-white text-[#050816] hover:bg-[#6C63FF] hover:text-white transition-all duration-300 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(108,99,255,0.5)]">
            Let's Talk
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-[#6C63FF] text-white flex items-center justify-center z-40 shadow-[0_0_30px_rgba(108,99,255,0.5)] hover:bg-[#06B6D4] transition-colors interactive group"
        >
          <FiMail className="text-2xl group-hover:scale-110 transition-transform" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

const AnimatedNumber = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Hero Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ 
      x: (e.clientX / window.innerWidth) - 0.5, 
      y: (e.clientY / window.innerHeight) - 0.5 
    });
  };

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#050816] text-white overflow-x-hidden selection:bg-[#6C63FF] selection:text-white font-sans">
      <CustomCursor />
      <Navbar />
      <FloatingCTA />
      
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] origin-left z-50"
        style={{ scaleX }}
      />

      <main>
        {/* HERO SECTION */}
        <section 
          className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen" style={{ backgroundImage: "url('/hero-bg.png')" }} />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          
          <motion.div 
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#6C63FF]/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
            animate={{ x: mousePos.x * 100, y: mousePos.y * 100 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#06B6D4]/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
            animate={{ x: mousePos.x * -100, y: mousePos.y * -100 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          
          <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card text-sm font-medium mb-8 text-[#22D3EE] border border-[#22D3EE]/30"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22D3EE]"></span>
                </span>
                Award-Winning Creative Agency
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                We Build Digital<br />
                Experiences That <span className="text-gradient">Shine.</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-[#94A3B8] mb-12 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We create modern websites, stunning brands, high-converting UI/UX and powerful digital experiences that help businesses grow.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <a href="#contact" className="interactive px-8 py-4 rounded-full bg-[#6C63FF] text-white font-semibold text-lg hover:bg-[#7C3AED] hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all flex items-center gap-2 group">
                  Start Your Project
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#work" className="interactive px-8 py-4 rounded-full glass-card text-white font-semibold text-lg hover:bg-white/10 transition-all">
                  View Our Work
                </a>
              </motion.div>
            </div>
            
            <div className="hidden lg:block relative h-[600px]">
              <motion.div 
                className="absolute right-0 top-20 w-72 glass-card p-6 rounded-3xl border border-white/10 shadow-2xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-emerald-700 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <div className="text-sm text-[#94A3B8]">Conversion Rate</div>
                    <div className="text-2xl font-bold">+124%</div>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-[#10B981]"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute left-10 bottom-32 w-64 glass-card p-6 rounded-3xl border border-white/10 shadow-2xl"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#7C3AED] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(108,99,255,0.5)]">
                    <FiStar />
                  </div>
                  <div>
                    <div className="text-sm text-[#94A3B8]">Client Rating</div>
                    <div className="text-2xl font-bold">5.0/5.0</div>
                  </div>
                </div>
                <div className="flex gap-1 text-[#22D3EE]">
                  <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* LOGO MARQUEE */}
        <div className="py-12 border-y border-white/5 bg-[#0F172A]/50 backdrop-blur-md overflow-hidden flex relative">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex gap-20 items-center whitespace-nowrap px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {['STRIPE', 'LINEAR', 'VERCEL', 'RAYCAST', 'FRAMER', 'FIGMA', 'NOTION', 'DISCORD'].map((logo, j) => (
                  <span key={j} className="text-3xl md:text-4xl font-black text-white/20 tracking-widest hover:text-white/50 transition-colors cursor-default">{logo}</span>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* ABOUT */}
        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-[#06B6D4] font-mono text-sm tracking-widest uppercase mb-4">Who We Are</div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">We blend <span className="text-gradient">creative vision</span> with technical excellence.</h2>
                <p className="text-lg text-[#94A3B8] mb-6 leading-relaxed">
                  Digital Shine isn't just another agency. We are a collective of designers, developers, and strategists obsessed with pushing the boundaries of what's possible on the web.
                </p>
                <p className="text-lg text-[#94A3B8] mb-10 leading-relaxed">
                  Since our inception, we've helped ambitious startups and established enterprises transform their digital presence, resulting in measurable growth and unforgettable brand experiences.
                </p>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl font-bold text-white mb-2"><AnimatedNumber end={10} />+</div>
                    <div className="text-[#94A3B8]">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-2"><AnimatedNumber end={50} />+</div>
                    <div className="text-[#94A3B8]">Industry Awards</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square rounded-3xl overflow-hidden glass-card p-2"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/20 to-[#06B6D4]/20 mix-blend-overlay z-10" />
                <div className="w-full h-full bg-[#0F172A] rounded-2xl relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-1000" />
                  <div className="relative z-20 w-32 h-32 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-md">
                    <FiStar className="text-4xl text-white" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-32 relative bg-[#0F172A] border-y border-white/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6C63FF]/10 via-[#0F172A] to-[#0F172A] pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <div className="text-[#6C63FF] font-mono text-sm tracking-widest uppercase mb-4">Our Expertise</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Premium <span className="text-gradient">Services</span></h2>
              <p className="text-xl text-[#94A3B8]">End-to-end digital solutions designed for performance, aesthetics, and massive scale.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FiMonitor, title: "Website Design", desc: "Award-winning visuals that capture attention and drive action with flawless aesthetics." },
                { icon: FiCode, title: "Web Development", desc: "Lightning-fast, scalable, and secure technical implementations using modern stacks." },
                { icon: FiLayout, title: "UI/UX Design", desc: "Intuitive, accessible, and engaging interfaces crafted for maximum user retention." },
                { icon: FiStar, title: "Brand Identity", desc: "Memorable brand systems, logos, and guidelines that stand out in crowded markets." },
                { icon: FiSearch, title: "SEO Optimization", desc: "Data-driven technical and content strategies to dominate organic search rankings." },
                { icon: FiSmartphone, title: "Mobile Apps", desc: "Native-feeling applications for iOS and Android platforms built with React Native." }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-8 rounded-3xl group hover:bg-white/[0.06] border border-white/5 hover:border-[#6C63FF]/50 transition-all duration-300 relative overflow-hidden cursor-pointer interactive"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-white/10 text-[#22D3EE] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-[#6C63FF] group-hover:text-white group-hover:border-[#6C63FF] transition-all duration-300 shadow-lg">
                      <service.icon />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-[#94A3B8] leading-relaxed group-hover:text-white/80 transition-colors">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK / PROJECTS */}
        <section id="work" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <div className="text-[#06B6D4] font-mono text-sm tracking-widest uppercase mb-4">Selected Portfolio</div>
                <h2 className="text-4xl md:text-6xl font-bold">Featured <span className="text-gradient">Work</span></h2>
              </div>
              <a href="#" className="interactive inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors group pb-2 border-b border-[#94A3B8]/30 hover:border-white">
                View All Projects <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="space-y-32">
              {[
                { 
                  title: "BrandForge Rebrand", 
                  tag: "Identity & Web", 
                  color: "from-[#6C63FF] to-[#7C3AED]",
                  desc: "A complete overhaul of a B2B SaaS platform's visual identity and marketing website, resulting in a 45% increase in conversion rate."
                },
                { 
                  title: "LuxeCommerce Store", 
                  tag: "E-Commerce", 
                  color: "from-[#06B6D4] to-[#22D3EE]",
                  desc: "A headless Shopify build for a luxury fashion brand with sub-second page loads and fluid page transitions."
                },
                { 
                  title: "Nexus Dashboard", 
                  tag: "UI/UX Design", 
                  color: "from-[#10B981] to-[#059669]",
                  desc: "Complex data visualization and management interface designed for clarity, accessibility, and user efficiency."
                }
              ].map((project, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="group relative block"
                >
                  <div className={`w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center overflow-hidden relative shadow-2xl shadow-black/50 interactive cursor-pointer`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
                    <div className="text-white/20 font-black text-6xl md:text-9xl rotate-[-5deg] scale-150 group-hover:scale-110 group-hover:text-white/30 transition-all duration-1000">
                      {project.title.split(' ')[0].toUpperCase()}
                    </div>
                    
                    <div className="absolute inset-0 bg-[#050816]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                      <span className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg flex items-center gap-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        View Case Study <FiArrowRight />
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-[#06B6D4] font-mono text-sm mb-4 bg-white/5 backdrop-blur-sm">
                        {project.tag}
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-[#6C63FF] transition-colors cursor-pointer interactive">{project.title}</h3>
                      <p className="text-xl text-[#94A3B8] leading-relaxed">{project.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="py-32 relative bg-[#0F172A] border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-[#6C63FF]">Process</span></h2>
              <p className="text-xl text-[#94A3B8]">A proven methodology that guarantees results, delivered on time.</p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#6C63FF] to-transparent transform -translate-x-1/2" />

              {[
                { step: "01", title: "Discovery", desc: "We deep-dive into your business, goals, target audience, and competition." },
                { step: "02", title: "Strategy", desc: "Developing a comprehensive roadmap for design, content, and technology." },
                { step: "03", title: "Design", desc: "Creating wireframes, visual concepts, and interactive prototypes." },
                { step: "04", title: "Development", desc: "Writing clean, scalable, and performant code to bring the design to life." },
                { step: "05", title: "Launch", desc: "Rigorous testing followed by a seamless deployment to production." }
              ].map((phase, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row gap-8 items-center mb-16 last:mb-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-card p-8 rounded-3xl inline-block w-full max-w-md hover:border-[#06B6D4]/50 transition-colors">
                      <div className="text-[#06B6D4] font-mono text-xl mb-2">Phase {phase.step}</div>
                      <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                      <p className="text-[#94A3B8]">{phase.desc}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex relative z-10 w-16 h-16 rounded-full bg-[#050816] border-4 border-[#6C63FF] items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(108,99,255,0.4)]">
                    {phase.step}
                  </div>
                  
                  <div className="w-full md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Why <span className="text-gradient">Choose Us</span></h2>
              <p className="text-xl text-[#94A3B8]">We don't just build websites; we build businesses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Fast Delivery", icon: FiCheckCircle },
                { title: "Modern Design", icon: FiLayout },
                { title: "SEO Ready", icon: FiSearch },
                { title: "Responsive", icon: FiSmartphone },
                { title: "Performance", icon: FiMonitor },
                { title: "Creative Team", icon: FiStar },
                { title: "Affordable", icon: FiCheckCircle },
                { title: "Client Support", icon: FiPhone }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass-card p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer interactive group border border-white/5 hover:border-[#6C63FF]/50"
                >
                  <div className="w-12 h-12 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center group-hover:bg-[#6C63FF] group-hover:text-white transition-colors text-xl shadow-inner">
                    <item.icon />
                  </div>
                  <div className="font-semibold text-lg">{item.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 relative overflow-hidden bg-[#0F172A] border-y border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6C63FF]/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Client <span className="text-[#22D3EE]">Love</span></h2>
              <p className="text-xl text-[#94A3B8]">Don't just take our word for it.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { img: "/avatar1.png", name: "Sarah Jenkins", role: "CEO, TechFlow", text: "Digital Shine completely transformed our brand. The new website is not only beautiful but has increased our inbound leads by over 200%. True professionals." },
                { img: "/avatar2.png", name: "Marcus Chen", role: "Founder, Luxe", text: "The attention to detail is unmatched. They don't just build websites; they craft digital experiences that leave a lasting impression on your customers." },
                { img: "/avatar3.png", name: "Elena Rodriguez", role: "CMO, GrowthSync", text: "Working with them was the best investment we made this year. The speed, the quality, and the strategic thinking they brought to the table was incredible." }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="glass-card p-8 rounded-3xl relative hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="absolute -top-6 right-8 text-6xl text-[#6C63FF]/20 font-serif">"</div>
                  <div className="flex gap-1 text-[#10B981] mb-6">
                    <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" />
                  </div>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-4">
                    <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#6C63FF]/30" />
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-[#06B6D4]">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNOLOGIES */}
        <section className="py-20 relative border-b border-white/5">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-12 text-[#94A3B8]">Powered by modern technology</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { icon: SiReact, name: "React" },
                { icon: SiNextdotjs, name: "Next.js" },
                { icon: SiTypescript, name: "TypeScript" },
                { icon: SiTailwindcss, name: "Tailwind" },
                { icon: SiNodedotjs, name: "Node.js" },
                { icon: SiFramer, name: "Framer" }
              ].map((tech, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.1, color: "#ffffff" }}
                  className="text-5xl text-[#94A3B8]/50 transition-colors flex flex-col items-center gap-3 cursor-help interactive"
                >
                  <tech.icon />
                  <span className="text-xs font-mono opacity-0 transition-opacity duration-300 group-hover:opacity-100">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="py-32 relative bg-[#0F172A] border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: 120, label: "Projects Delivered", suffix: "+" },
                { number: 50, label: "Happy Clients", suffix: "+" },
                { number: 99, label: "Satisfaction", suffix: "%" },
                { number: 15, label: "Awards Won", suffix: "" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-8 rounded-3xl glass-card border-t border-[#6C63FF]/30 hover:bg-white/5 transition-colors"
                >
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2 flex items-center justify-center">
                    <AnimatedNumber end={stat.number} />{stat.suffix}
                  </div>
                  <div className="text-[#94A3B8] font-medium text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked <span className="text-[#06B6D4]">Questions</span></h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "How long does a typical project take?", a: "Most of our web design and development projects take between 4 to 8 weeks from discovery to launch, depending on the complexity and scope." },
                { q: "Do you offer ongoing support and maintenance?", a: "Yes, we offer comprehensive maintenance packages to ensure your website remains secure, up-to-date, and performs optimally post-launch." },
                { q: "What is your pricing structure?", a: "Our pricing is project-based. We provide customized quotes after a detailed discovery call to understand your specific needs and goals." },
                { q: "Will my website be mobile-friendly and SEO optimized?", a: "Absolutely. Mobile-first design and technical SEO best practices are baked into our development process from day one." },
                { q: "Can you help with branding and logo design as well?", a: "Yes, our creative team specializes in full brand identity design, including logos, typography, color palettes, and brand guidelines." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="glass-card border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#6C63FF]/50 transition-colors">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-[#6C63FF] hover:no-underline transition-colors py-6 interactive">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[#94A3B8] text-base pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 relative bg-[#0F172A] border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold mb-8">Let's build something <span className="text-gradient">amazing.</span></h2>
                <p className="text-xl text-[#94A3B8] mb-12">
                  Ready to take your digital presence to the next level? Fill out the form, and our team will get back to you within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-[#94A3B8]">
                    <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#22D3EE]"><FiMail /></div>
                    <span className="text-lg">hello@digitalshine.agency</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#94A3B8]">
                    <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#22D3EE]"><FiPhone /></div>
                    <span className="text-lg">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#94A3B8]">
                    <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-[#22D3EE]"><FiMapPin /></div>
                    <span className="text-lg">123 Creative Blvd, New York, NY</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/5">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#94A3B8]">Name</label>
                      <input type="text" className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors interactive" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#94A3B8]">Email</label>
                      <input type="email" className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors interactive" placeholder="john@company.com" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#94A3B8]">Company</label>
                      <input type="text" className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors interactive" placeholder="Company Inc." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#94A3B8]">Budget</label>
                      <select className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors interactive appearance-none">
                        <option>$10k - $25k</option>
                        <option>$25k - $50k</option>
                        <option>$50k - $100k</option>
                        <option>$100k+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#94A3B8]">Project Details</label>
                    <textarea rows={4} className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6C63FF] transition-colors resize-none interactive" placeholder="Tell us about your project goals..."></textarea>
                  </div>
                  
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all transform hover:-translate-y-1 interactive">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-16 bg-[#050816] border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#6C63FF] via-[#06B6D4] to-[#10B981]" />
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold tracking-tighter mb-6">
                <span className="text-white">DIGITAL</span>
                <span className="text-[#6C63FF]">SHINE</span>
              </div>
              <p className="text-[#94A3B8] max-w-sm mb-8 leading-relaxed">
                A premium creative agency building world-class digital experiences for ambitious businesses worldwide.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-[#6C63FF] hover:border-transparent transition-all interactive"><FiTwitter /></a>
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-[#6C63FF] hover:border-transparent transition-all interactive"><FiLinkedin /></a>
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-[#6C63FF] hover:border-transparent transition-all interactive"><FiInstagram /></a>
                <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:bg-[#6C63FF] hover:border-transparent transition-all interactive"><FiGithub /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-[#94A3B8]">
                <li><a href="#" className="hover:text-[#22D3EE] transition-colors interactive">Web Design</a></li>
                <li><a href="#" className="hover:text-[#22D3EE] transition-colors interactive">Development</a></li>
                <li><a href="#" className="hover:text-[#22D3EE] transition-colors interactive">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-[#22D3EE] transition-colors interactive">Branding</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-[#94A3B8]">
                <li><a href="#about" className="hover:text-[#22D3EE] transition-colors interactive">About Us</a></li>
                <li><a href="#work" className="hover:text-[#22D3EE] transition-colors interactive">Work</a></li>
                <li><a href="#process" className="hover:text-[#22D3EE] transition-colors interactive">Process</a></li>
                <li><a href="#contact" className="hover:text-[#22D3EE] transition-colors interactive">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#94A3B8]">
            <p>© {new Date().getFullYear()} Digital Shine Agency. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors interactive">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors interactive">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
