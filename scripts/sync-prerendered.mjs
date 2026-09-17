/**
 * Moves prerendered route HTML between dist/ and the tracked prerendered/ dir.
 *
 * `save`  (local / GitHub Actions, where Chromium works): dist → prerendered/
 * `apply` (Vercel build, where Chromium cannot launch): prerendered/ → dist,
 *         overwriting the SPA shells produced by the degraded prerender.
 */
import { access, copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PRERENDERED = path.join(ROOT, "prerendered");

const mode = process.argv[2];
if (mode !== "save" && mode !== "apply") {
  console.error("usage: node scripts/sync-prerendered.mjs <save|apply>");
  process.exit(1);
}

const FROM = mode === "save" ? DIST : PRERENDERED;
const TO = mode === "save" ? PRERENDERED : DIST;

for (const route of ROUTES) {
  const rel = route === "/" ? "index.html" : path.join(route, "index.html");
  const from = path.join(FROM, rel);
  const to = path.join(TO, rel);
  try {
    await access(from);
  } catch {
    if (mode === "save") throw new Error(`missing ${from} — run the full build first`);
    console.warn(`[sync] no prerendered file for ${route} — leaving the SPA shell`);
    continue;
  }
  await mkdir(path.dirname(to), { recursive: true });
  await copyFile(from, to);
}
console.log(`[sync] ${mode} complete for ${ROUTES.length} routes`);
