"use client";

import { motion } from "framer-motion";
import AnimatedBg from "../components/AnimatedBg";
import { Reveal } from "../components/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const VALUES = [
  {
    name: "Infrastructure thinking",
    body: "Compliance tooling should work like great infrastructure. Automated, always-on, and invisible when everything is going right.",
  },
  {
    name: "Radical transparency",
    body: "We show security posture as it actually is, not as a company wishes it looked. Clear gaps. Real risk. No varnish.",
  },
  {
    name: "Speed without shortcuts",
    body: "Compliance slows companies down. We are building the fastest path to certification that doesn't cut corners on quality.",
  },
  {
    name: "Security by default",
    body: "We hold ourselves to the same standards we help others achieve. Every product decision starts with security, not compliance.",
  },
];

const PRINCIPLES = [
  { n: "01", t: "Build for builders", b: "The best compliance tooling gets out of the way and lets engineering teams keep shipping. Every feature we build asks: does this add friction or remove it?" },
  { n: "02", t: "Evidence over assertions", b: "Real security is demonstrated, not declared. We automate the evidence collection that proves controls work, so auditors spend time on substance, not logistics." },
  { n: "03", t: "One truth, many frameworks", b: "Security controls should be implemented once and mapped to every framework that needs them. Compliance should scale with the business, not against it." },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#030305", color: "#f2f2f4", minHeight: "100vh" }}>
      <AnimatedBg accent="violet" />

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: 160, paddingBottom: 100, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 24 }}>About</div>
            <h1 style={{ fontSize: "clamp(2.8rem,6vw,5.2rem)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.97, marginBottom: 36, maxWidth: 700 }}>
              Compliance infrastructure<br />
              <span style={{ color: "#818cf8" }}>for companies that move fast.</span>
            </h1>
            <p style={{ fontSize: 18, color: "rgba(242,242,244,0.5)", lineHeight: 1.8, letterSpacing: "-0.01em", maxWidth: 600 }}>
              We are building the compliance platform that modern software companies deserve.
              Automated, continuous, and built for engineering-driven organizations
              that treat security as a feature, not a tax.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 60 }}>
              <div style={{ flex: "0 0 160px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8" }}>Our mission</div>
              </div>
              <p style={{ fontSize: "clamp(1.3rem,2.5vw,2rem)", fontWeight: 600, lineHeight: 1.42, letterSpacing: "-0.025em", color: "rgba(242,242,244,0.82)" }}>
                To make compliance infrastructure as reliable, automatic, and
                unremarkable as the best cloud infrastructure. So companies
                can focus on building great products instead of managing
                evidence folders.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", padding: "100px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 40 }}>The problem we are solving</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <p style={{ fontSize: 17, color: "rgba(242,242,244,0.6)", lineHeight: 1.8, letterSpacing: "-0.01em" }}>
                Getting SOC 2 certified today means months of manual work: screenshots, spreadsheets, policy documents written from scratch, consultants charging by the hour, and an evidence room that needs to be rebuilt every audit cycle.
              </p>
              <p style={{ fontSize: 17, color: "rgba(242,242,244,0.6)", lineHeight: 1.8, letterSpacing: "-0.01em" }}>
                Most companies treat compliance as a one-time project, when it should be a continuous process. The result is security programs that look good at audit time and fall apart in between.
              </p>
              <p style={{ fontSize: 17, color: "rgba(242,242,244,0.75)", lineHeight: 1.8, letterSpacing: "-0.01em", fontWeight: 500 }}>
                Avirio treats compliance as infrastructure. It runs continuously, adapts as your organization grows, and gives you evidence that is always current, always accurate.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>Values</div>
            <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08, marginBottom: 52 }}>How we work</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.07}>
                <motion.div
                  whileHover={{ borderColor: "rgba(99,102,241,0.32)", background: "rgba(99,102,241,0.035)" }}
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "36px", transition: "all 0.2s" }}
                >
                  <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>{v.name}</h3>
                  <p style={{ fontSize: 14, color: "rgba(242,242,244,0.46)", lineHeight: 1.78 }}>{v.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.01)", padding: "100px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>Product principles</div>
            <h2 style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08, marginBottom: 52 }}>What guides every decision</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <motion.div
                  whileHover={{ background: "rgba(99,102,241,0.04)" }}
                  style={{ padding: "44px 36px", background: "#030305", borderRight: i < PRINCIPLES.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "background 0.2s" }}
                >
                  <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, color: "rgba(242,242,244,0.2)", letterSpacing: "0.1em", marginBottom: 20 }}>{p.n}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 14 }}>{p.t}</h3>
                  <p style={{ fontSize: 14, color: "rgba(242,242,244,0.45)", lineHeight: 1.78 }}>{p.b}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE WE ARE */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>Right now</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.08, marginBottom: 32 }}>We are early and moving fast.</h2>
            <p style={{ fontSize: 17, color: "rgba(242,242,244,0.5)", lineHeight: 1.8, letterSpacing: "-0.01em", maxWidth: 600, marginBottom: 20 }}>
              Avirio is in early access. We are working closely with a small group of companies to get the product right before we open it up more broadly.
            </p>
            <p style={{ fontSize: 17, color: "rgba(242,242,244,0.5)", lineHeight: 1.8, letterSpacing: "-0.01em", maxWidth: 600 }}>
              If you are building a security program and want to help shape what compliance infrastructure looks like, we would love to talk.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HIRING */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 32px 120px", paddingTop: 80 }}>
        <Reveal>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            background: "rgba(79,70,229,0.07)", border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: 20, padding: "72px 64px",
            display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 48,
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.13em", textTransform: "uppercase", color: "#818cf8", marginBottom: 16 }}>We are hiring</div>
              <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.038em", lineHeight: 1.1, marginBottom: 14 }}>
                Help build the compliance infrastructure layer.
              </h2>
              <p style={{ fontSize: 15, color: "rgba(242,242,244,0.45)", lineHeight: 1.75, maxWidth: 480 }}>
                Small team. Ambitious problem. If you care deeply about security, love building developer tools, and want to work on something that matters to every company that ships software, we want to meet you.
              </p>
            </div>
            <motion.a
              href="#"
              whileHover={{ scale: 1.03, boxShadow: "0 0 36px rgba(99,102,241,0.35)" }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-block", textDecoration: "none", fontSize: 15, fontWeight: 600, background: "#4f46e5", color: "#fff", padding: "14px 32px", borderRadius: 10, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}
            >
              See open roles
            </motion.a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
