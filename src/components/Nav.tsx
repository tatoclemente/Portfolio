"use client";

import { useState } from "react";
import { nav, site } from "@/content/site";
import { WhatsAppLink } from "./WhatsAppLink";
import { CloseIcon, MenuIcon } from "./Icons";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-3 z-40 mt-4 lg:top-5 lg:mt-5">
      <nav className="glass flex h-14 items-center justify-between rounded-full pl-5 pr-2 lg:h-16 lg:pl-6 lg:pr-3">
        <a href="#top" className="display inline-flex items-center gap-2.5 text-[17px] lg:text-xl">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: "linear-gradient(120deg, #f5a524, #ff6a3d)", boxShadow: "0 0 18px #f5a524" }} />
          {site.shortName.toLowerCase()}
        </a>
        <div className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-amber">
              {item.label}
            </a>
          ))}
          <WhatsAppLink className="inline-flex h-[42px] items-center gap-2 rounded-full bg-paper px-[18px] font-semibold text-ink transition-transform hover:-translate-y-0.5">
            WhatsApp
          </WhatsAppLink>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <WhatsAppLink className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink" />
          <button type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="inline-flex h-11 w-11 items-center justify-center">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass mt-2 flex flex-col gap-1 rounded-3xl p-3 lg:hidden">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-base font-medium hover:bg-white/5">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
