"use client";

import { useState } from "react";
import { contact, type ProjectType } from "@/content/site";

type Status = { state: "idle" } | { state: "sending" } | { state: "ok" } | { state: "error"; message: string };

export function ContactForm() {
  const [type, setType] = useState<ProjectType>(contact.types[0]);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? contact.error);
      setStatus({ state: "ok" });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : contact.error });
    }
  }

  if (status.state === "ok") {
    return (
      <div className="flex h-full flex-col justify-center gap-3 rounded-3xl border border-green/30 bg-green/10 p-8" role="status">
        <span className="display text-2xl">Mensaje enviado.</span>
        <p className="text-muted">{contact.success}</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className="self-start text-sm font-semibold text-amber">
          Enviar otro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3.5" noValidate>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <input name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" placeholder={contact.fields.name} aria-label={contact.fields.name} className="field" />
        <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder={contact.fields.email} aria-label={contact.fields.email} className="field" />
      </div>

      <div className="flex flex-wrap gap-2 text-[13px] font-medium" role="radiogroup" aria-label="Qué necesitás">
        {contact.types.map((t) => {
          const active = t === type;
          return (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setType(t)}
              className={`rounded-full px-3.5 py-[9px] transition-colors ${active ? "bg-paper text-ink" : "border border-white/15 hover:border-white/30"}`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder={contact.fields.message} aria-label="Mensaje" className="field resize-y" />

      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <label>
          Sitio web
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.state === "error" && (
        <p className="rounded-xl border border-[#ff6a3d]/40 bg-[#ff6a3d]/10 px-4 py-3 text-sm" role="alert">
          {status.message}
        </p>
      )}

      <div className="flex justify-end">
        <button type="submit" disabled={status.state === "sending"} className="btn-primary inline-flex h-[52px] items-center justify-center rounded-full px-7 text-base font-semibold disabled:opacity-60">
          {status.state === "sending" ? "Enviando…" : contact.submit}
        </button>
      </div>
    </form>
  );
}
