"use client";
import { useRef, useState, useCallback } from "react";

export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 62, y: -8 });
  const [glow2, setGlow2] = useState({ x: 20, y: 60 });
  const rafRef = useRef<number | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGlow({ x: x - 15, y: y - 20 });
      setGlow2({ x: 100 - x - 10, y: 100 - y - 10 });
    });
  }, []);

  return (
    <div ref={ref} onMouseMove={onMouseMove} style={{ position: "relative" }}>
      {/* Primary gold glow — follows cursor */}
      <div style={{
        position: "absolute",
        top: `${glow.y}%`, left: `${glow.x}%`,
        width: "580px", height: "580px",
        background: "radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 62%)",
        pointerEvents: "none",
        transition: "top 0.55s cubic-bezier(0.16,1,0.3,1), left 0.55s cubic-bezier(0.16,1,0.3,1)",
        zIndex: 1,
        transform: "translate(-50%,-50%)",
      }} />
      {/* Secondary blue glow — moves opposite */}
      <div style={{
        position: "absolute",
        top: `${glow2.y}%`, left: `${glow2.x}%`,
        width: "420px", height: "420px",
        background: "radial-gradient(circle, rgba(56,100,180,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
        transition: "top 0.8s cubic-bezier(0.16,1,0.3,1), left 0.8s cubic-bezier(0.16,1,0.3,1)",
        zIndex: 1,
        transform: "translate(-50%,-50%)",
      }} />
      {children}
    </div>
  );
}
