"use client";
import { useEffect, useRef } from "react";

export default function BeamBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId: number;
    let t = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Dot grid
    const COLS = Math.ceil(width / 40) + 2;
    const ROWS = Math.ceil(height / 40) + 2;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.008;

      // Animated dot grid
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const x = i * 40;
          const y = j * 40;
          const dist = Math.sqrt(
            Math.pow(x - width / 2, 2) + Math.pow(y - height / 2, 2)
          );
          const wave = Math.sin(dist * 0.015 - t * 2) * 0.5 + 0.5;
          const alpha = wave * 0.18 + 0.02;
          const r = 1 + wave * 1.2;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99,102,241,${alpha})`;
          ctx.fill();
        }
      }

      // Radial beam from top
      const grad = ctx.createRadialGradient(
        width / 2, 0, 0,
        width / 2, 0, height * 0.85
      );
      const pulse = Math.sin(t * 0.7) * 0.025 + 0.075;
      grad.addColorStop(0, `rgba(99,102,241,${pulse})`);
      grad.addColorStop(0.4, `rgba(79,70,229,${pulse * 0.3})`);
      grad.addColorStop(1, "rgba(3,3,5,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Sweeping horizontal line
      const lineY = (Math.sin(t * 0.4) * 0.15 + 0.35) * height;
      const lineGrad = ctx.createLinearGradient(0, lineY, width, lineY);
      lineGrad.addColorStop(0, "rgba(99,102,241,0)");
      lineGrad.addColorStop(0.5, `rgba(99,102,241,${0.06 + Math.sin(t) * 0.02})`);
      lineGrad.addColorStop(1, "rgba(99,102,241,0)");
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      ctx.lineTo(width, lineY);
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
