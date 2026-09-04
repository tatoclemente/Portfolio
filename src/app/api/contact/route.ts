import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { sendContactEmails } from "@/lib/email";
import { rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json({ ok: false, error: issue?.message ?? "Datos inválidos", field: issue?.path?.[0] }, { status: 400 });
  }

  // Honeypot completado: respondemos como si hubiera ido bien y no mandamos nada.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Demasiados intentos. Probá de nuevo en unos minutos." }, { status: 429 });
  }

  try {
    await sendContactEmails(parsed.data, { ip, userAgent: req.headers.get("user-agent") ?? undefined });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error al enviar", err);
    return NextResponse.json({ ok: false, error: "No se pudo enviar el mensaje" }, { status: 502 });
  }
}
