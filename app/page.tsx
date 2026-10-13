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
      knowsAbout: ["Contabilidade geral", "Planejamento tributário", "BPO financeiro", "Departamento pessoal", "Contabilidade internacional"],
    },
    { "@type": "WebSite", "@id": `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, inLanguage: "pt-BR", publisher: { "@id": `${SITE.url}/#organization` } },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
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
