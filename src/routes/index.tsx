import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, MapPin, Phone, Download, ExternalLink, ArrowUpRight,
  Code2, Cpu, Database, Smartphone, Brain, Wrench, Sparkles, ArrowUp,
  Rocket, GraduationCap, Award, Briefcase, ChevronRight, ChevronDown,
  Star, Target, Lightbulb, BookOpen, Play,
} from "lucide-react";
import profilePhotoAsset from "@/assets/profile-photo.jpeg.asset.json";
const profilePhoto = profilePhotoAsset.url;
import resumeAsset from "@/assets/Srisanjay_M_resume.pdf.asset.json";
const resumeUrl = resumeAsset.url;

export const Route = createFileRoute("/")({
  component: Portfolio,
});

/* ---------------- Global effects ---------------- */

function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[420px] w-[420px] rounded-full"
      style={{
        x: useTransform(sx, (v) => v - 210),
        y: useTransform(sy, (v) => v - 210),
        background: "radial-gradient(circle, rgba(59,130,246,0.18), rgba(124,58,237,0.08) 40%, transparent 70%)",
        filter: "blur(10px)",
      }}
    />
  );
}

function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#3b82f6]/25 blur-[120px] animate-aurora" />
      <div className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-[#7c3aed]/25 blur-[120px] animate-aurora" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-0 left-1/3 h-[440px] w-[440px] rounded-full bg-[#00f5ff]/20 blur-[120px] animate-aurora" style={{ animationDelay: "-10s" }} />
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.9) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }} />
    </div>
  );
}

function Particles({ count = 40 }: { count?: number }) {
  const dots = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    d: 6 + Math.random() * 10,
    s: 1 + Math.random() * 3,
    o: 0.15 + Math.random() * 0.5,
  })), [count]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s,
            background: "linear-gradient(135deg,#00f5ff,#7c3aed)",
            opacity: p.o, boxShadow: "0 0 8px rgba(0,245,255,0.6)",
          }}
          animate={{ y: [0, -30, 0], opacity: [p.o, p.o * 0.3, p.o] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg,#3b82f6,#00f5ff,#7c3aed)" }} />
  );
}

/* ---------------- Building blocks ---------------- */

function MagneticButton({ children, href, variant = "primary", download }: {
  children: React.ReactNode; href: string; variant?: "primary" | "ghost" | "outline"; download?: boolean | string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const isExternal = /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
  const opensNewTab = /^https?:\/\//i.test(href);
  const styles = {
    primary: "text-white bg-gradient-to-r from-[#3b82f6] via-[#00b5ff] to-[#7c3aed] shadow-[0_10px_40px_-10px_rgba(59,130,246,0.7)]",
    outline: "text-white glass gradient-border",
    ghost: "text-white/80 hover:text-white",
  }[variant];
  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (href.startsWith("#")) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition ${styles}`}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_10px_#00f5ff]" />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {sub && <p className="mt-4 text-white/60">{sub}</p>}
    </motion.div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 12); rx.set(-py * 12);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      className={`relative rounded-2xl glass gradient-border p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Sections ---------------- */

const ROLES = [
  "Software Engineer",
  "Full Stack Developer",
  "AI Enthusiast",
  "React Native Developer",
];

function TypingRole() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = ROLES[i];
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1400);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI((v) => (v + 1) % ROLES.length); }
      }
    }, del ? 40 : 70);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return (
    <span className="inline-flex items-center">
      <span className="gradient-text font-display">{text}</span>
      <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[2px] bg-[#00f5ff] shadow-[0_0_10px_#00f5ff] animate-pulse" />
    </span>
  );
}

function ProfileShowcase() {
  const badges = [
    { label: "React",     cls: "top-[4%] left-[-6%]",     delay: 0 },
    { label: "Node.js",   cls: "top-[18%] right-[-10%]",  delay: 0.6 },
    { label: "Python",    cls: "top-[52%] left-[-14%]",   delay: 1.2 },
    { label: "MongoDB",   cls: "bottom-[18%] right-[-12%]", delay: 1.8 },
    { label: "Gemini AI", cls: "bottom-[-4%] left-[10%]", delay: 2.4 },
    { label: "GitHub",    cls: "top-[36%] right-[-4%]",   delay: 3.0 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[440px]"
    >
      {/* orbit rings */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="absolute h-[112%] w-[112%] rounded-full border border-white/10" />
        <div className="absolute h-[130%] w-[130%] rounded-full border border-white/[0.06]" />
      </div>

      {/* neon blue rim glow */}
      <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.55),rgba(0,245,255,0.25)_45%,transparent_72%)] blur-3xl" />

      {/* photo container */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-square w-full rounded-[2rem] glass gradient-border p-3 shadow-[0_40px_120px_-30px_rgba(59,130,246,0.7)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] ring-1 ring-[#3B82F6]/40 shadow-[inset_0_0_60px_rgba(59,130,246,0.25)]">
          <img
            src={profilePhoto}
            alt="Portrait of Srisanjay M, software engineer"
            loading="eager"
            className="h-full w-full object-cover object-top scale-[1.05] [filter:brightness(1.06)_contrast(1.08)_saturate(1.05)]"
            style={{ objectPosition: "50% 18%" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1020]/75 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-[#00f5ff]/30" />
          {/* status chip */}
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] tracking-widest text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            OPEN TO WORK
          </div>
        </div>
      </motion.div>

      {/* floating tech badges */}
      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 0.6 + i * 0.1, duration: 0.5 },
            scale:   { delay: 0.6 + i * 0.1, duration: 0.5 },
            y:       { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: b.delay },
          }}
          className={`absolute ${b.cls} z-10`}
        >
          <div className="rounded-full glass gradient-border px-3 py-1.5 text-[11px] font-medium text-white/90 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)]">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#00f5ff] align-middle shadow-[0_0_8px_#00f5ff]" />
            {b.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden pt-28 md:pt-32">
      <Particles count={50} />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-24 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div className="order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            <span className="block text-white/80">Hi, I'm</span>
            <span className="gradient-text">SRISANJAY M</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-6 font-display text-2xl text-white/80 md:text-3xl"
          >
            <span className="text-white/70">I'm a </span><TypingRole />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
          >
            Computer Science & Business Systems student crafting scalable full-stack,
            mobile, and AI-powered products. Obsessed with elegant UX, clean code,
            and shipping fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton href="#projects"><Rocket className="h-4 w-4" /> Explore My Projects</MagneticButton>
            <MagneticButton href={resumeUrl} download="Srisanjay_M_resume.pdf" variant="outline"><Download className="h-4 w-4" /> Download Resume</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">Contact Me <ArrowUpRight className="h-4 w-4" /></MagneticButton>
          </motion.div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "CGPA", v: "8.56" },
              { k: "Projects", v: "12+" },
              { k: "Technologies", v: "20+" },
              { k: "Certificates", v: "6+" },
            ].map((s, idx) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl glass gradient-border p-4"
              >
                <div className="font-display text-2xl gradient-text">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{s.k}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <ProfileShowcase />
        </div>
      </div>
    </section>
  );
}

function About() {
  const items = [
    { icon: GraduationCap, t: "CSBS Student", d: "B.Tech in Computer Science & Business Systems." },
    { icon: Award, t: "CGPA 8.56", d: "Consistent academic excellence across every semester." },
    { icon: Cpu, t: "Full Stack + AI", d: "Building scalable web, mobile, and intelligent apps." },
    { icon: Sparkles, t: "Quick Learner", d: "Ships fast, iterates faster, obsessed with craft." },
  ];
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="About" title="A story in progress." sub="Passionate about building scalable applications and solving real-world problems with AI, full-stack and mobile technologies." />
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
            >
              <TiltCard>
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-[#3b82f6]/30 to-[#7c3aed]/30 p-3">
                    <it.icon className="h-5 w-5 text-[#00f5ff]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-white">{it.t}</h3>
                    <p className="mt-1 text-sm text-white/60">{it.d}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SKILLS: { cat: string; icon: any; items: string[] }[] = [
  { cat: "Frontend", icon: Code2, items: ["React", "HTML", "CSS", "Bootstrap", "JavaScript"] },
  { cat: "Backend", icon: Cpu, items: ["Node.js", "Express", "REST API", "JWT"] },
  { cat: "Database", icon: Database, items: ["MongoDB", "SQL"] },
  { cat: "Mobile", icon: Smartphone, items: ["React Native", "Expo", "EAS"] },
  { cat: "AI", icon: Brain, items: ["Google Gemini AI", "Generative AI"] },
  { cat: "Languages", icon: Code2, items: ["Python", "JavaScript"] },
  { cat: "Tools", icon: Wrench, items: ["Git", "GitHub", "VS Code", "Postman", "Render", "Vercel"] },
  { cat: "Core", icon: Sparkles, items: ["DSA", "OOP"] },
];

function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Skills" title="The stack I ship with." sub="A galaxy of tools, languages, and frameworks I use to design and build production-grade products." />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((g, gi) => (
            <motion.div
              key={g.cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.05 }}
            >
              <TiltCard className="h-full">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-[#3b82f6]/30 to-[#7c3aed]/30 p-2.5">
                    <g.icon className="h-4 w-4 text-[#00f5ff]" />
                  </div>
                  <h3 className="font-display text-lg text-white">{g.cat}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <motion.span
                      key={s}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="cursor-default rounded-full glass px-3 py-1 text-xs text-white/80 transition hover:text-white"
                    >{s}</motion.span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Projects ---- */

type ProjectShot = { label: string; palette: [string, string, string]; kind: "web" | "mobile" | "ai" };
type Project = {
  title: string;
  tagline: string;
  desc: string;
  tech: { name: string; slug: string; color?: string }[];
  deploy: string[];
  features: string[];
  challenges: string[];
  learned: string[];
  gallery: ProjectShot[];
  device: "laptop" | "phone" | "ai";
  links: { demo?: string; github?: string; caseStudy?: string; demoLabel?: string };
};

const PROJECTS: Project[] = [
  {
    title: "AI Resume ATS Analyzer",
    tagline: "Full-stack AI resume intelligence",
    desc: "A full-stack ATS analyzer that scores resumes against job descriptions, extracts keywords, and generates tailored improvement suggestions using Google Gemini.",
    tech: [
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
      { name: "Express", slug: "express", color: "FFFFFF" },
      { name: "MongoDB", slug: "mongodb", color: "47A248" },
      { name: "Gemini", slug: "googlegemini", color: "8E75B2" },
      { name: "JWT", slug: "jsonwebtokens", color: "FFFFFF" },
      { name: "TailwindCSS", slug: "tailwindcss", color: "06B6D4" },
    ],
    deploy: ["Vercel", "Render", "MongoDB Atlas"],
    features: [
      "AI-powered resume scoring against any job description",
      "Keyword extraction with match / miss analytics",
      "Gemini-generated improvement suggestions",
      "Secure JWT auth with saved resume history",
    ],
    challenges: [
      "Streaming long Gemini responses without blocking the UI",
      "Parsing PDF & DOCX resumes reliably on the server",
      "Rate-limiting AI calls per user without breaking UX",
    ],
    learned: [
      "Designing prompt pipelines that produce structured JSON",
      "Deploying MERN apps across Vercel + Render with cold-start awareness",
      "Building resilient file-processing workflows",
    ],
    gallery: [
      { label: "Dashboard", palette: ["#3b82f6", "#7c3aed", "#00f5ff"], kind: "web" },
      { label: "Score Report", palette: ["#0ea5e9", "#6366f1", "#22d3ee"], kind: "web" },
      { label: "AI Suggestions", palette: ["#7c3aed", "#ec4899", "#3b82f6"], kind: "web" },
    ],
    device: "laptop",
    links: {
      demo: "https://resume-ats-project.vercel.app",
      github: "https://github.com/srisanjay-sj/Resume-ATS-Project",
    },
  },
  {
    title: "SpaceEscapeRunner",
    tagline: "React Native arcade game",
    desc: "A React Native mobile game with a custom render loop, collision detection, spring-based animations, and persistent high scores stored on-device.",
    tech: [
      { name: "React Native", slug: "react", color: "61DAFB" },
      { name: "Expo", slug: "expo", color: "FFFFFF" },
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "EAS", slug: "expo", color: "FFFFFF" },
    ],
    deploy: ["Android APK", "Expo EAS"],
    features: [
      "60fps custom game loop with delta-time physics",
      "Pixel-perfect collision detection & particle effects",
      "Persistent high scores via AsyncStorage",
      "Haptic feedback and adaptive difficulty curve",
    ],
    challenges: [
      "Keeping the render loop smooth on low-end Android devices",
      "Handling gesture input without dropped frames",
      "Building an EAS pipeline for signed APK releases",
    ],
    learned: [
      "Optimising React Native re-renders using reanimated worklets",
      "Game-loop architecture inside a component tree",
      "Publishing signed builds through EAS",
    ],
    gallery: [
      { label: "Main Menu", palette: ["#0f172a", "#1e40af", "#00f5ff"], kind: "mobile" },
      { label: "In-Game", palette: ["#1e1b4b", "#7c3aed", "#f472b6"], kind: "mobile" },
      { label: "Game Over", palette: ["#7f1d1d", "#f97316", "#facc15"], kind: "mobile" },
    ],
    device: "phone",
    links: {
      demo: "https://drive.google.com/file/d/1Wu0hvu4JLb6nwK-YzYy69krCqZnSuNiC/view?usp=sharing",
      demoLabel: "Download APK",
      github: "https://github.com/srisanjay-sj/SpaceEscapeRunner",
    },
  },
  {
    title: "AI Multi-Object Detection",
    tagline: "Real-time computer vision",
    desc: "A deep-learning system that detects and classifies multiple objects in real time from images and video streams with high accuracy and low latency.",
    tech: [
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "PyTorch", slug: "pytorch", color: "EE4C2C" },
      { name: "OpenCV", slug: "opencv", color: "5C3EE8" },
      { name: "NumPy", slug: "numpy", color: "013243" },
      { name: "FastAPI", slug: "fastapi", color: "009688" },
    ],
    deploy: ["Local Inference", "ONNX Runtime"],
    features: [
      "Multi-object detection at real-time frame rates",
      "Confidence-scored bounding boxes with class labels",
      "Live webcam & video-file inference modes",
      "Exportable results as JSON / annotated video",
    ],
    challenges: [
      "Balancing inference speed vs. detection accuracy",
      "Handling occlusion and overlapping objects",
      "Streaming inference results without frame drops",
    ],
    learned: [
      "Transfer learning with pre-trained detection backbones",
      "Quantisation & ONNX export for fast local inference",
      "Building clean CV pipelines with OpenCV + PyTorch",
    ],
    gallery: [
      { label: "Detection Grid", palette: ["#0f172a", "#00f5ff", "#7c3aed"], kind: "ai" },
      { label: "Confidence Map", palette: ["#1e293b", "#22d3ee", "#3b82f6"], kind: "ai" },
      { label: "Live Stream", palette: ["#111827", "#f472b6", "#00f5ff"], kind: "ai" },
    ],
    device: "ai",
    links: {},
  },
];

function DeviceFrame({ device, shot }: { device: Project["device"]; shot: ProjectShot }) {
  const bg = `linear-gradient(135deg, ${shot.palette[0]} 0%, ${shot.palette[1]} 55%, ${shot.palette[2]} 100%)`;
  const inner = (
    <div className="relative h-full w-full overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }} />
      {shot.kind === "web" && (
        <div className="absolute inset-0 flex flex-col p-4">
          <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/40"/><span className="h-2 w-2 rounded-full bg-white/40"/><span className="h-2 w-2 rounded-full bg-white/40"/></div>
          <div className="mt-3 flex-1 rounded-lg bg-white/10 backdrop-blur-sm p-3">
            <div className="h-2 w-24 rounded bg-white/60" />
            <div className="mt-2 h-2 w-16 rounded bg-white/30" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-14 rounded bg-white/15" />
              <div className="h-14 rounded bg-white/25" />
              <div className="h-14 rounded bg-white/15" />
            </div>
            <div className="mt-3 h-1.5 rounded bg-white/10"><div className="h-full w-3/4 rounded bg-white" /></div>
          </div>
        </div>
      )}
      {shot.kind === "mobile" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
            className="h-10 w-10 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.6)]" />
          <div className="h-1.5 w-24 rounded bg-white/40" />
          <div className="h-1.5 w-16 rounded bg-white/25" />
        </div>
      )}
      {shot.kind === "ai" && (
        <div className="absolute inset-0 p-3">
          <svg viewBox="0 0 200 140" className="h-full w-full">
            <g stroke="rgba(255,255,255,0.9)" strokeWidth="1" fill="none">
              <rect x="20" y="20" width="60" height="45" rx="3" />
              <rect x="110" y="35" width="55" height="40" rx="3" />
              <rect x="60" y="85" width="70" height="35" rx="3" />
            </g>
            {[[50,42],[137,55],[95,102]].map(([x,y],i)=>(
              <g key={i}>
                <circle cx={x} cy={y} r="2.5" fill="white"/>
                <circle cx={x} cy={y} r="8" fill="none" stroke="white" opacity="0.5">
                  <animate attributeName="r" from="4" to="14" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
              </g>
            ))}
          </svg>
        </div>
      )}
      <div className="absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-widest text-white/80">{shot.label}</div>
    </div>
  );

  if (device === "phone") {
    return (
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[220px] rounded-[2rem] border border-white/10 bg-black p-2 shadow-2xl">
        <div className="absolute left-1/2 top-2 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-black" />
        <div className="h-full w-full overflow-hidden rounded-[1.6rem]">{inner}</div>
      </div>
    );
  }
  // laptop / ai use browser-style frame
  return (
    <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
      {inner}
    </div>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  const [idx, setIdx] = useState(0);
  const shot = project.gallery[idx];
  return (
    <div className="flex flex-col gap-4">
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl glass gradient-border p-4 md:p-6"
      >
        <DeviceFrame device={project.device} shot={shot} />
      </motion.div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {project.gallery.map((g, i) => (
          <button
            key={g.label}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Show ${g.label}`}
            className={`group relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
              i === idx ? "border-[#00f5ff] shadow-[0_0_20px_rgba(0,245,255,0.4)]" : "border-white/10 hover:border-white/30"
            }`}
            style={{ background: `linear-gradient(135deg, ${g.palette[0]}, ${g.palette[1]}, ${g.palette[2]})` }}
          >
            <span className="absolute inset-x-0 bottom-0 truncate bg-black/40 px-1 text-center font-mono text-[9px] uppercase tracking-widest text-white/90">
              {g.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TechBadge({ tech }: { tech: { name: string; slug: string; color?: string } }) {
  const [broken, setBroken] = useState(false);
  const color = tech.color ?? "FFFFFF";
  return (
    <span className="group inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_0_18px_rgba(59,130,246,0.35)]">
      {!broken ? (
        <img
          src={`https://cdn.simpleicons.org/${tech.slug}/${color}`}
          alt=""
          width={14}
          height={14}
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-3.5 w-3.5"
        />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[#00f5ff]" />
      )}
      {tech.name}
    </span>
  );
}

function Collapsible({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b82f6]/30 to-[#7c3aed]/30">
          <Icon className="h-4 w-4 text-[#00f5ff]" />
        </span>
        <span className="flex-1 font-display text-sm text-white">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-4 w-4 text-white/60" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 px-4 pb-4 pt-1 text-sm text-white/70">
              {items.map((it) => (
                <li key={it} className="flex gap-2">
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00f5ff]" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl glass gradient-border p-6 transition-all duration-500 hover:shadow-[0_30px_80px_-20px_rgba(59,130,246,0.35)] md:p-10"
    >
      {/* neon hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(59,130,246,0.18), transparent 60%)" }}
      />
      <div className={`relative grid gap-10 lg:grid-cols-2 ${flipped ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <ProjectGallery project={project} />

        <div className="flex flex-col">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/50">
            <span className="font-mono text-[#00f5ff]">0{index + 1}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            <span>{project.tagline}</span>
          </div>
          <h3 className="mt-4 font-display text-3xl gradient-text md:text-4xl">{project.title}</h3>
          <p className="mt-4 text-white/70">{project.desc}</p>

          {/* Tech stack with logos */}
          <div className="mt-6">
            <div className="mb-2 text-[11px] uppercase tracking-widest text-white/40">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => <TechBadge key={t.name} tech={t} />)}
            </div>
          </div>

          {/* Key features */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/40">
              <Star className="h-3 w-3 text-[#00f5ff]" /> Key Features
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#7c3aed] shadow-[0_0_10px_#00f5ff]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Collapsibles */}
          <div className="mt-6 space-y-3">
            <Collapsible icon={Target} title="Challenges Solved" items={project.challenges} />
            <Collapsible icon={Lightbulb} title="What I Learned" items={project.learned} />
          </div>

          {/* Deployment tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.deploy.map((d) => (
              <span key={d} className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-widest text-white/50">
                {d}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.demo && (
              <MagneticButton href={project.links.demo}>
                <Play className="h-4 w-4" /> Live Demo
              </MagneticButton>
            )}
            {project.links.github && (
              <MagneticButton href={project.links.github} variant="outline">
                <Github className="h-4 w-4" /> GitHub Repository
              </MagneticButton>
            )}
            {project.links.caseStudy && (
              <MagneticButton href={project.links.caseStudy} variant="outline">
                <BookOpen className="h-4 w-4" /> Case Study
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title="Products, not portfolios."
          sub="A few things I've designed, engineered, and shipped end-to-end."
        />
        <div className="mt-16 space-y-10">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Timeline (experience + education) ---- */

function Timeline({ items, id, eyebrow, title }: {
  items: { title: string; org: string; period?: string; points: string[]; icon: any }[];
  id: string; eyebrow: string; title: string;
}) {
  return (
    <section id={id} className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#3b82f6] via-[#7c3aed] to-transparent md:left-1/2" />
          {items.map((it, i) => (
            <motion.div
              key={it.title + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`relative mb-10 grid gap-4 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={`md:${i % 2 ? "pl-12" : "pr-12 text-right"}`}>
                <TiltCard>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
                    <it.icon className="h-3.5 w-3.5 text-[#00f5ff]" /> {it.org}
                    {it.period && <span className="ml-auto">{it.period}</span>}
                  </div>
                  <h3 className="mt-2 font-display text-lg text-white">{it.title}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-white/60">
                    {it.points.map((p) => (
                      <li key={p} className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-[#00f5ff]"/> {p}</li>
                    ))}
                  </ul>
                </TiltCard>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#7c3aed] shadow-[0_0_20px_#00f5ff] md:left-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Certifications & Achievements ---- */

function Certifications() {
  const certs = [
    { t: "DBMS", d: "Database Management" },
    { t: "SQL", d: "Structured Query Language" },
    { t: "Python", d: "Programming Fundamentals" },
    { t: "Responsive Web Design", d: "Modern layouts & UX" },
  ];
  return (
    <section id="certs" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Certifications" title="Always learning." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c, i) => (
            <motion.div key={c.t}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}>
              <TiltCard className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b82f6]/30 to-[#7c3aed]/30">
                  <Award className="h-6 w-6 text-[#00f5ff]" />
                </div>
                <h3 className="mt-4 font-display text-lg text-white">{c.t}</h3>
                <p className="mt-1 text-xs text-white/50">{c.d}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / 1400);
            setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <div ref={ref} className="font-display text-4xl gradient-text md:text-5xl">{v}{suffix}</div>;
}

function Achievements() {
  const items = [
    { k: "Projects Completed", v: 12, s: "+" },
    { k: "Technologies Learned", v: 24, s: "+" },
    { k: "GitHub Contributions", v: 480, s: "+" },
    { k: "Problems Solved", v: 350, s: "+" },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-5 rounded-3xl glass gradient-border p-8 sm:grid-cols-2 md:p-12 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.k} className="text-center">
              <Counter to={it.v} suffix={it.s} />
              <div className="mt-2 text-xs uppercase tracking-widest text-white/50">{it.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Contact ---- */

function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Contact" title="Let's build something great." sub="Have a role, a project, or an idea? My inbox is always open." />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl glass gradient-border p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              {[
                { l: "Name", t: "text", p: "Your name" },
                { l: "Email", t: "email", p: "you@company.com" },
              ].map((f) => (
                <label key={f.l} className="block">
                  <span className="text-xs uppercase tracking-widest text-white/50">{f.l}</span>
                  <input type={f.t} placeholder={f.p}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-[#00f5ff]/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(0,245,255,0.1)]" />
                </label>
              ))}
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-white/50">Message</span>
                <textarea rows={5} placeholder="Tell me about your project..."
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-[#00f5ff]/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(0,245,255,0.1)]" />
              </label>
              <button type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#00b5ff] to-[#7c3aed] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(59,130,246,0.7)] transition hover:scale-[1.02]">
                Send Message <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
          <div className="space-y-4">
            {[
              { i: Mail, l: "Email", v: "srisanjay@example.com" },
              { i: Phone, l: "Phone", v: "+91 00000 00000" },
              { i: Linkedin, l: "LinkedIn", v: "linkedin.com/in/srisanjay" },
              { i: Github, l: "GitHub", v: "github.com/srisanjay" },
              { i: MapPin, l: "Location", v: "Tamil Nadu, India" },
            ].map((c) => (
              <TiltCard key={c.l}>
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-[#3b82f6]/30 to-[#7c3aed]/30 p-3">
                    <c.i className="h-5 w-5 text-[#00f5ff]" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/50">{c.l}</div>
                    <div className="text-white">{c.v}</div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Nav & Footer ---- */

const NAV = [
  { h: "#home", l: "Home" },
  { h: "#about", l: "About" },
  { h: "#skills", l: "Skills" },
  { h: "#projects", l: "Work" },
  { h: "#experience", l: "Experience" },
  { h: "#education", l: "Education" },
  { h: "#contact", l: "Contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}
      className={`fixed inset-x-0 top-4 z-40 mx-auto max-w-6xl px-4 transition-all ${scrolled ? "top-3" : ""}`}
    >
      <div className="flex items-center justify-between rounded-full glass gradient-border px-4 py-2">
        <a href="#home" className="flex items-center gap-2 pl-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[#3b82f6] via-[#00f5ff] to-[#7c3aed] shadow-[0_0_20px_rgba(0,245,255,0.6)]" />
          <span className="font-display text-sm tracking-widest text-white">SRISANJAY<span className="text-[#00f5ff]">.</span></span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a key={n.h} href={n.h} className="rounded-full px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white">{n.l}</a>
          ))}
        </nav>
        <a href="#contact" className="rounded-full bg-white/10 px-4 py-1.5 text-xs text-white transition hover:bg-white/20">Hire me</a>
      </div>
    </motion.header>
  );
}

function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-xs text-white/40">© {new Date().getFullYear()} Srisanjay M · Crafted with obsession.</div>
        <div className="flex gap-3">
          {[
            { i: Github, h: "#" }, { i: Linkedin, h: "#" }, { i: Mail, h: "#contact" },
          ].map((s, i) => (
            <motion.a key={i} href={s.h} whileHover={{ y: -3, scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full glass text-white/70 shadow-[0_0_30px_-10px_#3b82f6] hover:text-[#00f5ff]">
              <s.i className="h-4 w-4" />
            </motion.a>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {show && (
          <motion.a
            href="#home"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#7c3aed] text-white shadow-[0_10px_40px_-10px_rgba(59,130,246,0.8)]"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.a>
        )}
      </AnimatePresence>
    </footer>
  );
}

/* ---- Loader ---- */

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05060f]"
        >
          <div className="text-center">
            <motion.div
              className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-[#3b82f6] via-[#00f5ff] to-[#7c3aed] shadow-[0_0_60px_#00f5ff]"
              animate={{ rotate: [0, 180, 360], borderRadius: ["20%", "50%", "20%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="mt-6 font-display text-sm tracking-[0.4em] text-white/70">LOADING</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---- Root ---- */

function Portfolio() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 900); return () => clearTimeout(t); }, []);

  return (
    <div className="relative min-h-screen text-white">
      <Loader done={ready} />
      <ScrollProgress />
      <AuroraBackdrop />
      <CursorGlow />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline
          id="experience" eyebrow="Experience" title="Where I've built things."
          items={[{
            title: "Python with Data Analytics Intern",
            org: "Mechpro Technologies",
            period: "Internship",
            icon: Briefcase,
            points: ["Python · Pandas · NumPy · Matplotlib", "Data cleaning & preprocessing pipelines", "Interactive visualization dashboards"],
          }]}
        />
        <Timeline
          id="education" eyebrow="Education" title="The learning path."
          items={[
            { title: "B.Tech · Computer Science & Business Systems", org: "Anna University", period: "CGPA 8.56", icon: GraduationCap, points: ["Data structures, OOP, DBMS", "Product & business systems"] },
            { title: "Full Stack Program", org: "CCBP 4.0 Academy", icon: GraduationCap, points: ["MERN stack projects", "Industry-grade practices"] },
            { title: "Higher Secondary", org: "Govt Higher Secondary School", icon: GraduationCap, points: ["Foundation in mathematics & computing"] },
          ]}
        />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
