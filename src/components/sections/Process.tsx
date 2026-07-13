"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { principles, process } from "@/data/resume";
import { SectionHeader } from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".method-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="method"
      ref={root}
      className="relative z-[1] border-t border-line"
    >
      <div className="section-pad py-16 md:py-20">
        <SectionHeader
          index="05"
          label="METHOD"
          title="How work moves from brief to production."
          aside="Process · principles"
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ol className="border-t border-line">
            {process.map((item) => (
              <li
                key={item.step}
                className="method-reveal grid gap-3 border-b border-line py-7 md:grid-cols-[72px_1fr] md:gap-8"
              >
                <p className="font-mono text-xs text-accent">{item.step}</p>
                <div>
                  <h3 className="display text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="method-reveal">
            <p className="mb-5 font-mono text-xs text-accent">PRINCIPLES</p>
            <ul className="space-y-0 border-t border-line">
              {principles.map((item) => (
                <li key={item.title} className="border-b border-line py-5">
                  <h4 className="text-sm font-medium uppercase tracking-[0.14em] text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
