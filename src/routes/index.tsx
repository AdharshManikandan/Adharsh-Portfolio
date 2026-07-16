import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Download,
  ArrowUpRight,
  Plane,
  Cpu,
  Code2,
  Network,
  Wrench,
  GraduationCap,
  Briefcase,
  Linkedin,
  Github,
  Instagram,
  ArrowDown,
  Images,
  ZoomIn,
} from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import projBigData from "@/assets/project-bigdata.jpg";
import projAbalone from "@/assets/project-abalone.jpg";
import projAgri from "@/assets/project-agrichain.jpg";
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

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function Particles() {
  const particles = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {particles.map((i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-primary/40"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animation: `float-particle ${8 + (i % 6)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function useTyping(words: string[], speed = 90, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), pause);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
        return;
      }
      setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, speed, pause]);
  return text;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
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
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Portfolio() {
  const typed = useTyping(["PORTFOLIO", "ENGINEER", "AVIATOR"], 110);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // parallax on portrait
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  return (
    <div className="grain-bg min-h-screen text-foreground">
      <Particles />

      {/* scroll progress */}
      <motion.div
        style={{ width: progress }}
        className="fixed left-0 top-0 z-50 h-[2px] bg-primary origin-left"
      />

      {/* NAV */}
      <header className="fixed top-4 left-1/2 z-40 -translate-x-1/2 w-[min(96%,1200px)]">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-background/60 px-5 py-3 backdrop-blur-xl">
          <a href="#top" className="font-display text-lg tracking-wider text-primary">
            ADHARSH<span className="text-foreground">.</span>
          </a>
          <div className="hidden gap-6 text-sm text-muted-foreground md:flex">
            {["About", "Education", "Skills", "Projects", "Journey", "Gallery", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="transition-colors hover:text-primary"
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Get in touch
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative px-4 pt-32 pb-16 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm sm:p-10 md:p-14"
          >
            <div className="mb-8 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span>Updated</span>
              <span>Adharsh · Portfolio</span>
            </div>

            <div className="flex flex-wrap items-start gap-4">
              <h1 className="font-display text-[19vw] leading-[0.82] tracking-tighter text-foreground sm:text-[15vw] md:text-[13vw] lg:text-[180px]">
                {typed}
                <span
                  className="ml-1 inline-block w-[0.08em] translate-y-[0.02em] bg-primary align-middle"
                  style={{ height: "0.75em", animation: "blink-caret 1s step-end infinite" }}
                />
              </h1>
              <span className="mt-3 rounded-md bg-primary px-3 py-1 font-display text-2xl text-primary-foreground sm:text-3xl">
                2027
              </span>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Computer Science Engineer · Future Commercial Pilot
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  From compilers to cockpits — building precision through code and flight.
                </p>
              </div>
              <div className="flex gap-6 text-xs text-muted-foreground">
                <div>
                  <div className="font-display text-3xl text-foreground">
                    <Counter to={4} />+
                  </div>
                  Projects
                </div>
                <div>
                  <div className="font-display text-3xl text-foreground">
                    <Counter to={2} />
                  </div>
                  Countries
                </div>
                <div>
                  <div className="font-display text-3xl text-primary">
                    <Counter to={2027} />
                  </div>
                  Class of
                </div>
              </div>
            </div>
          </motion.div>

          {/* meta strip */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-6 flex flex-col gap-2 px-2 text-xs text-muted-foreground sm:flex-row sm:justify-between"
          >
            <div>
              <span className="text-primary font-semibold">Emmy graph</span> · Personal Portfolio
              <p>This portfolio contains a curated selection of my work and journey.</p>
            </div>
            <div className="sm:text-right">
              <p>Text set in Anton & Inter</p>
              <p>© 2027 · All rights reserved</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-12">
          <motion.div
            {...fadeUp}
            className="relative lg:col-span-5"
            onMouseMove={(e) => {
              const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              mx.set(((e.clientX - r.left) / r.width - 0.5) * 20);
              my.set(((e.clientY - r.top) / r.height - 0.5) * 20);
            }}
            onMouseLeave={() => {
              mx.set(0);
              my.set(0);
            }}
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-card">
              <motion.img
                src={portrait}
                alt="Adharsh Manikandan Kumari Bindhu portrait"
                width={1024}
                height={1024}
                loading="lazy"
                style={{ x: px, y: py, scale: 1.08 }}
                className="h-full w-full object-cover grayscale contrast-110"
              />
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
              <p className="mt-6 text-lg font-medium text-foreground">
                My name is Adharsh Manikandan Kumari Bindhu.
              </p>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  I am currently pursuing a Bachelor of Engineering in Computer Science. I chose
                  Computer Science because I wanted to explore technology, solve problems, and
                  understand how innovative systems are built.
                </p>
                <p>
                  After completing my engineering degree, I plan to pursue my lifelong dream of
                  becoming a <span className="text-primary font-semibold">Commercial Pilot</span>.
                  Flying has always been my passion — I admire the discipline, responsibility,
                  professionalism, and continuous learning that aviation demands.
                </p>
                <p>
                  My goal is to combine strong technical thinking with leadership and precision as
                  I transition from engineering into aviation.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:adharshmanikandan03@gmail.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03]"
                  style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
                >
                  <Mail className="h-4 w-4" />
                  adharshmanikandan03@gmail.com
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="/Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
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
            {
              years: "2023 — 2027",
              title: "B.E. Computer Science",
              sub: "Karpagam Academy of Higher Education",
              badge: "Bachelor",
              icon: <GraduationCap className="h-5 w-5" />,
              url: "https://kahedu.edu.in/",
            },
            {
              years: "2025",
              title: "Semester Exchange",
              sub: "INTI International University · Malaysia",
              badge: "Global",
              icon: <Plane className="h-5 w-5" />,
              url: "https://newinti.edu.my/",
            },
            {
              years: "Higher Secondary",
              title: "Amrita Vidyalayam",
              sub: "Score",
              badge: "73%",
              icon: <GraduationCap className="h-5 w-5" />,
              url: "https://amritaschool.edu.in/kanyakumari",
            },
            {
              years: "Secondary School",
              title: "Amrita Vidyalayam",
              sub: "Score",
              badge: "84%",
              icon: <GraduationCap className="h-5 w-5" />,
              url: "https://amritaschool.edu.in/kanyakumari",
            },
          ].map((e, i) => (
            <a
              key={i}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="card-hover flex h-full flex-col rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between text-primary">
                  {e.icon}
                  <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {e.badge}
                  </span>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {e.years}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-tight">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.sub}</p>
                <p className="mt-auto pt-4 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Visit website ↗
                </p>
              </motion.div>
            </a>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" kicker="02 / Toolkit" title="SKILLS">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Code2 className="h-5 w-5" />,
              title: "Programming",
              items: ["Python", "SQL"],
            },
            {
              icon: <Cpu className="h-5 w-5" />,
              title: "AI Assisted Dev",
              items: ["ChatGPT", "Prompt Engineering", "GitHub Copilot", "Claude"],
            },
            {
              icon: <Network className="h-5 w-5" />,
              title: "Networking",
              items: ["CCNA Fundamentals", "Networking Basics", "TCP/IP"],
            },
            {
              icon: <Wrench className="h-5 w-5" />,
              title: "Tools",
              items: ["Google Colab", "Lovable", "Replit", "Tableau","GitHub","VSCode"],
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="card-hover rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                {s.icon}
              </div>
              <h3 className="mt-5 font-display text-2xl">{s.title}</h3>
              <ul className="mt-4 space-y-2">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" kicker="03 / On the field" title="EXPERIENCE">
        <motion.div
          {...fadeUp}
          className="card-hover rounded-3xl border border-white/10 bg-card/60 p-8 backdrop-blur-sm sm:p-10"
        >
          <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                June 2024 · Internship
              </p>
              <h3 className="mt-1 font-display text-3xl sm:text-4xl">Cyber Security Intern</h3>
              <p className="mt-1 text-primary">SkillDzire</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Studied real-world security scenarios — vulnerability assessment, network defense
                fundamentals and hands-on tooling. Learned how disciplined analysis and
                methodical thinking translate directly into safer systems, a mindset I carry into
                every project I build.
              </p>
            </div>
            <span className="justify-self-start rounded-full border border-primary/40 px-4 py-1.5 text-xs font-semibold text-primary md:justify-self-end">
              Certified
            </span>
          </div>
        </motion.div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" kicker="04 / Selected Work" title="PROJECTS">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              img: projBigData,
              title: "Big Data Demand Forecasting",
              tag: "Machine Learning",
              stack: ["Python", "Pandas", "Scikit-learn"],
              desc: "Predictive demand modelling on large-scale retail data, surfacing seasonality patterns and anomaly signals.",
              url: "https://github.com/AdharshManikandan/Product-Demand-Forecasting",
            },
            {
              img:proenergy,
              title: "Appliances Energy Prediction",
              tag: "Machine Learning",
              stack: ["Python", "Pandas", "Scikit-learn"],
              desc: "Predicting smart home appliance energy consumption using machine learning with seasonality, occupancy features, and model comparison.",
              url: "https://github.com/AdharshManikandan/Energy-Prediction",
            },
            {
              img: projAbalone,
              title: "Abalone Age Prediction",
              tag: "Deep Learning",
              stack: ["PyTorch", "NumPy"],
              desc: "Regression neural network estimating abalone age from morphometric features with tuned loss landscapes.",
              url: "https://github.com/AdharshManikandan/Abalone-Age-Prediction",
            },
            {
              img: projAgri,
              title: "AgriChain",
              tag: "Blockchain",
              stack: ["Solidity", "Web3", "Node"],
              desc: "Transparent agriculture supply chain using immutable ledgers — provenance from farm to consumer.",
              url: "https://agrichain-f9d47.web.app",
            },
            {
              img: proswap,
              title: "Ticket-Swap-India",
              tag: "Web Development",
              stack: ["React", "Node.js", "Web3.js"],
              desc: "Turn unused travel tickets into cash by connecting with travelers looking for last-minute bookings.",
              url: "https://ticket-swap-india.lovable.app/",
            },
          ].map((p, i) => (
            <motion.article
              key={p.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="card-hover group overflow-hidden rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform hover:translate-x-1"
                >
                  View Project <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* JOURNEY */}
      <section id="journey" className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-primary/40 p-8 sm:p-14"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.19 46 / 0.25), oklch(0.72 0.19 46 / 0.05))",
            }}
          >
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

            <p className="relative text-xs uppercase tracking-[0.3em] text-primary">
              Career Vision
            </p>
            <h2 className="relative mt-3 font-display text-6xl sm:text-7xl md:text-8xl">
              MY <span className="text-primary">JOURNEY</span>
            </h2>
            <p className="relative mt-3 max-w-xl text-sm text-muted-foreground">
              A deliberate path — engineered first on the ground, then earned above the clouds.
            </p>

            <ol className="relative mt-12 grid gap-4 md:grid-cols-5">
              {[
                "Computer Science",
                "Technology",
                "Artificial Intelligence",
                "Commercial Pilot Training",
                "Professional Pilot",
              ].map((step, i) => (
                <motion.li
                  key={step}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="rounded-2xl border border-white/10 bg-background/70 p-5 backdrop-blur-md">
                    <span className="font-display text-3xl text-primary">
                      0{i + 1}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-foreground">{step}</p>
                  </div>
                  {i < 4 && (
                    <ArrowDown className="mx-auto my-2 h-5 w-5 text-primary md:hidden" />
                  )}
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* SOFT SKILLS */}
      <Section id="soft" kicker="05 / Character" title="SOFT SKILLS">
        <div className="flex flex-wrap gap-3">
          {[
            "Problem Solving",
            "Leadership",
            "Adaptability",
            "Critical Thinking",
            "Time Management",
            "Continuous Learning",
            "Teamwork",
          ].map((s, i) => (
            <motion.span
              key={s}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="rounded-full border border-white/10 bg-card/60 px-5 py-2.5 text-sm text-foreground backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" kicker="06 / Events & Moments" title="GALLERY">
        <GallerySection />
      </Section>

      {/* CONTACT */}
      <section id="contact" className="px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-white/10 bg-card/60 p-8 backdrop-blur-sm sm:p-14"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary">07 / Reach Out</p>
            <h2 className="mt-3 font-display text-6xl sm:text-7xl md:text-[9rem]">
              LET'S <span className="text-primary">TALK.</span>
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <a
                href="mailto:adharshmanikandan03@gmail.com"
                className="card-hover flex items-center justify-between rounded-2xl border border-white/10 bg-background/40 p-6"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                  <p className="mt-1 font-display text-2xl">adharshmanikandan03@gmail.com</p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-primary" />
              </a>
              <a
                href="/Resume.pdf"
                download
                className="card-hover flex items-center justify-between rounded-2xl border border-white/10 bg-background/40 p-6"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Resume</p>
                  <p className="mt-1 font-display text-2xl">Download PDF</p>
                </div>
                <Download className="h-6 w-6 text-primary" />
              </a>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", handle: "in/adharsh-manikandan", url: "https://www.linkedin.com/in/adharsh-manikandan" },
                { icon: <Github className="h-5 w-5" />, label: "GitHub", handle: "@AdharshManikandan", url: "https://github.com/AdharshManikandan" },
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram", handle: "@adharsh__manikandan", url: "https://www.instagram.com/adharsh__manikandan/" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover flex items-center gap-4 rounded-2xl border border-white/10 bg-background/40 p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    {s.icon}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="text-sm">{s.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>
            Designed & Developed by{" "}
            <span className="text-foreground font-semibold">
              Adharsh Manikandan Kumari Bindhu
            </span>
          </p>
          <p>© 2027 · All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

const galleryPhotos = [
  { src: galPilot,              caption: "Pilot" },
  { src: galGroupPhoto,         caption: "Group Photo" },
  { src: galSimulator,          caption: "Simulator Session" },
  { src: galDreamFly,           caption: "Dream Fly" },
  { src: galIntiImage,          caption: "INTI University" },
  { src: galCourseCompletionPic,caption: "Course Completion" },
  { src: galAeroplane,          caption: "Aeroplane" },
  { src: galInti,               caption: "INTI Campus" },
  { src: galSimulator2,         caption: "Simulator Session 2" },
  { src: galCourseCompletion,   caption: "Completion Ceremony" },
  { src: galIntiBag,            caption: "INTI – Bag" },
  { src: galImages,             caption: "Event Highlights" },
  { src: galIntiNote,           caption: "INTI – Notes" },
];

function GallerySection() {
  const [open, setOpen]   = useState(false);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {/* ── Folder card ─────────────────────────────────────────── */}
      <motion.div {...fadeUp}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="group w-full rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80"
          aria-expanded={open}
        >
          {/* folder tab */}
          <div className="flex items-center gap-4 px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
              <Images className="h-5 w-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-display text-2xl tracking-wide">Event Photos</p>
              <p className="text-xs text-muted-foreground">{galleryPhotos.length} photos · click to {open ? "collapse" : "expand"}</p>
            </div>
            {/* animated chevron */}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary"
            >
              ▾
            </motion.span>
          </div>

          {/* folder bottom strip — only visible when collapsed */}
          {!open && (
            <div
              className="mx-6 mb-5 grid gap-1.5"
              style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
            >
              {galleryPhotos.slice(0, 4).map((p, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-lg opacity-50 group-hover:opacity-70 transition-opacity"
                >
                  <img src={p.src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </button>

        {/* ── Expanded photo grid ───────────────────────────────── */}
        <motion.div
          initial={false}
          animate={open ? { height: "auto", opacity: 1, marginTop: 16 } : { height: 0, opacity: 0, marginTop: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryPhotos.map((photo, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(i)}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-card/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-background/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-5 w-5 text-primary" />
                  <span className="px-2 text-center text-[11px] font-semibold text-foreground">
                    {photo.caption}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryPhotos[active].src}
              alt={galleryPhotos[active].caption}
              className="max-h-[75vh] w-full object-contain"
            />
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
              <div className="flex items-center gap-4">
                {/* prev */}
                <button
                  onClick={() => setActive((a) => (a! - 1 + galleryPhotos.length) % galleryPhotos.length)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Previous"
                >‹</button>
                <p className="font-display text-xl">{galleryPhotos[active].caption}</p>
                {/* next */}
                <button
                  onClick={() => setActive((a) => (a! + 1) % galleryPhotos.length)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Next"
                >›</button>
              </div>
              <span className="text-xs text-muted-foreground">
                {active + 1} / {galleryPhotos.length}
              </span>
            </div>
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-muted-foreground backdrop-blur-sm transition-colors hover:text-primary"
              aria-label="Close"
            >✕</button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
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
