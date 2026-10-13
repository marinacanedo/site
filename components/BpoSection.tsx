"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { mStyle } from "./mask";

const bpoImages = [
  { src: "/img/bpo-1.webp", alt: "Dashboard financeiro" },
  { src: "/img/bpo-2.webp", alt: "Gestão de documentos" },
  { src: "/img/bpo-3.webp", alt: "Análise estratégica" },
];
const benefits = [
  { icon: Wallet, label: "Contas a pagar e receber" },
  { icon: TrendingUp, label: "Fluxo de caixa" },
  { icon: BarChart3, label: "Relatórios gerenciais" },
  { icon: ShieldCheck, label: "Conciliação bancária" },
];

export default function BpoSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const next = useCallback(() => setCurrent((c) => (c + 1) % bpoImages.length), []);
  useEffect(() => {
    if (isHovering) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, isHovering]);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="bpo" className="scroll-mt-16 md:scroll-mt-20 relative py-24 md:py-32 overflow-hidden bg-burgundy">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 right-1/4 w-[32rem] h-[32rem] rounded-full bg-accent/10 blur-3xl animate-float" />
      <div ref={ref} className={`container relative px-6 md:px-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="mb-10 md:mb-14">
          <span className="inline-block text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4">BPO Financeiro</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-[1.1]">
            Visão <span className="text-gradient-gold italic">estratégica</span> para o sucesso da sua empresa
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <p className="text-primary-foreground/75 text-base md:text-lg leading-relaxed mb-8 text-justify">
              Enquanto você cuida da estratégia e do crescimento do seu negócio, nós cuidamos da engrenagem financeira. Organizamos sua rotina de pagamentos, recebimentos e fluxo de caixa de ponta a ponta, entregando a previsibilidade e a clareza que faltavam para você tomar decisões lucrativas e sem riscos.
            </p>
            <ul className="grid grid-cols-1 gap-3 mb-8">
              {benefits.map((b) => (
                <li key={b.label} className="glass rounded-full px-4 py-2.5 flex items-center gap-2.5 text-primary-foreground/85 text-sm hover:glow-gold transition-all">
                  <b.icon size={16} className="text-accent flex-shrink-0" /><span>{b.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            onFocusCapture={() => setIsHovering(true)} onBlurCapture={() => setIsHovering(false)}
            aria-roledescription="carousel" aria-label="Imagens BPO Financeiro">
            <div className="relative aspect-square" style={{ filter: "drop-shadow(0 25px 40px hsl(var(--primary) / 0.35))" }}>
              <div className="absolute inset-0" style={mStyle}>
                {bpoImages.map((img, i) => (
                  <img key={img.src} src={img.src} alt={img.alt} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`} loading="lazy" width={800} height={800} aria-hidden={i !== current} />
                ))}
              </div>
            </div>
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-accent/30 animate-float" />
          </div>
        </div>

        <div ref={cardRef} onMouseMove={onMove} className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-transparent border border-accent/30 max-w-3xl mx-auto mt-8 md:mt-10">
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
            style={{ background: "radial-gradient(400px circle at var(--mx) var(--my), hsl(28 80% 75% / 0.35), transparent 60%)" }} />
          <p className="relative font-serif text-xl md:text-2xl text-primary-foreground leading-snug mb-2">Se identificou com esses sinais?</p>
          <p className="relative text-primary-foreground/85 text-sm md:text-base mb-6">
            Você não precisa fazer tudo sozinho. <strong>A Marina Contábil</strong> assume o controle diário e rigoroso do seu fluxo de caixa para blindar o seu tempo. Assim, você foca na única coisa que ninguém pode fazer por você: ditar o ritmo de crescimento e a estratégia da sua empresa.
          </p>
          <a href="#contato" className="relative inline-flex items-center overflow-hidden bg-transparent border border-accent text-accent hover:text-accent-foreground px-6 py-3 text-sm font-medium rounded-full group transition-colors duration-300">
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
            Fale com a gente<ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
