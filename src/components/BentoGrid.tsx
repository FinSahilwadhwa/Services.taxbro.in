"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "./BentoCard";
import { ArrowUpRight, Scale, Briefcase, Blocks } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = gsap.utils.toArray<HTMLElement>(".bento-item");
    gsap.set(cards, { y: 100, opacity: 0 });

    ScrollTrigger.create({
      trigger: grid,
      start: "top 80%",
      animation: gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }),
      toggleActions: "play none none reverse",
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="py-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Box 1: What I'm Building */}
          <BentoCard className="bento-item md:col-span-2 md:row-span-2">
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <ArrowUpRight className="w-6 h-6 text-gray-500 hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">What I&apos;m Building</p>
                <h3 className="text-4xl font-bold mb-4">Taxbro.in</h3>
                <p className="text-gray-400 text-lg max-w-lg mb-8 leading-relaxed">
                  A self-built platform handling HSN lookups, live SBI rates, and GST tools. Merging raw data with raw performance.
                </p>
                <div className="flex gap-3">
                  <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-gray-300">Live Data</span>
                  <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-gray-300">GST APIs</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Box 2: The Grind */}
          <BentoCard className="bento-item">
            <div className="flex flex-col h-full justify-between">
              <div className="p-4 bg-white/5 rounded-2xl w-fit">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">The Grind</p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Deep experience in indirect tax compliance, handling e-invoicing. Currently pursuing my ACCA.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Box 3: The Stack */}
          <BentoCard className="bento-item">
            <div className="flex flex-col h-full justify-between">
              <div className="p-4 bg-white/5 rounded-2xl w-fit">
                <Blocks className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">The Stack</p>
                <ul className="text-gray-300 space-y-2 font-mono text-sm">
                  <li>→ Tally Prime</li>
                  <li>→ MS Excel (Power Query)</li>
                  <li>→ Next.js</li>
                  <li>→ Tailwind CSS</li>
                </ul>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
