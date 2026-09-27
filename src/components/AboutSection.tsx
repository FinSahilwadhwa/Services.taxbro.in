"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DISCOVERY_ITEMS = [
  {
    id: "finance",
    label: "Finance",
    desc: "Navigating complex tax frameworks and corporate compliance with clinical precision.",
    visual: "glass-panel from-white/10",
  },
  {
    id: "builder",
    label: "Builder",
    desc: "Translating real-world problems into autonomous, high-performance software.",
    visual: "glass-panel from-electric/20",
  },
  {
    id: "ai",
    label: "AI / Tech",
    desc: "Experimenting on the bleeding edge of models, workflows, and digital tools.",
    visual: "glass-panel from-cyan-accent/20",
  },
  {
    id: "creative",
    label: "Creative",
    desc: "Pushing minimal aesthetics, typography, and interaction design.",
    visual: "glass-panel from-white/5",
  }
];

export default function AboutSection() {
  const [activeItem, setActiveItem] = useState(DISCOVERY_ITEMS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate visual block on change
    if (visualRef.current) {
      gsap.fromTo(visualRef.current, 
        { opacity: 0, scale: 0.95, y: 10 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [activeItem]);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current.querySelectorAll('.discovery-word'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-24 min-h-screen flex items-center relative">
      <div className="absolute top-12 left-6 md:left-24 text-xs font-mono uppercase tracking-[0.3em] text-white/30 flex items-center gap-4">
        <div className="w-12 h-[1px] bg-white/30" />
        01 / Discovery
      </div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center z-10">
        
        {/* Interactive List */}
        <div className="flex flex-col gap-6 md:gap-10">
          {DISCOVERY_ITEMS.map((item) => (
            <h2
              key={item.id}
              className={`discovery-word text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter cursor-pointer transition-all duration-700 ${
                activeItem.id === item.id 
                  ? "text-white text-glow translate-x-4" 
                  : "text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/5 hover:from-white/40 hover:to-white/10"
              }`}
              onMouseEnter={() => setActiveItem(item)}
              data-cursor={activeItem.id === item.id ? "default" : "hover"}
            >
              {item.label}
            </h2>
          ))}
        </div>

        {/* Dynamic Visual Reveal */}
        <div 
          ref={visualRef}
          className={`relative h-[300px] md:h-[500px] rounded-[2.5rem] p-10 flex flex-col justify-end transition-all duration-500 ease-in-out bg-gradient-to-br to-transparent inner-glow overflow-hidden ${activeItem.visual}`}
        >
          {/* Subtle ambient light inside the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <div className="w-10 h-[2px] bg-white mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{activeItem.label}</h3>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
              {activeItem.desc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
