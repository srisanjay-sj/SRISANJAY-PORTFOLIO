import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, MapPin, Phone, Download, ExternalLink, ArrowUpRight,
  Code2, Cpu, Database, Smartphone, Brain, Wrench, Sparkles, ArrowUp,
  Rocket, GraduationCap, Award, Briefcase, ChevronRight, ChevronDown,
  Star, Target, Lightbulb, BookOpen, Play,
} from "lucide-react";
import profilePhoto from "@/assets/profile.jpg";

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
  children: React.ReactNode; href: string; variant?: "primary" | "ghost" | "outline"; download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
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

      {/* neon glow halo */}
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.45),rgba(124,58,237,0.25)_45%,transparent_70%)] blur-2xl" />

      {/* photo container */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-square w-full rounded-[2rem] glass gradient-border p-3 shadow-[0_40px_120px_-30px_rgba(59,130,246,0.7)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] ring-1 ring-white/10">
          <img
            src={profilePhoto}
            alt="Portrait of Srisanjay M, software engineer"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1020]/70 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-[#00f5ff]/20" />
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
            <MagneticButton href="/resume.pdf" download variant="outline"><Download className="h-4 w-4" /> Download Resume</MagneticButton>
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

function LaptopMock() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-t-2xl border border-white/10 bg-gradient-to-b from-[#0e1224] to-[#0a0d1c] p-2 shadow-2xl">
        <div className="rounded-t-xl bg-black p-2">
          <div className="flex gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-white/30"/><span className="h-1.5 w-1.5 rounded-full bg-white/30"/><span className="h-1.5 w-1.5 rounded-full bg-white/30"/></div>
          <div className="mt-2 h-40 overflow-hidden rounded-md bg-gradient-to-br from-[#3b82f6]/40 via-[#7c3aed]/40 to-[#00f5ff]/30 p-3">
            <div className="font-display text-xs text-white/80">ATS Score</div>
            <div className="mt-1 font-display text-3xl text-white">88<span className="text-sm text-white/60">/100</span></div>
            <div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full w-[88%] rounded-full bg-white/80" /></div>
            <div className="mt-3 grid grid-cols-3 gap-1">
              {["React","Node","Mongo","Gemini","JWT","REST"].map(t=>(
                <span key={t} className="rounded bg-white/10 px-1 text-center text-[9px] text-white/80">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-2 w-[110%] -translate-x-[5%] rounded-b-2xl bg-gradient-to-b from-[#0a0d1c] to-[#050813]" />
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto h-64 w-36">
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-black p-2 shadow-2xl">
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-[#0a0d1c] via-[#0e1a3d] to-black">
          <div className="absolute left-1/2 top-1 h-3 w-14 -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#7c3aed] shadow-[0_0_30px_#00f5ff]" />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-display text-xs text-white">RUN · 3210</div>
        </div>
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="relative mx-auto flex h-64 w-full items-center justify-center">
      <svg viewBox="0 0 300 200" className="h-full w-full">
        <defs>
          <linearGradient id="g" x1="0" x2="1"><stop stopColor="#00f5ff"/><stop offset="1" stopColor="#7c3aed"/></linearGradient>
        </defs>
        <g stroke="url(#g)" strokeWidth="1.2" fill="none" opacity="0.9">
          <rect x="40" y="40" width="80" height="60" rx="4" />
          <rect x="150" y="70" width="60" height="40" rx="4" />
          <rect x="90" y="130" width="70" height="40" rx="4" />
        </g>
        {[[80,55],[190,90],[125,150]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#00f5ff"/>
            <circle cx={x} cy={y} r="10" fill="none" stroke="#00f5ff" opacity="0.4">
              <animate attributeName="r" from="6" to="18" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

const PROJECTS = [
  {
    title: "AI Resume ATS Analyzer",
    desc: "Full-stack ATS analyzer that scores resumes, extracts keywords, and generates AI suggestions with Google Gemini.",
    tech: ["React", "Node", "Express", "MongoDB", "Gemini AI", "JWT"],
    deploy: ["Vercel", "Render", "MongoDB Atlas"],
    mock: <LaptopMock />,
  },
  {
    title: "SpaceEscapeRunner",
    desc: "React Native mobile game with custom game loop, collision detection, animations and persistent scores.",
    tech: ["React Native", "Expo", "AsyncStorage", "EAS"],
    deploy: ["Android APK"],
    mock: <PhoneMock />,
  },
  {
    title: "AI Based Multi Object Detection",
    desc: "Deep learning system that detects and classifies multiple objects in real time with high accuracy.",
    tech: ["Deep Learning", "Computer Vision", "Python"],
    deploy: ["Local Inference"],
    mock: <AIVisual />,
  },
];

function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Selected Work" title="Products, not portfolios." sub="A few things I've designed, engineered, and shipped end-to-end." />
        <div className="mt-16 space-y-10">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className={`grid items-center gap-10 rounded-3xl glass gradient-border p-8 md:p-12 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/50">0{i + 1} · Case Study</div>
                <h3 className="mt-3 font-display text-3xl gradient-text md:text-4xl">{p.title}</h3>
                <p className="mt-4 text-white/60">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full glass px-3 py-1 text-xs text-white/80">{t}</span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.deploy.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">{t}</span>
                  ))}
                </div>
                <div className="mt-7 flex gap-3">
                  <MagneticButton href="#"><ExternalLink className="h-4 w-4" /> Live Demo</MagneticButton>
                  <MagneticButton href="#" variant="outline"><Github className="h-4 w-4" /> GitHub</MagneticButton>
                </div>
              </div>
              <div>{p.mock}</div>
            </motion.article>
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
