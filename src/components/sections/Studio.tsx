"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education, profile, skills } from "@/data/resume";
import { AboutRibbonScene, SkillsCrystalScene } from "@/components/three";

gsap.registerPlugin(ScrollTrigger);

const marqueeA = [
  ...skills.core,
  ...skills.frontend,
  ...skills.mobile,
  ...skills.ai,
];
const marqueeB = [
  ...skills.backend,
  ...skills.cloud,
  ...skills.data,
  ...skills.testing,
];

const stackRows = [
  { label: "Product", value: skills.core.join(" · ") },
  { label: "Systems", value: skills.backend.join(" · ") },
  { label: "Cloud", value: skills.cloud.join(" · ") },
  { label: "Data", value: skills.data.join(" · ") },
  { label: "Mobile", value: skills.mobile.join(" · ") },
  { label: "AI", value: skills.ai.join(" · ") },
  { label: "Quality", value: skills.testing.join(" · ") },
];

export function Studio() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".studio-reveal", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="studio" ref={root} className="relative z-[1] overflow-hidden">
      <div className="border-y border-line py-5">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...marqueeA, ...marqueeA].map((item, i) => (
            <span
              key={`a-${i}`}
              className="display text-3xl text-ink/25 md:text-5xl"
            >
              {item}
              <span className="mx-4 text-accent">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="section-pad relative min-h-[320px] border-b border-line py-16 md:min-h-[520px] md:border-b-0 md:border-r">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <AboutRibbonScene />
          </div>
          <div className="studio-reveal relative z-10 max-w-md">
            <p className="mb-3 font-mono text-xs text-accent">06 — STUDIO</p>
            <h2 className="display text-[clamp(2rem,4vw,3.2rem)] text-ink">
              Built for product teams that move fast.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              {profile.summary}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {profile.focus.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-4 border-t border-line pt-5 text-sm text-ink-muted">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-ink">
                  Education
                </p>
                <p className="mt-2 text-ink">{education.school}</p>
                <p className="mt-1 leading-relaxed">{education.degree}</p>
                <p className="mt-1 font-mono text-[10px] text-ink-muted/80">
                  {education.period}
                </p>
              </div>
              <div className="border-t border-line pt-4">
                <p className="text-xs uppercase tracking-[0.18em] text-ink">
                  Based in
                </p>
                <p className="mt-2 text-accent">{profile.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-pad relative min-h-[320px] py-16 md:min-h-[520px]">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <SkillsCrystalScene />
          </div>
          <div className="studio-reveal relative z-10">
            <p className="mb-2 font-mono text-xs text-accent">STACK SIGNAL</p>
            <p className="mb-6 max-w-sm text-sm text-ink-muted">
              The tools that show up most often across product, systems, and
              delivery.
            </p>
            <ul>
              {stackRows.map((row) => (
                <li key={row.label} className="border-t border-line py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink">
                    {row.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {row.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-y border-line py-5">
        <div className="marquee-track marquee-reverse flex w-max gap-10 whitespace-nowrap">
          {[...marqueeB, ...marqueeB].map((item, i) => (
            <span
              key={`b-${i}`}
              className="display text-3xl text-ink/20 md:text-5xl"
            >
              {item}
              <span className="mx-4 text-cobalt">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
