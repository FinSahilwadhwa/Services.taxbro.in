"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  { year: "2022", title: "First Professional Experience", desc: "Entered the world of indirect tax compliance and corporate accounting." },
  { year: "2024", title: "Broader Work & E-Invoicing", desc: "Handled complex e-invoicing flows and advanced tax regulations." },
  { year: "2024+", title: "TaxBro", desc: "Founded and built the autonomous compliance platform handling live APIs." },
  { year: "2025", title: "B.Com", desc: "Completed Bachelor of Commerce, solidifying financial frameworks." },
  { year: "2026", title: "ACCA & Continued Building", desc: "Pursuing ACCA while expanding the digital ecosystem." },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
      }
    });

    // Draw the vertical line
    tl.to(lineRef.current, { height: "100%", ease: "none" });

    // Pop in items sequentially
    items.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 70%",
        animation: gsap.fromTo(item, 
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.5)" }
        ),
        toggleActions: "play none none reverse"
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === containerRef.current || items.includes(t.vars.trigger as HTMLElement)) t.kill();
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-24 min-h-screen relative overflow-hidden">
      <div className="absolute top-12 left-6 md:left-24 text-xs font-mono uppercase tracking-[0.3em] text-white/30 flex items-center gap-4">
        <div className="w-12 h-[1px] bg-white/30" />
        03 / Work
      </div>

      <div className="max-w-[1200px] mx-auto relative pt-12">
        {/* The Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2">
          <div ref={lineRef} className="w-full h-0 bg-gradient-to-b from-white/40 to-white" />
        </div>

        <div className="flex flex-col gap-24">
          {TIMELINE_DATA.map((item, i) => (
            <div 
              key={i} 
              className={`timeline-item flex flex-col md:flex-row gap-8 w-full ${i % 2 === 0 ? "md:flex-row-reverse" : ""} relative z-10 group`}
            >
              {/* Node dot */}
              <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-obsidian border-[3px] border-white/50 -translate-x-1/2 mt-3 group-hover:border-white transition-colors duration-500 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              
              <div className="hidden md:block md:w-1/2" />
              
              <div className={`pl-12 md:pl-0 md:w-1/2 flex flex-col ${i % 2 === 0 ? "md:items-end md:text-right md:pr-16" : "md:pl-16"}`}>
                <div className="text-[5rem] font-bold font-sans tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent leading-none mb-4">{item.year}</div>
                
                <div 
                  className="glass-panel p-8 rounded-3xl cursor-pointer hover:bg-white/[0.05] transition-all duration-500 w-full relative inner-glow"
                  onClick={() => setExpandedId(expandedId === i ? null : i)}
                  data-cursor="help"
                >
                  <h3 className="text-2xl font-bold text-white/90 tracking-tight">{item.title}</h3>
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${expandedId === i ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-white/50 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
