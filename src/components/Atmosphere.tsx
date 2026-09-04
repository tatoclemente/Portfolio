export function Atmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-clip">
      <div className="parallax absolute inset-x-0 -top-[520px] bottom-0">
        <div className="blob" style={{ width: 720, height: 720, left: -160, top: 400, background: "#b45cff", animation: "drift1 16s ease-in-out infinite" }} />
        <div className="blob" style={{ width: 640, height: 640, left: "55%", top: 580, background: "#f5a524", opacity: 0.35, animation: "drift2 20s ease-in-out infinite" }} />
        <div className="blob" style={{ width: 520, height: 520, left: "30%", top: 1040, background: "#1f6bff", opacity: 0.35, animation: "drift3 18s ease-in-out infinite" }} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 12%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 12%, #000 30%, transparent 75%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-35 mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
