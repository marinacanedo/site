import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import BpoSection from "@/components/BpoSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SITE } from "@/components/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AccountingService", "LocalBusiness"],
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      description: "Escritório de contabilidade em Belo Horizonte com 45 anos de experiência: contabilidade geral, planejamento tributário, BPO financeiro e departamento pessoal.",
      url: `${SITE.url}/`,
      logo: `${SITE.url}/favicon.png`,
      image: `${SITE.url}/og-image.png`,
      telephone: SITE.phoneTel,
      email: SITE.email,
      foundingDate: "1981",
      address: { "@type": "PostalAddress", streetAddress: "Av. do Contorno, 2905, 4º andar - Santa Efigênia", addressLocality: "Belo Horizonte", addressRegion: "MG", postalCode: "30110-915", addressCountry: "BR" },
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],
      areaServed: { "@type": "City", name: "Belo Horizonte" },
      sameAs: Object.values(SITE.social),
      contactPoint: [{ "@type": "ContactPoint", contactType: "customer service", telephone: SITE.phoneTel, email: SITE.email, areaServed: "BR", availableLanguage: ["pt-BR", "en"] }],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços contábeis",
        itemListElement: ["Contabilidade Geral", "Abertura e Regularização de empresas", "Obrigações Fiscais", "Departamento Pessoal", "MEI e Simples Nacional", "Consultoria Tributária", "Contabilidade Internacional", "BPO Financeiro"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, provider: { "@id": `${SITE.url}/#organization` } } })),
      },
      knowsAbout: ["Contabilidade geral", "Planejamento tributário", "BPO financeiro", "Departamento pessoal", "Contabilidade internacional"],
    },
    { "@type": "WebSite", "@id": `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, inLanguage: "pt-BR", publisher: { "@id": `${SITE.url}/#organization` } },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <h1 className="sr-only">Marina Contábil — Contabilidade e BPO Financeiro em Belo Horizonte</h1>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <BpoSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
