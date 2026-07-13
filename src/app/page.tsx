import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { Intro } from "@/components/sections/Intro";
import { Capabilities } from "@/components/sections/Capabilities";
import { Projects } from "@/components/sections/Projects";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Experience } from "@/components/sections/Experience";
import { Process } from "@/components/sections/Process";
import { Studio } from "@/components/sections/Studio";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex-1">
        <Hero />
        <Intro />
        <Capabilities />
        <Projects />
        <CaseStudies />
        <Experience />
        <Process />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
