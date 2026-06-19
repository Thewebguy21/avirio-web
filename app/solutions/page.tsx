"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedBg from "../components/AnimatedBg";
import { Reveal, StaggerReveal } from "../components/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const SIZES = [
  {
    name: "Startups",
    tag: "Seed → Series B",
    headline: "Get certified. Close the deal.",
    desc: "Your enterprise prospect asked for SOC 2. You have six weeks. Avirio gets you there without a compliance team, without a consultant, without the chaos.",
    items: [
      "Fast-track SOC 2 in 8 weeks",
      "Pre-built, auditor-approved policies",
      "Guided remediation roadmap",
      "Investor-ready security posture",
      "Auditor marketplace find pre-vetted auditors",
    ],
    metrics: [
      { v: "8 wks", l: "To SOC 2 Type II" },
      { v: "0", l: "Compliance hires needed" },
      { v: "3×", l: "Faster than alternatives" },
    ],
    cta: "Start for startups",
  },
  {
    name: "Growth",
    tag: "Series B → Series D",
    headline: "Scale compliance with the business.",
    desc: "You've got SOC 2. Now you need ISO 27001, HIPAA, and your board wants a risk committee. Avirio scales your program without scaling your headcount.",
    items: [
      "Multi-framework with cross-mapping",
      "Vendor risk management built in",
      "Risk register and treatment plans",
      "Board-ready GRC reporting",
      "Dedicated customer success manager",
    ],
    metrics: [
      { v: "3+", l: "Frameworks simultaneously" },
      { v: "60%", l: "Control overlap eliminated" },
      { v: "40%", l: "Shorter sales cycles" },
    ],
    cta: "Start for growth",
    featured: true,
  },
  {
    name: "Enterprise",
    tag: "Series D → Public",
    headline: "Command-grade compliance at scale.",
    desc: "Complex entity structures, custom frameworks, private deployment, and a compliance engineering team on call. Avirio becomes the backbone of your security org.",
    items: [
      "Multi-entity and multi-region support",
      "Private cloud or on-premises deployment",
      "Custom framework and control mapping",
      "SSO, SCIM, and full audit trails",
      "Compliance engineering partnership",
    ],
    metrics: [
      { v: "∞", l: "Frameworks & entities" },
      { v: "Private", l: "Deployment option" },
      { v: "24/7", l: "Support SLA" },
    ],
    cta: "Talk to enterprise team",
  },
];

const INDUSTRIES = [
  {
    name: "Fintech",
    frameworks: ["SOC 2 Type II", "PCI DSS v4.0", "ISO 27001", "GDPR"],
    desc: "From payment processors to lending platforms, fintech companies face the most complex compliance landscape. Avirio maps overlapping controls across PCI DSS and SOC 2 so you're not building the same thing twice.",
    highlights: ["PCI DSS v4.0 built-in", "Cardholder data scoping", "Automated network documentation"],
  },
  {
    name: "Healthcare & Health Tech",
    frameworks: ["HIPAA", "SOC 2 Type II", "HITRUST CSF", "ISO 27001"],
    desc: "Patient data requires the highest standard of protection. Avirio automates HIPAA safeguard tracking, BAA management, and breach notification workflows so you focus on care, not compliance.",
    highlights: ["HIPAA safeguard automation", "BAA lifecycle management", "PHI data mapping"],
  },
  {
    name: "AI Companies",
    frameworks: ["ISO 42001", "SOC 2 Type II", "GDPR", "NIST AI RMF"],
    desc: "The regulatory landscape for AI is moving fast. Avirio's ISO 42001 support is the most comprehensive in the market purpose-built for teams building and deploying AI/ML systems.",
    highlights: ["ISO 42001 purpose-built", "AI risk assessment tooling", "Model governance tracking"],
  },
  {
    name: "SaaS & Cloud",
    frameworks: ["SOC 2 Type II", "ISO 27001", "GDPR", "CCPA"],
    desc: "Modern SaaS companies need to demonstrate security to close enterprise deals. Avirio automates the evidence collection that makes SOC 2 audits painless and trust centers compelling.",
    highlights: ["Auto evidence from 50+ tools", "Customer-facing trust center", "Questionnaire automation"],
  },
];

export default function SolutionsPage() {
  return (
    <div style={{ background: "#030305", color: "#f2f2f4", minHeight: "100vh" }}>
      <AnimatedBg />

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: 140, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 20 }}>Solutions</div>
            <h1 style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.97, marginBottom: 24, maxWidth: 700 }}>
              Built for every stage<br />
              <span style={{ color: "#818cf8" }}>of growth.</span>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(242,242,244,0.48)", maxWidth: 520, lineHeight: 1.78, letterSpacing: "-0.01em" }}>
              Whether you are getting your first SOC 2 or managing a multi-framework enterprise program, Avirio scales with you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BY SIZE */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal className="mb-14">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>By company size</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08 }}>Where are you in your journey?</h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {SIZES.map((s) => (
              <Reveal key={s.name}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: s.featured ? "0 24px 56px rgba(99,102,241,0.15)" : "0 16px 48px rgba(0,0,0,0.5)" }}
                  transition={{ duration: 0.22 }}
                  style={{
                    background: s.featured ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.025)",
                    border: s.featured ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16, padding: "40px",
                    display: "flex", flexDirection: "column", height: "100%",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                    <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.03em" }}>{s.name}</span>
                    <span style={{ fontSize: 11, color: s.featured ? "#818cf8" : "rgba(242,242,244,0.3)", background: s.featured ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 100, letterSpacing: "0.06em", alignSelf: "flex-start" }}>
                      {s.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: 14 }}>{s.headline}</h3>
                  <p style={{ fontSize: 14, color: "rgba(242,242,244,0.45)", lineHeight: 1.75, marginBottom: 28 }}>{s.desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 32, flex: 1 }}>
                    {s.items.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "rgba(242,242,244,0.5)" }}>
                        <span style={{ color: "#10b981", flexShrink: 0 }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: 28 }}>
                    {s.metrics.map((m) => (
                      <div key={m.l}>
                        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>{m.v}</div>
                        <div style={{ fontSize: 11, color: "rgba(242,242,244,0.3)", marginTop: 2 }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "block", textAlign: "center", textDecoration: "none",
                      fontSize: 14, fontWeight: 600, padding: "12px",
                      borderRadius: 9,
                      background: s.featured ? "#4f46e5" : "rgba(255,255,255,0.07)",
                      color: s.featured ? "#fff" : "rgba(242,242,244,0.65)",
                      border: s.featured ? "none" : "1px solid rgba(255,255,255,0.08)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.cta}
                  </motion.a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BY INDUSTRY */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal className="mb-14">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>By industry</div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08 }}>
              Your industry has<br />specific requirements.
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.06}>
                <motion.div
                  whileHover={{ background: "rgba(99,102,241,0.04)" }}
                  style={{
                    display: "grid", gridTemplateColumns: "260px 1fr auto",
                    gap: 40, padding: "36px 40px", alignItems: "center",
                    background: "#030305",
                    borderBottom: i < INDUSTRIES.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    transition: "background 0.2s",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 10 }}>{ind.name}</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {ind.frameworks.map((f) => (
                        <span key={f} style={{ fontSize: 11, color: "rgba(242,242,244,0.35)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", padding: "2px 8px", borderRadius: 100 }}>{f}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, color: "rgba(242,242,244,0.45)", lineHeight: 1.72, marginBottom: 14 }}>{ind.desc}</p>
                    <div style={{ display: "flex", gap: 16 }}>
                      {ind.highlights.map((h) => (
                        <span key={h} style={{ fontSize: 12, color: "#818cf8", display: "flex", alignItems: "center", gap: 5 }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />{h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.a
                    href="#"
                    whileHover={{ color: "#818cf8", borderColor: "rgba(99,102,241,0.4)" }}
                    style={{ textDecoration: "none", fontSize: 13, fontWeight: 600, color: "rgba(242,242,244,0.4)", padding: "9px 20px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, whiteSpace: "nowrap" }}
                  >
                    Learn more →
                  </motion.a>
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
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>Still deciding?</h2>
            <p style={{ fontSize: 16, color: "rgba(242,242,244,0.45)", maxWidth: 420, margin: "0 auto 40px", lineHeight: 1.75 }}>
              Talk to a compliance expert who has been through it. We will figure out the right path together.
            </p>
            <motion.a href="#" whileHover={{ scale: 1.03, boxShadow: "0 0 36px rgba(99,102,241,0.35)" }} whileTap={{ scale: 0.97 }}
              style={{ display: "inline-block", textDecoration: "none", fontSize: 15, fontWeight: 600, background: "#4f46e5", color: "#fff", padding: "14px 32px", borderRadius: 10, letterSpacing: "-0.01em" }}>
              Talk to an expert
            </motion.a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
