"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import AnimatedBg from "../../components/AnimatedBg";
import { Reveal, StaggerReveal } from "../../components/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

type FrameworkData = {
  abbr: string; name: string; category: string; color: string;
  headline: string; subheadline: string; controls: number; timeline: string; since: string;
  who: string; overview: string;
  sections: { heading: string; body: string; list?: string[] }[];
  controlAreas: { name: string; count: number; desc: string }[];
  faq: { q: string; a: string }[];
  related: string[];
};

const FRAMEWORKS: Record<string, FrameworkData> = {
  soc2: {
    abbr: "SOC 2", name: "SOC 2 Type II", category: "Security", color: "#4f46e5",
    headline: "The standard that closes enterprise deals.",
    subheadline: "SOC 2 Type II is the trust signal that US enterprise procurement teams demand. Automated evidence collection means you can focus on shipping, not auditing.",
    controls: 64, timeline: "8–12 weeks", since: "2010",
    who: "SaaS companies, cloud providers, and any tech business handling customer data and selling into US enterprise.",
    overview: "SOC 2 (Service Organization Control 2) is an audit framework developed by the AICPA. A Type II report covers a period of time typically 6 or 12 months and tests whether your security controls actually operated as designed during that period. It's the primary trust signal for B2B software companies in the US market.",
    sections: [
      { heading: "Trust Services Criteria", body: "SOC 2 is organized around five Trust Services Criteria. Security is mandatory; the others are optional based on your customers' requirements.", list: ["Security (CC) always required, covers access control, risk management, and incident response", "Availability for SaaS with uptime SLAs", "Confidentiality for handling confidential customer data", "Processing Integrity for financial or transactional processing", "Privacy for consumer personal information"] },
      { heading: "What auditors test", body: "During a SOC 2 Type II audit, your auditor will select a sample of evidence for each control and test whether that evidence demonstrates the control operated effectively. Common tested areas:", list: ["User access provisioning and deprovisioning records", "Multi-factor authentication enforcement logs", "Code review and deployment approval records", "Vulnerability scan results and remediation timelines", "Security awareness training completion records", "Vendor security review documentation"] },
      { heading: "The audit process", body: "A SOC 2 Type II audit has two phases: fieldwork (evidence review) and reporting. Fieldwork takes 3–6 weeks. Your auditor reviews your policies, interviews control owners, and tests sampled evidence. The resulting report includes your auditor's opinion and a detailed description of your system and controls. Reports are shared with customers under NDA." },
    ],
    controlAreas: [
      { name: "Common Criteria (CC)", count: 33, desc: "Core security controls covering access, risk, change management, logical access, and system operations" },
      { name: "Availability (A)", count: 9, desc: "System availability, performance monitoring, disaster recovery and business continuity" },
      { name: "Confidentiality (C)", count: 5, desc: "Classification and protection of confidential information throughout its lifecycle" },
      { name: "Processing Integrity (PI)", count: 5, desc: "Complete, valid, accurate, timely, and authorized processing" },
      { name: "Privacy (P)", count: 12, desc: "Personal information lifecycle from collection through disposal" },
    ],
    faq: [
      { q: "How long does it take to get SOC 2 Type II?", a: "Expect 8–12 weeks from kick-off to final report. This includes 4–6 weeks of observation period plus 4–6 weeks for audit fieldwork and reporting. With a compliance platform doing automated evidence collection, the total elapsed time can be as short as 8 weeks." },
      { q: "What's the difference between Type I and Type II?", a: "Type I is a point-in-time assessment that checks whether controls exist. Type II covers a period of time (typically 6 or 12 months) and tests whether controls operated effectively throughout. Enterprise customers almost always require Type II." },
      { q: "How much does a SOC 2 audit cost?", a: "Audit fees from a CPA firm typically range from $20,000–$80,000+ depending on scope, company size, and auditor. Add to this the cost of your compliance platform, any remediation work, and internal time. With Avirio, most companies reduce total compliance program cost by 40–60% vs. doing it manually." },
      { q: "Do I need a separate pen test?", a: "A penetration test is not required by SOC 2, but auditors will look for some form of vulnerability testing. Annual pen tests or continuous vulnerability scanning are the norm. If your customers' questionnaires ask for pen test results, plan to have one done before your audit period." },
    ],
    related: ["iso27001", "iso42001", "gdpr"],
  },
  iso27001: {
    abbr: "27001", name: "ISO 27001:2022", category: "Enterprise", color: "#6366f1",
    headline: "The global standard for information security.",
    subheadline: "ISO 27001 certification demonstrates to enterprise customers, partners, and regulators worldwide that your information security management system meets the highest international standard.",
    controls: 93, timeline: "10–16 weeks", since: "2005",
    who: "Any organization wanting to demonstrate mature information security management to global enterprise customers, particularly in Europe, the Middle East, and APAC.",
    overview: "ISO/IEC 27001:2022 is the international standard for Information Security Management Systems (ISMS). Published by ISO and IEC, it specifies requirements for establishing, implementing, maintaining, and continually improving an ISMS. Unlike SOC 2 which produces a report, ISO 27001 produces a public certificate from an accredited certification body visible proof of your security commitment to the world.",
    sections: [
      { heading: "The 2022 update: what changed", body: "ISO 27001:2022 (the latest version) restructured Annex A from 114 controls in 14 domains to 93 controls in 4 themes. Eleven new controls were added, particularly around threat intelligence, cloud security, ICT supply chain security, and data masking. If you were certified under 2013, you had until October 2025 to transition to the 2022 version.", list: ["Reorganized into 4 themes: Organizational, People, Physical, Technological", "11 new controls including threat intelligence, cloud security, data masking", "Expanded focus on supplier relationships and ICT supply chain", "New emphasis on concepts like 'attack surface management'"] },
      { heading: "ISMS scope definition", body: "One of the most important decisions in ISO 27001 is defining your ISMS scope which parts of the organization, which assets, and which locations fall within the certification boundary. Get this wrong and you either certify too little (failing customer expectations) or too much (making implementation impractical for an early-stage company). Most companies start with a single product or business unit scope." },
      { heading: "Risk-based approach", body: "ISO 27001 is fundamentally risk-based. You must conduct a formal information security risk assessment, identify and evaluate risks, choose treatment options (mitigate, accept, transfer, avoid), and produce a Statement of Applicability (SoA) documenting which Annex A controls apply to your risk treatment decisions. This risk framework is what makes ISO 27001 certification meaningful it's not just a checklist." },
    ],
    controlAreas: [
      { name: "Organizational (5.1–5.37)", count: 37, desc: "Policies, roles, threat intelligence, supplier security, and asset management" },
      { name: "People (6.1–6.8)", count: 8, desc: "Screening, terms of employment, security training, and disciplinary process" },
      { name: "Physical (7.1–7.13)", count: 13, desc: "Physical perimeters, access control, equipment security, and clear desk/screen" },
      { name: "Technological (8.1–8.34)", count: 34, desc: "Access control, cryptography, malware protection, vulnerability management, and monitoring" },
      { name: "New in 2022", count: 11, desc: "Threat intelligence, cloud security, ICT supply chain, data masking, monitoring activities" },
    ],
    faq: [
      { q: "Is ISO 27001 recognized globally?", a: "Yes ISO 27001 is recognized in over 160 countries and is the world's most widely adopted information security standard. It's particularly valued in Europe (where it often satisfies GDPR requirements for security measures), the Middle East, and APAC enterprise markets." },
      { q: "How long is the certification valid?", a: "ISO 27001 certificates are valid for 3 years. During this period, you'll have annual surveillance audits (smaller scope) and a full recertification audit at the 3-year mark. Continuous evidence collection through Avirio means surveillance audits require minimal preparation." },
      { q: "Can ISO 27001 satisfy GDPR Article 32?", a: "ISO 27001 certification is widely accepted as evidence of 'appropriate technical and organizational measures' under GDPR Article 32. While not automatically sufficient, it substantially reduces your GDPR security obligations burden and demonstrates a systematic approach to data security." },
    ],
    related: ["soc2", "iso42001", "gdpr"],
  },
  iso42001: {
    abbr: "42001", name: "ISO 42001", category: "AI Governance", color: "#7c3aed",
    headline: "Govern your AI responsibly. Prove it.",
    subheadline: "ISO 42001 is the world's first international standard for AI management systems. Built for companies building or deploying AI, it's the certification that satisfies regulators, enterprise customers, and investors asking how you govern AI.",
    controls: 38, timeline: "6–10 weeks", since: "2023",
    who: "Companies building AI products, deploying AI/ML models, using AI tools to process customer data, or subject to the EU AI Act.",
    overview: "ISO/IEC 42001:2023 is the world's first international standard for Artificial Intelligence Management Systems (AIMS). Published in December 2023, it provides a framework for managing AI risks, ensuring responsible AI use, and demonstrating accountability to regulators and customers. With the EU AI Act now in force and AI governance becoming a top enterprise procurement question, ISO 42001 is becoming the global baseline for AI governance.",
    sections: [
      { heading: "AI lifecycle coverage", body: "ISO 42001 covers the entire AI system lifecycle from data acquisition and model development through deployment, monitoring, and decommissioning. This comprehensive scope ensures that AI governance isn't treated as a one-time check but as an ongoing management system.", list: ["Data governance for training and inference datasets", "Model development and validation processes", "AI system deployment and integration controls", "Ongoing model monitoring and performance review", "AI incident management and response", "AI system decommissioning and data disposal"] },
      { heading: "Relationship with EU AI Act", body: "The EU AI Act classifies AI systems by risk level (unacceptable, high, limited, minimal) and imposes requirements proportional to risk. ISO 42001 certification provides strong evidence of compliance with EU AI Act requirements for high-risk and limited-risk AI systems. The standard's controls map closely to the EU AI Act's technical documentation, transparency, and human oversight requirements." },
      { heading: "Human oversight requirements", body: "One of the most important concepts in ISO 42001 is meaningful human oversight the requirement that humans can meaningfully intervene in AI system decisions where appropriate. This isn't just a checkbox; it requires designing AI systems with override mechanisms, monitoring for model drift and bias, and ensuring that operators understand AI system limitations." },
    ],
    controlAreas: [
      { name: "AI Policy & Context", count: 6, desc: "AI objectives, policies, and organizational context for AI governance" },
      { name: "Risk Management", count: 8, desc: "AI risk identification, impact assessment, and treatment" },
      { name: "Data Governance", count: 7, desc: "Training data quality, data provenance, and privacy in AI" },
      { name: "System Controls", count: 9, desc: "Model development, testing, deployment, and monitoring controls" },
      { name: "Transparency & Accountability", count: 8, desc: "Documentation, explainability, and human oversight mechanisms" },
    ],
    faq: [
      { q: "Do I need ISO 42001 if I use third-party AI APIs?", a: "If you're using AI APIs (like OpenAI, Anthropic, or Google) to build products that process customer data or make decisions affecting people, you have AI governance obligations. ISO 42001 covers both AI developers and AI deployers. If customers or regulators are asking how you govern AI usage, ISO 42001 is the right answer." },
      { q: "How does ISO 42001 relate to ISO 27001?", a: "ISO 42001 is designed to integrate with ISO 27001. If you're already ISO 27001 certified, many management system controls (risk management, incident management, supplier management) are shared. Companies with ISO 27001 can typically achieve ISO 42001 in 6–8 weeks of additional effort." },
      { q: "Is ISO 42001 required for EU AI Act compliance?", a: "ISO 42001 certification is not legally mandated by the EU AI Act, but it's the most comprehensive way to demonstrate compliance with the Act's requirements for AI management practices. Expect it to become a de facto requirement for enterprise AI vendors in the EU within 2–3 years." },
    ],
    related: ["soc2", "iso27001", "gdpr"],
  },
  pci: {
    abbr: "PCI", name: "PCI DSS v4.0", category: "Fintech", color: "#0891b2",
    headline: "The standard for every company that touches payments.",
    subheadline: "PCI DSS v4.0 introduced significant changes to authentication, monitoring, and software security. If your product handles, processes, or stores cardholder data, compliance is mandatory not optional.",
    controls: 281, timeline: "12–20 weeks", since: "2004",
    who: "Any business that processes, stores, or transmits credit card data from e-commerce platforms to payment processors to SaaS companies with payment integrations.",
    overview: "The Payment Card Industry Data Security Standard (PCI DSS) is mandated by the major card brands (Visa, Mastercard, Amex, Discover) for any entity that handles cardholder data. Version 4.0, released in March 2022 and mandatory from March 2025, brought major changes to multi-factor authentication, targeted risk analysis, and software security requirements. Non-compliance risks range from fines to loss of the ability to accept card payments.",
    sections: [
      { heading: "Merchant levels and requirements", body: "PCI DSS requirements scale with transaction volume. Level 1 merchants (over 6 million transactions/year) require an annual on-site audit by a Qualified Security Assessor (QSA). Levels 2–4 can self-assess using a Self-Assessment Questionnaire (SAQ). Choosing the right SAQ type depends on your cardholder data environment architecture.", list: ["Level 1: Annual QSA audit + quarterly network scans", "Level 2–3: Annual SAQ + quarterly scans", "Level 4: Annual SAQ + quarterly scans (simplified)", "Service Providers: Separate Level 1/2 requirements"] },
      { heading: "What changed in v4.0", body: "PCI DSS v4.0 introduced over 60 new or updated requirements. The most significant changes:", list: ["MFA required for all access into the cardholder data environment (not just remote access)", "Targeted Risk Analysis (TRA) organizations can customize control implementation based on risk", "New requirements for phishing-resistant authentication", "Expanded web application security requirements (6.4)", "Mandatory security controls testing at least every 12 months", "New requirements for e-commerce and payment page security (11.6.1)"] },
      { heading: "Scoping your CDE", body: "The most important decision in PCI DSS compliance is defining your Cardholder Data Environment (CDE) scope. Everything in scope must meet all PCI DSS requirements. Network segmentation can dramatically reduce scope but must be designed correctly and tested by a QSA annually. Cloud environments add complexity; PCI DSS compliance in AWS, GCP, or Azure requires specific architecture decisions." },
    ],
    controlAreas: [
      { name: "Network Security (Req 1–2)", count: 28, desc: "Firewalls, network configuration standards, system defaults" },
      { name: "Data Protection (Req 3–4)", count: 34, desc: "Cardholder data storage, transmission encryption, key management" },
      { name: "Vulnerability Management (Req 5–6)", count: 46, desc: "Malware protection, patch management, secure software development" },
      { name: "Access Control (Req 7–9)", count: 56, desc: "Least privilege, authentication, MFA, physical access" },
      { name: "Monitoring & Testing (Req 10–11)", count: 47, desc: "Logging, monitoring, vulnerability scanning, penetration testing" },
      { name: "Information Security (Req 12)", count: 70, desc: "Policies, risk management, awareness, incident response, vendor management" },
    ],
    faq: [
      { q: "When is the PCI DSS v4.0 deadline?", a: "PCI DSS v4.0 became mandatory on March 31, 2025. All assessments after that date must be against v4.0 requirements. The 64 'future-dated' requirements (those with a March 2025 compliance date) are now active including new MFA and web security requirements." },
      { q: "What happens if I'm not PCI compliant?", a: "Non-compliance risks include fines of $5,000–$100,000 per month from card brands, mandatory forensic investigations after a breach (at your expense), increased transaction fees, and ultimately the loss of ability to accept credit card payments. For most payment-dependent businesses, this is existential." },
    ],
    related: ["soc2", "iso27001", "hipaa"],
  },
  hipaa: {
    abbr: "HIPAA", name: "HIPAA", category: "Healthcare", color: "#059669",
    headline: "Patient data demands the highest standard.",
    subheadline: "HIPAA compliance is mandatory for covered entities and business associates. But beyond legal requirement, it's the foundation of patient trust in health tech.",
    controls: 54, timeline: "8–14 weeks", since: "1996",
    who: "Healthcare providers, health plans, healthcare clearinghouses (covered entities) and their business associates including health tech companies processing PHI on behalf of covered entities.",
    overview: "The Health Insurance Portability and Accountability Act (HIPAA) establishes national standards for protecting Protected Health Information (PHI). For health tech companies, HIPAA compliance typically means executing Business Associate Agreements (BAAs) with covered entities and implementing the required administrative, physical, and technical safeguards. HIPAA is enforced by the HHS Office for Civil Rights (OCR), which can impose civil and criminal penalties for violations.",
    sections: [
      { heading: "The three safeguard categories", body: "HIPAA's Security Rule organizes requirements into three safeguard categories:", list: ["Administrative Safeguards: Risk analysis and management, workforce training, access management, contingency planning (policies and procedures)", "Physical Safeguards: Facility access controls, workstation use policies, device and media controls", "Technical Safeguards: Access controls, audit controls, integrity controls, transmission security (encryption)"] },
      { heading: "Business Associate Agreements", body: "If you're a health tech company processing PHI on behalf of healthcare providers or health plans, you're a Business Associate (BA) and need a signed BAA with each covered entity. BAAs define permitted uses of PHI, require you to implement appropriate safeguards, and obligate breach notification. Keep BAAs current a missing or outdated BAA is one of the most common HIPAA violations." },
      { heading: "Breach notification", body: "The HIPAA Breach Notification Rule requires covered entities to notify affected individuals, HHS, and (for breaches affecting 500+ individuals) the media within 60 days of discovering a breach. Business Associates must notify covered entities without unreasonable delay and within 60 days. Build a tested breach response procedure OCR investigators will ask for it." },
    ],
    controlAreas: [
      { name: "Administrative Safeguards", count: 18, desc: "Risk analysis, access management, workforce training, contingency planning" },
      { name: "Physical Safeguards", count: 10, desc: "Facility access, workstation policy, device and media controls" },
      { name: "Technical Safeguards", count: 12, desc: "Access controls, audit controls, integrity, transmission encryption" },
      { name: "Organizational Requirements", count: 8, desc: "BAAs, group health plan provisions, compliance documentation" },
      { name: "Privacy Rule", count: 6, desc: "PHI use and disclosure limitations, patient rights, minimum necessary" },
    ],
    faq: [
      { q: "Does HIPAA require encryption?", a: "HIPAA doesn't mandate specific encryption standards (unlike PCI DSS), but encryption is an addressable implementation specification meaning you must either implement it or document why it's not reasonable and appropriate for your organization. In practice, encryption of PHI at rest and in transit is the industry standard and is expected by any covered entity you partner with." },
      { q: "What are the HIPAA penalty tiers?", a: "HIPAA penalties range from $137 to $68,928 per violation, with an annual cap of $2.07 million per category. Willful neglect (knowingly failing to comply) carries higher penalties. OCR increasingly pursues cases involving missing risk analyses, lack of encryption, and failure to execute BAAs." },
    ],
    related: ["soc2", "iso27001", "gdpr"],
  },
  gdpr: {
    abbr: "GDPR", name: "GDPR & DPDPA", category: "Privacy", color: "#0284c7",
    headline: "Privacy compliance that builds customer trust.",
    subheadline: "GDPR and DPDPA are the privacy frameworks that matter most for companies with European and Indian users. Compliance isn't just about avoiding fines it's a competitive differentiator.",
    controls: 48, timeline: "8–12 weeks", since: "2018",
    who: "Any organization processing personal data of EU residents (GDPR) or Indian residents (DPDPA), regardless of where the organization is located.",
    overview: "The General Data Protection Regulation (GDPR) is the EU's comprehensive data protection law, in force since May 2018. India's Digital Personal Data Protection Act (DPDPA), passed in 2023, is India's equivalent framework. Both require organizations to process personal data lawfully, transparently, and for specified purposes and give individuals significant rights over their data. Both carry significant enforcement risk: GDPR fines up to 4% of global annual turnover; DPDPA up to INR 250 crore per violation.",
    sections: [
      { heading: "Six lawful bases for processing", body: "Under GDPR (and similarly under DPDPA), every instance of personal data processing must have a lawful basis:", list: ["Consent freely given, specific, informed, unambiguous, and withdrawable", "Contract processing necessary to perform a contract", "Legal obligation processing required by law", "Vital interests protecting someone's life", "Public task exercising official authority", "Legitimate interests balanced against individual rights"] },
      { heading: "Individual rights you must implement", body: "Both GDPR and DPDPA grant individuals rights that require operational workflows to support:", list: ["Right to access provide a copy of personal data within 30 days (GDPR) / reasonable timeframe (DPDPA)", "Right to correction update inaccurate or incomplete data", "Right to erasure delete data when there's no lawful basis to retain", "Right to restriction limit processing in certain circumstances", "Right to portability export data in machine-readable format (GDPR)", "Right to object opt out of certain processing including direct marketing"] },
      { heading: "Cross-border data transfers", body: "Both frameworks restrict transferring personal data outside their jurisdictions. GDPR permits transfers to 'adequate' countries (those the EU Commission has deemed equivalent) or through appropriate safeguards (Standard Contractual Clauses, Binding Corporate Rules). DPDPA permits transfers only to countries approved by the Indian government a list still being established as of 2025." },
    ],
    controlAreas: [
      { name: "Lawful Basis & Consent", count: 8, desc: "Consent management, legitimate interests assessments, privacy notices" },
      { name: "Individual Rights", count: 12, desc: "Access, correction, erasure, portability, and objection workflows" },
      { name: "Data Protection by Design", count: 8, desc: "Data minimization, pseudonymization, privacy impact assessments" },
      { name: "Vendor & Transfer Management", count: 10, desc: "DPAs, SCCs, adequacy assessments, cross-border transfer mechanisms" },
      { name: "Governance & Accountability", count: 10, desc: "DPO, ROPA, breach notification, compliance documentation" },
    ],
    faq: [
      { q: "Does GDPR apply to my company if I'm not in the EU?", a: "Yes. GDPR has extraterritorial scope it applies to any organization that processes personal data of EU residents, regardless of where the organization is located. If your product serves EU users, GDPR applies to you." },
      { q: "What is a Data Processing Agreement?", a: "A DPA is a contract between a data controller (your customer) and a data processor (you, if you process their users' data) that defines the scope, purpose, and obligations of processing. Under GDPR Article 28, DPAs are mandatory before processing begins. Not having signed DPAs in place is one of the most commonly cited GDPR violations." },
      { q: "How quickly do I need to report a data breach?", a: "Under GDPR, you must notify your supervisory authority within 72 hours of becoming aware of a personal data breach that is likely to result in risk to individuals. Notification to affected individuals is required when the breach is likely to result in high risk. DPDPA requires notification to the Data Protection Board and affected individuals 'as soon as reasonably possible'." },
    ],
    related: ["iso27001", "soc2", "iso42001"],
  },
};

const RELATED_META: Record<string, { abbr: string; name: string }> = {
  soc2: { abbr: "SOC 2", name: "SOC 2 Type II" },
  iso27001: { abbr: "27001", name: "ISO 27001:2022" },
  iso42001: { abbr: "42001", name: "ISO 42001" },
  pci: { abbr: "PCI", name: "PCI DSS v4.0" },
  hipaa: { abbr: "HIPAA", name: "HIPAA" },
  gdpr: { abbr: "GDPR", name: "GDPR & DPDPA" },
};

export default function FrameworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const fw = FRAMEWORKS[slug];

  if (!fw) {
    return (
      <div style={{ background: "#030305", color: "#f2f2f4", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12 }}>,</div>
          <div style={{ color: "rgba(242,242,244,0.4)", marginBottom: 24 }}>Framework page coming soon</div>
          <Link href="/frameworks" style={{ color: "#818cf8", textDecoration: "none" }}>← View all frameworks</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#030305", color: "#f2f2f4", minHeight: "100vh" }}>
      <AnimatedBg />

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: 140, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 64, alignItems: "center" }}
          >
            <div>
              <Link href="/frameworks" style={{ fontSize: 12, color: "rgba(242,242,244,0.35)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
                ← All frameworks
              </Link>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 700, color: "rgba(242,242,244,0.3)", letterSpacing: "0.1em" }}>{fw.abbr}</span>
                <span style={{ color: "rgba(242,242,244,0.15)" }}>·</span>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: fw.color, background: `${fw.color}18`, padding: "2px 9px", borderRadius: 100 }}>{fw.category}</span>
              </div>
              <h1 style={{ fontSize: "clamp(2.2rem,4.5vw,4.2rem)", fontWeight: 800, letterSpacing: "-0.042em", lineHeight: 1.02, marginBottom: 18 }}>
                {fw.headline}
              </h1>
              <p style={{ fontSize: 17, color: "rgba(242,242,244,0.48)", lineHeight: 1.78, letterSpacing: "-0.01em", maxWidth: 520, marginBottom: 36 }}>
                {fw.subheadline}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <motion.a href="#" whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(99,102,241,0.3)" }} style={{ display: "inline-block", textDecoration: "none", fontSize: 14, fontWeight: 600, background: "#4f46e5", color: "#fff", padding: "12px 26px", borderRadius: 9, letterSpacing: "-0.01em" }}>
                  Start {fw.abbr} with Avirio
                </motion.a>
                <motion.a href="#" whileHover={{ color: "rgba(242,242,244,0.7)" }} style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", fontSize: 14, fontWeight: 500, color: "rgba(242,242,244,0.4)", letterSpacing: "-0.01em" }}>
                  Talk to an expert →
                </motion.a>
              </div>
            </div>

            {/* Stats card */}
            <div style={{ background: "rgba(7,7,12,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "32px", backdropFilter: "blur(20px)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                {[
                  { v: fw.controls, l: "Controls" },
                  { v: fw.timeline, l: "Timeline" },
                  { v: "SOC 2", l: "Often paired with" },
                  { v: fw.since, l: "Standard since" },
                ].map((s) => (
                  <div key={s.l}>
                    <div style={{ fontSize: typeof s.v === "number" ? 28 : 18, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color: "#f2f2f4" }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "rgba(242,242,244,0.3)", marginTop: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(242,242,244,0.3)", marginBottom: 10 }}>Who needs this</div>
                <p style={{ fontSize: 13, color: "rgba(242,242,244,0.5)", lineHeight: 1.65 }}>{fw.who}</p>
              </div>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#10b981" }}>Fully supported in Avirio</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <p style={{ fontSize: 18, color: "rgba(242,242,244,0.62)", lineHeight: 1.8, letterSpacing: "-0.01em" }}>{fw.overview}</p>
          </Reveal>
        </div>
      </section>

      {/* SECTIONS */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          {fw.sections.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{ marginBottom: 56 }}>
                <h2 style={{ fontSize: "clamp(1.3rem,2.2vw,1.7rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 16 }}>{s.heading}</h2>
                <p style={{ fontSize: 16, color: "rgba(242,242,244,0.58)", lineHeight: 1.82 }}>{s.body}</p>
                {s.list && (
                  <ul style={{ listStyle: "none", marginTop: 18, display: "flex", flexDirection: "column", gap: 9 }}>
                    {s.list.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "rgba(242,242,244,0.55)" }}>
                        <span style={{ color: fw.color, flexShrink: 0, marginTop: 2, fontSize: 14 }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTROL AREAS */}
      <section style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal className="mb-12">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: fw.color, marginBottom: 14 }}>Control areas</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08 }}>
              {fw.controls} controls. Every one automated.
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
            {fw.controlAreas.map((ca, i) => (
              <Reveal key={ca.name} delay={i * 0.06}>
                <motion.div
                  whileHover={{ background: "rgba(99,102,241,0.04)" }}
                  style={{ display: "flex", alignItems: "center", gap: 24, padding: "20px 28px", background: "#030305", borderBottom: i < fw.controlAreas.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                >
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: fw.color, minWidth: 56 }}>{ca.count}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{ca.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(242,242,244,0.4)" }}>{ca.desc}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", letterSpacing: "0.06em" }}>Automated</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <Reveal className="mb-12">
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.038em" }}>Common questions</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {fw.faq.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "28px" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 10 }}>{item.q}</div>
                  <p style={{ fontSize: 14, color: "rgba(242,242,244,0.5)", lineHeight: 1.75 }}>{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section style={{ position: "relative", zIndex: 1, padding: "64px 0 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,242,244,0.28)", marginBottom: 24 }}>Often paired with</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {fw.related.filter((r) => RELATED_META[r]).map((r) => (
              <Link key={r} href={`/frameworks/${r}`} style={{ textDecoration: "none" }}>
                <motion.div whileHover={{ borderColor: "rgba(255,255,255,0.14)", y: -3 }} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "22px 24px" }}>
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 700, color: "rgba(242,242,244,0.25)", letterSpacing: "0.1em", marginBottom: 8 }}>{RELATED_META[r].abbr}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>{RELATED_META[r].name}</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 32px 100px" }}>
        <Reveal>
          <div style={{ maxWidth: 1200, margin: "0 auto", background: "rgba(79,70,229,0.07)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 20, padding: "72px 64px", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
              Ready to start {fw.name}?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(242,242,244,0.45)", maxWidth: 420, margin: "0 auto 40px", lineHeight: 1.75 }}>
              Avirio automates evidence collection, control testing, and audit management for {fw.name}. Get certified faster, stay certified easier.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <motion.a href="#" whileHover={{ scale: 1.03, boxShadow: "0 0 36px rgba(99,102,241,0.35)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block", textDecoration: "none", fontSize: 15, fontWeight: 600, background: "#4f46e5", color: "#fff", padding: "14px 32px", borderRadius: 10, letterSpacing: "-0.01em" }}>
                Get a demo
              </motion.a>
              <motion.a href="/frameworks" whileHover={{ background: "rgba(255,255,255,0.08)" }} style={{ display: "inline-block", textDecoration: "none", fontSize: 15, fontWeight: 500, background: "rgba(255,255,255,0.05)", color: "rgba(242,242,244,0.55)", padding: "14px 32px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.09)", letterSpacing: "-0.01em" }}>
                View all frameworks
              </motion.a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
