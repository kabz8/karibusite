import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PAGE_META } from "../src/lib/page-meta.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(scriptDir, "../dist/public");

assert.ok(existsSync(path.join(outputDir, "index.html")), "built homepage is missing");
assert.ok(existsSync(path.join(outputDir, "sitemap.xml")), "generated sitemap is missing");

for (const [route, metadata] of Object.entries(PAGE_META)) {
  const routeFile = route === "/"
    ? path.join(outputDir, "index.html")
    : path.join(outputDir, `${route.slice(1)}.html`);
  assert.ok(existsSync(routeFile), `static route shell is missing for ${route}`);

  const html = readFileSync(routeFile, "utf8");
  assert.ok(html.includes(`<title>${metadata.title}</title>`), `title is missing for ${route}`);
  assert.ok(html.includes(`content="${metadata.description}"`), `description is missing for ${route}`);
  assert.ok(html.includes("karibu-logo.png"), `brand image metadata is missing for ${route}`);
  assert.ok(!html.includes("Update this description"), `template metadata remains on ${route}`);
}

const sitemap = readFileSync(path.join(outputDir, "sitemap.xml"), "utf8");
assert.ok(sitemap.includes("https://karibuandbeyondltd.com/"), "official homepage is missing from sitemap");
assert.ok(sitemap.includes("https://karibuandbeyondltd.com/services/medical-tourism"), "service routes are missing from sitemap");

console.log(`Static site smoke test passed for ${Object.keys(PAGE_META).length} routes.`);
