import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Página não encontrada | Marina Contábil", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-70" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container relative z-10 px-6 md:px-12 py-32 text-center">
          <span className="inline-block glass rounded-full px-4 py-1.5 mb-6 text-accent text-xs tracking-[0.25em] uppercase font-medium">Erro 404</span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6"><span className="text-gradient-gold">404</span></h1>
          <h2 className="font-serif text-2xl md:text-4xl font-semibold text-primary-foreground mb-4">Página não encontrada</h2>
          <p className="text-primary-foreground/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light">A página que você procura não existe ou foi movida. Volte para a página inicial e continue navegando.</p>
          <a href="/" className="relative overflow-hidden inline-flex items-center border border-accent text-accent hover:text-accent-foreground px-8 py-4 text-base font-medium rounded-full group transition-colors duration-300">
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />Voltar para a home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
