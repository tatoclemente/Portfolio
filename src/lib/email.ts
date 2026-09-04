import { Resend } from "resend";
import { site } from "@/content/site";
import type { ContactInput } from "./contact-schema";

const from = process.env.CONTACT_FROM ?? `Tato Clemente <${site.email}>`;
const to = process.env.CONTACT_TO ?? site.email;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

function shell(body: string) {
  return `<!doctype html><html lang="es"><body style="margin:0;background:#07080c;color:#ecebe6;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="display:flex;align-items:center;gap:10px;font-weight:700;font-size:18px;margin-bottom:28px;">
      <span style="display:inline-block;width:10px;height:10px;border-radius:999px;background:#f5a524;margin-right:10px;"></span>tato clemente
    </div>
    ${body}
    <p style="margin-top:36px;font-size:12px;color:#8b8f9a;">${site.domain} · ${site.email}</p>
  </div></body></html>`;
}

export function autoReplyEmail(input: ContactInput) {
  const name = escapeHtml(input.name.split(" ")[0]);
  const html = shell(`
    <h1 style="font-size:28px;line-height:1.1;margin:0 0 16px;">Recibí tu mensaje, ${name}.</h1>
    <p style="font-size:16px;line-height:1.6;color:#b6b9c2;margin:0 0 16px;">Gracias por escribirme. Te respondo por este mismo mail dentro de las 24 horas. Si es algo urgente, escribime por WhatsApp.</p>
    <div style="margin:24px 0;padding:16px 18px;border:1px solid rgba(255,255,255,0.12);border-radius:14px;background:rgba(255,255,255,0.04);">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8b8f9a;">Lo que me contaste</p>
      <p style="margin:0 0 6px;font-size:14px;color:#ecebe6;"><strong>${escapeHtml(input.type)}</strong></p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#b6b9c2;white-space:pre-wrap;">${escapeHtml(input.message)}</p>
    </div>
    <p style="font-size:16px;line-height:1.6;color:#b6b9c2;margin:0;">Abrazo,<br>Tato</p>
  `);
  const text = `Recibí tu mensaje, ${input.name}.\n\nGracias por escribirme. Te respondo por este mismo mail dentro de las 24 horas. Si es urgente, escribime por WhatsApp.\n\nLo que me contaste (${input.type}):\n${input.message}\n\nAbrazo,\nTato\n${site.domain}`;
  return { subject: "Recibí tu mensaje · Tato Clemente", html, text };
}

export function notificationEmail(input: ContactInput, meta: { ip?: string; userAgent?: string }) {
  const html = shell(`
    <h1 style="font-size:24px;line-height:1.1;margin:0 0 16px;">Nuevo contacto desde ${site.domain}</h1>
    <table style="border-collapse:collapse;font-size:14px;color:#ecebe6;">
      <tr><td style="padding:6px 12px 6px 0;color:#8b8f9a;">Nombre</td><td style="padding:6px 0;">${escapeHtml(input.name)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#8b8f9a;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(input.email)}" style="color:#f5a524;">${escapeHtml(input.email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#8b8f9a;">Tipo</td><td style="padding:6px 0;">${escapeHtml(input.type)}</td></tr>
    </table>
    <div style="margin:20px 0;padding:16px 18px;border:1px solid rgba(255,255,255,0.12);border-radius:14px;background:rgba(255,255,255,0.04);font-size:15px;line-height:1.6;color:#ecebe6;white-space:pre-wrap;">${escapeHtml(input.message)}</div>
    <p style="font-size:12px;color:#8b8f9a;margin:0;">IP ${escapeHtml(meta.ip ?? "?")} · ${escapeHtml(meta.userAgent ?? "")}</p>
  `);
  const text = `Nuevo contacto desde ${site.domain}\n\nNombre: ${input.name}\nEmail: ${input.email}\nTipo: ${input.type}\n\n${input.message}\n\nIP ${meta.ip ?? "?"} · ${meta.userAgent ?? ""}`;
  return { subject: `[${site.domain}] ${input.type} · ${input.name}`, html, text };
}

export async function sendContactEmails(input: ContactInput, meta: { ip?: string; userAgent?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY no configurada");
  const resend = new Resend(key);
  const notify = notificationEmail(input, meta);
  const reply = autoReplyEmail(input);

  const { data, error } = await resend.batch.send([
    { from, to, replyTo: input.email, subject: notify.subject, html: notify.html, text: notify.text },
    { from, to: input.email, replyTo: to, subject: reply.subject, html: reply.html, text: reply.text },
  ]);
  if (error) throw new Error(error.message);
  return data;
}
