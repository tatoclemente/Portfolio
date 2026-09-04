import { marquee } from "@/content/site";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="-mx-5 overflow-hidden border-y border-white/10 py-4 sm:-mx-8 lg:-mx-[72px] lg:py-[18px]" aria-hidden="true">
      <div className="marquee-track label flex w-max gap-7 whitespace-nowrap lg:gap-9">
        {items.map((item, i) => (
          <span key={i} className="flex gap-7 lg:gap-9">
            <span className="text-paper">{item}</span>
            <span className="text-amber">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
