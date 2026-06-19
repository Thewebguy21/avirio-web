import Link from "next/link";

const COLS = [
  {
    heading: "Platform",
    links: [
      { label: "Compliance Automation", href: "/platform" },
      { label: "Risk Management", href: "/platform" },
      { label: "AI Governance", href: "/platform" },
      { label: "Trust Center", href: "/platform" },
      { label: "Vendor Risk", href: "/platform" },
      { label: "Integrations", href: "/platform" },
    ],
  },
  {
    heading: "Frameworks",
    links: [
      { label: "SOC 2 Type II", href: "/frameworks" },
      { label: "ISO 27001:2022", href: "/frameworks" },
      { label: "ISO 42001", href: "/frameworks" },
      { label: "PCI DSS v4.0", href: "/frameworks" },
      { label: "HIPAA", href: "/frameworks" },
      { label: "GDPR & DPDPA", href: "/frameworks" },
      { label: "All frameworks →", href: "/frameworks" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Startups", href: "/solutions" },
      { label: "Growth stage", href: "/solutions" },
      { label: "Enterprise", href: "/solutions" },
      { label: "Fintech", href: "/solutions" },
      { label: "Healthcare", href: "/solutions" },
      { label: "AI Companies", href: "/solutions" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/resources" },
      { label: "Guides & Templates", href: "/resources" },
      { label: "Webinars", href: "/resources" },
      { label: "Case Studies", href: "/resources" },
      { label: "Documentation", href: "/resources" },
      { label: "Compliance Glossary", href: "/resources" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Security", href: "/about" },
      { label: "Press", href: "/about" },
    ],
  },
];

const TRUST = ["SOC 2 Type II", "ISO 27001", "ISO 42001", "GDPR"];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "#030305",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* main grid */}
      <div
        style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "72px 32px 48px",
          display: "grid",
          gridTemplateColumns: "220px repeat(5, 1fr)",
          gap: 40,
        }}
      >
        {/* brand */}
        <div>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M3 7L6.5 3.5L10 7L6.5 10.5L3 7Z" fill="white" opacity="0.95"/>
              </svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#f2f2f4", letterSpacing: "-0.025em" }}>Avirio</span>
          </Link>
          <p style={{ fontSize: 13, color: "rgba(242,242,244,0.35)", lineHeight: 1.65, maxWidth: 180 }}>
            The compliance platform modern companies rely on.
          </p>
          {/* trust badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 24 }}>
            {TRUST.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                  padding: "4px 8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 4,
                  color: "rgba(242,242,244,0.4)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* link columns */}
        {COLS.map((col) => (
          <div key={col.heading}>
            <div
              style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "rgba(242,242,244,0.3)",
                marginBottom: 18,
              }}
            >
              {col.heading}
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    style={{ fontSize: 13, color: "rgba(242,242,244,0.45)", textDecoration: "none", letterSpacing: "-0.01em" }}
                    className="hover:text-white/80 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          maxWidth: 1200, margin: "0 auto",
          padding: "20px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}
      >
        <div style={{ fontSize: 12, color: "rgba(242,242,244,0.25)" }}>
          © 2025 Avirio Inc. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy Policy", "Terms of Service", "Cookie Settings", "Security"].map((l) => (
            <Link key={l} href="#" style={{ fontSize: 12, color: "rgba(242,242,244,0.25)", textDecoration: "none" }} className="hover:text-white/50 transition-colors">
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
