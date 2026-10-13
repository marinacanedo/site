"use client";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { mStyle } from "./mask";

const useCounter = (target: number, start: boolean, duration = 1400) => {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return value;
};

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const years = useCounter(45, isVisible);
  return (
    <section id="sobre" className="scroll-mt-16 md:scroll-mt-20 relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div ref={ref} className={`container relative px-6 md:px-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="mb-12 md:mb-16">
          <span className="inline-block text-accent-dark text-xs tracking-[0.3em] uppercase font-medium mb-4">Nossa essência</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]">
            Nossa <span className="text-gradient-gold-dark italic">história</span> é feita de confiança
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-baseline gap-3 mb-8 self-start">
              <span className="font-serif text-5xl md:text-6xl font-bold text-gradient-gold-dark leading-none">
                <span className="sr-only">+45</span>
                <span aria-hidden="true">+{isVisible ? years : 45}</span>
              </span>
              <span className="text-foreground/70 text-sm tracking-wide">anos cuidando de quem confia</span>
            </div>
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed text-justify">
              <p>Há 45 anos, a Marina Contábil prova que contabilidade de verdade não olha apenas para o passado da sua empresa, mas desenha o futuro dela. Nós dominamos a complexidade fiscal, trabalhista e contábil para que você tenha o que mais importa no mercado: previsibilidade e segurança para agir.</p>
              <p>Mais do que gerenciar guias e impostos, entregamos a clareza estratégica que transforma números frios em decisões de lucro. Afinal, para construir uma história sólida de crescimento, você precisa de parceiros que sabem exatamente o que estão fazendo.</p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-square" style={{ filter: "drop-shadow(0 25px 40px hsl(var(--primary) / 0.35))" }}>
              <div className="absolute inset-0" style={mStyle}>
                <img src="/img/marina-2.webp" alt="Marina Canedo no escritório" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "40% 30%" }} loading="lazy" width={800} height={800} />
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-accent/40 animate-float" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-accent/10 blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
