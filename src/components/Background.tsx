"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Background() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;

    const xTo = gsap.quickTo(glowRef.current, "x", { duration: 2, ease: "power3.out" });
    const yTo = gsap.quickTo(glowRef.current, "y", { duration: 2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Center the glow on the cursor
      xTo(e.clientX - 400); 
      yTo(e.clientY - 400);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-obsidian">
      {/* High-res noise overlay */}
      <div className="absolute inset-0 bg-noise mix-blend-screen opacity-50"></div>
      
      {/* Mouse Follow Glow */}
      <div 
        ref={glowRef}
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.15] mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.8) 0%, rgba(6,182,212,0.4) 50%, rgba(0,0,0,0) 70%)",
          top: 0,
          left: 0,
          transform: "translate(-1000px, -1000px)" // hide initially
        }}
      />

      {/* Static ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-[0.07] bg-electric mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[150px] opacity-[0.05] bg-cyan-accent mix-blend-screen"></div>
    </div>
  );
}
