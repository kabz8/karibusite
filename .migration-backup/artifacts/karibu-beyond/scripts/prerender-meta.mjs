import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PAGE_META, SITE_ORIGIN } from "../src/lib/page-meta.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(scriptDir, "../dist/public");
const baseHtml = readFileSync(path.join(outputDir, "index.html"), "utf8");
const imageUrl = `${SITE_ORIGIN}/karibu-logo.png`;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceMeta(html, key, content, attribute = "name") {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expression = new RegExp(`<meta\\s+${attribute}="${escapedKey}"[^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}">`;
  return expression.test(html) ? html.replace(expression, tag) : html.replace("</head>", `  ${tag}\n  </head>`);
}

for (const [route, metadata] of Object.entries(PAGE_META)) {
  const canonicalUrl = `${SITE_ORIGIN}${route}`;
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`);
  html = replaceMeta(html, "description", metadata.description);
  html = replaceMeta(html, "og:title", metadata.title, "property");
  html = replaceMeta(html, "og:description", metadata.description, "property");
  html = replaceMeta(html, "og:url", canonicalUrl, "property");
  html = replaceMeta(html, "og:image", imageUrl, "property");
  html = replaceMeta(html, "twitter:title", metadata.title);
  html = replaceMeta(html, "twitter:description", metadata.description);

  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}">`;
  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel="canonical"[^>]*>/i, canonicalTag);
  } else {
    html = html.replace("</head>", `  ${canonicalTag}\n  </head>`);
  }

  if (route === "/") {
    writeFileSync(path.join(outputDir, "index.html"), html);
    continue;
  }
  const routeFile = path.join(outputDir, `${route.slice(1)}.html`);
  mkdirSync(path.dirname(routeFile), { recursive: true });
  writeFileSync(routeFile, html);
}

const urls = Object.keys(PAGE_META)
  .map((route) => `  <url><loc>${SITE_ORIGIN}${route}</loc></url>`)
  .join("\n");
writeFileSync(
  path.join(outputDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
