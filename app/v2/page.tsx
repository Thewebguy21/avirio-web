/* eslint-disable */
"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── scramble text ── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!active) return;
    let iter = 0;
    const id = setInterval(() => {
      setOut(
        text.split("").map((ch, i) => {
          if (ch === " " || ch === "\n") return ch;
          if (i < iter) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      iter += 0.55;
      if (iter >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [active, text]);
  return <>{out}</>;
}

/* ── count up ── */
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1300, steps = 55;
    let cur = 0;
    const t = setInterval(() => {
      cur += end / steps;
      if (cur >= end) { setVal(end); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(t);
  }, [inView, end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── reveal ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const FW = [
  { n: "01", name: "SOC 2 Type II",  cat: "Security",      tags: "Evidence automation · Continuous monitoring · Auditor portal" },
  { n: "02", name: "ISO 27001:2022", cat: "Enterprise",     tags: "Annex A · Risk treatment · Statement of Applicability" },
  { n: "03", name: "ISO 42001",      cat: "AI Governance",  tags: "AI management system · First-mover advantage" },
  { n: "04", name: "PCI DSS v4.0",   cat: "Fintech",        tags: "CHD scoping · Automated testing · Network validation" },
  { n: "05", name: "HIPAA",          cat: "Healthcare",     tags: "PHI tracking · BAA management · Breach notification" },
  { n: "06", name: "GDPR & DPDPA",   cat: "Privacy",        tags: "ROPA · Data subject rights · Cross-border transfers" },
];

export default function V2() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [scramble, setScramble] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setScramble(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#000",
        color: "#f0f0f0",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
      `}</style>

      {/* ── ANIMATED BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.025,
          }}
        />
        {/* amber orbs */}
        <div
          className="orb-a absolute rounded-full"
          style={{
            width: 800, height: 800,
            top: "-15%", right: "5%",
            background: "radial-gradient(circle, rgba(217,119,6,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="orb-b absolute rounded-full"
          style={{
            width: 600, height: 600,
            bottom: "10%", left: "0%",
            background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="orb-c absolute rounded-full"
          style={{
            width: 400, height: 400,
            top: "40%", left: "35%",
            background: "radial-gradient(circle, rgba(180,83,9,0.08) 0%, transparent 70%)",
          }}
        />
        {/* scan line */}
        <div
          className="scan-line absolute left-0 right-0"
          style={{
            height: 160,
            background: "linear-gradient(to bottom, transparent, rgba(217,119,6,0.03) 50%, transparent)",
          }}
        />
      </div>

      {/* ── NAV ── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: "0 40px", height: 58,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div
          className="flex items-center gap-2.5"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span
            className="flicker rounded-full"
            style={{ width: 8, height: 8, background: "#f59e0b", display: "inline-block" }}
          />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Avirio
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: "'Space Mono', monospace" }}>
          {["Product", "Frameworks", "Pricing", "Company"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
              className="hover:text-white/75 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        <motion.button
          whileHover={{ backgroundColor: "rgba(217,119,6,1)", boxShadow: "0 0 28px rgba(217,119,6,0.45)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            background: "#d97706", color: "#000",
            padding: "9px 20px", border: "none", cursor: "pointer",
            clipPath: "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))",
          }}
        >
          Request access →
        </motion.button>
      </motion.header>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: "100vh", paddingTop: 58, zIndex: 1 }}
      >
        <motion.div
          style={{
            y: heroY,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: 40,
            padding: "80px 40px 0",
            minHeight: "calc(100vh - 58px - 80px)",
          }}
        >
          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "#f59e0b", marginBottom: 32,
              }}
            >
              // Compliance infrastructure
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              style={{
                fontWeight: 700, textTransform: "uppercase",
                lineHeight: 0.92, letterSpacing: "-0.04em",
                fontSize: "clamp(3.2rem, 6.5vw, 6rem)",
                marginBottom: 28,
              }}
            >
              <ScrambleText text="COMPLIANCE" active={scramble} />
              <br />
              <span style={{ color: "#f59e0b" }}>IS NOT A</span>
              <br />
              CHECKBOX.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease }}
              style={{
                fontSize: 15, color: "rgba(255,255,255,0.42)", lineHeight: 1.82,
                maxWidth: 420, marginBottom: 36,
              }}
            >
              Avirio automates SOC 2, ISO 27001, ISO 42001 and more. The fastest-growing
              companies treat compliance as a moat. Start building yours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 flex-wrap"
            >
              <motion.button
                whileHover={{ boxShadow: "0 0 40px rgba(217,119,6,0.5)", backgroundColor: "rgba(217,119,6,1)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  background: "#d97706", color: "#000",
                  padding: "14px 28px", border: "none", cursor: "pointer",
                  clipPath: "polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))",
                }}
              >
                Get early access
              </motion.button>
              <motion.button
                whileHover={{ borderColor: "rgba(255,255,255,0.4)", color: "rgba(255,255,255,0.8)" }}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  background: "none", color: "rgba(255,255,255,0.4)",
                  padding: "14px 28px", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer",
                }}
              >
                See it live →
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — audit widget */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.85, ease }}
          >
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.025)",
                padding: "36px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute", top: -10, left: 20,
                  background: "#000", padding: "0 8px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f59e0b",
                }}
              >
                Live audit score
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 80, fontWeight: 700, lineHeight: 1, marginBottom: 6,
                }}
              >
                94<span style={{ color: "#f59e0b" }}>%</span>
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)", marginBottom: 16,
                }}
              >
                SOC 2 TYPE II READINESS
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.08)", marginBottom: 20 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "94%" }}
                  transition={{ delay: 0.9, duration: 1.3, ease }}
                  style={{ height: "100%", background: "linear-gradient(to right, #d97706, #fbbf24)" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { label: "Access Control",   ok: true },
                  { label: "Encryption",       ok: true },
                  { label: "Change Mgmt",      ok: true },
                  { label: "Vendor Review",    ok: false, note: "2 gaps" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.018)",
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                        textTransform: "uppercase", marginBottom: 4,
                        color: item.ok ? "#34d399" : "#f59e0b",
                      }}
                    >
                      {item.ok ? "✓ Passing" : `✗ ${item.note}`}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* STAT BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            marginTop: 60,
            zIndex: 1,
          }}
        >
          {[
            { end: 80, suf: "%", label: "Faster certification" },
            { end: 12, suf: "+", label: "Frameworks" },
            { end: 500, suf: "+", label: "Controls automated" },
            { end: 3,  suf: "×", label: "ROI year one" },
            { end: 0,  suf: "",  label: "Manual spreadsheets" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "20px 32px",
                borderRight: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em",
                }}
              >
                <CountUp end={s.end} suffix={s.suf} />
              </div>
              <div
                style={{
                  fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)", marginTop: 3,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div
        style={{
          borderTop: "1px solid rgba(245,158,11,0.15)",
          borderBottom: "1px solid rgba(245,158,11,0.15)",
          background: "rgba(245,158,11,0.03)",
          padding: "14px 0",
          overflow: "hidden",
          zIndex: 1,
          position: "relative",
        }}
      >
        <div
          className="marquee flex gap-10 whitespace-nowrap"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {Array(3).fill([
            "SOC 2 TYPE II", "///", "ISO 27001:2022", "///", "ISO 42001", "///",
            "PCI DSS v4.0", "///", "HIPAA", "///", "GDPR", "///", "DPDPA", "///",
            "NIST CSF", "///", "CIS Controls", "///",
          ]).flat().map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                color: item === "///" ? "#d97706" : "rgba(255,255,255,0.28)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── FRAMEWORKS ── */}
      <section style={{ padding: "100px 40px", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#f59e0b", marginBottom: 20,
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <span style={{ width: 24, height: 1, background: "#f59e0b", display: "inline-block" }} />
            Frameworks
          </div>
          <h2
            style={{
              fontWeight: 700, textTransform: "uppercase",
              lineHeight: 0.95, letterSpacing: "-0.04em",
              fontSize: "clamp(2rem,4.5vw,4rem)",
              marginBottom: 16,
            }}
          >
            Every standard.<br /><span style={{ color: "#f59e0b" }}>One platform.</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.38)", maxWidth: 420, lineHeight: 1.78, marginBottom: 48 }}>
            Cross-mapped controls mean you satisfy multiple certifications simultaneously.
          </p>
        </Reveal>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {FW.map((fw, i) => (
            <Reveal key={fw.n} delay={i * 0.06}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(245,158,11,0.04)", x: 4 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 220px 1fr 120px",
                  gap: "0 28px",
                  padding: "24px 6px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  alignItems: "center",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em",
                  }}
                >
                  {fw.n}
                </span>
                <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.015em" }}>
                  {fw.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.03em",
                  }}
                >
                  {fw.tags}
                </span>
                <div className="flex items-center justify-end gap-1.5">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
                    className="rounded-full"
                    style={{ width: 6, height: 6, background: "#f59e0b", display: "inline-block" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f59e0b",
                    }}
                  >
                    Live
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section
        style={{
          position: "relative", zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "100px 40px",
          background: "rgba(245,158,11,0.02)",
        }}
      >
        <Reveal className="max-w-[860px]">
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#f59e0b", marginBottom: 36,
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <span style={{ width: 24, height: 1, background: "#f59e0b", display: "inline-block" }} />
            Why Avirio
          </div>
          <blockquote
            style={{
              fontWeight: 600, lineHeight: 1.38, letterSpacing: "-0.025em",
              fontSize: "clamp(1.4rem,3vw,2.6rem)",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Compliance used to mean months of consultants, folders of
            screenshots, and a single anxious audit.<br /><br />
            <span style={{ color: "#f59e0b" }}>That era is over.</span><br /><br />
            The fastest-growing companies treat compliance as infrastructure —
            automated, continuous, deeply integrated. When your competitor is
            still filling out spreadsheets, you are{" "}
            <span style={{ color: "#f59e0b" }}>already certified.</span>
          </blockquote>
          <div className="flex items-center gap-5 mt-12">
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.15)" }} />
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Avirio — Built for teams that don&apos;t stop
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ padding: "100px 40px" }}>
          <Reveal className="mb-14">
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#f59e0b", marginBottom: 20,
                display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <span style={{ width: 24, height: 1, background: "#f59e0b", display: "inline-block" }} />
              Capabilities
            </div>
            <h2
              style={{
                fontWeight: 700, textTransform: "uppercase",
                lineHeight: 0.95, letterSpacing: "-0.04em",
                fontSize: "clamp(2rem,4vw,3.5rem)",
              }}
            >
              Infrastructure-grade<br /><span style={{ color: "#f59e0b" }}>compliance tooling</span>
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {[
              { n: "01", t: "Zero-touch evidence",       b: "Connect your stack in 30 min. Avirio pulls evidence automatically from AWS, GCP, Azure, GitHub, Okta, and 50+ tools. No screenshots, no exports." },
              { n: "02", t: "Cross-framework intelligence", b: "One control, multiple certs. Avirio maps overlaps across SOC 2, ISO 27001, PCI DSS — you never duplicate compliance work." },
              { n: "03", t: "AI-generated documentation", b: "Stop paying $400/hr consultants to write policies. Describe your company — audit-ready docs in minutes, not weeks." },
              { n: "04", t: "Continuous drift detection",  b: "Real-time monitoring catches control failures before they become audit findings. Annual recerts become a formality." },
            ].map((f, i) => (
              <Reveal key={f.n} delay={i * 0.07}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(245,158,11,0.03)" }}
                  style={{
                    padding: "48px",
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    transition: "background 0.2s",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.2)", marginBottom: 20,
                    }}
                  >
                    {f.n}
                  </div>
                  <h3
                    style={{
                      fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em",
                      textTransform: "uppercase", marginBottom: 12,
                    }}
                  >
                    {f.t}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.82 }}>
                    {f.b}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div
        style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "relative", zIndex: 1,
        }}
      >
        {[
          { end: 80, suf: "%", label: "Reduction in time to certification vs. manual" },
          { end: 12, suf: "+", label: "Major compliance frameworks supported" },
          { end: 500, suf: "+", label: "Individual controls automated" },
          { end: 3,  suf: "×", label: "Average ROI in year one" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ backgroundColor: "rgba(245,158,11,0.03)" }}
              style={{
                padding: "56px 40px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1,
                  fontSize: "clamp(2.5rem,4vw,4rem)", marginBottom: 14,
                }}
              >
                <CountUp end={s.end} suffix={s.suf} />
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.55 }}>
                {s.label}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* ── PRICING ── */}
      <section style={{ padding: "100px 40px", position: "relative", zIndex: 1 }}>
        <Reveal className="mb-16">
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#f59e0b", marginBottom: 20,
              display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <span style={{ width: 24, height: 1, background: "#f59e0b", display: "inline-block" }} />
            Pricing
          </div>
          <h2
            style={{
              fontWeight: 700, textTransform: "uppercase",
              lineHeight: 0.95, letterSpacing: "-0.04em",
              fontSize: "clamp(2rem,4vw,3.5rem)",
            }}
          >
            No nonsense.<br /><span style={{ color: "#f59e0b" }}>No hidden fees.</span>
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            {
              tier: "Starter", price: "$499", mo: true,
              desc: "For startups pursuing their first certification.",
              items: ["1 framework", "Up to 10 users", "Core integrations", "AI policy generation", "Auditor portal"],
              hot: false, cta: "Start free trial",
            },
            {
              tier: "Growth", price: "$1,299", mo: true,
              desc: "For teams managing multiple certifications.",
              items: ["3 frameworks + cross-mapping", "Unlimited users", "All 50+ integrations", "Vendor risk management", "Dedicated success manager"],
              hot: true, cta: "Get started",
            },
            {
              tier: "Enterprise", price: "Custom", mo: false,
              desc: "For large orgs with complex compliance programs.",
              items: ["Unlimited frameworks", "Private cloud deployment", "Custom integrations", "SSO, SCIM, audit logs", "Compliance engineering support"],
              hot: false, cta: "Talk to us",
            },
          ].map((plan, i) => (
            <Reveal key={plan.tier} delay={i * 0.1}>
              <div
                style={{
                  padding: "44px 36px",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  background: plan.hot ? "rgba(245,158,11,0.04)" : "transparent",
                  position: "relative",
                  display: "flex", flexDirection: "column", height: "100%",
                }}
              >
                {plan.hot && (
                  <div
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      background: "#d97706", color: "#000",
                      textAlign: "center", padding: "7px 0",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                    }}
                  >
                    Most chosen
                  </div>
                )}
                <div style={plan.hot ? { paddingTop: 28 } : {}}>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)", marginBottom: 20,
                    }}
                  >
                    {plan.tier}
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    {plan.mo && (
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>/mo</span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", marginBottom: 24, lineHeight: 1.7 }}>
                    {plan.desc}
                  </p>
                  <motion.button
                    whileHover={plan.hot ? { boxShadow: "0 0 28px rgba(217,119,6,0.4)" } : { borderColor: "rgba(255,255,255,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%", padding: "12px 0",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      background: plan.hot ? "#d97706" : "none",
                      color: plan.hot ? "#000" : "rgba(255,255,255,0.5)",
                      border: plan.hot ? "none" : "1px solid rgba(255,255,255,0.15)",
                      cursor: "pointer", marginBottom: 28,
                      clipPath: plan.hot ? "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" : "none",
                    }}
                  >
                    {plan.cta} →
                  </motion.button>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
                    {plan.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex", alignItems: "flex-start", gap: 10,
                          fontSize: 13, color: "rgba(255,255,255,0.38)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            color: "#d97706", flexShrink: 0,
                          }}
                        >
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          alignItems: "center", gap: 64,
          padding: "100px 40px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          position: "relative", zIndex: 1,
        }}
      >
        <Reveal>
          <h2
            style={{
              fontWeight: 700, textTransform: "uppercase",
              lineHeight: 0.92, letterSpacing: "-0.04em",
              fontSize: "clamp(2.5rem,5.5vw,5rem)",
            }}
          >
            Stop treating<br />compliance<br />like{" "}
            <span style={{ color: "#f59e0b" }}>paperwork.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.38)", lineHeight: 1.82, marginBottom: 28 }}>
            The companies winning enterprise deals today made compliance
            infrastructure — not an afterthought. SOC 2 in 8 weeks. ISO 27001
            in 12. ISO 42001 before your competitors have heard of it.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
            <motion.button
              whileHover={{ boxShadow: "0 0 40px rgba(217,119,6,0.5)", backgroundColor: "rgba(217,119,6,1)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                background: "#d97706", color: "#000",
                padding: "15px 30px", border: "none", cursor: "pointer",
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
            >
              Get early access →
            </motion.button>
            <motion.button
              whileHover={{ borderColor: "rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.75)" }}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                background: "none", color: "rgba(255,255,255,0.35)",
                padding: "15px 30px", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
              }}
            >
              Schedule a call
            </motion.button>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 40px",
          display: "grid", gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center", gap: 20,
          position: "relative", zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          © 2025 Avirio Inc.
        </div>
        <div
          className="flex items-center gap-2.5"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span
            className="flicker rounded-full"
            style={{ width: 7, height: 7, background: "#f59e0b", display: "inline-block" }}
          />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Avirio
          </span>
        </div>
        <div className="flex gap-5 justify-end">
          {["Product", "Docs", "Blog", "Privacy", "Terms"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}
              className="hover:text-white/60 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </footer>

      {/* version switcher */}
      <div className="fixed bottom-5 right-5 z-50 flex gap-2">
        <a
          href="/"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)",
            padding: "6px 14px", textDecoration: "none",
          }}
          className="hover:bg-white/15 transition-colors"
        >
          ← V1 Enterprise
        </a>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11, background: "#d97706", color: "#000",
            padding: "6px 14px", fontWeight: 700,
          }}
        >
          V2 — Brutal
        </div>
      </div>
    </div>
  );
}
