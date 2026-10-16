// Converte src-photos/** em public/img/** (WebP). Itens ausentes viram PLACEHOLDER (veja MISSING.md).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "src-photos", OUT = "public/img";
const expected = {
  "": ["hero-1","hero-3","hero-5","hero-6","hero-8","hero-13","international","marina-2","services-photo","bpo-1","bpo-2","bpo-3","logo-full","logo-full-white","logo-mark-white"],
  team: ["marina-canedo","monica-silveira","sergio-silva","magda-mara","nivia-reis","paula-bairral","renata-godoi","juliana-ribeiro","laurita-concalves","tayna-martins","aline-lattuf","adriana-dias"],
};
const widths = { team: 480, logo: 600, default: 1600 };
const missing = [];

fs.mkdirSync(path.join(OUT, "team"), { recursive: true });
for (const [dir, names] of Object.entries(expected)) {
  for (const name of names) {
    const found = fs.readdirSync(path.join(SRC, dir)).find((f) => path.parse(f).name === name);
    const out = path.join(OUT, dir, `${name}.webp`);
    const isLogo = name.startsWith("logo");
    const w = dir === "team" ? widths.team : isLogo ? widths.logo : name === "marina-2" || /^(bpo|services)/.test(name) ? 1000 : widths.default;
    if (found) {
      await sharp(path.join(SRC, dir, found)).resize({ width: w, withoutEnlargement: true }).webp({ quality: isLogo ? 92 : 78 }).toFile(out);
    } else {
      missing.push(path.join(dir, name));
      await sharp({ create: { width: 1600, height: 960, channels: 3, background: "#0f3a46" } }).webp({ quality: 50 }).toFile(out);
    }
  }
}
// logo-mark: WebP com alpha (usado como máscara CSS)
const mark = fs.readdirSync(SRC).find((f) => path.parse(f).name === "logo-mark");
if (mark) await sharp(path.join(SRC, mark)).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 85, alphaQuality: 100 }).toFile(path.join(OUT, "logo-mark.webp"));
else { missing.push("logo-mark"); await sharp({ create: { width: 800, height: 800, channels: 4, background: "#ffffff" } }).webp().toFile(path.join(OUT, "logo-mark.webp")); }

fs.writeFileSync("MISSING.md", missing.length ? `# Imagens ainda não importadas (placeholders)\n\n${missing.map((m) => `- ${m}`).join("\n")}\n` : "# Todas as imagens importadas\n");
console.log(missing.length ? `Faltando (${missing.length}): ${missing.join(", ")}` : "OK, todas as imagens");
