"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "./site";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./Icons";

const navLinks = [
  { label: "O ESCRITÓRIO", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "BPO", href: "/#bpo" },
  { label: "Contato", href: "/#contato" },
];

function Socials({ size, className }: { size: number; className: string }) {
  const items = [
    { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: SITE.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: SITE.social.youtube, label: "YouTube", Icon: YouTubeIcon },
  ];
  return (
    <>
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
          <Icon size={size} />
        </a>
      ))}
    </>
  );
}

const clientBtn = "border border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-full px-5 py-2 text-sm font-medium transition-colors inline-flex items-center justify-center";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary shadow-lg" : "bg-primary/90 backdrop-blur-sm"}`}>
      <div className="container flex items-center justify-between h-16 md:h-20 px-6 md:px-12">
        <a href="/" className="flex items-center" aria-label="Marina Contábil — início">
          <img src="/img/logo-full-white.webp" alt="Marina Contábil" className="hidden md:block h-10 w-auto" width={118} height={40} />
          <img src="/img/logo-mark-white.webp" alt="Marina Contábil" className="md:hidden h-9 w-auto" width={47} height={36} />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-primary-foreground/80 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">{l.label}</a>
          ))}
          <div className="flex items-center gap-3 ml-4 border-l border-primary-foreground/20 pl-4">
            <Socials size={18} className="text-primary-foreground/70 hover:text-accent transition-colors" />
          </div>
          <a href={SITE.clientArea} target="_blank" rel="noopener noreferrer" className={`ml-4 ${clientBtn}`}>Área do Cliente</a>
        </nav>

        <button type="button" onClick={() => setOpen(true)} className="md:hidden text-primary-foreground p-2" aria-label="Abrir menu" aria-expanded={open}>
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-primary p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-serif text-primary-foreground text-lg font-semibold">Menu</span>
              <button type="button" onClick={() => setOpen(false)} className="text-primary-foreground p-1" aria-label="Fechar menu"><X size={22} /></button>
            </div>
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-primary-foreground/90 hover:text-accent transition-colors text-lg font-medium tracking-wide">{l.label}</a>
              ))}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-primary-foreground/20">
                <Socials size={22} className="text-primary-foreground/70 hover:text-accent transition-colors" />
              </div>
              <a href={SITE.clientArea} target="_blank" rel="noopener noreferrer" className={`mt-6 w-full ${clientBtn}`}>Área do Cliente</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
