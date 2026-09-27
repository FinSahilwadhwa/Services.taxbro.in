"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import MagneticButton from "./ui/MagneticButton";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!headlineRef.current || !subheadRef.current || !photoRef.current || !ctaRef.current) return;

    gsap.set([headlineRef.current, subheadRef.current, photoRef.current, ctaRef.current], { clearProps: "all" });

    const splitHeadline = new SplitType(headlineRef.current, { types: "chars,words" });
    const splitSubhead = new SplitType(subheadRef.current, { types: "lines" });

    const tl = gsap.timeline();

    gsap.set(splitHeadline.chars, { y: 150, opacity: 0, rotateX: -90 });
    gsap.set(splitSubhead.lines, { y: 30, opacity: 0 });
    gsap.set(photoRef.current, { x: 100, opacity: 0, rotateY: 45, scale: 0.8 });
    gsap.set(ctaRef.current, { y: 50, opacity: 0 });

    tl
      .to(splitHeadline.chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "power4.out",
      })
      .to(splitSubhead.lines, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.8")
      .to(photoRef.current, {
        x: 0,
        opacity: 1,
        rotateY: -10, // 3D tilt
        rotateX: 5,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.2)",
      }, "-=0.8")
      .to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");

    return () => {
      splitHeadline.revert();
      splitSubhead.revert();
    };
  }, []);

  // 3D Tilt Hover Effect for the Photo Card
  useEffect(() => {
    const card = photoRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(card, {
        rotateY: (x / rect.width) * 30, // Exaggerated 3D tilt
        rotateX: -(y / rect.height) * 30,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { rotateY: -10, rotateX: 5, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Easter Egg
  useEffect(() => {
    if (clickCount >= 5) {
      gsap.to(headlineRef.current, {
        rotate: 360,
        scale: 1.1,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
        onComplete: () => {
          gsap.to(headlineRef.current, { rotate: 0, scale: 1, duration: 0.5 });
          setClickCount(0);
        }
      });
    }
  }, [clickCount]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-24"
      style={{ perspective: "1500px" }}
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col xl:flex-row items-center justify-between z-10 gap-16 xl:gap-24">
        
        <div className="flex-1 mt-20 xl:mt-0">
          <div className="flex items-center gap-4 mb-8 opacity-60">
            <div className="w-12 h-[1px] bg-white"></div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase" data-cursor="text">
              Meet Sahil
            </p>
          </div>
          
          <h1 
            ref={headlineRef}
            className="text-[5rem] md:text-[8rem] lg:text-[12rem] font-bold tracking-[-0.04em] mb-6 leading-[0.85] text-gradient cursor-pointer select-none"
            onClick={() => setClickCount(prev => prev + 1)}
            data-cursor="help"
          >
            Hi, I&apos;m<br />Sahil.
          </h1>
          
          <p 
            ref={subheadRef}
            className="text-xl md:text-3xl text-white/60 max-w-2xl leading-relaxed mb-12 font-light tracking-tight"
          >
            I handle tax compliance and accounting by day, and build autonomous systems like TaxBro by night.
          </p>
          
          <div ref={ctaRef}>
            <MagneticButton className="gap-3 group px-8 py-4 bg-white text-obsidian border-transparent hover:bg-gray-200" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
              <span className="font-sans font-bold text-sm uppercase tracking-[0.2em]">Enter Journey</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </div>

        {/* 3D Glass Card */}
        <div 
          ref={photoRef} 
          className="relative w-[300px] h-[400px] md:w-[450px] md:h-[600px] rounded-3xl glass-panel-heavy overflow-hidden group [transform-style:preserve-3d]"
          data-cursor="status"
        >
          {/* Inner Glow Border */}
          <div className="absolute inset-0 rounded-3xl inner-glow opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Neon accent orb behind glass */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-electric rounded-full blur-[100px] opacity-40 group-hover:opacity-80 group-hover:translate-x-[-50px] group-hover:translate-y-[50px] transition-all duration-1000"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-accent rounded-full blur-[100px] opacity-20 group-hover:opacity-60 group-hover:translate-x-[50px] group-hover:translate-y-[-50px] transition-all duration-1000"></div>
          
          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="absolute inset-x-8 bottom-8 [transform:translateZ(30px)]">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-3 border-b border-white/10 pb-3 flex justify-between">
              <span>Status</span>
              <span>System.Core</span>
            </div>
            <div className="flex justify-between items-center text-lg font-light tracking-wide">
              <span className="text-white/80">Building</span>
              <span className="flex items-center gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" /> 
                <span className="text-white/60">Online</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
