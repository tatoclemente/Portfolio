export function SectionTitle({ label, title, aside, className = "" }: { label: string; title: React.ReactNode; aside?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      <div className="flex flex-col gap-3">
        <span className="label">{label}</span>
        <h2 className="reveal-left display text-[40px] leading-[0.95] text-balance sm:text-5xl lg:text-[64px]">{title}</h2>
      </div>
      {aside}
    </div>
  );
}
