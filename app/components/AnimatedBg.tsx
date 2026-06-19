"use client";

export default function AnimatedBg({ accent = "indigo" }: { accent?: "indigo" | "violet" | "none" }) {
  const c1 = accent === "indigo" ? "rgba(79,70,229,0.14)" : accent === "violet" ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.04)";
  const c2 = accent === "indigo" ? "rgba(99,102,241,0.09)" : accent === "violet" ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.02)";
  const c3 = accent === "indigo" ? "rgba(67,56,202,0.07)" : "rgba(255,255,255,0.02)";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* dot grid */}
      <div
        className="dot-grid absolute inset-0"
        style={{ opacity: 0.028 }}
      />
      {/* orb a top-left */}
      <div
        className="orb-a absolute rounded-full"
        style={{
          width: 1000, height: 1000,
          top: "-25%", left: "-5%",
          background: `radial-gradient(circle, ${c1} 0%, transparent 68%)`,
        }}
      />
      {/* orb b bottom-right */}
      <div
        className="orb-b absolute rounded-full"
        style={{
          width: 800, height: 800,
          bottom: "-10%", right: "-5%",
          background: `radial-gradient(circle, ${c2} 0%, transparent 68%)`,
        }}
      />
      {/* orb c center */}
      <div
        className="orb-c absolute rounded-full"
        style={{
          width: 500, height: 500,
          top: "45%", left: "40%",
          background: `radial-gradient(circle, ${c3} 0%, transparent 68%)`,
        }}
      />
      {/* scan line */}
      <div
        className="scan-line absolute left-0 right-0 pointer-events-none"
        style={{
          height: 180,
          background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.022) 50%, transparent)",
        }}
      />
    </div>
  );
}
