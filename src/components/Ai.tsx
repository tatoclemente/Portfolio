import { ai } from "@/content/site";
import { BagIcon, GearIcon, SparkIcon } from "./Icons";

const tone = {
  amber: { icon: "bg-amber/14 text-amber", n: "text-amber" },
  violet: { icon: "bg-violet/16 text-[#c98bff]", n: "text-[#c98bff]" },
  blue: { icon: "bg-blue/18 text-[#7aa7ff]", n: "text-[#7aa7ff]" },
} as const;

const icons = { amber: SparkIcon, violet: BagIcon, blue: GearIcon } as const;

export function Ai() {
  return (
    <section id="ia" className="flex scroll-mt-24 flex-col gap-10 pt-20 lg:gap-12 lg:pt-[120px]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="flex flex-col gap-3.5 lg:col-span-7">
          <span className="label">{ai.label}</span>
          <h2 className="reveal-left display text-[40px] leading-[0.95] text-balance sm:text-5xl lg:text-[64px]">
            {ai.title[0]} <span className="grad">{ai.title[1]}</span>
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-9 lg:text-[17px]">{ai.intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {ai.items.map((item, i) => {
          const Icon = icons[item.tone];
          return (
            <article key={item.n} className="glass reveal flex flex-col gap-5 rounded-[28px] p-6 lg:p-8" style={{ ["--delay" as string]: `${i * 150}ms` }}>
              <div className="flex items-center justify-between">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-[14px] ${tone[item.tone].icon}`}>
                  <Icon />
                </span>
                <span className={`label ${tone[item.tone].n}`}>{item.n}</span>
              </div>
              <h3 className="display text-2xl leading-[1.05] lg:text-[28px]">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{item.text}</p>

              {item.n === "01" && (
                <svg viewBox="0 0 320 90" width="100%" height="90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Flujo: lead, agente de IA, cliente">
                  <rect x="1" y="25" width="86" height="40" rx="12" stroke="rgba(255,255,255,0.18)" />
                  <text x="44" y="49" fill="#ecebe6" fontSize="12" textAnchor="middle">Lead</text>
                  <path d="M87 45 H115" stroke="#f5a524" strokeWidth="2" strokeDasharray="6 6" className="dash" />
                  <rect x="117" y="15" width="86" height="60" rx="14" fill="rgba(245,165,36,0.14)" stroke="#f5a524" />
                  <text x="160" y="41" fill="#f5a524" fontSize="12" fontWeight="600" textAnchor="middle">Agente IA</text>
                  <text x="160" y="58" fill="#ecebe6" fontSize="10" textAnchor="middle">responde · califica</text>
                  <path d="M203 45 H231" stroke="#f5a524" strokeWidth="2" strokeDasharray="6 6" className="dash" />
                  <rect x="233" y="25" width="86" height="40" rx="12" fill="rgba(61,220,132,0.14)" stroke="#3ddc84" />
                  <text x="276" y="49" fill="#3ddc84" fontSize="12" fontWeight="600" textAnchor="middle">Cliente</text>
                </svg>
              )}

              {"rows" in item && (
                <div className="flex flex-col gap-2 text-[13px]">
                  {item.rows.map(([k, v, t]) => (
                    <div key={k} className="flex justify-between rounded-[10px] bg-white/[0.04] px-3 py-2.5">
                      <span>{k}</span>
                      <span className={t === "live" ? "text-green" : "text-amber"}>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {"steps" in item && (
                <ol className="flex flex-col gap-2.5 text-[13px] text-muted">
                  {item.steps.map((s, k) => (
                    <li key={s} className="flex items-center gap-2.5">
                      <span className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] text-paper">{k + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
