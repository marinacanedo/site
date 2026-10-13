import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "./site";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./Icons";

export default function Footer() {
  const socials = [
    { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: SITE.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: SITE.social.youtube, label: "YouTube", Icon: YouTubeIcon },
  ];
  return (
    <footer className="relative bg-background text-foreground overflow-hidden">
      <svg className="absolute top-0 left-0 right-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: "60px" }} aria-hidden>
        <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="hsl(var(--primary))" />
      </svg>
      <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="container relative px-6 md:px-12 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-10 space-y-4">
            <div className="flex items-start justify-center gap-3">
              <MapPin size={20} className="text-accent mt-0.5 flex-shrink-0" />
              <address className="not-italic text-muted-foreground text-base leading-relaxed text-left">
                Av. do Contorno, 2905 - 4º andar - Santa Efigênia,<br />Belo Horizonte - MG, 30110-915
              </address>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone size={20} className="text-primary flex-shrink-0" />
              <a href={`tel:${SITE.phoneTel}`} className="text-muted-foreground text-base hover:text-accent transition-colors">{SITE.phone}</a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail size={20} className="text-primary flex-shrink-0" />
              <a href={`mailto:${SITE.email}`} className="text-muted-foreground text-base hover:text-accent transition-colors">{SITE.email}</a>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-serif text-xl font-bold text-foreground mb-4">Horário de Funcionamento</h3>
            <div className="flex items-start justify-center gap-3">
              <Clock size={20} className="text-accent mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground text-base leading-relaxed text-left">Segunda a Sexta: <span className="font-medium text-foreground">9:00 às 18:00</span></p>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="font-serif text-xl font-bold text-foreground mb-4">Siga nossas redes</h3>
            <div className="flex items-center justify-center gap-4">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors"><Icon size={18} /></a>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col items-center gap-4">
            <img src="/img/logo-full.webp" alt="Marina Contábil" className="h-16 w-auto" loading="lazy" width={220} height={64} />
            <p className="text-muted-foreground text-sm">Marina Contábil – 45 anos de confiança e compromisso com você.</p>
            <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Marina Contábil. Todos os direitos reservados.</p>
            <a href="https://grupofreela.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-xs underline-offset-2 hover:underline transition-colors">by grupofreela.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
