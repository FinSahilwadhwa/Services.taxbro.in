"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Calculator, FileText, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function TaxBroShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  
  const searchBarRef = useRef<HTMLDivElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !browserRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        pin: true,
        scrub: 1,
      }
    });

    gsap.set(browserRef.current, { scale: 0.85, rotateX: 15, y: 150, transformPerspective: 1200 });
    gsap.set(resultCardRef.current, { opacity: 0, y: 30, scale: 0.95 });
    gsap.set(chartRef.current, { opacity: 0, scale: 0.95 });

    tl
      .to(browserRef.current, { scale: 1, rotateX: 0, y: 0, duration: 1 })
      .to(searchBarRef.current, { width: "100%", duration: 0.5, ease: "power2.out" })
      .to(searchBarRef.current, { borderColor: "rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.05)", duration: 0.2 })
      .to(resultCardRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.2)" })
      .to(chartRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-12 left-6 md:left-24 text-xs font-mono uppercase tracking-[0.3em] text-white/30 flex items-center gap-4">
        <div className="w-12 h-[1px] bg-white/30" />
        02 / Build
      </div>

      <div className="absolute top-12 right-6 md:right-24 text-right">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-glow">Taxbro.in</h2>
        <p className="text-white/50 font-mono text-sm mt-2 uppercase tracking-widest">Autonomous Compliance</p>
      </div>

      {/* The Browser Window */}
      <div 
        ref={browserRef}
        className="w-[95vw] max-w-6xl h-[75vh] glass-panel-heavy rounded-2xl overflow-hidden flex flex-col relative inner-glow"
        data-cursor="precision"
      >
        {/* Glow behind the browser */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-electric/20 blur-[150px] -z-10 rounded-full" />

        {/* Browser Chrome */}
        <div className="h-14 border-b border-white/10 flex items-center px-6 gap-3 bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-white/10 border border-white/20" />
            <div className="w-3.5 h-3.5 rounded-full bg-white/10 border border-white/20" />
            <div className="w-3.5 h-3.5 rounded-full bg-white/10 border border-white/20" />
          </div>
          <div className="mx-auto w-1/3 max-w-sm h-7 bg-white/5 border border-white/10 rounded-md flex items-center justify-center text-xs text-white/40 font-mono tracking-widest shadow-inner">
            taxbro.in
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden bg-white/[0.01]">
          
          {/* Sidebar */}
          <div className="w-56 hidden md:flex flex-col gap-2 border-r border-white/5 pr-6">
            <div className="flex items-center gap-3 text-white text-sm font-medium p-3 bg-white/10 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"><Search className="w-4 h-4 text-cyan-accent" /> HSN Lookup</div>
            <div className="flex items-center gap-3 text-white/40 text-sm p-3 hover:text-white/70 transition-colors"><Database className="w-4 h-4" /> Live Rates</div>
            <div className="flex items-center gap-3 text-white/40 text-sm p-3 hover:text-white/70 transition-colors"><Calculator className="w-4 h-4" /> GST Calc</div>
            <div className="flex items-center gap-3 text-white/40 text-sm p-3 hover:text-white/70 transition-colors"><FileText className="w-4 h-4" /> E-Invoice</div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col gap-10">
            <div className="text-4xl font-bold tracking-tight text-white/90">HSN Code Lookup</div>
            
            <div ref={searchBarRef} className="w-1/2 h-14 rounded-xl border border-white/10 bg-white/[0.03] flex items-center px-6 text-white/40 shadow-inner transition-colors">
              <Search className="w-5 h-5 mr-3 text-white/20" />
              Enter goods description...
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div ref={resultCardRef} className="p-8 rounded-2xl border border-white/10 bg-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] rounded-full" />
                <div className="text-[10px] font-mono text-green-400 mb-3 tracking-widest border-b border-white/5 pb-2 inline-block">MATCH FOUND</div>
                <div className="text-4xl font-bold mb-2 tracking-tighter text-white">85171200</div>
                <div className="text-white/50 text-sm mb-6 leading-relaxed">Smartphones and mobile devices for cellular networks.</div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-sm font-mono text-white/80">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-accent rounded-full" /> CGST: 9%</span>
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-electric rounded-full" /> SGST: 9%</span>
                </div>
              </div>

              <div ref={chartRef} className="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col justify-end gap-4 h-56 shadow-2xl relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-electric/10 to-transparent" />
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className="w-[85%] h-full bg-gradient-to-r from-electric to-cyan-accent" />
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className="w-[45%] h-full bg-white/30" />
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className="w-[60%] h-full bg-white/50" />
                </div>
                <div className="text-xs text-white/30 mt-4 font-mono tracking-widest uppercase">Query Volume</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
