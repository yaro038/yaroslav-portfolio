"use client";

import { motion } from "framer-motion";
import { HeroOrbScene } from "@/components/three";
import { profile } from "@/data/resume";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative z-[1] flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-24 md:pb-14"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroOrbScene />
      </div>

      <div className="relative z-10 px-[clamp(1.25rem,4vw,3.5rem)]">
        <div className="mb-8 flex items-end justify-between gap-6 border-b border-line pb-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="max-w-xs text-sm leading-relaxed text-ink-muted"
          >
            {profile.title} · {profile.location}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-mono text-xs text-accent"
          >
            EST. 2014
          </motion.p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.22 }}
          className="display text-[clamp(3.4rem,14vw,11rem)] text-ink"
        >
          {profile.name.split(" ")[0]}
          <br />
          <span className="text-accent">{profile.name.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.45 }}
            className="max-w-md text-base text-ink-muted md:text-lg"
          >
            {profile.headline}
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            href="#projects"
            className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.22em] text-ink transition-colors hover:text-accent"
          >
            Enter work
            <span className="text-accent">↓</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
