"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Field = { name: string; email: string; company: string; need: string; message: string };
const NEEDS = ["SOC 2 Type II", "ISO 27001", "ISO 42001 (AI)", "HIPAA", "PCI DSS", "GDPR / DPDPA", "Multiple frameworks", "Not sure yet"];

export default function DemoModal() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Field>({ name: "", email: "", company: "", need: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-demo", handler);
    return () => window.removeEventListener("open-demo", handler);
  }, []);

  const close = () => { setOpen(false); setTimeout(() => setStatus("idle"), 400); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const set = (k: keyof Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((p) => ({ ...p, [k]: e.target.value }));

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)", zIndex: 1000 }}
          />

          {/* panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", zIndex: 1001,
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: "min(540px, 96vw)",
              background: "rgba(10,10,18,0.98)",
              border: "1px solid rgba(99,102,241,0.28)",
              borderRadius: 20,
              boxShadow: "0 32px 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            {/* top accent */}
            <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(99,102,241,0.7), transparent)" }} />

            <div style={{ padding: "40px 44px" }}>
              {/* close */}
              <button
                onClick={close}
                style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "rgba(242,242,244,0.32)", fontSize: 22, cursor: "pointer", lineHeight: 1 }}
              >
                ×
              </button>

              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: "center", padding: "24px 0" }}
                >
                  <div style={{ fontSize: 40, marginBottom: 20 }}>
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ display: "block", margin: "0 auto" }}>
                      <circle cx="26" cy="26" r="25" stroke="#10b981" strokeWidth="1.5" opacity=".3"/>
                      <path d="M16 26l8 8 12-14" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10, color: "#f2f2f4" }}>You are on the list</h3>
                  <p style={{ fontSize: 14, color: "rgba(242,242,244,0.45)", lineHeight: 1.7 }}>
                    We will be in touch within 24 hours to schedule your demo.
                  </p>
                  <button
                    onClick={close}
                    style={{ marginTop: 28, fontSize: 13, fontWeight: 600, color: "#818cf8", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", padding: "10px 24px", borderRadius: 8, cursor: "pointer" }}
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", marginBottom: 14 }}>Get a demo</div>
                  <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.2, color: "#f2f2f4", marginBottom: 6 }}>
                    See Avirio in action
                  </h2>
                  <p style={{ fontSize: 14, color: "rgba(242,242,244,0.4)", marginBottom: 32, lineHeight: 1.6 }}>
                    A 30-minute walkthrough tailored to your framework and team size.
                  </p>

                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {([
                      { k: "name",    label: "Full name",    type: "text",  placeholder: "Jane Smith"        },
                      { k: "email",   label: "Work email",   type: "email", placeholder: "jane@company.com"  },
                      { k: "company", label: "Company",      type: "text",  placeholder: "Acme Inc."         },
                    ] as { k: keyof Field; label: string; type: string; placeholder: string }[]).map(({ k, label, type, placeholder }) => (
                      <div key={k}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(242,242,244,0.5)", display: "block", marginBottom: 6 }}>{label}</label>
                        <input
                          required type={type} value={fields[k]} onChange={set(k)} placeholder={placeholder}
                          style={{
                            width: "100%", boxSizing: "border-box",
                            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 9, padding: "11px 14px", fontSize: 14, color: "#f2f2f4",
                            outline: "none", transition: "border-color 0.2s",
                          }}
                          onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.6)")}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                    ))}

                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(242,242,244,0.5)", display: "block", marginBottom: 6 }}>What do you need?</label>
                      <select
                        value={fields.need} onChange={set("need")}
                        style={{
                          width: "100%", boxSizing: "border-box",
                          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 9, padding: "11px 14px", fontSize: 14, color: fields.need ? "#f2f2f4" : "rgba(242,242,244,0.3)",
                          outline: "none", cursor: "pointer",
                        }}
                      >
                        <option value="" disabled>Select a framework</option>
                        {NEEDS.map(n => <option key={n} value={n} style={{ background: "#0a0a12", color: "#f2f2f4" }}>{n}</option>)}
                      </select>
                    </div>

                    {status === "error" && (
                      <p style={{ fontSize: 12, color: "#f87171", margin: 0 }}>Something went wrong. Please try again or email us directly.</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(99,102,241,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        marginTop: 4, width: "100%", padding: "14px",
                        background: "#4f46e5", color: "#fff",
                        border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600,
                        cursor: status === "sending" ? "wait" : "pointer",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {status === "sending" ? "Sending..." : "Request a demo"}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
