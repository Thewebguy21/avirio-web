"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import AnimatedBg from "./components/AnimatedBg";
import { Reveal, StaggerReveal } from "./components/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── animated counter ── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const steps = 50, dur = 1200;
    let cur = 0;
    const t = setInterval(() => {
      cur += end / steps;
      if (cur >= end) { setN(end); clearInterval(t); }
      else setN(Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ── hero audit widget ── */
function AuditWidget() {
  const controls = [
    { name: "Access Control",    pct: 100, ok: true },
    { name: "Encryption",        pct: 100, ok: true },
    { name: "Change Management", pct: 100, ok: true },
    { name: "Incident Response", pct: 87,  ok: true },
    { name: "Vendor Review",     pct: 60,  ok: false },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, delay: 0.55, ease }}
      style={{
        background: "rgba(7,7,12,0.85)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 16,
        padding: "28px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* inner glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(99,102,241,0.08), transparent 60%)", pointerEvents: "none" }} />

      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 11, color: "rgba(242,242,244,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-geist-mono)" }}>SOC 2 Type II</div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginTop: 4 }}>
            94<span style={{ color: "#818cf8" }}>%</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(242,242,244,0.4)", marginTop: 4 }}>Audit readiness score</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
            <span className="flicker" style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", letterSpacing: "0.06em", textTransform: "uppercase" }}>Live</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(242,242,244,0.3)", marginTop: 4, fontFamily: "var(--font-geist-mono)" }}>Updated 2m ago</div>
        </div>
      </div>

      {/* progress bar total */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 22 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "94%" }}
          transition={{ delay: 0.85, duration: 1.3, ease }}
          style={{ height: "100%", borderRadius: 2, background: "linear-gradient(to right, #4f46e5, #818cf8)" }}
        />
      </div>

      {/* controls list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {controls.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.09, duration: 0.4 }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(242,242,244,0.75)" }}>{c.name}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: c.ok ? "#10b981" : "#f59e0b", fontFamily: "var(--font-geist-mono)" }}>
                  {c.ok ? "✓" : "2 items"} {c.pct}%
                </span>
              </div>
              <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 1 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.8, ease }}
                  style={{
                    height: "100%", borderRadius: 1,
                    background: c.ok ? "#4f46e5" : "#f59e0b",
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* footer */}
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "rgba(242,242,244,0.35)" }}>6 items need attention</span>
        <motion.button
          whileHover={{ color: "#818cf8" }}
          style={{ fontSize: 12, background: "none", border: "none", color: "rgba(242,242,244,0.45)", fontWeight: 600 }}
        >
          View report →
        </motion.button>
      </div>
    </motion.div>
  );
}


/* ── platform tabs ── */
const TABS = [
  {
    id: "automation",
    label: "Compliance Automation",
    headline: "Evidence. Automated.",
    body: "Connect your cloud, dev, and HR tools. Avirio collects evidence continuously. No screenshots, no exports, no late nights before an audit. Every control tested, every requirement tracked, in real time.",
    stats: [
      { v: "80%", l: "Reduction in manual work" },
      { v: "50+", l: "Native integrations" },
      { v: "365", l: "Days of continuous monitoring" },
    ],
  },
  {
    id: "risk",
    label: "Risk Management",
    headline: "Risk visible. Risk managed.",
    body: "Identify, score, and treat risks across your entire organization. Built-in risk registers, treatment plans, and board-ready reporting. Risk management that is continuous, not a checkbox.",
    stats: [
      { v: "100%", l: "Risk visibility" },
      { v: "3×", l: "Faster risk assessments" },
      { v: "0", l: "Missed exceptions" },
    ],
  },
  {
    id: "ai",
    label: "AI Governance",
    headline: "Govern your AI responsibly.",
    body: "ISO 42001 compliance built specifically for companies building or deploying AI. Map AI system risks, track model governance, and demonstrate responsible AI use to customers, regulators, and investors.",
    stats: [
      { v: "#1", l: "ISO 42001 platform" },
      { v: "6wk", l: "Time to compliance" },
      { v: "AI", l: "Purpose-built tooling" },
    ],
  },
  {
    id: "trust",
    label: "Trust Center",
    headline: "Turn security into pipeline.",
    body: "Share a branded Trust Center with prospects and customers. Answer security questionnaires in seconds with AI. Close deals faster by making your security posture transparent and credible.",
    stats: [
      { v: "10×", l: "Faster questionnaires" },
      { v: "40%", l: "Shorter sales cycles" },
      { v: "∞", l: "Customer trust" },
    ],
  },
];

/* ── frameworks ── */
const FW = [
  { abbr: "SOC 2",     full: "SOC 2 Type II",    cat: "Security",     pop: true },
  { abbr: "27001",     full: "ISO 27001:2022",   cat: "Enterprise",   pop: false },
  { abbr: "42001",     full: "ISO 42001",        cat: "AI Governance",pop: false },
  { abbr: "PCI",       full: "PCI DSS v4.0",    cat: "Fintech",      pop: false },
  { abbr: "HIPAA",     full: "HIPAA",            cat: "Healthcare",   pop: false },
  { abbr: "GDPR",      full: "GDPR & DPDPA",    cat: "Privacy",      pop: false },
  { abbr: "NIST",      full: "NIST CSF 2.0",    cat: "Federal",      pop: false },
  { abbr: "CIS",       full: "CIS Controls v8",  cat: "Security",     pop: false },
];

/* ── resources ── */
const RESOURCES = [
  { tag: "Guide", title: "The Complete SOC 2 Checklist for 2025", read: "8 min read" },
  { tag: "Webinar", title: "ISO 42001: What AI companies need to know", read: "45 min watch" },
  { tag: "Case Study", title: "How Helios AI got ISO 27001 in 9 weeks", read: "5 min read" },
];

/* ── word reveal headline ── */
function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-50px" });
  return (
    <span ref={ref} style={{ display: "inline" }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.22em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={visible ? { y: 0 } : {}}
            transition={{ duration: 0.62, delay: delay + i * 0.055, ease }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOp = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ background: "#030305", color: "#f2f2f4", minHeight: "100vh" }}>
      <AnimatedBg />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: "relative", zIndex: 1,
          minHeight: "100vh",
          paddingTop: 60,
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}
      >
        <motion.div
          style={{
            y: heroY, opacity: heroOp,
            maxWidth: 1200, width: "100%",
            margin: "0 auto",
            padding: "80px 32px 60px",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.28)",
                borderRadius: 100, padding: "5px 14px", marginBottom: 36,
              }}
            >
              <span className="flicker" style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#a5b4fc" }}>
                AI-Powered Compliance Platform
              </span>
            </motion.div>

            <h1 style={{
              fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              marginBottom: 28,
            }}>
              <WordReveal text="Compliance shouldn't" delay={0.15} />
              <br />
              <span style={{ color: "#818cf8" }}>
                <WordReveal text="slow you down." delay={0.35} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease }}
              style={{
                fontSize: 17, color: "rgba(242,242,244,0.48)",
                lineHeight: 1.78, letterSpacing: "-0.01em",
                maxWidth: 480, marginBottom: 40,
              }}
            >
              Avirio automates SOC 2, ISO 27001, ISO 42001 and more. Your team
              ships features, not evidence. From day one to audit day and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 56 }}
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, boxShadow: "0 0 36px rgba(99,102,241,0.4)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-block", textDecoration: "none",
                  fontSize: 15, fontWeight: 600, background: "#4f46e5", color: "#fff",
                  padding: "13px 28px", borderRadius: 10, letterSpacing: "-0.01em",
                }}
              >
                Get a demo
              </motion.a>
              <motion.a
                href="/frameworks"
                whileHover={{ color: "rgba(242,242,244,0.85)" }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
                  fontSize: 15, fontWeight: 500, color: "rgba(242,242,244,0.45)",
                  letterSpacing: "-0.01em",
                }}
              >
                See all frameworks
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>→</motion.span>
              </motion.a>
            </motion.div>

            {/* micro stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.6 }}
              style={{ display: "flex", gap: 36, flexWrap: "wrap" }}
            >
              {[
                { v: 80, s: "%", l: "Faster to certified" },
                { v: 20, s: "+", l: "Frameworks" },
                { v: 500, s: "+", l: "Controls automated" },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                    <Counter end={s.v} suffix={s.s} />
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(242,242,244,0.3)", letterSpacing: "0.07em", textTransform: "uppercase", marginTop: 3 }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT audit widget */}
          <AuditWidget />
        </motion.div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, #030305, transparent)", pointerEvents: "none" }} />
      </section>

      {/* ── PLATFORM TABS ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal className="mb-16">
            <div className="section-label" style={{ marginBottom: 14 }}>The platform</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08, maxWidth: 560 }}>
              Your compliance operating system
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 48, alignItems: "start" }}>
            {/* tab list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2, position: "sticky", top: 100 }}>
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    border: "none", padding: "13px 16px",
                    borderRadius: 8, textAlign: "left", width: "100%",
                    cursor: "pointer",
                    background: activeTab === i ? "rgba(99,102,241,0.1)" : "transparent",
                    borderLeft: `2px solid ${activeTab === i ? "#4f46e5" : "transparent"}`,
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{
                    fontSize: 13, fontWeight: activeTab === i ? 600 : 500,
                    color: activeTab === i ? "#f2f2f4" : "rgba(242,242,244,0.42)",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s",
                  }}>
                    {tab.label}
                  </span>
                </button>
              ))}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <Link href="/platform" style={{ fontSize: 13, color: "#818cf8", textDecoration: "none" }} className="link-underline">
                  Explore the full platform →
                </Link>
              </div>
            </div>

            {/* tab content */}
            <div style={{ minHeight: 360 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.35, ease }}
                  style={{
                    background: "rgba(7,7,12,0.7)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16, padding: "48px",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 90% 10%, rgba(99,102,241,0.07), transparent 55%)", pointerEvents: "none" }} />
                  <div className="section-label" style={{ marginBottom: 18 }}>{TABS[activeTab].label}</div>
                  <h3 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 20 }}>
                    {TABS[activeTab].headline}
                  </h3>
                  <p style={{ fontSize: 16, color: "rgba(242,242,244,0.5)", lineHeight: 1.78, letterSpacing: "-0.01em", maxWidth: 520, marginBottom: 40 }}>
                    {TABS[activeTab].body}
                  </p>
                  <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                    {TABS[activeTab].stats.map((s) => (
                      <div key={s.l}>
                        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em" }}>{s.v}</div>
                        <div style={{ fontSize: 12, color: "rgba(242,242,244,0.35)", marginTop: 4, letterSpacing: "0.04em" }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAMEWORKS ── */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.012)", padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
            <Reveal>
              <div className="section-label" style={{ marginBottom: 14 }}>Frameworks</div>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08 }}>
                Multi-framework.<br />One source of truth.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Link href="/frameworks" style={{ fontSize: 13, color: "#818cf8", textDecoration: "none" }} className="link-underline">
                View all frameworks →
              </Link>
            </Reveal>
          </div>

          <StaggerReveal
            className="grid"
            style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}
          >
            {FW.map((fw) => (
              <motion.div
                key={fw.abbr}
                whileHover={{
                  borderColor: "rgba(99,102,241,0.5)",
                  backgroundColor: "rgba(99,102,241,0.06)",
                  y: -3,
                }}
                transition={{ duration: 0.2 }}
                data-hover
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: "24px",
                  cursor: "default", position: "relative",
                }}
              >
                {fw.pop && (
                  <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#818cf8", background: "rgba(99,102,241,0.12)", padding: "2px 7px", borderRadius: 100 }}>
                    Popular
                  </div>
                )}
                <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 700, color: "rgba(242,242,244,0.3)", letterSpacing: "0.1em", marginBottom: 10 }}>
                  {fw.abbr}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>{fw.full}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                  <span style={{ fontSize: 11, color: "rgba(242,242,244,0.35)", letterSpacing: "0.04em" }}>{fw.cat}</span>
                </div>
              </motion.div>
            ))}
          </StaggerReveal>

          {/* cross-mapping callout */}
          <Reveal delay={0.1} className="mt-12">
            <div style={{
              background: "linear-gradient(135deg, rgba(79,70,229,0.1), rgba(99,102,241,0.04))",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: 14, padding: "28px 36px",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
            }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 }}>
                  Cross-framework control mapping
                </div>
                <div style={{ fontSize: 14, color: "rgba(242,242,244,0.45)", maxWidth: 480 }}>
                  One control can satisfy SOC 2, ISO 27001, and PCI DSS simultaneously. Never duplicate compliance work.
                </div>
              </div>
              <Link href="/frameworks" style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{ fontSize: 13, fontWeight: 600, color: "#818cf8", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", padding: "9px 20px", borderRadius: 8 }}
                >
                  Learn how it works →
                </motion.div>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "120px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <div style={{ fontSize: 11, color: "rgba(242,242,244,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 40 }}>
              Why Avirio
            </div>
            <p style={{
              fontSize: "clamp(1.35rem,2.6vw,2.1rem)", fontWeight: 600,
              lineHeight: 1.48, letterSpacing: "-0.025em", color: "rgba(242,242,244,0.78)",
            }}>
              The fastest-growing companies do not treat compliance as a tax. They treat it as{" "}
              <span style={{ color: "#818cf8" }}>infrastructure</span>. Something that runs
              automatically, scales with the business, and opens doors that manual processes never could.
              <br /><br />
              When your competitor is still filling out spreadsheets,{" "}
              <span style={{ color: "#f2f2f4", fontWeight: 700 }}>you are already certified.</span>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 44 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#818cf8" }}>A</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Avirio</div>
                <div style={{ fontSize: 12, color: "rgba(242,242,244,0.3)", marginTop: 2 }}>avirio.com</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SOLUTIONS BY SIZE ── */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal className="mb-14">
            <div className="section-label" style={{ marginBottom: 14 }}>Solutions</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08 }}>
              Built for every stage.
            </h2>
          </Reveal>

          <StaggerReveal
            className="grid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {[
              {
                tier: "Startups",
                tag: "Move fast",
                headline: "Get SOC 2 without slowing down your team",
                body: "Designed for seed to Series B companies that need to close enterprise deals. Get certified in weeks, not months.",
                items: ["Fast-track certification path", "Investor-ready security posture", "Pre-built policy templates", "No compliance expertise required"],
                cta: "For startups →",
              },
              {
                tier: "Growth",
                tag: "Scale smart",
                headline: "Manage multiple frameworks without the overhead",
                body: "For Series B+ companies running multiple certifications simultaneously. Cross-mapping means you don't duplicate effort.",
                items: ["Multi-framework management", "Cross-framework control mapping", "Vendor risk at scale", "Dedicated success team"],
                cta: "For growth companies →",
                featured: true,
              },
              {
                tier: "Enterprise",
                tag: "Command complexity",
                headline: "Compliance infrastructure for large organizations",
                body: "For companies with complex, multi-entity compliance requirements. Private deployment, SSO, and compliance engineering support.",
                items: ["Multi-entity support", "Private cloud deployment", "SSO, SCIM, audit trails", "Compliance engineering"],
                cta: "For enterprise →",
              },
            ].map((s) => (
              <motion.div
                key={s.tier}
                whileHover={{ y: -4, boxShadow: s.featured ? "0 24px 56px rgba(99,102,241,0.14)" : "0 16px 48px rgba(0,0,0,0.4)" }}
                transition={{ duration: 0.22 }}
                style={{
                  background: s.featured ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.025)",
                  border: s.featured ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16, padding: "36px",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em" }}>{s.tier}</div>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: s.featured ? "#818cf8" : "rgba(242,242,244,0.3)", background: s.featured ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.06)", padding: "3px 9px", borderRadius: 100 }}>
                    {s.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.28, marginBottom: 14 }}>{s.headline}</h3>
                <p style={{ fontSize: 14, color: "rgba(242,242,244,0.45)", lineHeight: 1.72, marginBottom: 24 }}>{s.body}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, marginBottom: 28 }}>
                  {s.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: "rgba(242,242,244,0.5)" }}>
                      <span style={{ color: "#10b981", flexShrink: 0 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <Link href="/solutions" style={{ fontSize: 13, fontWeight: 600, color: s.featured ? "#818cf8" : "rgba(242,242,244,0.5)", textDecoration: "none" }} className="link-underline">
                  {s.cta}
                </Link>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <Reveal>
              <div className="section-label" style={{ marginBottom: 14 }}>Resources</div>
              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
                From the Avirio team
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/resources" style={{ fontSize: 13, color: "#818cf8", textDecoration: "none" }} className="link-underline">View all →</Link>
            </Reveal>
          </div>

          <StaggerReveal className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {RESOURCES.map((r) => (
              <motion.a
                key={r.title}
                href="#"
                whileHover={{ borderColor: "rgba(255,255,255,0.14)", y: -3 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "block", textDecoration: "none",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14, padding: "28px",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", marginBottom: 16 }}>{r.tag}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.4, color: "#f2f2f4", marginBottom: 16 }}>{r.title}</h3>
                <div style={{ fontSize: 12, color: "rgba(242,242,244,0.3)" }}>{r.read}</div>
              </motion.a>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 32px 120px" }}>
        <Reveal>
          <motion.div
            whileHover={{ borderColor: "rgba(99,102,241,0.3)" }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: 1200, margin: "0 auto",
              background: "linear-gradient(160deg, rgba(79,70,229,0.08), rgba(3,3,5,0) 60%)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 24, padding: "96px 64px",
              textAlign: "center", position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.12), transparent 65%)", pointerEvents: "none" }} />
            <div className="section-label" style={{ marginBottom: 20 }}>Get started</div>
            <h2 style={{
              fontSize: "clamp(2.2rem,5vw,4.4rem)", fontWeight: 800,
              letterSpacing: "-0.045em", lineHeight: 1.02, marginBottom: 20,
            }}>
              Ready when you are.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(242,242,244,0.45)", maxWidth: 440, margin: "0 auto 44px", lineHeight: 1.75, letterSpacing: "-0.01em" }}>
              Join hundreds of security teams who automated their path to SOC 2, ISO 27001, and beyond.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(99,102,241,0.38)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-block", textDecoration: "none",
                  fontSize: 15, fontWeight: 600, background: "#4f46e5", color: "#fff",
                  padding: "14px 32px", borderRadius: 10, letterSpacing: "-0.01em",
                }}
              >
                Get a demo
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ background: "rgba(255,255,255,0.09)", color: "rgba(242,242,244,0.85)" }}
                style={{
                  display: "inline-block", textDecoration: "none",
                  fontSize: 15, fontWeight: 500, background: "rgba(255,255,255,0.05)",
                  color: "rgba(242,242,244,0.55)", padding: "14px 32px", borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.09)", letterSpacing: "-0.01em",
                }}
              >
                Start free trial
              </motion.a>
            </div>
          </motion.div>
        </Reveal>
      </section>
    </div>
  );
}
