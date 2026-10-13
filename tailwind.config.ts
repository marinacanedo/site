import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: { serif: ["var(--font-playfair)", "Georgia", "serif"], sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      colors: {
        border: "hsl(var(--border))", input: "hsl(var(--input))", ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))", dark: "hsl(var(--accent-dark))" },
        burgundy: { DEFAULT: "hsl(var(--burgundy))", foreground: "hsl(var(--burgundy-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "fade-in-up": { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "ken-burns": { "0%": { transform: "scale(1) translate(0,0)" }, "100%": { transform: "scale(1.12) translate(-1.5%,1.5%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(200%)" } },
        "scroll-indicator": { "0%": { transform: "translateY(0)", opacity: "0" }, "40%": { opacity: "1" }, "100%": { transform: "translateY(14px)", opacity: "0" } },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "ken-burns": "ken-burns 20s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "scroll-indicator": "scroll-indicator 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
