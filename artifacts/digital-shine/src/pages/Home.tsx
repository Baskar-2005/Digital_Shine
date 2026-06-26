import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiCode, FiLayout, FiMonitor, FiSearch, FiSmartphone, FiStar,
  FiCheckCircle, FiMail, FiMapPin, FiPhone, FiGithub, FiTwitter, FiLinkedin,
  FiInstagram, FiX, FiExternalLink, FiGlobe, FiUser, FiDollarSign, FiClock,
  FiMessageSquare, FiSend, FiLoader
} from 'react-icons/fi';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb,
  SiFirebase, SiFramer, SiGreensock, SiWordpress, SiFigma
} from 'react-icons/si';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Logo ──────────────────────────────────────────────────────────────────
const DiamondLogo = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 3L37 13V27L20 37L3 27V13L20 3Z" fill="rgba(108,99,255,0.12)" stroke="#6C63FF" strokeWidth="1.5"/>
    <path d="M20 9L31 15.5V24.5L20 31L9 24.5V15.5L20 9Z" fill="rgba(108,99,255,0.25)"/>
    <path d="M20 15L26 18.5V21.5L20 25L14 21.5V18.5L20 15Z" fill="#6C63FF"/>
    <line x1="20" y1="3" x2="20" y2="0.5" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="37" y1="13" x2="39.2" y2="11.7" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="37" y1="27" x2="39.2" y2="28.3" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="20" y1="37" x2="20" y2="39.5" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="27" x2="0.8" y2="28.3" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="13" x2="0.8" y2="11.7" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ─── Project Data ──────────────────────────────────────────────────────────
type Project = {
  id: number;
  title: string;
  tag: string;
  gradient: string;
  accentColor: string;
  shortDesc: string;
  fullDesc: string;
  budget: string;
  price: string;
  website: string;
  duration: string;
  result: string;
  tech: string[];
  owner: { name: string; company: string; role: string; avatar: string };
  feedback: { text: string; rating: number };
};

const projects: Project[] = [
  {
    id: 1,
    title: "BrandForge Rebrand",
    tag: "Identity & Web",
    gradient: "from-[#6C63FF] to-[#7C3AED]",
    accentColor: "#6C63FF",
    shortDesc: "Complete visual identity overhaul and marketing website for a leading B2B SaaS platform.",
    fullDesc: "BrandForge needed a complete reinvention of their digital identity. We redesigned their logo system, built a comprehensive brand style guide, and launched a new marketing website with a custom CMS. The result was a brand that finally matched the quality of their product.",
    budget: "$25k – $50k",
    price: "$38,500",
    website: "brandforge.io",
    duration: "8 weeks",
    result: "+45% conversion rate, 2× organic traffic in 90 days",
    tech: ["React", "Next.js", "Tailwind", "Figma", "Framer Motion"],
    owner: { name: "Alex Thompson", company: "BrandForge Inc.", role: "CEO & Founder", avatar: "AT" },
    feedback: { text: "Digital Shine didn't just redesign our website — they transformed how the world perceives our company. The attention to detail and strategic thinking was extraordinary. We saw ROI in the first month.", rating: 5 },
  },
  {
    id: 2,
    title: "LuxeCommerce Store",
    tag: "E-Commerce",
    gradient: "from-[#06B6D4] to-[#22D3EE]",
    accentColor: "#06B6D4",
    shortDesc: "Headless Shopify build for a luxury fashion brand with sub-second page loads.",
    fullDesc: "LuxeCommerce required an ultra-premium online shopping experience that matched their physical boutique stores. We built a headless Shopify storefront with custom 3D product previews, fluid transitions, and a bespoke checkout flow that increased average order value significantly.",
    budget: "$50k – $100k",
    price: "$67,000",
    website: "luxecommerce.com",
    duration: "12 weeks",
    result: "+68% average order value, 99+ Lighthouse score",
    tech: ["Next.js", "Shopify API", "TypeScript", "Tailwind", "GSAP"],
    owner: { name: "Marie Dubois", company: "LuxeCommerce", role: "Founder & Creative Director", avatar: "MD" },
    feedback: { text: "We had worked with three agencies before Digital Shine. None of them came close to this level of craft. Our customers constantly compliment the website experience — it's become part of our brand story.", rating: 5 },
  },
  {
    id: 3,
    title: "Nexus Dashboard",
    tag: "UI/UX Design",
    gradient: "from-[#10B981] to-[#059669]",
    accentColor: "#10B981",
    shortDesc: "Enterprise data visualization platform designed for clarity, power, and accessibility.",
    fullDesc: "Nexus needed a complex analytics dashboard that could handle millions of data points without sacrificing usability. We ran a 3-week discovery and research phase before designing a modular interface system that scales from a single analyst to an enterprise team of 500.",
    budget: "$25k – $50k",
    price: "$42,000",
    website: "nexusdash.io",
    duration: "10 weeks",
    result: "40% reduction in user onboarding time, 92% daily active user retention",
    tech: ["React", "TypeScript", "D3.js", "Figma", "Storybook"],
    owner: { name: "James Park", company: "Nexus Analytics", role: "CTO", avatar: "JP" },
    feedback: { text: "The design process was unlike anything I've experienced. They asked better questions than our own product team and delivered a system that we're genuinely proud to show enterprise clients.", rating: 5 },
  },
  {
    id: 4,
    title: "Velocity Mobile App",
    tag: "Mobile App",
    gradient: "from-[#F59E0B] to-[#EF4444]",
    accentColor: "#F59E0B",
    shortDesc: "React Native fitness tracking app with real-time coaching and social features.",
    fullDesc: "Velocity is a fitness app that needed to stand out in one of the most crowded app store categories. We designed and developed a React Native app with live workout tracking, AI-generated coaching plans, social challenges, and a beautiful achievement system that keeps users coming back.",
    budget: "$10k – $25k",
    price: "$21,000",
    website: "velocityapp.io",
    duration: "6 weeks",
    result: "4.9★ App Store rating, 50k downloads in first 30 days",
    tech: ["React Native", "TypeScript", "Firebase", "Node.js", "Figma"],
    owner: { name: "Sofia Martinez", company: "Velocity Fitness", role: "Product Lead", avatar: "SM" },
    feedback: { text: "They delivered in 6 weeks what I thought would take 6 months. The app looks and feels premium in every way. Our users regularly ask who designed it — now we proudly say Digital Shine.", rating: 5 },
  },
];

// ─── Loading Screen ────────────────────────────────────────────────────────
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(timer); setTimeout(onComplete, 500); return 100; }
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
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <DiamondLogo size={48} />
        <div className="text-4xl md:text-5xl font-black tracking-tighter flex overflow-hidden">
          <motion.span initial={{ y: 60 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="text-white">DIGITAL</motion.span>
          <motion.span initial={{ y: 60 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-[#6C63FF]">SHINE</motion.span>
        </div>
      </motion.div>
      <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-[#6C63FF] to-[#06B6D4]" style={{ width: `${progress}%` }} transition={{ duration: 0.05 }} />
      </div>
      <div className="mt-5 text-[#94A3B8] font-mono text-sm tracking-widest">{progress}%</div>
    </motion.div>
  );
};

// ─── Navbar ────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-3 bg-[#050816]/80 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'py-5 bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group" data-testid="link-logo">
          <DiamondLogo size={32} />
          <div className="text-xl font-black tracking-tighter">
            <span className="text-white">DIGITAL</span>
            <span className="text-[#6C63FF]">SHINE</span>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]">
          {['Services', 'Work', 'About', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group py-2" data-testid={`link-nav-${item.toLowerCase()}`}>
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-[#6C63FF] text-white hover:bg-[#7C3AED] transition-all duration-300 font-semibold shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_30px_rgba(108,99,255,0.5)]" data-testid="link-cta">
            Let's Talk
          </a>
        </div>
        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu">
          {mobileOpen ? <FiX size={24} /> : <div className="space-y-1.5"><span className="block w-6 h-0.5 bg-white" /><span className="block w-4 h-0.5 bg-white" /><span className="block w-5 h-0.5 bg-white" /></div>}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050816]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              {['Services', 'Work', 'About', 'Process', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block text-lg font-medium text-[#94A3B8] hover:text-white py-2 border-b border-white/5">
                  {item}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="block text-center mt-4 px-6 py-3 rounded-full bg-[#6C63FF] text-white font-semibold">
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ─── Floating CTA ──────────────────────────────────────────────────────────
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
        <motion.a href="#contact" initial={{ opacity: 0, scale: 0.5, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#6C63FF] text-white flex items-center justify-center z-40 shadow-[0_0_30px_rgba(108,99,255,0.5)] hover:bg-[#06B6D4] transition-colors group"
          data-testid="link-floating-cta">
          <FiMail className="text-xl group-hover:scale-110 transition-transform" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

// ─── Animated Number ───────────────────────────────────────────────────────
const AnimatedNumber = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) { setCount(end); clearInterval(timer); }
        else { setCount(Math.ceil(start)); }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);
  return <span ref={ref}>{count}</span>;
};

// ─── Project Modal ─────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#050816]/90 backdrop-blur-xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0F172A] border border-white/10 rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-project"
      >
        {/* Header gradient bar */}
        <div className={`h-2 w-full bg-gradient-to-r ${project.gradient} rounded-t-3xl`} />

        <div className="p-6 md:p-10">
          {/* Top row */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-[#06B6D4] mb-3">{project.tag}</span>
              <h2 className="text-2xl md:text-3xl font-bold">{project.title}</h2>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0" data-testid="button-close-modal">
              <FiX />
            </button>
          </div>

          <p className="text-[#94A3B8] text-base leading-relaxed mb-8">{project.fullDesc}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: FiDollarSign, label: "Budget Range", value: project.budget },
              { icon: FiDollarSign, label: "Project Price", value: project.price },
              { icon: FiClock, label: "Duration", value: project.duration },
              { icon: FiGlobe, label: "Website", value: project.website },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/5 rounded-2xl p-4">
                <stat.icon className="text-[#6C63FF] mb-2" />
                <div className="text-xs text-[#94A3B8] mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Result banner */}
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${project.gradient} bg-opacity-10 border border-white/10 mb-8`}>
            <div className="text-xs text-white/60 uppercase tracking-widest mb-1">Result Achieved</div>
            <div className="font-bold text-white">{project.result}</div>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <div className="text-xs text-[#94A3B8] uppercase tracking-widest mb-3">Technology Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-white/70">{t}</span>
              ))}
            </div>
          </div>

          {/* Owner & Feedback */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Owner */}
            <div className="bg-white/[0.04] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${project.gradient} flex items-center justify-center font-bold text-white text-sm`}>
                  {project.owner.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-[#6C63FF] text-xs" />
                    <span className="text-xs text-[#94A3B8]">Client</span>
                  </div>
                  <div className="font-semibold text-white">{project.owner.name}</div>
                  <div className="text-xs text-[#06B6D4]">{project.owner.role}, {project.owner.company}</div>
                </div>
              </div>
            </div>

            {/* Website link */}
            <a
              href={`https://${project.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gradient-to-br ${project.gradient} bg-opacity-10 border border-white/10 rounded-2xl p-5 flex items-center justify-between group hover:border-white/20 transition-colors`}
              data-testid={`link-project-website-${project.id}`}
            >
              <div>
                <div className="text-xs text-white/60 mb-1">Live Website</div>
                <div className="font-semibold text-white">{project.website}</div>
              </div>
              <FiExternalLink className="text-white/40 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Feedback */}
          <div className="mt-6 bg-white/[0.03] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: project.feedback.rating }).map((_, i) => (
                <FiStar key={i} className="text-[#F59E0B] fill-current text-sm" />
              ))}
              <span className="text-xs text-[#94A3B8] ml-2">Client Feedback</span>
            </div>
            <FiMessageSquare className="text-[#6C63FF]/40 text-2xl mb-2" />
            <p className="text-white/80 italic leading-relaxed">"{project.feedback.text}"</p>
            <div className="mt-3 text-sm font-medium text-[#94A3B8]">— {project.owner.name}, {project.owner.company}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Contact Form ──────────────────────────────────────────────────────────
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', budget: '$10k – $25k', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to send');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', budget: '$10k – $25k', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClass = "w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/30 transition-all text-sm";

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-20 space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center">
          <FiCheckCircle className="text-[#10B981] text-3xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
          <p className="text-[#94A3B8]">We'll get back to you within 24 hours.</p>
        </div>
        <button onClick={() => setStatus('idle')} className="px-6 py-2.5 rounded-full border border-white/10 text-sm text-[#94A3B8] hover:text-white hover:border-white/30 transition-colors" data-testid="button-send-another">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required type="text" className={inputClass} placeholder="John Doe" data-testid="input-name" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Email *</label>
          <input name="email" value={form.email} onChange={handleChange} required type="email" className={inputClass} placeholder="john@company.com" data-testid="input-email" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} type="tel" className={inputClass} placeholder="+1 (555) 000-0000" data-testid="input-phone" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Company</label>
          <input name="company" value={form.company} onChange={handleChange} type="text" className={inputClass} placeholder="Company Inc." data-testid="input-company" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Budget Range</label>
        <select name="budget" value={form.budget} onChange={handleChange} className={`${inputClass} cursor-pointer`} data-testid="select-budget">
          <option>$10k – $25k</option>
          <option>$25k – $50k</option>
          <option>$50k – $100k</option>
          <option>$100k+</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">Project Details *</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about your project goals, timeline, and any specific requirements..." data-testid="textarea-message" />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] text-white font-bold text-base hover:shadow-[0_0_25px_rgba(108,99,255,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        data-testid="button-submit"
      >
        {status === 'sending' ? (
          <><FiLoader className="animate-spin" /> Sending...</>
        ) : (
          <><FiSend /> Send Message</>
        )}
      </button>
    </form>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <LoadingScreen onComplete={() => setLoading(false)} />
      </AnimatePresence>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050816] text-white overflow-x-hidden selection:bg-[#6C63FF] selection:text-white font-sans">
      <Navbar />
      <FloatingCTA />

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6C63FF] via-[#06B6D4] to-[#22D3EE] origin-left z-50" style={{ scaleX }} />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-30 mix-blend-screen" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(108,99,255,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.12) 0%, transparent 60%)' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Orbs */}
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#6C63FF]/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] bg-[#06B6D4]/15 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/30 text-[#22D3EE] text-sm font-medium mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3EE] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE]" />
                </span>
                Award-Winning Creative Agency
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                We Build<br />
                <span className="relative inline-block">
                  Digital
                  <span className="absolute -inset-1 bg-gradient-to-r from-[#6C63FF]/20 to-[#06B6D4]/20 blur-xl rounded-xl" />
                </span>{' '}
                Experiences<br />
                That{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#06B6D4] to-[#22D3EE]">Shine.</span>
                  <motion.span
                    className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#6C63FF] to-[#06B6D4]"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >Shine.</motion.span>
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-[#94A3B8] mb-10 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We create modern websites, stunning brands, high-converting UI/UX and powerful digital experiences that help businesses grow.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-4 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <a href="#contact" className="px-7 py-3.5 rounded-full bg-[#6C63FF] text-white font-semibold hover:bg-[#7C3AED] hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all flex items-center gap-2 group" data-testid="link-hero-start">
                  Start Your Project <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#work" className="px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all" data-testid="link-hero-work">
                  View Our Work
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex flex-wrap items-center gap-6 text-sm text-[#94A3B8]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="flex items-center gap-2"><FiCheckCircle className="text-[#10B981]" /><span>100+ Projects Delivered</span></div>
                <div className="flex items-center gap-2"><FiStar className="text-[#F59E0B] fill-current" /><span>5.0 Average Rating</span></div>
                <div className="flex items-center gap-2"><FiCheckCircle className="text-[#10B981]" /><span>99% Client Satisfaction</span></div>
              </motion.div>
            </div>

            {/* Right — floating cards */}
            <div className="hidden lg:block relative h-[520px]">
              <motion.div
                className="absolute right-4 top-8 w-64 bg-[#0F172A]/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-emerald-700 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    <FiCheckCircle className="text-sm" />
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8]">Conversion Rate</div>
                    <div className="text-xl font-bold">+124%</div>
                  </div>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#10B981] rounded-full" initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1.5, delay: 0.5 }} />
                </div>
              </motion.div>

              <motion.div
                className="absolute left-4 top-1/3 w-60 bg-[#0F172A]/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#7C3AED] flex items-center justify-center shadow-[0_0_15px_rgba(108,99,255,0.4)]">
                    <FiStar className="text-sm" />
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8]">Client Rating</div>
                    <div className="text-xl font-bold">5.0 / 5.0</div>
                  </div>
                </div>
                <div className="flex gap-0.5 text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, i) => <FiStar key={i} className="fill-current text-sm" />)}
                </div>
              </motion.div>

              <motion.div
                className="absolute right-8 bottom-16 w-56 bg-[#0F172A]/90 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <div className="text-xs text-[#94A3B8] mb-2">Projects Launched</div>
                <div className="text-2xl font-bold mb-1">100+</div>
                <div className="flex gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div key={i} className="flex-1 h-6 rounded-sm bg-[#6C63FF]"
                      initial={{ scaleY: 0 }} animate={{ scaleY: [0.3, 1, 0.6, 0.9, 0.4, 0.8, 0.5, 1][i] }}
                      transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                      style={{ transformOrigin: 'bottom' }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
        <div className="py-10 border-y border-white/5 bg-[#0F172A]/50 backdrop-blur-md overflow-hidden flex relative">
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-16 items-center whitespace-nowrap px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {['STRIPE', 'LINEAR', 'VERCEL', 'RAYCAST', 'FRAMER', 'FIGMA', 'NOTION', 'DISCORD', 'SHOPIFY', 'ATLASSIAN'].map((logo, j) => (
                  <span key={j} className="text-2xl md:text-3xl font-black text-white/15 tracking-widest hover:text-white/40 transition-colors cursor-default">{logo}</span>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
        <section id="about" className="py-28 relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
                <div className="text-[#06B6D4] font-mono text-xs tracking-widest uppercase mb-4">Who We Are</div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">We blend <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#06B6D4]">creative vision</span> with technical excellence.</h2>
                <p className="text-lg text-[#94A3B8] mb-6 leading-relaxed">
                  Digital Shine isn't just another agency. We are a collective of designers, developers, and strategists obsessed with pushing the boundaries of what's possible on the web.
                </p>
                <p className="text-lg text-[#94A3B8] mb-10 leading-relaxed">
                  Since our inception, we've helped ambitious startups and established enterprises transform their digital presence, resulting in measurable growth and unforgettable brand experiences.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div><div className="text-4xl font-bold text-white mb-2"><AnimatedNumber end={10} />+</div><div className="text-[#94A3B8]">Years Experience</div></div>
                  <div><div className="text-4xl font-bold text-white mb-2"><AnimatedNumber end={50} />+</div><div className="text-[#94A3B8]">Industry Awards</div></div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                className="relative aspect-square rounded-3xl overflow-hidden bg-[#0F172A] border border-white/5 p-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/20 to-[#06B6D4]/20 mix-blend-overlay z-10" />
                <div className="w-full h-full bg-[#0F172A] rounded-2xl relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-1000" />
                  <div className="relative z-20"><DiamondLogo size={64} /></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section id="services" className="py-28 relative bg-[#0F172A] border-y border-white/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(108,99,255,0.08)_0%,_transparent_70%)] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <div className="text-[#6C63FF] font-mono text-xs tracking-widest uppercase mb-4">Our Expertise</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#06B6D4]">Services</span></h2>
              <p className="text-lg text-[#94A3B8]">End-to-end digital solutions designed for performance, aesthetics, and scale.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: FiMonitor, title: "Website Design", desc: "Award-winning visuals that capture attention and drive action." },
                { icon: FiCode, title: "Web Development", desc: "Lightning-fast, scalable, and secure technical implementations." },
                { icon: FiLayout, title: "UI/UX Design", desc: "Intuitive interfaces crafted for maximum user retention." },
                { icon: FiStar, title: "Brand Identity", desc: "Memorable brand systems that stand out in crowded markets." },
                { icon: FiSearch, title: "SEO Optimization", desc: "Data-driven strategies to dominate organic search rankings." },
                { icon: FiSmartphone, title: "Mobile Apps", desc: "Native-feeling apps for iOS and Android platforms." },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/[0.03] border border-white/5 p-7 rounded-2xl group hover:bg-white/[0.06] hover:border-[#6C63FF]/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 text-[#22D3EE] flex items-center justify-center text-xl mb-6 group-hover:bg-[#6C63FF] group-hover:text-white transition-all shadow-inner">
                    <service.icon />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
        <section id="work" className="py-28 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <div className="text-[#06B6D4] font-mono text-xs tracking-widest uppercase mb-4">Selected Portfolio</div>
                <h2 className="text-4xl md:text-5xl font-bold">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#06B6D4]">Work</span></h2>
              </div>
              <p className="text-[#94A3B8] max-w-xs text-sm">Click any project to view full details, budget, and client feedback.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-[#0F172A] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
                  data-testid={`card-project-${project.id}`}
                >
                  {/* Project visual */}
                  <div className={`relative w-full aspect-video bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/10 font-black text-6xl md:text-7xl tracking-tighter group-hover:text-white/20 transition-colors duration-500">
                        {project.title.split(' ')[0].toUpperCase()}
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#050816]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center backdrop-blur-sm">
                      <span className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                        View Full Details <FiArrowRight />
                      </span>
                    </div>
                    {/* Tag badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-xs font-mono text-white/80">{project.tag}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#6C63FF] transition-colors">{project.title}</h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">{project.shortDesc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {project.tech.slice(0, 3).map((t, j) => (
                          <span key={j} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-white/50 font-mono">{t}</span>
                        ))}
                        {project.tech.length > 3 && <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-white/50">+{project.tech.length - 3}</span>}
                      </div>
                      <span className="text-xs text-[#94A3B8] flex items-center gap-1"><FiClock className="text-[#6C63FF]" />{project.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ──────────────────────────────────────────────────────── */}
        <section id="process" className="py-28 relative bg-[#0F172A] border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our <span className="text-[#6C63FF]">Process</span></h2>
              <p className="text-lg text-[#94A3B8]">A proven methodology that guarantees results, delivered on time.</p>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#6C63FF]/50 to-transparent -translate-x-1/2" />
              {[
                { step: "01", title: "Discovery", desc: "Deep-dive into your business goals, audience, and competitive landscape." },
                { step: "02", title: "Strategy", desc: "Developing a comprehensive roadmap for design, content, and technology." },
                { step: "03", title: "Design", desc: "Creating wireframes, visual concepts, and interactive prototypes." },
                { step: "04", title: "Development", desc: "Clean, scalable, performant code bringing the design to life." },
                { step: "05", title: "Launch", desc: "Rigorous QA testing followed by a seamless deployment to production." },
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row gap-6 items-center mb-14 last:mb-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white/[0.03] border border-white/5 p-7 rounded-2xl inline-block w-full max-w-sm hover:border-[#06B6D4]/30 transition-colors">
                      <div className="text-[#06B6D4] font-mono text-sm mb-2">Phase {phase.step}</div>
                      <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                      <p className="text-[#94A3B8] text-sm leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex relative z-10 w-12 h-12 rounded-full bg-[#050816] border-2 border-[#6C63FF] items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(108,99,255,0.3)] flex-shrink-0">
                    {phase.step}
                  </div>
                  <div className="w-full md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#06B6D4]">Choose Us</span></h2>
              <p className="text-lg text-[#94A3B8]">We don't just build websites — we build businesses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Fast Delivery", icon: FiCheckCircle }, { title: "Modern Design", icon: FiLayout },
                { title: "SEO Ready", icon: FiSearch }, { title: "Responsive", icon: FiSmartphone },
                { title: "Performance", icon: FiMonitor }, { title: "Creative Team", icon: FiStar },
                { title: "Affordable", icon: FiDollarSign }, { title: "Client Support", icon: FiPhone },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/[0.06] hover:border-[#6C63FF]/40 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center group-hover:bg-[#6C63FF] group-hover:text-white transition-colors flex-shrink-0">
                    <item.icon />
                  </div>
                  <div className="font-semibold">{item.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
        <section className="py-28 relative overflow-hidden bg-[#0F172A] border-y border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C63FF]/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Client <span className="text-[#22D3EE]">Love</span></h2>
              <p className="text-lg text-[#94A3B8]">Don't just take our word for it.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { img: "/avatar1.png", name: "Sarah Jenkins", role: "CEO, TechFlow", text: "Digital Shine completely transformed our brand. The new website has increased our inbound leads by over 200%. True professionals." },
                { img: "/avatar2.png", name: "Marcus Chen", role: "Founder, Luxe", text: "The attention to detail is unmatched. They don't just build websites — they craft digital experiences that leave a lasting impression." },
                { img: "/avatar3.png", name: "Elena Rodriguez", role: "CMO, GrowthSync", text: "The best investment we made this year. The speed, quality, and strategic thinking they brought to the table was incredible." },
              ].map((testimonial, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="bg-white/[0.03] border border-white/5 p-7 rounded-2xl relative hover:-translate-y-1 transition-transform duration-300 group hover:border-white/10">
                  <div className="flex gap-1 text-[#F59E0B] mb-5">
                    {Array.from({ length: 5 }).map((_, j) => <FiStar key={j} className="fill-current text-sm" />)}
                  </div>
                  <p className="text-white/80 mb-7 leading-relaxed text-sm">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#6C63FF]/30" />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-[#06B6D4]">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGIES ─────────────────────────────────────────────────── */}
        <section className="py-20 relative border-b border-white/5">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-sm font-mono text-[#94A3B8] tracking-widest uppercase mb-10">Powered by Modern Technology</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-14">
              {[
                { icon: SiReact, name: "React" }, { icon: SiNextdotjs, name: "Next.js" },
                { icon: SiTypescript, name: "TypeScript" }, { icon: SiTailwindcss, name: "Tailwind" },
                { icon: SiNodedotjs, name: "Node.js" }, { icon: SiFramer, name: "Framer" },
                { icon: SiMongodb, name: "MongoDB" }, { icon: SiFigma, name: "Figma" },
              ].map((tech, i) => (
                <motion.div key={i} whileHover={{ scale: 1.15, color: "#ffffff" }} className="text-4xl text-[#94A3B8]/30 flex flex-col items-center gap-2 group cursor-default">
                  <tech.icon />
                  <span className="text-xs font-mono text-[#94A3B8]/50 group-hover:text-[#94A3B8] transition-colors">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATISTICS ───────────────────────────────────────────────────── */}
        <section className="py-28 relative bg-[#0F172A] border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: 120, label: "Projects Delivered", suffix: "+" },
                { number: 50, label: "Happy Clients", suffix: "+" },
                { number: 99, label: "Satisfaction Rate", suffix: "%" },
                { number: 15, label: "Awards Won", suffix: "" },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/5 border-t-[#6C63FF]/30 hover:bg-white/[0.05] transition-colors" style={{ borderTopColor: 'rgba(108,99,255,0.3)', borderTopWidth: '2px' }}>
                  <div className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center">
                    <AnimatedNumber end={stat.number} />{stat.suffix}
                  </div>
                  <div className="text-[#94A3B8] text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-28 relative">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="mb-14 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked <span className="text-[#06B6D4]">Questions</span></h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "How long does a typical project take?", a: "Most of our projects take between 4 to 8 weeks from discovery to launch, depending on complexity and scope." },
                { q: "Do you offer ongoing support and maintenance?", a: "Yes, we offer comprehensive maintenance packages to ensure your website remains secure, up-to-date, and performs optimally post-launch." },
                { q: "What is your pricing structure?", a: "Our pricing is project-based. We provide customized quotes after a discovery call to understand your specific needs and goals." },
                { q: "Will my website be mobile-friendly and SEO optimized?", a: "Absolutely. Mobile-first design and technical SEO best practices are baked into our development process from day one." },
                { q: "Can you help with branding and logo design?", a: "Yes, our creative team specializes in full brand identity design, including logos, typography, color palettes, and brand guidelines." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white/[0.03] border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#6C63FF]/40 transition-colors">
                  <AccordionTrigger className="text-left font-semibold hover:text-[#6C63FF] hover:no-underline transition-colors py-5 text-sm md:text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[#94A3B8] text-sm pb-5 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────────── */}
        <section id="contact" className="py-28 relative bg-[#0F172A] border-t border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6C63FF]/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <div className="text-[#06B6D4] font-mono text-xs tracking-widest uppercase mb-4">Get In Touch</div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#06B6D4]">amazing.</span></h2>
                <p className="text-lg text-[#94A3B8] mb-10 leading-relaxed">
                  Ready to take your digital presence to the next level? Fill out the form and our team will get back to you within 24 hours.
                </p>
                <div className="space-y-5 mb-10">
                  {[
                    { icon: FiMail, text: "hello@digitalshine.agency" },
                    { icon: FiPhone, text: "+1 (555) 123-4567" },
                    { icon: FiMapPin, text: "123 Creative Blvd, New York, NY" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-[#94A3B8]">
                      <div className="w-11 h-11 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-[#22D3EE] flex-shrink-0">
                        <item.icon />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: FiTwitter, href: "#" }, { icon: FiLinkedin, href: "#" },
                    { icon: FiInstagram, href: "#" }, { icon: FiGithub, href: "#" },
                  ].map((social, i) => (
                    <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#6C63FF] hover:border-[#6C63FF] transition-all">
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/5 p-7 md:p-10 rounded-2xl">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-14 bg-[#050816] border-t border-white/8 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6C63FF] via-[#06B6D4] to-[#10B981]" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-3 mb-5">
                <DiamondLogo size={28} />
                <div className="text-xl font-black tracking-tighter">
                  <span className="text-white">DIGITAL</span><span className="text-[#6C63FF]">SHINE</span>
                </div>
              </a>
              <p className="text-[#94A3B8] text-sm max-w-xs mb-6 leading-relaxed">
                A premium creative agency building world-class digital experiences for ambitious businesses worldwide.
              </p>
              <div className="flex gap-3">
                {[FiTwitter, FiLinkedin, FiInstagram, FiGithub].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#6C63FF] hover:border-[#6C63FF] transition-all text-sm">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-5 uppercase tracking-wider">Services</h4>
              <ul className="space-y-3 text-[#94A3B8] text-sm">
                {['Web Design', 'Development', 'UI/UX Design', 'Branding', 'SEO'].map((s, i) => (
                  <li key={i}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-5 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-[#94A3B8] text-sm">
                {[['About Us', '#about'], ['Work', '#work'], ['Process', '#process'], ['Contact', '#contact']].map(([label, href], i) => (
                  <li key={i}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#94A3B8]">
            <p>© {new Date().getFullYear()} Digital Shine Agency. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
