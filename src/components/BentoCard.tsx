"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

export default function BentoCard({ children, className = "" }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;

    const xTo = gsap.quickTo(content, "rotationY", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(content, "rotationX", { duration: 0.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      xTo(rotateY);
      yTo(rotateX);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={`relative rounded-3xl [perspective:1000px] ${className}`}
    >
      <div 
        ref={contentRef}
        className="w-full h-full bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-8 overflow-hidden relative transition-colors hover:border-white/15 hover:bg-white/[0.04]"
      >
        {children}
      </div>
    </div>
  );
}
