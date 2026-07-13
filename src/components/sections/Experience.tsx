"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/resume";
import { ExperienceRingsScene } from "@/components/three";
import { TagList } from "@/components/ui/TagList";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-row").forEach((row) => {
        gsap.from(row, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={root}
      className="relative z-[1] border-t border-line"
    >
      <div className="grid md:grid-cols-[minmax(240px,0.38fr)_1fr]">
        <div className="section-pad border-b border-line py-14 md:sticky md:top-20 md:h-[calc(100svh-5rem)] md:border-b-0 md:border-r md:py-20">
          <p className="mb-3 font-mono text-xs text-accent">04 — PATH</p>
          <h2 className="display text-[clamp(2rem,4vw,3.2rem)] text-ink">
            Roles that shaped the craft.
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
            Twelve years across SaaS, AI product surfaces, and distributed
            systems — from frontend craft to cloud-backed platforms. Each role
            deepened ownership of the seam between interface, API, and
            infrastructure.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            {experience.length} roles · 2014 — present
          </p>
          <div className="relative mt-10 hidden h-48 w-full md:block md:h-56">
            <ExperienceRingsScene />
          </div>
        </div>

        <div className="section-pad py-6 md:py-10">
          {experience.map((job, i) => (
            <article
              key={`${job.company}-${job.period}`}
              className="exp-row grid gap-4 border-b border-line py-10 last:border-b-0 md:grid-cols-[140px_1fr] md:gap-10 md:py-12"
            >
              <div className="md:pt-2">
                <p className="font-mono text-xs text-ink-muted">{job.period}</p>
                <p className="mt-3 font-mono text-[10px] text-ink-muted/70">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(experience.length).padStart(2, "0")}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="display text-3xl text-ink md:text-4xl">
                    {job.company}
                  </h3>
                  <span className="text-sm text-accent">{job.role}</span>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink">
                  {job.summary}
                </p>
                <ul className="mt-5 space-y-3 border-t border-line pt-5">
                  {job.highlights.map((item) => (
                    <li
                      key={item}
                      className="relative max-w-2xl pl-4 text-[0.95rem] leading-relaxed text-ink-muted before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <TagList tags={job.stack} className="mt-5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
