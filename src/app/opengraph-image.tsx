import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#07080c",
          color: "#ecebe6",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", width: 700, height: 700, left: -200, top: -250, borderRadius: 9999, background: "#b45cff", opacity: 0.45, filter: "blur(120px)" }} />
        <div style={{ position: "absolute", width: 600, height: 600, right: -150, bottom: -300, borderRadius: 9999, background: "#f5a524", opacity: 0.35, filter: "blur(120px)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 700 }}>
            <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#f5a524" }} />
            {site.domain}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, maxWidth: 1000 }}>
              Software e IA que ya trabajan en negocios reales.
            </div>
            <div style={{ fontSize: 30, color: "#b6b9c2" }}>Tato Clemente · Fundador de PADER · Sistemas, apps y agentes de IA</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
