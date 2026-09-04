import Image from "next/image";
import { hero, site } from "@/content/site";
import { ArrowRight, SparkIcon } from "./Icons";

export function Hero() {
  const words = [hero.headline[0], hero.headline[1], hero.headline[2]];
  return (
    <section id="top" className="grid grid-cols-1 items-center gap-10 py-14 lg:min-h-[calc(100svh-104px)] lg:grid-cols-12 lg:gap-8 lg:py-12">
      <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-[clamp(18px,2.6vh,30px)]">
        <div className="rise inline-flex h-[34px] items-center gap-2.5 self-start rounded-full border border-white/15 bg-white/[0.04] pl-2.5 pr-3.5 text-[13px] font-medium text-[#c9cbd2]" style={{ animationDelay: "0.05s" }}>
          <span className="h-2 w-2 rounded-full bg-green" style={{ boxShadow: "0 0 12px #3ddc84" }} />
          {hero.status} · {site.city}
        </div>
        <h1 className="display text-[52px] leading-[0.92] text-balance sm:text-7xl lg:text-[clamp(60px,min(7.4vw,10.5vh),112px)]">
          {words[0].split(" ").map((w, i) => (
            <span key={`a${i}`} className="rise inline-block" style={{ animationDelay: `${0.12 + i * 0.07}s` }}>
              {w}&nbsp;
            </span>
          ))}
          <span className="grad rise inline-block" style={{ animationDelay: "0.26s" }}>
            {words[1]}
          </span>{" "}
          {words[2].split(" ").map((w, i) => (
            <span key={`c${i}`} className="rise inline-block" style={{ animationDelay: `${0.33 + i * 0.07}s` }}>
              {w}&nbsp;
            </span>
          ))}
        </h1>
        <p className="rise max-w-[640px] text-lg leading-relaxed text-muted lg:text-[clamp(17px,2vh,21px)]" style={{ animationDelay: "0.5s" }}>
          {hero.intro}
        </p>
        <div className="rise flex flex-col gap-3 pt-1.5 sm:flex-row sm:items-center sm:gap-3.5" style={{ animationDelay: "0.6s" }}>
          <a href="#contacto" className="btn-primary inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-7 text-base font-semibold">
            {hero.primary}
            <ArrowRight />
          </a>
          <a href="#trabajo" className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 px-[22px] text-base font-medium transition-colors hover:border-white/30">
            {hero.secondary}
          </a>
        </div>
      </div>

      <div className="relative mx-auto flex h-[460px] w-full max-w-[420px] items-center justify-center lg:col-span-5 lg:h-[min(620px,64vh)] lg:max-w-none">
        <div className="orbit absolute h-[340px] w-[340px] rounded-full border border-dashed border-white/20 lg:h-[min(560px,58vh)] lg:w-[min(560px,58vh)]">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-amber" style={{ boxShadow: "0 0 20px #f5a524" }} />
        </div>
        <div className="ring-pulse absolute h-[260px] w-[260px] rounded-full border border-white/10 lg:h-[min(400px,41vh)] lg:w-[min(400px,41vh)]" />
        <div className="orbit-rev absolute h-[300px] w-[300px] rounded-full border border-dashed border-amber/35 lg:h-[min(480px,50vh)] lg:w-[min(480px,50vh)]">
          <span className="absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 rounded-full bg-violet" style={{ boxShadow: "0 0 18px #b45cff" }} />
        </div>

        <div className="tilt relative h-[300px] w-[236px] rounded-[26px] p-[2px] lg:h-[min(380px,39vh)] lg:w-[min(300px,30.8vh)] lg:rounded-[28px]" style={{ background: "linear-gradient(160deg, #f5a524, #b45cff 60%, #1f6bff)", boxShadow: "0 40px 100px rgba(180,92,255,0.35)" }}>
          <div className="relative h-full w-full overflow-hidden rounded-[24px] lg:rounded-[26px]" style={{ background: "radial-gradient(80% 70% at 50% 30%, rgba(180,92,255,0.55), rgba(11,12,17,0) 70%), linear-gradient(180deg, #0b0c11, #16111c)" }}>
            <Image src="/images/tato.webp" alt="Tato Clemente" fill priority sizes="(min-width: 1024px) 300px, 236px" className="object-cover" />
          </div>
        </div>

        <div className="glass bob absolute left-0 top-6 flex flex-col gap-1 rounded-2xl px-3.5 py-3 lg:top-[60px] lg:px-4 lg:py-3.5" style={{ animationDelay: "0.2s" }}>
          <span className="display text-[22px] leading-none lg:text-[26px]">140</span>
          <span className="text-[11px] text-muted lg:text-xs">{hero.chips.players}</span>
        </div>
        <div className="glass bob absolute right-0 top-[110px] flex items-center gap-2.5 rounded-2xl px-3.5 py-3 lg:top-[150px] lg:px-4 lg:py-3.5" style={{ animationDelay: "1.4s" }}>
          <span className="h-2 w-2 rounded-full bg-green" style={{ boxShadow: "0 0 10px #3ddc84" }} />
          <span className="text-xs font-medium lg:text-[13px]">{hero.chips.castel}</span>
        </div>
        <div className="glass bob absolute bottom-8 left-0 flex items-center gap-2.5 rounded-2xl px-3.5 py-3 lg:bottom-[60px] lg:left-5 lg:px-4 lg:py-3.5" style={{ animationDelay: "2.6s" }}>
          <SparkIcon className="text-amber" />
          <span className="text-xs font-medium lg:text-[13px]">{hero.chips.agent}</span>
        </div>
        <div className="glass bob absolute bottom-[110px] right-2.5 hidden flex-col gap-1 rounded-2xl px-4 py-3.5 lg:flex" style={{ animationDelay: "3.4s" }}>
          <span className="text-xs text-muted">{hero.chips.apps[0]}</span>
          <span className="text-sm font-semibold">{hero.chips.apps[1]}</span>
        </div>
      </div>
    </section>
  );
}
