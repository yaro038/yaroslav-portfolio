"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/resume";

const links = [
  { href: "#craft", index: "01", label: "Craft" },
  { href: "#projects", index: "02", label: "Work" },
  { href: "#cases", index: "03", label: "Cases" },
  { href: "#experience", index: "04", label: "Path" },
  { href: "#studio", index: "06", label: "Studio" },
  { href: "#contact", index: "07", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter] duration-500 ${
        scrolled || open ? "bg-bg/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="section-pad flex h-16 items-center justify-between md:h-[4.5rem]">
        <a href="#top" className="display text-sm text-ink md:text-base">
          {profile.shortName}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
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

        <div className="flex items-center gap-5">
          <a
            href={`mailto:${profile.email}`}
            className="text-xs font-medium uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
          >
            Email
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-ink transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="section-pad flex flex-col py-4">
              {links.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 border-b border-line py-4 text-lg text-ink last:border-b-0"
                  >
                    <span className="font-mono text-[10px] text-accent">
                      {link.index}
                    </span>
                    <span className="display text-2xl">{link.label}</span>
                    <span className="ml-auto font-mono text-[10px] text-ink-muted">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
