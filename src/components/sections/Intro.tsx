"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

export function Intro() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-reveal", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={root}
      className="relative z-[1] border-t border-line"
    >
      <div className="section-pad grid gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-24">
        <div className="intro-reveal">
          <p className="mb-3 font-mono text-xs text-accent">00 — INTRO</p>
          <h2 className="display text-[clamp(2rem,4.5vw,3.4rem)] text-ink">
            Engineer for product teams that need depth on both sides of the
            stack.
          </h2>
        </div>

        <div className="intro-reveal space-y-6">
          <p className="max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            {profile.manifesto}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-ink-muted">
            {profile.summary} Based in {profile.location}, collaborating with
            remote and distributed product orgs.
          </p>
          <div className="grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                Practice
              </p>
              <p className="mt-2 text-sm text-ink">
                Full-stack SaaS · AI product systems · Cloud delivery
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                Tenure
              </p>
              <p className="mt-2 text-sm text-ink">
                12+ years shipping production software since 2014
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
