"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education, profile, skills } from "@/data/resume";
import { AboutRibbonScene, SkillsCrystalScene } from "@/components/three";

gsap.registerPlugin(ScrollTrigger);

const marqueeA = [...skills.core, ...skills.frontend, ...skills.ai];
const marqueeB = [...skills.backend, ...skills.cloud, ...skills.data];

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
        <div className="relative min-h-[320px] border-b border-line px-[clamp(1.25rem,4vw,3.5rem)] py-16 md:min-h-[480px] md:border-b-0 md:border-r">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <AboutRibbonScene />
          </div>
          <div className="studio-reveal relative z-10 max-w-md">
            <p className="mb-3 font-mono text-xs text-accent">03 — STUDIO</p>
            <h2 className="display text-[clamp(2rem,4vw,3.2rem)] text-ink">
              Built for product teams that move fast.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              {profile.summary}
            </p>
            <div className="mt-8 border-t border-line pt-5 text-sm text-ink-muted">
              <p className="text-ink">{education.school}</p>
              <p className="mt-1">{education.period}</p>
              <p className="mt-3 text-accent">{profile.location}</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[320px] px-[clamp(1.25rem,4vw,3.5rem)] py-16 md:min-h-[480px]">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <SkillsCrystalScene />
          </div>
          <div className="studio-reveal relative z-10">
            <p className="mb-6 font-mono text-xs text-accent">STACK SIGNAL</p>
            <ul className="space-y-5">
              {[
                { label: "Product", value: skills.core.slice(0, 5).join(" · ") },
                {
                  label: "Systems",
                  value: skills.backend.slice(0, 5).join(" · "),
                },
                { label: "Cloud", value: skills.cloud.join(" · ") },
                { label: "AI", value: skills.ai.join(" · ") },
              ].map((row) => (
                <li key={row.label} className="border-t border-line pt-4">
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
