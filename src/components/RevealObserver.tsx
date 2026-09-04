"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, .reveal-left, .reveal-flip, .reveal-lit, .fan-left, .fan-right, .phone-up";

export function RevealObserver() {
  useEffect(() => {
    const pending = new Set(Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)));
    if (pending.size === 0) return;

    const show = (el: Element) => {
      el.classList.add("is-in");
      pending.delete(el as HTMLElement);
    };

    // Revela lo que está dentro de la ventana (con un pequeño margen). Se usa al montar y como respaldo en scroll/resize.
    const sweep = () => {
      const limit = window.innerHeight * 0.92;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) show(el);
      });
      if (pending.size === 0) detach();
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        sweep();
      });
    };

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const e of entries) {
                if (e.isIntersecting) {
                  show(e.target);
                  io?.unobserve(e.target);
                }
              }
              if (pending.size === 0) detach();
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
          )
        : null;

    const detach = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
    };

    sweep();
    pending.forEach((el) => io?.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return detach;
  }, []);
  return null;
}
