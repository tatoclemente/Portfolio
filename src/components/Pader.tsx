import Image from "next/image";
import { pader } from "@/content/site";
import { ArrowUpRight } from "./Icons";
import { CountUp } from "./CountUp";
import { SectionTitle } from "./SectionTitle";

export function Pader() {
  const [left, center, right] = pader.screens;
  return (
    <section id="ahora" className="flex scroll-mt-24 flex-col gap-8 pt-20 lg:gap-10 lg:pt-[120px]">
      <SectionTitle
        label={pader.label}
        title={pader.title}
        aside={
          <a href={pader.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[15px] font-medium text-amber">
            {pader.urlLabel}
            <ArrowUpRight />
          </a>
        }
      />
      <div className="reveal relative grid grid-cols-1 gap-8 overflow-clip rounded-3xl border border-white/10 bg-ink-3 p-6 sm:p-8 lg:min-h-[680px] lg:grid-cols-12 lg:rounded-[32px] lg:p-14">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[200px] -top-[250px] h-[700px] w-[700px] rounded-full bg-pader opacity-35 blur-[140px]" />

        <div className="relative flex flex-col justify-between gap-8 lg:col-span-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-pader" style={{ boxShadow: "0 0 16px #ff1a6e" }} />
              <span className="display text-[32px] leading-none lg:text-[40px]">PADER</span>
            </div>
            <p className="text-base leading-relaxed text-muted lg:text-lg">{pader.description}</p>
            <div className="flex flex-wrap gap-2.5">
              {pader.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/15 px-3 py-[7px] text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {pader.stats.map((s) => (
              <div key={s.label} className="glass flex flex-col gap-1 rounded-[18px] p-4 lg:p-5">
                {typeof s.value === "number" ? (
                  <CountUp to={s.value} className="display grad text-[34px] leading-none lg:text-[44px]" />
                ) : (
                  <span className="display text-[22px] leading-none lg:text-[28px]">{s.value}</span>
                )}
                <span className="text-xs text-muted lg:text-[13px]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center py-4 lg:col-span-7 lg:py-6">
          <div className="fan-left relative h-[215px] w-[104px] overflow-hidden rounded-[18px] border-4 border-[#1c1e26] bg-[#0e0f14] sm:h-[300px] sm:w-[144px] sm:rounded-[26px] lg:h-[460px] lg:w-[220px] lg:rounded-[34px] lg:border-[6px]" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
            <Image src={left.src} alt={left.alt} fill sizes="220px" className="object-cover object-top" />
          </div>
          <div className="phone-up relative z-10 -mx-[18px] h-[241px] w-[116px] overflow-hidden rounded-[20px] border-4 border-[#1c1e26] bg-[#0e0f14] sm:-mx-6 sm:h-[330px] sm:w-[158px] sm:rounded-[28px] lg:-mx-[30px] lg:h-[504px] lg:w-[240px] lg:rounded-[36px] lg:border-[6px]" style={{ boxShadow: "0 50px 100px rgba(255,26,110,0.25)" }}>
            <Image src={center.src} alt={center.alt} fill sizes="240px" className="object-cover object-top" />
          </div>
          <div className="fan-right relative h-[215px] w-[104px] overflow-hidden rounded-[18px] border-4 border-[#1c1e26] bg-[#0e0f14] sm:h-[300px] sm:w-[144px] sm:rounded-[26px] lg:h-[460px] lg:w-[220px] lg:rounded-[34px] lg:border-[6px]" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
            <Image src={right.src} alt={right.alt} fill sizes="220px" className="object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
}
