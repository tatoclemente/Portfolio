import Image from "next/image";
import { clients } from "@/content/site";
import { SectionTitle } from "./SectionTitle";

const toneClass: Record<string, string> = {
  live: "bg-green/12 text-green",
  wip: "bg-amber/12 text-amber",
  neutral: "border border-white/12 text-muted",
};

export function Clients() {
  return (
    <section id="trabajo" className="flex scroll-mt-24 flex-col gap-8 pt-20 lg:gap-10 lg:pt-[120px]">
      <SectionTitle label={clients.label} title={clients.title} aside={<span className="max-w-[320px] text-sm leading-relaxed text-dim lg:text-right">{clients.note}</span>} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {clients.items.map((c, i) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-flip block rounded-[28px] p-px transition-transform duration-500 hover:-translate-y-1"
            style={{ background: `linear-gradient(160deg, ${c.accent}b3, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06))`, ["--delay" as string]: `${i * 150}ms` }}
          >
            <div className="flex h-full flex-col gap-5 rounded-[27px] bg-ink-2 p-5 sm:p-8">
              <div className="relative h-[200px] overflow-hidden rounded-[18px] border border-white/10 sm:h-[300px]" style={{ transform: "perspective(1200px) rotateX(6deg)", transformOrigin: "bottom", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
                <Image src={c.image} alt={`Landing de ${c.name}`} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-top" />
              </div>
              <div className="flex items-center justify-between">
                <span className="display text-[28px] lg:text-[34px]">{c.name}</span>
                <span className="text-[13px] text-dim">{c.urlLabel} ↗</span>
              </div>
              <p className="text-[15px] leading-relaxed text-muted lg:text-base">{c.description}</p>
              <div className="flex flex-wrap gap-2">
                {c.badges.map((b) => (
                  <span key={b.label} className={`pill ${toneClass[b.tone]}`}>
                    {b.tone === "live" && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                    {b.tone === "wip" && <span className="h-1.5 w-1.5 rounded-full border-[1.5px] border-current" />}
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
