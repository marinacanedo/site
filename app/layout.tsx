import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "./globals.css";


const SITE_URL = "https://marinacontabil.com";
const TITLE = "Marina Contábil | Contabilidade e BPO Financeiro em BH";
const DESC = "Escritório de contabilidade em Belo Horizonte com 45 anos de experiência. Contabilidade geral, planejamento tributário, BPO financeiro, departamento pessoal e mais.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  keywords: ["contabilidade BH", "escritório contábil Belo Horizonte", "planejamento tributário", "BPO financeiro", "departamento pessoal", "MEI", "Simples Nacional"],
  authors: [{ name: "Marina Contábil" }],
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon.png", type: "image/png" }], apple: "/apple-touch-icon.png" },
  openGraph: { type: "website", locale: "pt_BR", url: SITE_URL, siteName: "Marina Contábil", title: TITLE, description: DESC, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0f3a46" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" >
      <body>{children}</body>
    </html>
  );
}
