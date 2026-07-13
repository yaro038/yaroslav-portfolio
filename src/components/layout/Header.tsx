"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/resume";

const links = [
  { href: "#projects", index: "01", label: "Work" },
  { href: "#experience", index: "02", label: "Path" },
  { href: "#studio", index: "03", label: "Studio" },
  { href: "#contact", index: "04", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter] duration-500 ${
        scrolled ? "bg-bg/75 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-[clamp(1.25rem,4vw,3.5rem)] md:h-[4.5rem]">
        <a href="#top" className="display text-sm text-ink md:text-base">
          {profile.shortName}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-baseline gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <span className="font-mono text-[10px] text-accent opacity-70">
                {link.index}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="text-xs font-medium uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
        >
          Email
        </a>
      </div>
    </motion.header>
  );
}
