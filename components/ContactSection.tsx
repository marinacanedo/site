"use client";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FORM_ENDPOINT = "/api/contact";
const initial = { nome: "", email: "", telefone: "", mensagem: "", _honey: "" };
const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form._honey) return;
    setStatus("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("falha");
      setStatus("ok");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute -top-32 left-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div ref={ref} className={`container relative px-6 md:px-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">Fale com a <span className="text-gradient-gold italic">gente</span></h2>
          <p className="mt-4 text-muted-foreground">Envie sua mensagem e nossa equipe retorna o contato o quanto antes.</p>
        </div>
        <form onSubmit={onSubmit} className="max-w-2xl mx-auto grid gap-6 rounded-[2rem] border border-border/60 bg-card/60 backdrop-blur-sm p-6 md:p-10 shadow-lg">
          <input type="text" name="_honey" value={form._honey} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2"><label htmlFor="nome" className="text-sm font-medium">Nome</label>
              <input id="nome" name="nome" value={form.nome} onChange={onChange} required maxLength={100} autoComplete="name" className={field} /></div>
            <div className="grid gap-2"><label htmlFor="email" className="text-sm font-medium">E-mail</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required maxLength={255} autoComplete="email" className={field} /></div>
          </div>
          <div className="grid gap-2"><label htmlFor="telefone" className="text-sm font-medium">Telefone (opcional)</label>
            <input id="telefone" name="telefone" type="tel" value={form.telefone} onChange={onChange} maxLength={30} autoComplete="tel" className={field} /></div>
          <div className="grid gap-2"><label htmlFor="mensagem" className="text-sm font-medium">Mensagem</label>
            <textarea id="mensagem" name="mensagem" value={form.mensagem} onChange={onChange} required rows={5} maxLength={1000} className={field} /></div>
          <button type="submit" disabled={status === "loading"} className="justify-self-start rounded-full bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors disabled:opacity-60">
            {status === "loading" ? "Enviando..." : "Enviar mensagem"}
          </button>
          <div role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
            {status === "ok" && <p className="text-primary font-medium">Mensagem enviada! Em breve entraremos em contato.</p>}
            {status === "error" && <p className="text-red-600">Não foi possível enviar, tente novamente ou fale pelo telefone (31) 9545-1993.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
