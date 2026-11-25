import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/resume", destination: "/", permanent: true },
      { source: "/:locale(es|en)", destination: "/", permanent: true },
      { source: "/:locale(es|en)/:path*", destination: "/", permanent: true },
    ];
  },
  // Invitación «Mis 36 pirulos»: página estática en public/36, sin el layout del sitio.
  async rewrites() {
    return [{ source: "/36", destination: "/36/index.html" }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
      {
        // La invitación no tiene que aparecer en buscadores (la portada sí queda accesible para WhatsApp).
        source: "/36",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex" }],
      },
      {
        source: "/36/index.html",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex" }],
      },
    ];
  },
};

export default nextConfig;
