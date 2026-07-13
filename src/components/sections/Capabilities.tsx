"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities } from "@/data/resume";
import { SectionHeader } from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

export function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cap-item", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craft"
      ref={root}
      className="relative z-[1] border-t border-line"
    >
      <div className="section-pad py-16 md:py-20">
        <SectionHeader
          index="01"
          label="CRAFT"
          title="What I bring to a product org."
          aside="Six capabilities · one full-stack practice"
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-x-10 gap-y-0 border-t border-line md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <article key={item.index} className="cap-item border-b border-line py-8">
              <p className="font-mono text-[10px] text-accent">{item.index}</p>
              <h3 className="display mt-3 text-2xl text-ink md:text-[1.65rem]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {item.description}
              </p>
              <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-ink-muted/80">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
