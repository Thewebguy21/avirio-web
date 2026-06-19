"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import AnimatedBg from "../components/AnimatedBg";
import { Reveal, StaggerReveal } from "../components/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const FRAMEWORKS = [
  {
    abbr: "SOC 2",
    name: "SOC 2 Type II",
    category: "Security",
    desc: "The gold standard for SaaS companies selling into enterprise. Automated evidence collection across all Trust Services Criteria Availability, Security, Confidentiality, Processing Integrity, Privacy.",
    controls: 64,
    time: "8–12 wks",
    popular: true,
    tags: ["SaaS", "Enterprise Sales", "Startup Requirement"],
  },
  {
    abbr: "27001",
    name: "ISO 27001:2022",
    category: "Enterprise",
    desc: "The global standard for information security management. Full Annex A control library (93 controls), risk treatment, gap analysis, and automated Statement of Applicability generation.",
    controls: 93,
    time: "10–16 wks",
    popular: false,
    tags: ["Global", "ISMS", "Risk-based"],
  },
  {
    abbr: "42001",
    name: "ISO 42001",
    category: "AI Governance",
    desc: "The first international standard for AI management systems. Built for companies building or deploying AI/ML map AI system risks, track model governance, demonstrate responsible AI to regulators.",
    controls: 38,
    time: "6–10 wks",
    popular: false,
    tags: ["AI/ML", "Emerging", "Regulatory"],
  },
  {
    abbr: "PCI DSS",
    name: "PCI DSS v4.0",
    category: "Fintech",
    desc: "Payment card industry data security standard. Cardholder data environment scoping, automated control testing, network segmentation validation, and continuous monitoring for payment security.",
    controls: 281,
    time: "12–20 wks",
    popular: false,
    tags: ["Payments", "Fintech", "Level 1–4"],
  },
  {
    abbr: "HIPAA",
    name: "HIPAA",
    category: "Healthcare",
    desc: "Health Insurance Portability and Accountability Act. PHI safeguard tracking, Business Associate Agreement management, breach notification workflows, and risk analysis tooling for health tech.",
    controls: 54,
    time: "8–14 wks",
    popular: false,
    tags: ["Healthcare", "PHI", "BAA"],
  },
  {
    abbr: "GDPR",
    name: "GDPR",
    category: "Privacy",
    desc: "General Data Protection Regulation. Data subject rights automation, Record of Processing Activities generation, Data Protection Agreement management, and cross-border transfer documentation.",
    controls: 48,
    time: "8–12 wks",
    popular: false,
    tags: ["EU", "Privacy", "Data rights"],
  },
  {
    abbr: "DPDPA",
    name: "DPDPA",
    category: "Privacy",
    desc: "India's Digital Personal Data Protection Act. Consent management, data fiduciary obligations, significant data fiduciary requirements, and cross-border data transfer compliance tooling.",
    controls: 32,
    time: "6–10 wks",
    popular: false,
    tags: ["India", "Privacy", "Consent"],
  },
  {
    abbr: "NIST CSF",
    name: "NIST CSF 2.0",
    category: "Federal",
    desc: "The NIST Cybersecurity Framework v2.0. Govern, Identify, Protect, Detect, Respond, Recover a comprehensive risk-based approach aligned with modern threat landscapes.",
    controls: 106,
    time: "10–14 wks",
    popular: false,
    tags: ["Federal", "Risk-based", "Comprehensive"],
  },
  {
    abbr: "CIS",
    name: "CIS Controls v8",
    category: "Security",
    desc: "18 critical security controls prioritized by impact. Automated mapping across your asset inventory, identity management, data protection, and incident response processes.",
    controls: 153,
    time: "8–12 wks",
    popular: false,
    tags: ["Best Practice", "Prioritized", "Technical"],
  },
  {
    abbr: "SOC 1",
    name: "SOC 1 Type II",
    category: "Financial",
    desc: "For service organizations impacting user financial statements. Scoped to ICFR controls ideal for payroll processors, data centers, and financial platforms.",
    controls: 40,
    time: "8–12 wks",
    popular: false,
    tags: ["Financial", "ICFR", "Audit"],
  },
  {
    abbr: "CCPA",
    name: "CCPA / CPRA",
    category: "Privacy",
    desc: "California Consumer Privacy Act and California Privacy Rights Act. Consumer rights management, data inventory, opt-out mechanisms, and annual data protection assessments.",
    controls: 28,
    time: "6–8 wks",
    popular: false,
    tags: ["California", "Privacy", "Consumer rights"],
  },
  {
    abbr: "HITRUST",
    name: "HITRUST CSF",
    category: "Healthcare",
    desc: "The comprehensive healthcare security framework combining HIPAA, ISO 27001, NIST, and more. r2 and i1 assessments supported with automated control mapping across all 19 domains.",
    controls: 156,
    time: "14–22 wks",
    popular: false,
    tags: ["Healthcare", "Comprehensive", "Certified"],
  },
];

const CATS = ["All", "Security", "Privacy", "Enterprise", "AI Governance", "Fintech", "Healthcare", "Federal", "Financial"];

function FrameworkCard({ fw, i }: { fw: typeof FRAMEWORKS[0]; i: number }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
    >
      <motion.div
        whileHover={{ borderColor: "rgba(99,102,241,0.4)", y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
        transition={{ duration: 0.2 }}
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "32px",
          height: "100%", display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
        }}
      >
        {fw.popular && (
          <div style={{ position: "absolute", top: 20, right: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#818cf8", background: "rgba(99,102,241,0.12)", padding: "3px 9px", borderRadius: 100 }}>
            Most popular
          </div>
        )}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 700, color: "rgba(242,242,244,0.25)", letterSpacing: "0.1em", paddingTop: 3 }}>
            {fw.abbr}
          </div>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 4 }}>{fw.name}</h3>
            <span style={{ fontSize: 11, color: "rgba(242,242,244,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{fw.category}</span>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "rgba(242,242,244,0.45)", lineHeight: 1.75, marginBottom: 24, flex: 1 }}>{fw.desc}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {fw.tags.map((t) => (
            <span key={t} style={{ fontSize: 11, color: "rgba(242,242,244,0.35)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", padding: "3px 9px", borderRadius: 100 }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", gap: 24 }}>
            <div>
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>{fw.controls}</div>
              <div style={{ fontSize: 11, color: "rgba(242,242,244,0.3)", marginTop: 1 }}>Controls</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>{fw.time}</div>
              <div style={{ fontSize: 11, color: "rgba(242,242,244,0.3)", marginTop: 1 }}>Typical timeline</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", letterSpacing: "0.06em", textTransform: "uppercase" }}>Live</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FrameworksPage() {
  const [activecat, setActivecat] = useState("All");
  const filtered = activecat === "All" ? FRAMEWORKS : FRAMEWORKS.filter((f) => f.category === activecat);

  return (
    <div style={{ background: "#030305", color: "#f2f2f4", minHeight: "100vh" }}>
      <AnimatedBg />

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: 140, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 20 }}>
              Frameworks
            </div>
            <h1 style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.97, marginBottom: 24, maxWidth: 700 }}>
              Every standard.<br />
              <span style={{ color: "#818cf8" }}>One platform.</span>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(242,242,244,0.48)", maxWidth: 520, lineHeight: 1.78, letterSpacing: "-0.01em" }}>
              Avirio supports 12+ major compliance frameworks with cross-mapped controls so you satisfy multiple certifications without duplicating work.
            </p>
          </motion.div>

          {/* cross-mapping stat row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{ display: "flex", gap: 48, marginTop: 56, flexWrap: "wrap" }}
          >
            {[
              { v: "12+", l: "Frameworks supported" },
              { v: "700+", l: "Total controls" },
              { v: "60%", l: "Average control overlap" },
              { v: "1", l: "Platform to manage them all" },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em" }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "rgba(242,242,244,0.3)", letterSpacing: "0.07em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 0 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          {/* category filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActivecat(c)}
                style={{
                  fontSize: 13, fontWeight: 500, padding: "7px 16px",
                  borderRadius: 100, border: "none", cursor: "pointer",
                  background: activecat === c ? "#4f46e5" : "rgba(255,255,255,0.05)",
                  color: activecat === c ? "#fff" : "rgba(242,242,244,0.5)",
                  transition: "all 0.2s",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map((fw, i) => (
              <FrameworkCard key={fw.abbr} fw={fw} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW CROSS-MAPPING WORKS */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal className="mb-16">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>How it works</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08, maxWidth: 560 }}>
              Do the work once.<br />Satisfy multiple frameworks.
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
            {[
              { n: "01", t: "Connect & scan", b: "Integrate your cloud, identity, and dev tools. Avirio scans your environment and maps your existing controls against every framework you're targeting." },
              { n: "02", t: "Cross-map controls", b: "One control that satisfies SOC 2 CC6.1 also maps to ISO 27001 Annex A 8.3 and PCI DSS Req 7. Avirio handles the mapping so you don't." },
              { n: "03", t: "Stay in sync", b: "Continuous monitoring means drift is caught in real time not six months later when your auditor finds it. Your evidence room is always current." },
            ].map((s) => (
              <Reveal key={s.n} delay={parseInt(s.n) * 0.1 - 0.1}>
                <motion.div
                  whileHover={{ background: "rgba(99,102,241,0.04)" }}
                  style={{ padding: "44px", background: "#030305", transition: "background 0.2s" }}
                >
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "rgba(242,242,244,0.2)", letterSpacing: "0.1em", marginBottom: 20 }}>{s.n}</div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 14 }}>{s.t}</h3>
                  <p style={{ fontSize: 14, color: "rgba(242,242,244,0.45)", lineHeight: 1.78 }}>{s.b}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 32px 120px" }}>
        <Reveal>
          <div style={{ maxWidth: 1200, margin: "0 auto", background: "rgba(79,70,229,0.07)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 20, padding: "72px 64px", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
              Not sure which framework to start with?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(242,242,244,0.45)", maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.75 }}>
              Talk to a compliance expert. We will map your requirements and recommend the most efficient path.
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.03, boxShadow: "0 0 36px rgba(99,102,241,0.35)" }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-block", textDecoration: "none", fontSize: 15, fontWeight: 600, background: "#4f46e5", color: "#fff", padding: "14px 32px", borderRadius: 10, letterSpacing: "-0.01em" }}
            >
              Talk to an expert
            </motion.a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
