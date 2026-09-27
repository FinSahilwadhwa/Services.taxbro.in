"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

type CursorState = 
  | "default" 
  | "hover" 
  | "click" 
  | "loading" 
  | "text" 
  | "not-allowed" 
  | "help" 
  | "precision" 
  | "status";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use quickTo for buttery smooth interpolation
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    let isClicking = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      xTo(e.clientX);
      yTo(e.clientY);

      if (isClicking) return;

      const target = e.target as HTMLElement;
      
      // Determine state based on data attributes or tags
      if (target.closest("[data-cursor='not-allowed']")) {
        setCursorState("not-allowed");
      } else if (target.closest("[data-cursor='help']")) {
        setCursorState("help");
      } else if (target.closest("[data-cursor='status']")) {
        setCursorState("status");
      } else if (target.closest("[data-cursor='precision']") || target.closest("input, textarea")) {
        setCursorState("precision");
      } else if (target.closest("a, button, [role='button'], [data-magnetic]")) {
        setCursorState("hover");
      } else if (target.closest("p, h1, h2, h3, h4, span, li")) {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      setCursorState("click");
      // Tiny scale change / click bounce
      gsap.to(cursor, { scale: 0.8, duration: 0.1, ease: "power2.out" });
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicking = false;
      gsap.to(cursor, { 
        scale: 1, 
        duration: 0.4, 
        ease: "elastic.out(1, 0.3)" // spring-like bounce back
      });
      onMouseMove(e); // Re-evaluate hover state immediately
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    gsap.set(cursor, { x: -100, y: -100 });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  // If the user hasn't put images in public/cursors yet, this will fallback to a colored dot via CSS if the image fails, 
  // but since we want the face pack, we'll try to load them.
  const imageSrc = `/cursors/${cursorState}.png`;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0, willChange: "transform" }}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10 transition-transform duration-300 group-hover:scale-110 bg-[#111]">
        <Image
          src={imageSrc}
          alt={`Cursor ${cursorState}`}
          fill
          className="object-cover"
          unoptimized
          onError={(e) => {
            // Fallback UI if image missing
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.backgroundColor = 'white';
              parent.style.transform = 'scale(0.3)';
            }
          }}
        />
      </div>
    </div>
  );
}
