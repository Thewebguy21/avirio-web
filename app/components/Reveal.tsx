"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  className = "",
  stagger = 0.08,
  style,
}: {
  children: React.ReactNode[];
  className?: string;
  stagger?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className={className} style={style}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * stagger, ease }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
