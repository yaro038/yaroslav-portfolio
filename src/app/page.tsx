import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Studio } from "@/components/sections/Studio";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex-1">
        <Hero />
        <Projects />
        <Experience />
        <Studio />
        <Contact />
      </main>
    </>
  );
}
