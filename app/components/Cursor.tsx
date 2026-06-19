"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  // ring uses spring for the nice trailing effect
  const rx = useMotionValue(-200);
  const ry = useMotionValue(-200);
  const springX = useSpring(rx, { stiffness: 220, damping: 24, mass: 0.35 });
  const springY = useSpring(ry, { stiffness: 220, damping: 24, mass: 0.35 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      // dot: direct DOM write zero React overhead, truly instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      // ring: motion value (spring will follow)
      rx.set(e.clientX);
      ry.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const check = (e: MouseEvent) => {
      setHovering(!!(e.target as HTMLElement).closest("a,button,input,[data-hover]"));
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousemove", check, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", check);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [rx, ry, visible]);

  if (!visible) return null;

  return (
    <>
      {/* dot pure DOM, zero lag */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
          width: clicking ? 5 : hovering ? 10 : 7,
          height: clicking ? 5 : hovering ? 10 : 7,
          borderRadius: "50%",
          background: hovering ? "#818cf8" : "#fff",
          mixBlendMode: "difference",
          marginLeft: clicking ? "-2.5px" : hovering ? "-5px" : "-3.5px",
          marginTop: clicking ? "-2.5px" : hovering ? "-5px" : "-3.5px",
          transition: "width 0.12s, height 0.12s, background 0.18s, margin 0.12s",
          willChange: "transform",
        }}
      />
      {/* ring spring trailing */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none",
          x: springX, y: springY,
          translateX: "-50%", translateY: "-50%",
          borderRadius: "50%",
          border: hovering ? "1.5px solid rgba(129,140,248,0.8)" : "1.5px solid rgba(255,255,255,0.45)",
          willChange: "transform",
        }}
        animate={{
          width: hovering ? 46 : clicking ? 18 : 32,
          height: hovering ? 46 : clicking ? 18 : 32,
          opacity: clicking ? 0.4 : 0.85,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
}
