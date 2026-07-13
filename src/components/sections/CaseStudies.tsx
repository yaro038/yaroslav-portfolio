"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredCases } from "@/data/resume";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TagList } from "@/components/ui/TagList";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudies() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".case-row").forEach((row) => {
        gsap.from(row, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 86%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cases"
      ref={root}
      className="relative z-[1] border-t border-line"
    >
      <div className="section-pad py-16 md:py-20">
        <SectionHeader
          index="03"
          label="CASES"
          title="Selected work, written in depth."
          aside="Problem · approach · outcome"
          className="mb-12 md:mb-16"
        />

        <div className="space-y-0 border-t border-line">
          {featuredCases.map((project, index) => (
            <article
              key={project.title}
              className="case-row grid gap-8 border-b border-line py-12 md:grid-cols-[minmax(180px,0.32fr)_1fr] md:gap-12 md:py-16"
            >
              <div>
                <p className="font-mono text-[10px] text-accent">
                  Case {String(index + 1).padStart(2, "0")} · {project.year}
                </p>
                <h3 className="display mt-3 text-3xl text-ink md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{project.subtitle}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-accent">
                  {project.role}
                </p>
                <TagList tags={project.tags} className="mt-5" />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="border-t border-line pt-4 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0 first:sm:border-l-0 first:sm:pl-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                    Problem
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {project.problem}
                  </p>
                </div>
                <div className="border-t border-line pt-4 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                    Approach
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {project.approach}
                  </p>
                </div>
                <div className="border-t border-line pt-4 sm:border-t-0 sm:border-l sm:pl-5 sm:pt-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                    Outcome
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
