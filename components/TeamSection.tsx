"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const team = [
  { name: "Marina Canedo", role: "CEO", photo: "marina-canedo" },
  { name: "Mônica Silveira", role: "Diretoria Técnica", photo: "monica-silveira" },
  { name: "Sérgio Silva", role: "Sucesso do Cliente", photo: "sergio-silva" },
  { name: "Magda Mara", role: "Assistência Contábil", photo: "magda-mara" },
  { name: "Nívia Reis", role: "Análise Contábil", photo: "nivia-reis" },
  { name: "Paula Bairral", role: "Gestão Financeira", photo: "paula-bairral" },
  { name: "Renata Godoi", role: "Análise Contábil", photo: "renata-godoi" },
  { name: "Juliana Ribeiro", role: "Análise de Folha de Pagamento", photo: "juliana-ribeiro" },
  { name: "Laurita Gonçalves", role: "Analista Fiscal", photo: "laurita-concalves" },
  { name: "Taynã Martins", role: "Analista Fiscal", photo: "tayna-martins" },
  { name: "Aline Lattuf", role: "Análise Contábil", photo: "aline-lattuf" },
  { name: "Adriana Dias", role: "Fiscal e Societário", photo: "adriana-dias" },
];

export default function TeamSection() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="equipe" className="relative py-24 md:py-32 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-accent/10 blur-3xl rounded-full" />
      <div ref={ref} className={`container relative px-6 md:px-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center mb-16">
          <span className="inline-block text-accent/80 text-xs tracking-[0.3em] uppercase font-medium mb-4">Quem cuida de você</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-[1.1]">
            Nossa <span className="text-gradient-gold italic">equipe</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {team.map((m) => (
            <div key={m.name} className="flex flex-col items-center text-center group w-full max-w-[220px]">
              <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] aspect-square mb-5 shrink-0">
                <div className="absolute inset-0 rounded-2xl conic-border opacity-40 group-hover:opacity-100 transition-opacity blur-[1px]" />
                <div className="absolute inset-[3px] rounded-2xl overflow-hidden bg-primary">
                  <img src={`/img/team/${m.photo}.webp`} alt={`${m.name}, ${m.role}`} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" loading="lazy" width={400} height={400} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>
              </div>
              <div className="inline-flex items-center justify-center glass rounded-full px-4 py-1.5 mb-1.5 min-h-[2.25rem]">
                <h3 className="font-serif text-sm font-semibold text-accent leading-tight">{m.name}</h3>
              </div>
              <p className="text-primary-foreground/55 text-xs tracking-wide uppercase min-h-[1.25rem]">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
