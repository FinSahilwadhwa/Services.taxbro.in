"use client";

import MagneticButton from "./ui/MagneticButton";

export default function ContactSection() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-obsidian relative border-t border-white/5">
      <div className="absolute top-12 left-6 md:left-24 text-xs font-mono uppercase tracking-[0.2em] text-white/30">
        {"// Contact"}
      </div>

      <div className="flex flex-col items-center gap-12" data-cursor="help">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-center">
          Let&apos;s Build<br />Something.
        </h2>
        
        <MagneticButton className="px-12 py-8 bg-white text-obsidian hover:bg-gray-200 border-none">
          <span className="text-xl font-bold uppercase tracking-widest">Connect</span>
        </MagneticButton>
      </div>

      <div className="absolute bottom-12 text-center w-full text-xs font-mono text-gray-600">
        <p>Built with Next.js, GSAP & Tailwind.</p>
        <p className="mt-2">© {new Date().getFullYear()} Sahil. All rights reserved.</p>
      </div>
    </section>
  );
}
