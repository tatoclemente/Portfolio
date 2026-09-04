import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Pader } from "@/components/Pader";
import { Clients } from "@/components/Clients";
import { Ai } from "@/components/Ai";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <Atmosphere />
      <RevealObserver />
      <div className="relative mx-auto flex max-w-[1440px] flex-col px-5 sm:px-8 lg:px-[72px]">
        <Nav />
        <main className="flex flex-col">
          <Hero />
          <Marquee />
          <Pader />
          <Clients />
          <Ai />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
