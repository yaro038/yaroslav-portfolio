"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/resume";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    const row = track.current;
    if (!section || !row) return;

    const ctx = gsap.context(() => {
      const getScroll = () =>
        Math.max(0, row.scrollWidth - window.innerWidth + 48);

      const tween = gsap.to(row, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={root}
      className="relative z-[1] overflow-hidden bg-bg"
    >
      <div className="flex h-[100svh] flex-col justify-center py-16">
        <div className="mb-8 flex items-baseline justify-between px-[clamp(1.25rem,4vw,3.5rem)]">
          <div>
            <p className="mb-2 font-mono text-xs text-accent">01 — WORK</p>
            <h2 className="display text-[clamp(2rem,5vw,3.5rem)] text-ink">
              Selected surfaces
            </h2>
          </div>
          <p className="hidden text-sm text-ink-muted md:block">
            Drag the scroll · {projects.length} pieces
          </p>
        </div>

        <div
          ref={track}
          className="flex w-max gap-6 px-[clamp(1.25rem,4vw,3.5rem)] will-change-transform md:gap-8"
        >
          {projects.map((project, index) => (
            <article
              key={project.title + project.image}
              className="group relative w-[min(82vw,520px)] shrink-0 md:w-[560px]"
            >
              <div className="relative aspect-[16/11] overflow-hidden border border-line bg-bg-elevated">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="560px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-1 text-2xl text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">{project.subtitle}</p>
                </div>
                <p className="max-w-[8rem] text-right text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {project.tags[0]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
