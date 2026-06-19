"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedBg from "../components/AnimatedBg";
import { Reveal, StaggerReveal } from "../components/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const FEATURED = {
  slug: "soc2-checklist-2025",
  tag: "Guide",
  title: "The Complete SOC 2 Type II Checklist for 2025",
  excerpt: "Everything a startup or growth company needs to achieve SOC 2 Type II certification from scoping your environment to closing your first audit. Auditor-reviewed and updated for the new Trust Services Criteria guidance.",
  read: "12 min read",
  date: "June 2025",
};

const POSTS = [
  {
    slug: "iso42001-guide",
    tag: "Deep Dive",
    title: "ISO 42001: What Every AI Company Needs to Know in 2025",
    excerpt: "The world's first AI management system standard is here. We break down what ISO 42001 requires, who needs it, and how to get certified without slowing down your AI roadmap.",
    read: "10 min read",
    date: "June 2025",
  },
  {
    slug: "gdpr-vs-dpdpa",
    tag: "Comparison",
    title: "GDPR vs DPDPA: Key Differences Indian Companies Need to Understand",
    excerpt: "India's Digital Personal Data Protection Act shares DNA with the GDPR but has important differences. This breakdown covers consent, data fiduciary obligations, and penalties.",
    read: "8 min read",
    date: "May 2025",
  },
  {
    slug: "soc2-vs-iso27001",
    tag: "Comparison",
    title: "SOC 2 vs ISO 27001: Which One Does Your Company Actually Need?",
    excerpt: "Both prove you take security seriously, but they serve different audiences and markets. Here's how to choose and why most high-growth companies eventually need both.",
    read: "7 min read",
    date: "May 2025",
  },
  {
    slug: "risk-register-guide",
    tag: "Guide",
    title: "How to Build a Risk Register That Actually Gets Used",
    excerpt: "Most risk registers gather dust. This one won't. A practical framework for identifying, scoring, and treating information security risks in a way that makes auditors and boards happy.",
    read: "9 min read",
    date: "April 2025",
  },
  {
    slug: "vendor-risk-management",
    tag: "Guide",
    title: "Vendor Risk Management: A Practical Guide for Security Teams",
    excerpt: "Your security is only as strong as your weakest vendor. Learn how to build a vendor risk program that scales, from initial due diligence to continuous monitoring.",
    read: "8 min read",
    date: "April 2025",
  },
  {
    slug: "cost-of-data-breach-2025",
    tag: "Research",
    title: "The Real Cost of a Data Breach in 2025 (And How Compliance Helps)",
    excerpt: "The average cost of a data breach hit $4.88M in 2024. Organizations with mature compliance programs saw 40% lower breach costs. Here's why and what to do about it.",
    read: "6 min read",
    date: "March 2025",
  },
  {
    slug: "pci-dss-v4-changes",
    tag: "Update",
    title: "PCI DSS v4.0: Every Major Change You Need to Know",
    excerpt: "PCI DSS v4.0 introduced significant changes to authentication, monitoring, and software security. If you're still on v3.2.1, your deadline is March 2025. Here's your upgrade guide.",
    read: "11 min read",
    date: "March 2025",
  },
  {
    slug: "hipaa-safeguards-checklist",
    tag: "Checklist",
    title: "HIPAA Technical Safeguards: A Complete Implementation Checklist",
    excerpt: "Access controls, audit controls, integrity controls, and transmission security every HIPAA technical safeguard explained with practical implementation steps for health tech teams.",
    read: "14 min read",
    date: "February 2025",
  },
];

const GUIDES = [
  { title: "SOC 2 Policy Template Pack", desc: "12 auditor-approved policy templates ready to customize", tag: "Free download" },
  { title: "ISO 27001 Gap Analysis Tool", desc: "Spreadsheet to assess your current state vs. Annex A controls", tag: "Free download" },
  { title: "Vendor Due Diligence Questionnaire", desc: "50-question security review for third-party vendors", tag: "Free download" },
  { title: "Risk Register Template", desc: "Pre-formatted risk register with scoring methodology", tag: "Free download" },
];

const TAGS = ["All", "Guide", "Comparison", "Deep Dive", "Research", "Checklist", "Update"];

export default function ResourcesPage() {
  return (
    <div style={{ background: "#030305", color: "#f2f2f4", minHeight: "100vh" }}>
      <AnimatedBg />

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: 140, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 20 }}>Resources</div>
            <h1 style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.97, marginBottom: 20, maxWidth: 680 }}>
              Everything you need<br />
              <span style={{ color: "#818cf8" }}>to get compliant.</span>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(242,242,244,0.45)", maxWidth: 480, lineHeight: 1.75, letterSpacing: "-0.01em" }}>
              Practical guides, checklists, comparisons, and deep dives on SOC 2, ISO 27001, ISO 42001, GDPR, and every other framework that matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 0 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,242,244,0.28)", marginBottom: 20 }}>Featured</div>
          <Link href={`/resources/${FEATURED.slug}`} style={{ textDecoration: "none", display: "block" }}>
            <motion.div
              whileHover={{ borderColor: "rgba(99,102,241,0.45)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
              style={{
                background: "linear-gradient(135deg, rgba(79,70,229,0.07), rgba(3,3,5,0) 60%)",
                border: "1px solid rgba(99,102,241,0.22)",
                borderRadius: 20, padding: "56px",
                display: "grid", gridTemplateColumns: "1fr 260px",
                gap: 48, alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", marginBottom: 20 }}>{FEATURED.tag}</div>
                <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1, color: "#f2f2f4", marginBottom: 18 }}>
                  {FEATURED.title}
                </h2>
                <p style={{ fontSize: 16, color: "rgba(242,242,244,0.5)", lineHeight: 1.75, maxWidth: 520, marginBottom: 28 }}>{FEATURED.excerpt}</p>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#818cf8" }}>Read the guide →</span>
                  <span style={{ color: "rgba(242,242,244,0.25)", fontSize: 12 }}>·</span>
                  <span style={{ fontSize: 12, color: "rgba(242,242,244,0.35)" }}>{FEATURED.read}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["Scope your environment", "Gap assessment", "Policy creation", "Control implementation", "Evidence collection", "Audit management"].map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#818cf8", flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 13, color: "rgba(242,242,244,0.55)" }}>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* BLOG GRID */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {TAGS.map((t) => (
              <button key={t} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.08)", background: t === "All" ? "rgba(99,102,241,0.12)" : "transparent", color: t === "All" ? "#818cf8" : "rgba(242,242,244,0.4)", cursor: "pointer" }}>
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {POSTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link href={`/resources/${p.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <motion.div
                    whileHover={{ borderColor: "rgba(255,255,255,0.14)", y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 14, padding: "28px", display: "flex", flexDirection: "column", height: "100%",
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>{p.tag}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.4, color: "#f2f2f4", marginBottom: 12, flex: 1 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(242,242,244,0.4)", lineHeight: 1.7, marginBottom: 20 }}>{p.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{ fontSize: 12, color: "rgba(242,242,244,0.28)" }}>{p.date}</span>
                      <span style={{ fontSize: 12, color: "rgba(242,242,244,0.35)" }}>{p.read}</span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FREE GUIDES */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal className="mb-12">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>Free templates</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>Download and use immediately.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {GUIDES.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ borderColor: "rgba(99,102,241,0.35)", background: "rgba(99,102,241,0.04)" }}
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}
                >
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 }}>{g.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(242,242,244,0.4)", lineHeight: 1.55 }}>{g.desc}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    style={{ fontSize: 12, fontWeight: 600, color: "#818cf8", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", padding: "8px 16px", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    {g.tag}
                  </motion.button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
