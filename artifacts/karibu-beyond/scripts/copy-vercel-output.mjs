import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(scriptDir, "../dist/public");
const outputDir = path.resolve(scriptDir, "../../../dist");

if (!existsSync(path.join(sourceDir, "index.html"))) {
  throw new Error(`Built Vercel homepage is missing from ${sourceDir}`);
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(path.dirname(outputDir), { recursive: true });
cpSync(sourceDir, outputDir, { recursive: true });
