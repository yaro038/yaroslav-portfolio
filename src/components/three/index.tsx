"use client";

import dynamic from "next/dynamic";

export const HeroOrbScene = dynamic(
  () => import("./HeroOrb").then((m) => m.HeroOrbScene),
  { ssr: false },
);

export const ExperienceRingsScene = dynamic(
  () => import("./ExperienceRings").then((m) => m.ExperienceRingsScene),
  { ssr: false },
);

export const SkillsCrystalScene = dynamic(
  () => import("./SkillsCrystal").then((m) => m.SkillsCrystalScene),
  { ssr: false },
);

export const AboutRibbonScene = dynamic(
  () => import("./AboutRibbon").then((m) => m.AboutRibbonScene),
  { ssr: false },
);

export const ContactMorphScene = dynamic(
  () => import("./ContactMorph").then((m) => m.ContactMorphScene),
  { ssr: false },
);
