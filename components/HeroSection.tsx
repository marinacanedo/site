"use client";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { SITE } from "./site";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./Icons";

const G = ({ children }: { children: React.ReactNode }) => <em className="not-italic text-gradient-gold">{children}</em>;

const slides = [
  { image: "/img/international.webp", alt: "Contabilidade internacional", eyebrow: "Novo · Contabilidade Internacional",
    title: <>Sua contabilidade sem <G>fronteiras</G></>,
    description: "Atendimento bilíngue, IFRS, US GAAP, transfer pricing e reporting para a matriz.", ctaLabel: "Fale com um especialista", ctaHref: "#contato" },
  { image: "/img/hero-1.webp", alt: "Escritório contábil", eyebrow: "Gestão contábil de alta performance",
    title: <>Segurança jurídica e <G>inteligência fiscal</G> para o seu crescimento.</>,
    description: "Unimos o rigor técnico nas áreas contábil, fiscal e trabalhista a um planejamento tributário estratégico focado em reduzir custos de forma legal. O suporte que sua empresa precisa para operar sem riscos e construir uma trajetória sólida de lucratividade.", ctaLabel: "Saiba mais", ctaHref: "#sobre" },
  { image: "/img/hero-3.webp", alt: "Time multidisciplinar", eyebrow: "O escritório · Time multidisciplinar",
    title: <>Soluções integradas com foco em <G>quem move o negócio</G></>,
    description: "Reunimos contadores, advogados e especialistas tributários no mesmo ambiente para oferecer uma consultoria completa e humanizada. Essa integração garante que as decisões contábeis e jurídicas da sua empresa caminhem juntas, trazendo mais segurança, economia de impostos e respostas rápidas para o seu dia a dia.", ctaLabel: "Sobre nós", ctaHref: "#sobre" },
  { image: "/img/hero-5.webp", alt: "Gestão financeira terceirizada", eyebrow: "BPO Financeiro · Gestão terceirizada",
    title: <>Seu financeiro nas <G>mãos certas</G></>,
    description: "Nós assumimos o dia a dia do seu fluxo de caixa para que você não precise se dividir entre gerenciar a empresa e preencher planilhas. Controlamos suas contas a pagar, recebimentos e conciliações de forma rigorosa e transparente, entregando relatórios limpos que mostram exatamente onde seu dinheiro está e como o seu lucro pode crescer.", ctaLabel: "Conheça o BPO", ctaHref: "#bpo" },
  { image: "/img/hero-6.webp", alt: "Indicadores e relatórios", eyebrow: "BPO Financeiro · Indicadores e relatórios",
    title: <>Decisões com <G>dados</G>, não com achismo</>,
    description: "Esqueça o achismo e comece a gerenciar sua empresa no claro. Traduzimos números complexos em dashboards mensais fáceis de entender, com fluxo de caixa, DRE e os indicadores essenciais para você tomar decisões seguras e enxergar a real saúde do seu negócio.", ctaLabel: "Ver indicadores", ctaHref: "#bpo" },
  { image: "/img/hero-8.webp", alt: "Soluções sob medida", eyebrow: "Serviços · Soluções sob medida",
    title: <>Contabilidade que <G>conversa</G> com o seu negócio</>,
    description: "Uma contabilidade que fala a sua língua e acompanha o ritmo do seu negócio. Seja você MEI ou Lucro Real, entregamos soluções sob medida com processos claros, tecnologia que facilita o dia a dia e a proximidade que você precisa para crescer com segurança.", ctaLabel: "Ver serviços", ctaHref: "#servicos" },
  { image: "/img/hero-13.webp", alt: "Gestão financeira", eyebrow: "Gestão financeira para você focar no seu negócio",
    title: <>Organização diária <G>sem complicação</G></>,
    description: "Cuidamos do seu contas a pagar, receber, conciliações e relatórios com rigor e transparência. Assim, você não precisa se preocupar com as tarefas operacionais do caixa e ganha o tempo necessário para se dedicar ao crescimento da sua empresa.", ctaLabel: "Conheça o BPO", ctaHref: "#bpo" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (isPaused || isHovering) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next, isPaused, isHovering]);

  const nextIndex = (current + 1) % slides.length;
  const socials = [
    { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: SITE.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: SITE.social.youtube, label: "YouTube", Icon: YouTubeIcon },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
      onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
      onFocusCapture={() => setIsHovering(true)} onBlurCapture={() => setIsHovering(false)}
      aria-roledescription="carousel" aria-label="Destaques Marina Contábil"
    >
      {slides.map((s, i) => {
        const isCurrent = i === current;
        if (!isCurrent && i !== nextIndex) return null;
        return (
          <div key={i} className={`absolute inset-0 transition-opacity [transition-duration:1400ms] ${isCurrent ? "opacity-100" : "opacity-0"}`} aria-hidden={!isCurrent}>
            <img src={s.image} alt={s.alt} className={`w-full h-full object-cover ${isCurrent ? "animate-ken-burns" : ""}`} width={1600} height={960}
              loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "low"} decoding="async" />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-primary/85" />
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-[hsl(310_30%_30%/0.3)] blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-serif text-[14vw] md:text-[12vw] font-bold text-primary-foreground/[0.05] tracking-[0.15em] uppercase">MARINA</span>
      </div>

      <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass text-accent hover:glow-gold transition-all" aria-label="Anterior"><ChevronLeft size={22} className="mx-auto" /></button>
      <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass text-accent hover:glow-gold transition-all" aria-label="Próximo"><ChevronRight size={22} className="mx-auto" /></button>

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`relative h-1.5 rounded-full transition-all before:absolute before:-inset-2.5 before:content-[''] ${i === current ? "w-8 bg-accent" : "w-1.5 bg-primary-foreground/40"}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      <button onClick={() => setIsPaused((p) => !p)}
        className="absolute bottom-28 right-6 md:right-12 z-20 w-9 h-9 rounded-full glass text-accent hover:glow-gold transition-all flex items-center justify-center"
        aria-label={isPaused ? "Retomar apresentação automática" : "Pausar apresentação automática"} aria-pressed={isPaused}>
        {isPaused ? <Play size={14} /> : <Pause size={14} />}
      </button>

      <div className="container relative z-10 px-6 md:px-12 py-32 md:py-0">
        <div key={current} className="max-w-3xl animate-fade-in-up">
          <span className="inline-block glass rounded-full px-4 py-1.5 mb-6 text-accent text-xs tracking-[0.25em] uppercase font-medium">{slides[current].eyebrow}</span>
          <p className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.05] mb-6">{slides[current].title}</p>
          <p className="text-primary-foreground/75 text-base md:text-lg lg:text-xl max-w-xl mb-10 leading-relaxed font-light">{slides[current].description}</p>
          <a href={slides[current].ctaHref}
            className="relative overflow-hidden inline-flex items-center border border-accent text-accent hover:text-accent-foreground px-8 py-4 text-base font-medium rounded-full group transition-colors duration-300">
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
            <span className="absolute inset-0 -top-1 -bottom-1 -left-20 w-20 bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-shimmer pointer-events-none" />
            {slides[current].ctaLabel}
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-primary-foreground/40 text-[10px] tracking-[0.3em] uppercase">scroll</span>
        <div className="w-5 h-8 rounded-full border border-accent/40 flex items-start justify-center p-1"><div className="w-1 h-2 rounded-full bg-accent animate-scroll-indicator" /></div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 z-10">
        <div className="container px-6 md:px-12">
          <div className="flex items-center justify-end gap-4">
            <span className="text-primary-foreground/60 text-xs font-medium tracking-[0.25em] uppercase">Siga nossas redes</span>
            <div className="flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-full glass flex items-center justify-center text-accent hover:glow-gold transition-all"><Icon size={16} /></a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
