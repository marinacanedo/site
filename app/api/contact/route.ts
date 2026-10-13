import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Limite simples por IP (em memória, por instância): 5 envios / 10 min. Complementa o honeypot.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

const ALLOWED_HOSTS = new Set(["marinacontabil.com", "www.marinacontabil.com", "localhost"]);

export async function POST(req: Request) {
  // Só aceita chamadas vindas do próprio site (ou de previews *.vercel.app)
  const origin = req.headers.get("origin");
  if (origin) {
    let host = "";
    try { host = new URL(origin).hostname; } catch {}
    if (!ALLOWED_HOSTS.has(host) && !host.endsWith(".vercel.app")) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }
  }
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  if (Number(req.headers.get("content-length") ?? 0) > 10_000) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: bots preenchem; respondemos "ok" sem enviar nada.
  if (clean(body._honey, 200)) return NextResponse.json({ ok: true });

  const nome = clean(body.nome, 100);
  const email = clean(body.email, 255);
  const telefone = clean(body.telefone, 30);
  const mensagem = clean(body.mensagem, 1000);
  if (!nome || !mensagem || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL; // ex.: "Site Marina Contábil <site@marinacontabil.com>" (domínio verificado no Resend)
  if (!resendKey || !to || !from) {
    console.error("contact: variáveis RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL ausentes");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  // 1) E-mail via Resend (REST, sem SDK)
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      ...(process.env.CONTACT_CC_EMAIL
        ? { cc: process.env.CONTACT_CC_EMAIL.split(",").map((s) => s.trim()).filter(Boolean) }
        : {}),
      reply_to: email,
      subject: `Novo contato pelo site Marina Contábil — ${nome}`,
      html: `<h2>Novo contato pelo site</h2>
<p><strong>Nome:</strong> ${esc(nome)}</p>
<p><strong>E-mail:</strong> ${esc(email)}</p>
<p><strong>Telefone:</strong> ${esc(telefone) || "—"}</p>
<p><strong>Mensagem:</strong><br>${esc(mensagem).replace(/\n/g, "<br>")}</p>`,
      text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone || "-"}\n\n${mensagem}`,
    }),
  });

  // 2) Registro do lead no Supabase (opcional; não bloqueia o envio)
  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (sbUrl && sbKey) {
    try {
      await fetch(`${sbUrl}/rest/v1/contact_leads`, {
        method: "POST",
        headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ nome, email, telefone: telefone || null, mensagem, email_enviado: res.ok }),
      });
    } catch (e) {
      console.error("contact: falha ao gravar no Supabase", e);
    }
  }

  if (!res.ok) {
    console.error("contact: Resend respondeu", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
