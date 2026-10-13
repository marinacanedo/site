"use client";
import { useCallback, useEffect, useState } from "react";
import { BookOpen, Briefcase, Building2, Calculator, ChevronLeft, ChevronRight, FileText, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { mStyle } from "./mask";

const services = [
  { icon: Calculator, title: "Contabilidade Geral", desc: "Organização e escrituração contábil mensal para empresas de todos os portes." },
  { icon: Building2, title: "Abertura e Regularização", desc: "Constituição e regularização de empresas com agilidade e segurança jurídica." },
  { icon: FileText, title: "Obrigações Fiscais", desc: "Declarações e cumprimento das obrigações fiscais junto aos órgãos competentes." },
  { icon: Users, title: "Departamento Pessoal", desc: "Folha de pagamento, admissões, rescisões e rotinas trabalhistas." },
  { icon: Briefcase, title: "MEI e Simples Nacional", desc: "Suporte especializado para microempreendedores e pequenas empresas." },
  { icon: BookOpen, title: "Consultoria Tributária", desc: "Planejamento tributário estratégico para reduzir custos com segurança." },
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 768 ? 3 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const maxIndex = Math.max(0, services.length - perView);
  useEffect(() => { setCurrent((c) => Math.min(c, maxIndex)); }, [maxIndex]);
  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, maxIndex)), [maxIndex]);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  return (
    <section id="servicos" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div ref={ref} className={`container relative px-6 md:px-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
          <div className="relative">
            <div className="relative aspect-square" style={{ filter: "drop-shadow(0 25px 40px hsl(var(--primary) / 0.35))" }}>
              <div className="absolute inset-0" style={mStyle}>
                <img src="/img/services-photo.webp" alt="Profissional realizando cálculos contábeis" className="w-full h-full object-cover" loading="lazy" width={800} height={800} />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-accent/40 animate-float" />
          </div>
          <div>
            <span className="inline-block text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4">O que entregamos</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-[1.1]">
              Como <span className="text-gradient-gold italic">impulsionamos</span> o seu negócio
            </h2>
            <p className="font-serif text-lg md:text-xl text-foreground/80 italic mb-6">Soluções contábeis e estratégicas sob medida.</p>
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed text-justify">
              <p>Mais do que garantir que sua empresa cumpra 100% das obrigações legais em dia, nossa equipe traduz dados burocráticos em inteligência financeira, oferecendo o suporte técnico necessário para você tomar decisões estratégicas seguras e expandir sua operação.</p>
            </div>
          </div>
        </div>

        <div className="relative" aria-roledescription="carousel" aria-label="Serviços">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * (100 / perView)}%)` }}>
              {services.map((s, i) => (
                <div key={s.title} className="relative group pl-2 flex-shrink-0 w-full md:w-1/3 px-5">
                  <span className="absolute -top-6 -left-2 font-serif text-7xl font-bold pointer-events-none select-none leading-none" aria-hidden="true"
                    style={{ WebkitTextStroke: "1px hsl(var(--accent) / 0.25)", color: "transparent" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <s.icon className="text-accent mb-4" size={32} strokeWidth={1.5} />
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                    <div className="h-px w-10 bg-accent/40 group-hover:w-24 transition-all duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-12">
            <button onClick={prev} disabled={current === 0} className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center text-accent hover:glow-gold transition-all disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Anterior"><ChevronLeft size={18} /></button>
            <div className="flex gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-accent" : "w-1.5 bg-foreground/40 hover:bg-foreground/60"}`} aria-label={`Ir para slide ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} disabled={current === maxIndex} className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center text-accent hover:glow-gold transition-all disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Próximo"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
