import { about, site } from "@/content/site";

export function About() {
  return (
    <section id="sobre" className="grid scroll-mt-24 grid-cols-1 gap-8 pt-20 lg:grid-cols-12 lg:items-start lg:gap-8 lg:pt-[120px]">
      <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:col-span-5">
        <span className="label">{about.label}</span>
        <h2 className="reveal-left display text-[36px] leading-[0.95] text-balance sm:text-5xl lg:text-[56px]">{about.title}</h2>
      </div>
      <div className="flex flex-col gap-5 text-base leading-[1.6] text-muted lg:col-span-6 lg:col-start-7 lg:text-lg">
        {about.paragraphs.map((p, i) => (
          <p key={i} className="reveal-lit" style={{ ["--delay" as string]: `${i * 90}ms` }}>
            {p}
          </p>
        ))}
        <div className="flex gap-2.5 pt-2">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-white/30">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-white/30">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
