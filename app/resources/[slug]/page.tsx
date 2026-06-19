"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import AnimatedBg from "../../components/AnimatedBg";
import { Reveal } from "../../components/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const ARTICLES: Record<string, {
  tag: string; title: string; date: string; read: string; excerpt: string;
  sections: { heading: string; body: string; list?: string[] }[];
  related: string[];
}> = {
  "soc2-checklist-2025": {
    tag: "Guide", title: "The Complete SOC 2 Type II Checklist for 2025",
    date: "June 2025", read: "12 min read",
    excerpt: "Everything a startup or growth company needs to achieve SOC 2 Type II certification from scoping your environment to closing your first audit.",
    sections: [
      {
        heading: "What is SOC 2 Type II?",
        body: "SOC 2 Type II is an audit framework developed by the AICPA (American Institute of CPAs) that evaluates a service organization's controls over a period of time typically 6 or 12 months. Unlike SOC 2 Type I which only checks that controls exist at a single point in time, Type II tests whether those controls operated effectively over the audit period. This is what enterprise customers, investors, and partners ask for when they want proof that you take security seriously.",
      },
      {
        heading: "Step 1 Define your scope",
        body: "The first decision is which Trust Services Criteria (TSC) to include in your audit. Security (CC) is mandatory. Availability, Confidentiality, Processing Integrity, and Privacy are optional add-ons. Most SaaS startups start with Security only, adding Availability if their customers have uptime SLAs. Get this wrong and you'll either over-scope (costing time and money) or under-scope (failing to satisfy enterprise requirements).",
        list: ["Security (CC) always required", "Availability required for SaaS with uptime guarantees", "Confidentiality required for data handling assurances", "Processing Integrity required for financial, healthcare processing", "Privacy required for consumer data handling"],
      },
      {
        heading: "Step 2 Gap assessment",
        body: "Before you can remediate, you need to know where you stand. A gap assessment maps your current practices against every control in the selected criteria. Expect to find gaps in change management, vendor reviews, and access recertification these are the most common failure points for first-time audits. Document everything: what control exists, how it works, who owns it, and what evidence will be collected.",
      },
      {
        heading: "Step 3 Build your policy library",
        body: "SOC 2 requires documented policies covering information security, access control, incident response, change management, risk assessment, and vendor management at minimum. Auditors will review both the existence of these policies and evidence that employees have acknowledged them. Use templates as a starting point but ensure they reflect how your organization actually operates, not an idealized version.",
      },
      {
        heading: "Step 4 Implement and test controls",
        body: "This is where most of the work happens. Every control needs to be implemented, tested, and generating evidence. The good news: most modern cloud environments already generate the logs and configuration data that constitute SOC 2 evidence. The work is connecting your tools, ensuring evidence is being captured correctly, and fixing gaps before your auditor sees them.",
        list: ["Access control: SSO, MFA, provisioning/deprovisioning workflows", "Change management: code review, deployment approvals, change records", "Vulnerability management: scanning, patching SLAs, penetration testing", "Incident response: documented runbooks, tested response procedures", "Vendor management: due diligence questionnaires, review schedules"],
      },
      {
        heading: "Step 5 Evidence collection (the ongoing part)",
        body: "Once your observation period starts, evidence collection runs continuously for 6–12 months. Manual evidence collection screenshots, spreadsheets, email chains is the old way. Modern compliance platforms connect directly to your cloud, identity, and dev tools to collect evidence automatically. This eliminates the pre-audit scramble and means your evidence room is always current.",
      },
      {
        heading: "Step 6 The audit",
        body: "Find an AICPA-accredited CPA firm that specializes in SOC 2 audits. The audit process typically takes 4–8 weeks and involves document review, walkthroughs, and evidence testing. Your auditor will test a sample of evidence for each control. Exceptions (where evidence doesn't support the control) will need to be addressed or disclosed. The final SOC 2 report is typically ready 2–4 weeks after fieldwork completes.",
      },
      {
        heading: "Common failure points to avoid",
        body: "After reviewing hundreds of SOC 2 audits, these are the controls companies most frequently fail on:",
        list: ["Access reviews: not running quarterly reviews of user access", "Vendor reviews: not completing annual security reviews for critical vendors", "Change management: missing approvals for emergency changes", "Security training: employees not completing annual training", "Incident response: not testing the IR plan with a tabletop exercise"],
      },
    ],
    related: ["soc2-vs-iso27001", "vendor-risk-management", "risk-register-guide"],
  },
  "iso42001-guide": {
    tag: "Deep Dive", title: "ISO 42001: What Every AI Company Needs to Know in 2025",
    date: "June 2025", read: "10 min read",
    excerpt: "The world's first AI management system standard. We break down what it requires, who needs it, and how to get certified without slowing down your AI roadmap.",
    sections: [
      {
        heading: "What is ISO 42001?",
        body: "ISO/IEC 42001 is the world's first international standard for Artificial Intelligence Management Systems (AIMS). Published in December 2023, it provides a framework for organizations that develop, use, or provide AI products and services to manage AI-related risks, demonstrate responsible AI governance, and satisfy regulators and enterprise customers who are increasingly asking about AI oversight.",
      },
      {
        heading: "Who needs ISO 42001?",
        body: "ISO 42001 is relevant for any organization that builds AI models, deploys AI in products, uses AI tools to process customer data, or operates in regulated industries where AI is subject to oversight (financial services, healthcare, public sector). If you're building on top of foundation models (like OpenAI's GPT-4 or Anthropic's Claude), you need ISO 42001 if your customers or regulators ask how you govern that usage.",
        list: ["AI/ML startups and scale-ups", "SaaS companies with AI-powered features", "Healthcare and fintech using AI for decisions", "Companies with EU AI Act obligations", "Government contractors using AI systems"],
      },
      {
        heading: "What does ISO 42001 require?",
        body: "ISO 42001 is structured like ISO 27001 it follows the High-Level Structure (HLS) used by most modern ISO management system standards. At its core, it requires you to establish an AI Management System (AIMS) with defined scope, objectives, risk assessment processes, and continual improvement. The standard's Annex B provides a detailed list of AI-specific controls covering the full AI lifecycle from data governance to model monitoring.",
        list: ["AI policy and objectives", "Roles and responsibilities for AI governance", "AI risk assessment and treatment", "Data governance for training and inference", "AI system impact assessments", "Model documentation and transparency", "Human oversight mechanisms", "Incident management for AI failures"],
      },
      {
        heading: "ISO 42001 vs other AI frameworks",
        body: "The EU AI Act is a regulation (mandatory law in the EU) while ISO 42001 is a voluntary standard but the two align closely. Achieving ISO 42001 certification provides strong evidence of EU AI Act compliance for most provisions. NIST's AI Risk Management Framework (AI RMF) is a US government framework that also aligns with ISO 42001 controls. Having ISO 42001 gives you a single framework that satisfies most global AI governance requirements.",
      },
      {
        heading: "How long does certification take?",
        body: "An ISO 42001 gap assessment typically takes 2–4 weeks. Implementation of the AIMS and required controls takes 4–8 weeks depending on your starting point. The certification audit (Stage 1 document review + Stage 2 on-site/remote audit) takes 2–4 weeks. Total timeline from start to certified: 8–16 weeks. Companies with mature ISO 27001 programs can typically achieve ISO 42001 in 6–10 weeks, as many management system controls are shared.",
      },
    ],
    related: ["soc2-checklist-2025", "gdpr-vs-dpdpa", "soc2-vs-iso27001"],
  },
  "gdpr-vs-dpdpa": {
    tag: "Comparison", title: "GDPR vs DPDPA: Key Differences Indian Companies Need to Understand",
    date: "May 2025", read: "8 min read",
    excerpt: "India's Digital Personal Data Protection Act shares DNA with the GDPR but has important differences in consent, data fiduciary obligations, and enforcement.",
    sections: [
      {
        heading: "Overview",
        body: "The Digital Personal Data Protection Act (DPDPA) 2023 is India's first comprehensive data protection law. It shares significant DNA with the EU's GDPR both are built around individual rights, consent, and accountability but has key structural differences that matter for compliance. If your company handles personal data of Indian residents, you need to understand both frameworks.",
      },
      {
        heading: "Key similarities",
        body: "Both GDPR and DPDPA establish lawful bases for processing, require clear and specific consent, grant individuals rights over their data, and require breach notification. Both impose significant penalties for violations (GDPR up to 4% of global turnover; DPDPA up to INR 250 crore per violation). Both require organizations to appoint a data protection officer or equivalent.",
        list: ["Lawful bases for processing personal data", "Meaningful consent requirements", "Individual rights: access, correction, erasure", "Mandatory breach notification", "Data minimization and purpose limitation", "Cross-border transfer restrictions"],
      },
      {
        heading: "Key differences",
        body: "The most significant structural difference is the DPDPA's treatment of Significant Data Fiduciaries (SDFs). SDFs are organizations processing large volumes of sensitive data or data that poses high risk to national security. SDFs face additional obligations including mandatory Data Protection Impact Assessments, annual audits, appointment of an independent Data Auditor, and deployment of Consent Managers.",
        list: ["GDPR applies to all 'controllers'; DPDPA distinguishes between Data Fiduciaries and Significant Data Fiduciaries", "DPDPA allows processing of children's data only with verifiable parental consent (GDPR age varies by member state)", "DPDPA cross-border restrictions: transfer only to countries approved by the Indian government", "GDPR extraterritorial scope is broader; DPDPA applies primarily to data of Indian citizens"],
      },
      {
        heading: "What Indian companies need to do",
        body: "First, determine whether you're a Significant Data Fiduciary if so, your obligations are substantially higher. Second, review your consent mechanisms: DPDPA consent must be 'free, specific, informed, unconditional, and unambiguous' bundled or conditional consent is not valid. Third, establish data localization practices for categories that may be restricted from cross-border transfer. Fourth, build individual rights workflows (access, correction, erasure, grievance redressal).",
      },
    ],
    related: ["soc2-checklist-2025", "iso42001-guide", "soc2-vs-iso27001"],
  },
  "soc2-vs-iso27001": {
    tag: "Comparison", title: "SOC 2 vs ISO 27001: Which One Does Your Company Actually Need?",
    date: "May 2025", read: "7 min read",
    excerpt: "Both prove you take security seriously, but they serve different audiences. Here's how to choose and why most high-growth companies eventually need both.",
    sections: [
      { heading: "The core difference", body: "SOC 2 is a US-originated audit standard used primarily for SaaS and cloud service companies selling to US enterprise customers. ISO 27001 is an international certification recognized globally particularly in Europe, the Middle East, and APAC markets. SOC 2 produces an audit report shared with customers under NDA. ISO 27001 produces a public certificate. SOC 2 is auditor-opinionated; ISO 27001 is certification body-opinionated. Both require strong security controls, but the evidence, audit process, and customer expectations differ significantly." },
      { heading: "When to choose SOC 2", body: "Choose SOC 2 if your primary market is the US enterprise, if your customers' procurement teams are asking for 'the SOC 2 report', or if you're in a market where SOC 2 is the default expectation (US-based SaaS, cloud infrastructure, developer tools). SOC 2 Type II is the dominant trust signal for US B2B software companies.", list: ["US-focused go-to-market", "Enterprise SaaS sales motion", "Customers send security questionnaires asking for SOC 2", "Need to close deals quickly with proof of security"] },
      { heading: "When to choose ISO 27001", body: "Choose ISO 27001 if you're expanding into European or global enterprise markets, if your customers or prospects are asking specifically for ISO 27001 certification, or if you're working with government or large enterprise customers outside the US. ISO 27001 is the internationally recognized standard in many markets, it's the only security certification that matters.", list: ["European or APAC market expansion", "Government or regulated industry customers", "International enterprise deals", "Building a systematic ISMS"] },
      { heading: "Most companies eventually need both", body: "For companies with global enterprise ambitions, SOC 2 and ISO 27001 are complementary, not competitive. Most controls overlap (access management, change control, incident response, vendor management) so achieving both simultaneously is highly efficient. Companies that use a compliance platform with cross-framework control mapping typically achieve both certifications with about 30-40% additional effort beyond one alone." },
    ],
    related: ["soc2-checklist-2025", "vendor-risk-management", "iso42001-guide"],
  },
};

const RELATED_META: Record<string, { title: string; tag: string }> = {
  "soc2-checklist-2025": { title: "The Complete SOC 2 Type II Checklist for 2025", tag: "Guide" },
  "iso42001-guide": { title: "ISO 42001: What AI Companies Need to Know", tag: "Deep Dive" },
  "gdpr-vs-dpdpa": { title: "GDPR vs DPDPA: Key Differences Explained", tag: "Comparison" },
  "soc2-vs-iso27001": { title: "SOC 2 vs ISO 27001: Which Do You Need?", tag: "Comparison" },
  "vendor-risk-management": { title: "Vendor Risk Management: A Practical Guide", tag: "Guide" },
  "risk-register-guide": { title: "How to Build a Risk Register That Gets Used", tag: "Guide" },
};

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div style={{ background: "#030305", color: "#f2f2f4", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12 }}>404</div>
          <div style={{ color: "rgba(242,242,244,0.4)", marginBottom: 24 }}>Article not found</div>
          <Link href="/resources" style={{ color: "#818cf8", textDecoration: "none" }}>← Back to resources</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#030305", color: "#f2f2f4", minHeight: "100vh" }}>
      <AnimatedBg />

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease }}>
            <Link href="/resources" style={{ fontSize: 12, color: "rgba(242,242,244,0.35)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
              ← Resources
            </Link>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", background: "rgba(99,102,241,0.1)", padding: "3px 10px", borderRadius: 100 }}>{article.tag}</span>
              <span style={{ fontSize: 12, color: "rgba(242,242,244,0.3)" }}>{article.date}</span>
              <span style={{ color: "rgba(242,242,244,0.15)" }}>·</span>
              <span style={{ fontSize: 12, color: "rgba(242,242,244,0.3)" }}>{article.read}</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)", fontWeight: 800, letterSpacing: "-0.042em", lineHeight: 1.06, marginBottom: 22 }}>
              {article.title}
            </h1>
            <p style={{ fontSize: 17, color: "rgba(242,242,244,0.5)", lineHeight: 1.78, letterSpacing: "-0.01em" }}>{article.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <article style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "72px 32px 80px" }}>
        {article.sections.map((section, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div style={{ marginBottom: 56 }}>
              <h2 style={{ fontSize: "clamp(1.2rem,2vw,1.6rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.25, marginBottom: 18, color: "#f2f2f4" }}>
                {section.heading}
              </h2>
              <p style={{ fontSize: 16, color: "rgba(242,242,244,0.62)", lineHeight: 1.82, letterSpacing: "-0.008em" }}>{section.body}</p>
              {section.list && (
                <ul style={{ listStyle: "none", marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {section.list.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "rgba(242,242,244,0.58)" }}>
                      <span style={{ color: "#4f46e5", flexShrink: 0, marginTop: 2 }}>→</span>{item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}

        {/* CTA */}
        <Reveal>
          <div style={{ background: "rgba(79,70,229,0.08)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 16, padding: "36px", textAlign: "center", marginTop: 24 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 10 }}>Ready to automate this?</h3>
            <p style={{ fontSize: 14, color: "rgba(242,242,244,0.45)", marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>
              Avirio automates evidence collection, control testing, and audit management so you can focus on building.
            </p>
            <motion.a href="#" whileHover={{ scale: 1.03 }} style={{ display: "inline-block", fontSize: 14, fontWeight: 600, background: "#4f46e5", color: "#fff", padding: "12px 28px", borderRadius: 9, textDecoration: "none" }}>
              Get a demo →
            </motion.a>
          </div>
        </Reveal>
      </article>

      {/* RELATED */}
      {article.related.length > 0 && (
        <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "64px 0 100px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,242,244,0.28)", marginBottom: 28 }}>Related reading</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {article.related.filter((r) => RELATED_META[r]).map((r) => (
                <Link key={r} href={`/resources/${r}`} style={{ textDecoration: "none" }}>
                  <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.14)", y: -3 }} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "22px 24px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", marginBottom: 10 }}>{RELATED_META[r].tag}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#f2f2f4", lineHeight: 1.4 }}>{RELATED_META[r].title}</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
