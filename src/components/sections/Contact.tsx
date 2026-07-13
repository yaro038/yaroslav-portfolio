"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/resume";
import { ContactMorphScene } from "@/components/three";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-line", {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="section-pad relative z-[1] flex min-h-[90svh] flex-col justify-between overflow-hidden border-t border-line py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <ContactMorphScene />
      </div>

      <div className="relative z-10">
        <p className="contact-line font-mono text-xs text-accent">07 — CONTACT</p>
        <h2 className="contact-line display mt-4 max-w-5xl text-[clamp(2.6rem,9vw,7rem)] text-ink">
          Let’s ship the next surface.
        </h2>
        <p className="contact-line mt-6 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
          {profile.availability}
        </p>
      </div>

      <div className="relative z-10 mt-16 grid gap-10 border-t border-line pt-10 md:mt-0 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="contact-line mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Direct line
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="contact-line display break-all text-[clamp(1.4rem,4vw,2.8rem)] text-accent transition-opacity hover:opacity-80"
          >
            {profile.email}
          </a>
        </div>
        <div className="contact-line flex flex-col gap-3 text-sm text-ink-muted md:items-end">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase tracking-[0.18em] transition-colors hover:text-ink"
          >
            LinkedIn ↗
          </a>
          <p>{profile.location}</p>
          <p className="max-w-xs text-right text-xs leading-relaxed md:text-right">
            Prefer a short brief — role, stack, and timeline.
          </p>
          <p className="pt-2 text-xs">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </section>
  );
}
