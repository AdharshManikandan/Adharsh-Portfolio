import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Mail, Download, ArrowUpRight, Plane, Cpu, Code2, Network, Wrench,
  GraduationCap, Briefcase, Linkedin, Github, Instagram, ArrowDown,
  Images, ZoomIn, Copy, Check,
} from "lucide-react";
import ScrollIndicator from "@/components/ScrollIndicator";
import portrait from "@/assets/portrait.jpg";
import projBigData from "@/assets/project-bigdata.jpg";
import projAbalone from "@/assets/project-abalone.jpg";
import projAgri from "@/assets/project-agrichain.jpg";
import projCisco from "@/assets/cisco thumbnail.jpeg";
import proswap from "@/assets/Ticket-swap.png";
import proenergy from "@/assets/project-enery.jpeg";
import galAeroplane from "@/assets/gallery/Aeroplane.jpeg";
import galCourseCompletionPic from "@/assets/gallery/course completion pic.jpeg";
import galCourseCompletion from "@/assets/gallery/course completion.jpeg";
import galDreamFly from "@/assets/gallery/dream fly.jpeg";
import galGroupPhoto from "@/assets/gallery/group photo.jpeg";
import galImages from "@/assets/gallery/images.jpeg";
import galIntiBag from "@/assets/gallery/INTI bag.jpeg";
import galIntiImage from "@/assets/gallery/inti image.jpeg";
import galIntiNote from "@/assets/gallery/inti note.jpeg";
import galInti from "@/assets/gallery/inti.jpeg";
import galPilot from "@/assets/gallery/pilot.jpeg";
import galSimulator2 from "@/assets/gallery/simulator 2.jpeg";
import galSimulator from "@/assets/gallery/simulator.jpeg";

export const Route = createFileRoute("/")({ component: Portfolio });

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

// ── Intro overlay ─────────────────────────────────────────────────────────
function IntroOverlay({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-black"
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-px w-[65vw] max-w-[820px] origin-left bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent shadow-[0_0_20px_oklch(0.72_0.19_46/0.85)]"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-full border border-primary/40 bg-black/70 px-6 py-3 text-xs uppercase tracking-[0.5em] text-primary backdrop-blur-md"
          >
            ADHARSH
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Particles ──────────────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {particles.map((i) => (
        <span key={i} className="absolute block rounded-full bg-primary/40"
          style={{
            width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
            left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`,
            animation: `float-particle ${8 + (i % 6)}s ease-in-out ${i * 0.3}s infinite`,
          }} />
      ))}
    </div>
  );
}

// ── Typing animation ────────────────────────────────────────────────────────
function useTyping(words: string[], speed = 90, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!deleting && text === current) { setTimeout(() => setDeleting(true), pause); return; }
      if (deleting && text === "") { setDeleting(false); setWordIdx((i) => (i + 1) % words.length); return; }
      setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, speed, pause]);
  return text;
}

// ── Counter ─────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1400;
          const step = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            setVal(Math.floor(p * to));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Marquee ticker ──────────────────────────────────────────────────────────
const TICKER_ITEMS = ["ENGINEER","AVIATOR","DEVELOPER","CCNA","ML","BLOCKCHAIN","ASPIRING PILOT","OPEN TO WORK"];
function Marquee() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-primary/5 py-3 my-2">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-display text-sm tracking-[0.2em] text-primary/70">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Skill bar ───────────────────────────────────────────────────────────────
function SkillBar({ label, pct, delay = 0 }: { label: string; pct: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-primary">{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: go ? `${pct}%` : 0 }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ── Ripple button wrapper ───────────────────────────────────────────────────
function RippleBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { x: e.clientX - r.left, y: e.clientY - r.top, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((rp) => rp.id !== id)), 700);
  };
  return (
    <div className={`relative overflow-hidden ${className}`} onMouseDown={handleClick}>
      {ripples.map((rp) => (
        <span key={rp.id} className="pointer-events-none absolute block rounded-full bg-primary/20 animate-ping"
          style={{ left: rp.x - 30, top: rp.y - 30, width: 60, height: 60 }} />
      ))}
      {children}
    </div>
  );
}

// ── Copy email ──────────────────────────────────────────────────────────────
function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [email]);
  return (
    <RippleBox className="card-hover flex items-center justify-between rounded-2xl border border-white/10 bg-background/40 p-6 w-full">
      <a href={`mailto:${email}`} className="flex-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
        <p className="mt-1 font-display text-2xl">{email}</p>
      </a>
      <button onClick={copy} aria-label="Copy email"
        className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-primary hover:text-primary">
        <AnimatePresence mode="wait">
          {copied
            ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="h-4 w-4 text-primary" /></motion.span>
            : <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy className="h-4 w-4" /></motion.span>
          }
        </AnimatePresence>
      </button>
      {copied && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
          Copied!
        </motion.div>
      )}
    </RippleBox>
  );
}

// ── Story chapters for the gallery ─────────────────────────────────────────
const JOURNEY_CHAPTERS = [
  {
    title: "A Moment of Inspiration",
    year: "2026",
    location: "Kochi",
    image: galPilot,
    narrative: "This was the first chapter of a relationship with ambition — one built on curiosity, discipline, and the quiet decision to pursue something bigger than comfort.",
  },
  {
    title: "Engineering Life",
    year: "2025 — 2026",
    location: "INTI International University · Malaysia",
    image: galIntiImage,
    narrative: "Engineering gave me structure. It taught me how to think in systems, solve real problems, and turn concepts into outcomes through persistence and intention.",
  },
  {
    title: "Building Projects",
    year: "2025",
    location: "Project Work",
    image: galCourseCompletionPic,
    narrative: "Every project became a checkpoint in my growth — a place where technical thinking met practical execution, and where ideas started to become evidence.",
  },
  {
    title: "Events & Leadership",
    year: "2025",
    location: "INTI · Malaysia",
    image: galGroupPhoto,
    narrative: "Exposure to new environments sharpened my ability to lead, adapt, and collaborate. These moments reminded me that growth often begins in shared experiences.",
  },
  {
    title: "International Experience",
    year: "2025",
    location: "Malaysia",
    image: galInti,
    narrative: "Stepping into a new country brought perspective. It made ambition more global and helped me understand how much discipline, curiosity, and openness matter.",
  },
  {
    title: "Aviation Dream",
    year: "Current Chapter",
    location: "Aviation Horizon",
    image: galAeroplane,
    narrative: "The dream is no longer abstract. It is becoming a deliberate path — one shaped by focus, preparation, and the confidence to reach beyond the ordinary.",
  },
  {
    title: "The Next Destination",
    year: "Ahead",
    location: "Commercial Pilot Career",
    image: galDreamFly,
    narrative: "This next chapter is the most meaningful one yet: a future defined by precision, professionalism, and the courage to keep pushing toward the sky.",
  },
] as const;

function GallerySection() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const featuredChapter = JOURNEY_CHAPTERS[hoveredIndex ?? activeChapter];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveChapter((current) => (current + 1) % JOURNEY_CHAPTERS.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div {...fadeUp} className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <motion.button
        type="button"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          setTilt({ rotateX: y * -5, rotateY: x * 7 });
        }}
        onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
        style={{ transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)` }}
        className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-card/60 text-left shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:border-primary/60"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredChapter.title}
            initial={{ opacity: 0, x: -18, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 18, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={featuredChapter.image} alt={featuredChapter.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-primary">
                <span className="h-px w-8 bg-primary/70" />
                Journey Through the Lens
              </div>
              <p className="font-display text-3xl sm:text-4xl">{featuredChapter.title}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border border-primary/40 px-2.5 py-1 text-primary">{featuredChapter.year}</span>
                <span>{featuredChapter.location}</span>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/90">{featuredChapter.narrative}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 auto-rows-fr">
        {JOURNEY_CHAPTERS.map((chapter, i) => (
          <motion.button
            key={chapter.title}
            type="button"
            onMouseEnter={() => {
              setHoveredIndex(i);
              setActiveChapter(i);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveChapter(i)}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card/60 text-left transition-all ${
              activeChapter === i ? "border-primary/60" : "border-white/10"
            }`}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={chapter.image} alt={chapter.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex h-full flex-col p-3.5">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-xl text-foreground">{chapter.title}</p>
                <span className="rounded-full border border-primary/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-primary">{chapter.year}</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{chapter.location}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ── Section wrapper ─────────────────────────────────────────────────────────
function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <motion.div {...fadeUp} className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">{kicker}</p>
            <h2 className="mt-2 font-display text-6xl sm:text-7xl md:text-8xl">{title}</h2>
          </div>
          <div className="hidden h-px flex-1 bg-white/10 sm:block" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}

// ── Projects data ───────────────────────────────────────────────────────────
const PROJECTS = [
  { img: projAgri,    title: "AgriChain",                    tag: "Blockchain",    filter: "Blockchain",  stack: ["Solidity","Web3","Node"],                    desc: "Transparent agriculture supply chain using immutable ledgers — provenance from farm to consumer.",                                                                url: "https://agrichain-f9d47.web.app" },
  { img: proswap,     title: "Ticket-Swap-India",            tag: "Web Dev",       filter: "Web",         stack: ["React","Node.js","Web3.js"],                  desc: "Turn unused travel tickets into cash by connecting with travelers looking for last-minute bookings.",                                                       url: "https://ticket-swap-india.lovable.app/" },
  { img: projCisco,   title: "TechVille College Network",    tag: "Networking",    filter: "Networking",  stack: ["Cisco Packet Tracer","CCNA","TCP/IP"],        desc: "Hierarchical campus network design for TechVille College — secure routing, switching, and scalable multi-department connectivity.",                         url: "https://github.com/AdharshManikandan/Cisco-Networking-project" },
  { img: projBigData, title: "Big Data Demand Forecasting",  tag: "ML",            filter: "ML",          stack: ["Python","Pandas","Scikit-learn"],             desc: "Predictive demand modelling on large-scale retail data, surfacing seasonality patterns and anomaly signals.",                                               url: "https://github.com/AdharshManikandan/Product-Demand-Forecasting" },
  { img: projAbalone, title: "Abalone Age Prediction",       tag: "Deep Learning", filter: "ML",          stack: ["PyTorch","NumPy"],                            desc: "Regression neural network estimating abalone age from morphometric features with tuned loss landscapes.",                                                  url: "https://github.com/AdharshManikandan/Abalone-Age-Prediction" },
  { img: proenergy,   title: "Appliances Energy Prediction", tag: "ML",            filter: "ML",          stack: ["Python","Pandas","Scikit-learn"],             desc: "Predicting smart home appliance energy consumption using machine learning with seasonality, occupancy features, and model comparison.",                  url: "https://github.com/AdharshManikandan/Energy-Prediction" },
];
const PROJECT_FILTERS = ["All","Web","ML","Blockchain","Networking"] as const;
type FilterType = typeof PROJECT_FILTERS[number];

const SOFT_SKILLS = [
  { name: "Problem Solving", detail: "Turning complex challenges into clear, structured solutions with consistency and precision." },
  { name: "Leadership", detail: "Guiding teams with responsibility, communication, and a calm decision-making mindset." },
  { name: "Adaptability", detail: "Adjusting quickly to new environments, changing requirements, and fast-moving priorities." },
  { name: "Critical Thinking", detail: "Evaluating situations from multiple angles before acting with confidence." },
  { name: "Time Management", detail: "Balancing priorities effectively while staying focused on meaningful outcomes." },
  { name: "Continuous Learning", detail: "Building new knowledge continuously and applying it to real-world growth." },
  { name: "Teamwork", detail: "Collaborating openly, supporting others, and delivering stronger results together." },
] as const;

const JOURNEY_STEPS = [
  { step: "Computer Science", short: "Technical foundation", description: "Building a strong engineering base in software, systems thinking, and problem solving." },
  { step: "Technology", short: "Practical building", description: "Applying technology to real products, automation, and modern digital workflows." },
  { step: "Artificial Intelligence", short: "Intelligent systems", description: "Exploring AI-driven solutions, data patterns, and machine-led decision support." },
  { step: "Commercial Pilot Training", short: "Aviation focus", description: "Turning ambition into disciplined flight training, navigation, and aviation professionalism." },
  { step: "Professional Pilot", short: "Long-term goal", description: "Earning the precision, leadership, and situational awareness required for a career in aviation." },
] as const;

// ── Main Portfolio component ────────────────────────────────────────────────
function Portfolio() {
  const typed = useTyping(["PORTFOLIO", "ENGINEER", "AVIATOR"], 110);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [projectFilter, setProjectFilter] = useState<FilterType>("All");
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeSoftSkill, setActiveSoftSkill] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setShowIntro(false), 1000);
    const onScroll = () => setIsScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(introTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // parallax on portrait
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  const filteredProjects = projectFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.filter === projectFilter);

  return (
    <div className="grain-bg min-h-screen text-foreground transition-opacity duration-700" style={{ opacity: showIntro ? 0 : 1 }}>
      <Particles />
      <ScrollIndicator />
      <IntroOverlay show={showIntro} />

      {/* scroll progress bar */}
      <motion.div style={{ width: progress }} className="fixed left-0 top-0 z-50 h-[2px] bg-primary origin-left" />

      {/* NAV */}
      <header className="fixed top-4 left-1/2 z-40 -translate-x-1/2 w-[min(96%,1200px)]">
        <nav className={`flex items-center justify-between rounded-full border px-5 py-3 backdrop-blur-2xl transition-all duration-300 ${isScrolled ? "border-primary/40 bg-background/75 shadow-[0_0_24px_oklch(0.72_0.19_46/0.18)]" : "border-white/10 bg-background/60"}`}>
          <a href="#top" className="font-display text-lg tracking-wider text-primary">
            ADHARSH<span className="text-foreground">.</span>
          </a>
          <div className="hidden gap-6 text-sm md:flex">
            {["About","Education","Skills","Projects","Journey","Gallery","Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="transition-colors text-muted-foreground hover:text-primary">
                {l}
              </a>
            ))}
          </div>
          <a href="#contact" className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105">
            Get in touch
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative px-4 pt-32 pb-4 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp} className="rounded-3xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm sm:p-10 md:p-14" animate={showIntro ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}>
            <div className="mb-8 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span>Updated</span>
              <span>Adharsh · Portfolio</span>
            </div>
            <div className="flex flex-wrap items-start gap-4">
              <h1 className="font-display text-[19vw] leading-[0.82] tracking-tighter text-foreground sm:text-[15vw] md:text-[13vw] lg:text-[180px]">
                {typed}
                <span className="ml-1 inline-block w-[0.08em] translate-y-[0.02em] bg-primary align-middle"
                  style={{ height: "0.75em", animation: "blink-caret 1s step-end infinite" }} />
              </h1>
              <span className="mt-3 rounded-md bg-primary px-3 py-1 font-display text-2xl text-primary-foreground sm:text-3xl">2027</span>
            </div>
            <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Computer Science Engineer · Future Commercial Pilot</p>
                <p className="mt-2 text-sm text-muted-foreground">From compilers to cockpits — building precision through code and flight.</p>
              </div>
              <div className="flex gap-6 text-xs text-muted-foreground">
                <div><div className="font-display text-3xl text-foreground"><Counter to={6} />+</div>Projects</div>
                <div><div className="font-display text-3xl text-foreground"><Counter to={2} /></div>Countries</div>
                <div><div className="font-display text-3xl text-primary"><Counter to={2027} /></div>Class of</div>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-6 flex flex-col gap-2 px-2 text-xs text-muted-foreground sm:flex-row sm:justify-between">
            <div>
              <span className="font-semibold text-primary">Adharsh</span> · Personal Portfolio
              <p>This portfolio contains a curated selection of my work and journey.</p>
            </div>
            <div className="sm:text-right">
              <p>Text set in Anton & Inter</p>
              <p>© 2027 · All rights reserved</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <Marquee />

      {/* ABOUT */}
      <section id="about" className="px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-12">
          <motion.div {...fadeUp} className="relative lg:col-span-5"
            onMouseMove={(e) => { const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width - 0.5) * 20); my.set(((e.clientY - r.top) / r.height - 0.5) * 20); }}
            onMouseLeave={() => { mx.set(0); my.set(0); }}>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-card">
              <motion.img src={portrait} alt="Adharsh Manikandan Kumari Bindhu portrait" width={1024} height={1024} loading="lazy"
                style={{ x: px, y: py, scale: 1.08 }} className="h-full w-full object-cover grayscale contrast-110" />
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-primary/40 bg-background/80 px-4 py-3 backdrop-blur-md md:block">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Based in</p>
              <p className="font-display text-xl">Coimbatore, IN</p>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="lg:col-span-7">
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-card/60 p-8 backdrop-blur-sm sm:p-10">
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-6xl sm:text-7xl md:text-8xl">HELLO</h2>
                <span className="font-display text-6xl text-primary sm:text-7xl md:text-8xl">!</span>
              </div>
              <p className="mt-6 text-lg font-medium text-foreground">My name is Adharsh Manikandan Kumari Bindhu.</p>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>I am currently pursuing a Bachelor of Engineering in Computer Science. I chose Computer Science because I wanted to explore technology, solve problems, and understand how innovative systems are built.</p>
                <p>After completing my engineering degree, I plan to pursue my lifelong dream of becoming a <span className="font-semibold text-primary">Commercial Pilot</span>. Flying has always been my passion — I admire the discipline, responsibility, professionalism, and continuous learning that aviation demands.</p>
                <p>My goal is to combine strong technical thinking with leadership and precision as I transition from engineering into aviation.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:adharshmanikandan03@gmail.com"
                  className="cockpit-button group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03]"
                  style={{ animation: "pulse-glow 3s ease-in-out infinite" }}>
                  <Mail className="h-4 w-4" />
                  adharshmanikandan03@gmail.com
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="/Resume.pdf" download
                  className="cockpit-button inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EDUCATION */}
      <Section id="education" kicker="01 / Academics" title="EDUCATION">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { years:"2023 — 2027", title:"B.E. Computer Science",  sub:"Karpagam Academy of Higher Education",    badge:"Bachelor", icon:<GraduationCap className="h-5 w-5" />, url:"https://kahedu.edu.in/" },
            { years:"2025",        title:"Semester Exchange",       sub:"INTI International University · Malaysia", badge:"Global",   icon:<Plane className="h-5 w-5" />,          url:"https://newinti.edu.my/" },
            { years:"Higher Sec",  title:"Amrita Vidyalayam",       sub:"Score",                                   badge:"73%",      icon:<GraduationCap className="h-5 w-5" />, url:"https://amritaschool.edu.in/kanyakumari" },
            { years:"Secondary",   title:"Amrita Vidyalayam",       sub:"Score",                                   badge:"84%",      icon:<GraduationCap className="h-5 w-5" />, url:"https://amritaschool.edu.in/kanyakumari" },
          ].map((e, i) => (
            <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" className="block group">
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="card-hover flex h-full flex-col rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between text-primary">
                  {e.icon}
                  <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">{e.badge}</span>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">{e.years}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.sub}</p>
                <p className="mt-auto pt-4 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">Visit website ↗</p>
              </motion.div>
            </a>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" kicker="02 / Toolkit" title="SKILLS">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon:<Code2 className="h-5 w-5" />,   title:"Programming",    items:["Python","SQL"] },
            { icon:<Cpu className="h-5 w-5" />,     title:"AI Assisted Dev",items:["ChatGPT","Prompt Engineering","GitHub Copilot","Claude"] },
            { icon:<Network className="h-5 w-5" />, title:"Networking",     items:["CCNA Fundamentals","Networking Basics","TCP/IP"] },
            { icon:<Wrench className="h-5 w-5" />,  title:"Tools",          items:["Google Colab","Lovable","Replit","Tableau","GitHub","VSCode"] },
          ].map((s, i) => (
            <motion.div key={s.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="card-hover rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">{s.icon}</div>
              <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
              <ul className="mt-4 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-primary" />{it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" kicker="03 / On the field" title="EXPERIENCE">
        <motion.div {...fadeUp} className="card-hover rounded-3xl border border-white/10 bg-card/60 p-8 backdrop-blur-sm sm:p-10">
          <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">June 2024 · Internship</p>
              <h3 className="mt-1 font-display text-3xl sm:text-4xl">Cyber Security Intern</h3>
              <p className="mt-1 text-primary">SkillDzire</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Studied real-world security scenarios — vulnerability assessment, network defense fundamentals and hands-on tooling. Learned how disciplined analysis and methodical thinking translate directly into safer systems, a mindset I carry into every project I build.
              </p>
            </div>
            <span className="justify-self-start rounded-full border border-primary/40 px-4 py-1.5 text-xs font-semibold text-primary md:justify-self-end">Certified</span>
          </div>
        </motion.div>
      </Section>

      {/* PROJECTS — with filter tabs */}
      <Section id="projects" kicker="04 / Selected Work" title="PROJECTS">
        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((f) => (
            <button key={f} onClick={() => setProjectFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-all ${
                projectFilter === f
                  ? "bg-primary text-primary-foreground shadow-[0_0_16px_oklch(0.72_0.19_46/0.4)]"
                  : "border border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}>
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              <motion.article key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="project-card card-hover group overflow-hidden rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} width={1200} height={800} loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">{p.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground">{s}</span>
                    ))}
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform hover:translate-x-1">
                    View Project <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* JOURNEY */}
      <section id="journey" className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl border border-primary/40 p-8 sm:p-14"
            style={{ background: "linear-gradient(135deg, oklch(0.72 0.19 46 / 0.25), oklch(0.72 0.19 46 / 0.05))" }}>
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <p className="relative text-xs uppercase tracking-[0.3em] text-primary">Career Vision</p>
            <h2 className="relative mt-3 font-display text-6xl sm:text-7xl md:text-8xl">MY <span className="text-primary">JOURNEY</span></h2>
            <p className="relative mt-3 max-w-xl text-sm text-muted-foreground">Deliberate Path - Engineered on the ground. Destined to soar above the clouds.</p>

            <div className="relative mt-12 grid gap-4 md:grid-cols-5">
              {JOURNEY_STEPS.map((item, i) => (
                <motion.button
                  key={item.step}
                  type="button"
                  aria-pressed={activeJourney === i}
                  onClick={() => setActiveJourney(i)}
                  whileHover={{ y: -6, rotateX: 1.2, rotateY: -1.2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative overflow-hidden rounded-2xl border p-5 text-left backdrop-blur-md transition-all ${
                    activeJourney === i
                      ? "border-primary bg-background/90 shadow-[0_0_20px_oklch(0.72_0.19_46/0.25)]"
                      : "border-white/10 bg-background/70 hover:border-primary/50"
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300"
                    style={{ opacity: activeJourney === i ? 1 : 0.4 }}
                  />
                  <span className="font-display text-3xl text-primary">0{i + 1}</span>
                  <p className="mt-2 text-sm font-semibold text-foreground">{item.step}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{item.short}</p>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={JOURNEY_STEPS[activeJourney].step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-6 rounded-2xl border border-white/10 bg-background/70 p-5 backdrop-blur-md"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-primary">Current focus</p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl">{JOURNEY_STEPS[activeJourney].step}</h3>
                    <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{JOURNEY_STEPS[activeJourney].description}</p>
                  </div>
                  <span className="rounded-full border border-primary/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                    Step {activeJourney + 1}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* SOFT SKILLS */}
      <Section id="soft" kicker="05 / Character" title="SOFT SKILLS">
        <div className="flex flex-wrap gap-3">
          {SOFT_SKILLS.map((skill, i) => (
            <motion.button
              key={skill.name}
              type="button"
              aria-pressed={activeSoftSkill === i}
              onClick={() => setActiveSoftSkill(i)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-full border px-5 py-2.5 text-sm backdrop-blur-sm transition-all ${
                activeSoftSkill === i
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_18px_oklch(0.72_0.19_46/0.25)]"
                  : "border-white/10 bg-card/60 text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {skill.name}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={SOFT_SKILLS[activeSoftSkill].name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 rounded-2xl border border-white/10 bg-card/60 p-5 backdrop-blur-sm"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Selected trait</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl">{SOFT_SKILLS[activeSoftSkill].name}</h3>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{SOFT_SKILLS[activeSoftSkill].detail}</p>
              </div>
              <div className="rounded-full border border-primary/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                Active trait
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" kicker="06 / Events & Moments" title="Journey Through the Lens">
        <GallerySection />
      </Section>

      {/* CONTACT — ripple cards + copy email */}
      <section id="contact" className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div {...fadeUp} className="rounded-3xl border border-white/10 bg-card/60 p-8 backdrop-blur-sm sm:p-14">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">07 / Reach Out</p>
            <h2 className="mt-3 font-display text-6xl sm:text-7xl md:text-[9rem]">
              LET'S <span className="text-primary">TALK.</span>
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {/* Copy email card */}
              <CopyEmail email="adharshmanikandan03@gmail.com" />

              {/* Resume card */}
              <RippleBox className="card-hover rounded-2xl border border-white/10 bg-background/40">
                <a href="/Resume.pdf" download className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Resume</p>
                    <p className="mt-1 font-display text-2xl">Download PDF</p>
                  </div>
                  <Download className="h-6 w-6 text-primary" />
                </a>
              </RippleBox>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon:<Linkedin className="h-5 w-5" />, label:"LinkedIn",  handle:"in/adharsh-manikandan",   url:"https://www.linkedin.com/in/adharsh-manikandan" },
                { icon:<Github   className="h-5 w-5" />, label:"GitHub",    handle:"@AdharshManikandan",       url:"https://github.com/AdharshManikandan" },
                { icon:<Instagram className="h-5 w-5"/>, label:"Instagram", handle:"@adharsh__manikandan",     url:"https://www.instagram.com/adharsh__manikandan/" },
              ].map((s) => (
                <RippleBox key={s.label} className="rounded-2xl border border-white/10 bg-background/40">
                  <a href={s.url} target="_blank" rel="noopener noreferrer"
                    className="card-hover flex items-center gap-4 p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">{s.icon}</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
                      <p className="text-sm">{s.handle}</p>
                    </div>
                  </a>
                </RippleBox>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>Designed & Developed by <span className="font-semibold text-foreground">Adharsh Manikandan Kumari Bindhu</span></p>
          <p>© 2027 · All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
