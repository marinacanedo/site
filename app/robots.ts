import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const ai = ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"];
  return { rules: [{ userAgent: "*", allow: "/" }, ...ai.map((userAgent) => ({ userAgent, allow: "/" }))], sitemap: "https://marinacontabil.com/sitemap.xml" };
}
