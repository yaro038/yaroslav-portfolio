"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/resume";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { TagList } from "@/components/ui/TagList";

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
      className="relative z-[1] overflow-hidden border-t border-line"
    >
      <div className="flex min-h-[100svh] flex-col justify-center py-14 md:py-16">
        <SectionHeader
          index="02"
          label="WORK"
          title="Selected surfaces"
          aside={`Scroll to explore · ${projects.length} pieces`}
          className="section-pad mb-6 md:mb-8"
        />

        <div
          ref={track}
          className="section-pad flex w-max gap-6 will-change-transform md:gap-8"
        >
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group relative w-[min(82vw,480px)] shrink-0 md:w-[520px]"
            >
              <ProjectVisual
                title={project.title}
                subtitle={project.subtitle}
                accent={project.accent}
                index={index}
              />
              <div className="mt-4 border-t border-line pt-4">
                <p className="font-mono text-[10px] text-accent">
                  {String(index + 1).padStart(2, "0")} · {project.year} ·{" "}
                  {project.role}
                </p>
                <h3 className="display mt-1 text-xl text-ink md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 max-w-md text-sm leading-relaxed text-ink-muted">
                  {project.description}
                </p>
                <TagList tags={project.tags} className="mt-3" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
