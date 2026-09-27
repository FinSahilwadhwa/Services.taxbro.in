"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  { id: 1, type: "text", content: "AI Workflows", size: "text-4xl font-bold tracking-tight text-white/80 text-glow", top: "20%", left: "10%" },
  { id: 2, type: "note", content: "Always building.", top: "70%", left: "80%" },
  { id: 3, type: "tag", content: "Typescript", top: "30%", left: "70%" },
  { id: 4, type: "tag", content: "ACCA", top: "80%", left: "20%" },
  { id: 5, type: "text", content: "Interstellar", size: "text-2xl italic text-white/40", top: "50%", left: "85%" },
  { id: 6, type: "text", content: "Minimalism", size: "text-6xl font-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent", top: "10%", left: "40%" },
  { id: 7, type: "note", content: "Need more coffee.", top: "60%", left: "15%" },
];

export default function PersonalWorld() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = gsap.utils.toArray<HTMLElement>(".floating-item");
    const container = containerRef.current;

    // 1. Slow continuous drifting
    elements.forEach(el => {
      gsap.to(el, {
        x: `+=${Math.random() * 60 - 30}`,
        y: `+=${Math.random() * 60 - 30}`,
        rotation: Math.random() * 15 - 7.5,
        duration: Math.random() * 6 + 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // 2. Mouse Repulsion Physics
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        const distX = clientX - elX;
        const distY = clientY - elY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // If mouse is close, push element away strongly
        if (distance < 250) {
          const pushX = (distX / distance) * -80;
          const pushY = (distY / distance) * -80;
          
          gsap.to(el, {
            x: `+=${pushX}`,
            y: `+=${pushY}`,
            duration: 1.2,
            ease: "power2.out"
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="h-screen w-full relative overflow-hidden"
    >
      <div className="absolute top-12 left-6 md:left-24 text-xs font-mono uppercase tracking-[0.3em] text-white/30 flex items-center gap-4 z-20">
        <div className="w-12 h-[1px] bg-white/30" />
        04 / Personal
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[20vw] font-bold text-transparent tracking-tighter select-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}>
          WORLD
        </h2>
      </div>

      {ITEMS.map((item) => {
        let content;
        
        if (item.type === "text") {
          content = <span className={item.size}>{item.content}</span>;
        } else if (item.type === "note") {
          content = (
            <div className="p-6 glass-panel rounded-2xl -rotate-3 transform shadow-2xl inner-glow">
              <p className="font-sans text-lg font-light text-white/70">{item.content}</p>
            </div>
          );
        } else if (item.type === "tag") {
          content = (
            <div className="px-6 py-3 rounded-full glass-panel text-white/90 font-sans text-sm uppercase tracking-[0.2em] shadow-xl inner-glow">
              {item.content}
            </div>
          );
        }

        return (
          <div
            key={item.id}
            className="floating-item absolute cursor-pointer select-none"
            style={{ top: item.top, left: item.left }}
            data-cursor="help"
          >
            {content}
          </div>
        );
      })}
    </section>
  );
}
