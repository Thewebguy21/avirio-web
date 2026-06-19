"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── small inline icons ── */
const Icons = {
  automation: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor" opacity=".9"/><rect x="9" y="2" width="5" height="5" rx="1.5" fill="currentColor" opacity=".4"/><rect x="2" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity=".4"/><rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity=".75"/></svg>,
  risk: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M8 2L14 13H2L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 6V9M8 11.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  ai: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.07 1.07M11.53 11.53l1.07 1.07M3.4 12.6l1.07-1.07M11.53 4.47l1.07-1.07" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  shield: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M8 2L13 4.5V8c0 3-2.5 4.8-5 6C5.5 12.8 3 11 3 8V4.5L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5.5 8l1.5 1.5L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  cloud: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M4 10a3 3 0 010-6c.32 0 .63.05.92.14A4 4 0 0112 7a2.5 2.5 0 010 5H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  code: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M5 4L2 8l3 4M11 4l3 4-3 4M9 3l-2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  vendor: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M2 6h12v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" stroke="currentColor" strokeWidth="1.5"/><path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  rocket: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M8 2c0 0 4 2 4 6s-4 6-4 6S4 12 4 8s4-6 4-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/></svg>,
  trend: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M2 12l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  building: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><rect x="2" y="6" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  doc: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  person: <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

type FwItem = { abbr: string; name: string; slug: string; cat: "security" | "ai" | "industry" | "privacy" };
const FW_ITEMS: FwItem[] = [
  { abbr: "SOC 2",  name: "SOC 2 Type II",   slug: "soc2",     cat: "security" },
  { abbr: "27001",  name: "ISO 27001:2022",  slug: "iso27001", cat: "security" },
  { abbr: "HIPAA",  name: "HIPAA",           slug: "hipaa",    cat: "security" },
  { abbr: "GDPR",   name: "GDPR and DPDPA",  slug: "gdpr",     cat: "privacy"  },
  { abbr: "CCPA",   name: "CCPA / CPRA",     slug: "ccpa",     cat: "privacy"  },
  { abbr: "42001",  name: "ISO 42001 (AI)",  slug: "iso42001", cat: "ai"       },
  { abbr: "PCI",    name: "PCI DSS v4.0",    slug: "pci",      cat: "industry" },
  { abbr: "NIST",   name: "NIST CSF 2.0",    slug: "nist",     cat: "industry" },
  { abbr: "CIS",    name: "CIS Controls v8", slug: "cis",      cat: "industry" },
  { abbr: "HITRUST",name: "HITRUST CSF",     slug: "hitrust",  cat: "industry" },
];
const CAT_COLOR: Record<string, string> = {
  security: "#4f46e5", ai: "#7c3aed", privacy: "#0891b2", industry: "#059669",
};

type ColItem = { name: string; desc?: string; href: string; icon?: keyof typeof Icons };
type Col = { heading: string; items: ColItem[] };
type Menu = { cols: Col[]; footer?: { label: string; href: string }; fw?: boolean; direct?: string };

const MENUS: Record<string, Menu> = {
  Platform: {
    cols: [
      { heading: "Capabilities", items: [
        { name: "Compliance Automation", desc: "Continuous evidence collection and control testing", href: "/platform", icon: "automation" },
        { name: "Risk Management",       desc: "Identify, assess, and treat risks across your org",  href: "/platform", icon: "risk"        },
        { name: "AI Governance",         desc: "ISO 42001 for teams building or deploying AI",       href: "/platform", icon: "ai"          },
        { name: "Trust Center",          desc: "Share your security posture with customers",          href: "/platform", icon: "shield"      },
      ]},
      { heading: "Integrations", items: [
        { name: "Cloud Providers", desc: "AWS, GCP, Azure auto-collect evidence from your infra", href: "/platform", icon: "cloud"  },
        { name: "Dev and Identity", desc: "GitHub, Okta, Google Workspace, 50+ more",               href: "/platform", icon: "code"   },
        { name: "Vendor Risk",     desc: "Assess and monitor third-party suppliers at scale",        href: "/platform", icon: "vendor" },
      ]},
    ],
  },
  Frameworks: { cols: [], fw: true },
  Solutions: {
    cols: [
      { heading: "By stage", items: [
        { name: "Startups",    desc: "Get SOC 2 fast. Win enterprise deals.",      href: "/solutions", icon: "rocket"   },
        { name: "Growth",      desc: "Multiple frameworks, zero duplicated effort.", href: "/solutions", icon: "trend"    },
        { name: "Enterprise",  desc: "Multi-entity compliance at scale.",           href: "/solutions", icon: "building" },
      ]},
      { heading: "By industry", items: [
        { name: "Fintech",      desc: "PCI DSS, SOC 2, ISO 27001", href: "/solutions" },
        { name: "Healthcare",   desc: "HIPAA, HITRUST, SOC 2",     href: "/solutions" },
        { name: "AI Companies", desc: "ISO 42001, SOC 2, GDPR",    href: "/solutions" },
        { name: "SaaS",         desc: "SOC 2, ISO 27001, GDPR",    href: "/solutions" },
      ]},
    ],
  },
  Resources: { cols: [], direct: "/resources" },
  Company: {
    cols: [
      { heading: "Company", items: [
        { name: "About Avirio", desc: "Our mission and values",                      href: "/about", icon: "person"   },
        { name: "Careers",      desc: "Join the team building compliance infrastructure", href: "/about"              },
        { name: "Security",     desc: "How we protect your data",                    href: "/about"                   },
        { name: "Press",        desc: "News and media resources",                    href: "/about"                   },
      ]},
    ],
  },
};

type MenuKey = keyof typeof MENUS;
const MAIN_LINKS = Object.keys(MENUS) as MenuKey[];

export default function Navbar() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { setOpen(null); }, [pathname]);

  const enter = (key: MenuKey) => {
    if (MENUS[key].direct) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(null), 180); };
  const stay  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  const menu = open ? MENUS[open] : null;

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 60, display: "flex", alignItems: "center",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      background: scrolled ? "rgba(3,3,5,0.93)" : "transparent",
      backdropFilter: scrolled ? "blur(28px)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* LOGO */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7L6.5 3.5L10 7L6.5 10.5L3 7Z" fill="white" opacity=".95"/>
              <path d="M6.5 3.5L10 7L13 4L10 1L6.5 3.5Z" fill="white" opacity=".42"/>
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.03em", color: "#f2f2f4" }}>Avirio</span>
        </Link>

        {/* NAV */}
        <nav style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {MAIN_LINKS.map((key) => {
            const m = MENUS[key];
            if (m.direct) {
              return (
                <Link
                  key={key}
                  href={m.direct}
                  style={{
                    padding: "8px 13px",
                    fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em",
                    color: pathname.startsWith(m.direct) ? "#f2f2f4" : "rgba(242,242,244,0.48)",
                    borderRadius: 7, textDecoration: "none", transition: "color 0.18s",
                  }}
                >
                  {key}
                </Link>
              );
            }
            return (
              <button
                key={key}
                onMouseEnter={() => enter(key)}
                onMouseLeave={leave}
                style={{
                  background: "none", border: "none", padding: "8px 13px",
                  fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em", cursor: "pointer",
                  color: open === key ? "#f2f2f4" : "rgba(242,242,244,0.48)",
                  borderRadius: 7, transition: "color 0.18s",
                  display: "flex", alignItems: "center", gap: 4,
                }}
              >
                {key}
                <motion.svg
                  animate={{ rotate: open === key ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{ opacity: 0.38 }}
                >
                  <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Link href="#" style={{ fontSize: 13, fontWeight: 500, color: "rgba(242,242,244,0.38)", textDecoration: "none" }}>Sign in</Link>
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent("open-demo"))}
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99,102,241,0.35)" }}
            whileTap={{ scale: 0.97 }}
            style={{ fontSize: 13, fontWeight: 600, background: "#4f46e5", color: "#fff", padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}
          >
            Get a demo
          </motion.button>
        </div>
      </div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && menu && !menu.direct && (
          <motion.div
            key={open}
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.13 } }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={stay}
            onMouseLeave={leave}
            style={{
              position: "absolute", top: "calc(100% + 8px)", left: "50%",
              transform: "translateX(-50%)",
              width: menu.fw ? "min(860px, 96vw)" : "min(760px, 96vw)",
              background: "rgba(8,8,14,0.97)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 16,
              boxShadow: "0 28px 72px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            {/* top accent line */}
            <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(99,102,241,0.55), transparent)" }} />

            {/* FRAMEWORKS special layout */}
            {menu.fw ? (
              <div style={{ padding: "24px 28px 20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 16 }}>
                  {FW_ITEMS.map((fw) => (
                    <Link key={fw.abbr} href={`/frameworks/${fw.slug}`} style={{ textDecoration: "none" }}>
                      <motion.div
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.045)" }}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9 }}
                      >
                        <div style={{
                          width: 36, height: 24, borderRadius: 6, flexShrink: 0,
                          background: `${CAT_COLOR[fw.cat]}18`,
                          border: `1px solid ${CAT_COLOR[fw.cat]}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: fw.abbr.length > 4 ? 8 : 10,
                          fontWeight: 700, color: CAT_COLOR[fw.cat],
                          letterSpacing: "0.03em",
                        }}>
                          {fw.abbr.length > 5 ? fw.abbr.slice(0, 5) : fw.abbr}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(242,242,244,0.75)", letterSpacing: "-0.01em" }}>
                          {fw.name}
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Link href="/frameworks" style={{ fontSize: 13, fontWeight: 600, color: "#818cf8", textDecoration: "none" }}>
                    View all frameworks
                  </Link>
                  <span style={{ fontSize: 11, color: "rgba(242,242,244,0.22)", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                    All frameworks supported
                  </span>
                </div>
              </div>
            ) : (
              /* STANDARD COLS layout */
              <div>
                <div style={{ padding: "22px 24px 18px", display: "grid", gridTemplateColumns: `repeat(${menu.cols.length}, 1fr)`, gap: 0 }}>
                  {menu.cols.map((col, ci) => (
                    <div
                      key={ci}
                      style={{
                        paddingRight: ci < menu.cols.length - 1 ? 24 : 0,
                        borderRight: ci < menu.cols.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        paddingLeft: ci > 0 ? 24 : 0,
                      }}
                    >
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,242,244,0.26)", marginBottom: 10 }}>
                        {col.heading}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {col.items.map((item) => {
                          const icon = item.icon ? Icons[item.icon] : null;
                          return (
                            <Link key={item.name} href={item.href} style={{ textDecoration: "none" }}>
                              <motion.div
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.045)" }}
                                style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 10px", borderRadius: 8 }}
                              >
                                {icon && (
                                  <div style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 7, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#818cf8", marginTop: 1 }}>
                                    {icon}
                                  </div>
                                )}
                                <div>
                                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f2f2f4", letterSpacing: "-0.015em", lineHeight: 1.3 }}>{item.name}</div>
                                  {item.desc && <div style={{ fontSize: 12, color: "rgba(242,242,244,0.34)", marginTop: 2, lineHeight: 1.5 }}>{item.desc}</div>}
                                </div>
                              </motion.div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {menu.footer && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 32px", background: "rgba(255,255,255,0.015)" }}>
                    <Link href={menu.footer.href} style={{ fontSize: 13, fontWeight: 600, color: "#818cf8", textDecoration: "none" }}>{menu.footer.label}</Link>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
