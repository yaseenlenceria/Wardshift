/**
 * Post-build prerender: serves dist/ locally, visits every public route with
 * headless Chromium and writes the fully rendered HTML to dist/<route>/index.html
 * so crawlers get real content instead of an empty SPA shell.
 *
 * Local builds stay fail-safe. Prerender failures never block a deploy by
 * default (the SPA shell still serves every route); set REQUIRE_PRERENDER=1
 * to make an incomplete prerender a hard failure.
 */

import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { platform } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");

const PUBLIC_ORIGIN = process.env.PRERENDER_ORIGIN ?? "https://wardshift.com";
const REQUIRE_PRERENDER = process.env.REQUIRE_PRERENDER === "1";
const ON_VERCEL = process.env.VERCEL === "1";

const ROUTES = [
  "/",
  "/how-we-help/",
  "/private-practice-websites/",
  "/search-visibility/",
  "/patient-acquisition/",
  "/google-ads/",
  "/digital-reputation/",
  "/consultant-positioning/",
  "/practice-enquiry-systems/",
  "/crm-follow-up/",
  "/practice-growth-strategy/",
  "/who-we-help/",
  "/private-doctors/",
  "/newly-appointed-consultants/",
  "/growth-system/",
  "/insights/",
  "/insights/why-a-doctors-website-is-not-a-digital-cv/",
  "/insights/the-referral-validation-search/",
  "/insights/what-to-build-before-your-first-private-patient/",
  "/insights/traffic-is-not-the-outcome/",
  "/insights/growth-should-be-measurable/",
  "/about/",
  "/growth-review/",
  "/contact/",
  "/privacy/",
  "/terms/",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function warn(...args) {
  console.warn("[prerender] warning:", ...args);
}

function chromeFallbackPaths() {
  const paths = [];
  if (process.env.CHROMIUM_PATH) paths.push(process.env.CHROMIUM_PATH);
  if (platform() === "win32") {
    paths.push(
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      path.join(process.env.LOCALAPPDATA ?? "", "Google\\Chrome\\Application\\chrome.exe"),
    );
  } else if (platform() === "darwin") {
    paths.push("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");
  } else {
    paths.push("/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome");
  }
  return paths.filter(Boolean);
}

/** Tiny static server for dist/ with SPA fallback to index.html. */
function serveDist() {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url ?? "/", "http://localhost");
        let filePath = path.join(DIST, decodeURIComponent(url.pathname));
        if (url.pathname.endsWith("/")) filePath = path.join(filePath, "index.html");
        if (!existsSync(filePath)) filePath = path.join(DIST, "index.html"); // SPA fallback
        let body = await readFile(filePath);
        // dist is built with base "./" — rewrite asset URLs to root-absolute when
        // serving HTML, so the SPA fallback boots correctly from any sub-route.
        if (filePath.endsWith(".html")) {
          body = Buffer.from(body.toString("utf8").replace(/(src|href)="\.\//g, '$1="/'));
        }
        res.writeHead(200, {
          "content-type": MIME[path.extname(filePath)] ?? "application/octet-stream",
        });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end("not found");
      }
    });
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  if (!existsSync(path.join(DIST, "index.html"))) {
    warn("dist/index.html not found — run `vite build` first. Skipping prerender.");
    if (REQUIRE_PRERENDER) process.exitCode = 1;
    return;
  }

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch (err) {
    warn(`playwright is not available (${err.message}). Skipping prerender.`);
    if (REQUIRE_PRERENDER) process.exitCode = 1;
    return;
  }

  let browser = null;
  let server = null;
  const rendered = [];
  const failed = [];

  try {
    server = await serveDist();
    const { port } = server.address();
    const base = `http://127.0.0.1:${port}`;

    try {
      browser = await chromium.launch({ headless: true });
    } catch (err) {
      warn(`default chromium launch failed (${err.message.split("\n")[0]}). Retrying with --no-sandbox...`);
      let launchError = err;
      // CI containers (Vercel) run as root, so Chromium crashes without the
      // sandbox disabled — retry Playwright's own binary before probing
      // system Chrome installations.
      try {
        browser = await chromium.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        });
      } catch (noSandboxErr) {
        launchError = noSandboxErr;
        warn(`--no-sandbox launch failed (${noSandboxErr.message.split("\n")[0]}). Trying installed Chrome...`);
      }
      if (!browser) for (const executablePath of chromeFallbackPaths()) {
        if (!existsSync(executablePath)) continue;
        try {
          browser = await chromium.launch({
            headless: true,
            executablePath,
            args: ["--no-sandbox"],
          });
          break;
        } catch (fallbackErr) {
          launchError = fallbackErr;
        }
      }
      if (!browser) throw launchError;
    }

    const page = await browser.newPage();
    page.setDefaultTimeout(30_000);

    for (const route of ROUTES) {
      try {
        await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 30_000 });
        await page.waitForTimeout(600); // let route chunks + animations settle
        let html = await page.content();
        // dist is built with base "./"; root-absolute asset URLs keep
        // prerendered sub-route pages (dist/<route>/index.html) working.
        html = html.replace(/(src|href)="\.\//g, '$1="/');
        // Canonical/OG/JSON-LD URLs are built from the runtime origin — rewrite
        // the local preview origin to the public production origin.
        html = html.replaceAll(base, PUBLIC_ORIGIN);
        html = html.replace(/http:\/\/127\.0\.0\.1:\d+/g, PUBLIC_ORIGIN);
        html = html.replace(/http:\/\/localhost:\d+/g, PUBLIC_ORIGIN);
        // Keep loadable assets host-relative so Vercel preview deployments work
        // before wardshift.com DNS is attached; SEO tags/JSON-LD remain absolute.
        html = html.replace(
          new RegExp(
            `(src|href)="${PUBLIC_ORIGIN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/((?:assets/|img-|logo|favicon|icon-|apple-touch-icon|noise|texture-grid|ascent-line)[^"]*)"`,
            "g",
          ),
          '$1="/$2"',
        );
        const outFile =
          route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
        await mkdir(path.dirname(outFile), { recursive: true });
        await writeFile(outFile, html, "utf8");
        rendered.push(route);
      } catch (err) {
        warn(`failed to prerender ${route}: ${err.message.split("\n")[0]}`);
        failed.push(route);
      }
    }
  } catch (err) {
    warn(`prerender aborted: ${err.message.split("\n")[0]}`);
  } finally {
    try {
      await browser?.close();
    } catch {}
    try {
      server?.close();
    } catch {}
  }

  console.log(
    `[prerender] rendered ${rendered.length}/${ROUTES.length} routes` +
      (failed.length ? ` (failed: ${failed.join(", ")})` : ""),
  );
  if (rendered.length !== ROUTES.length) {
    if (REQUIRE_PRERENDER) {
      process.exitCode = 1;
    } else {
      // Never block the deploy on prerendering: the SPA shell still serves
      // every route via vercel.json rewrites and Googlebot renders JS.
      console.warn(
        `[prerender] incomplete — deploying SPA shell${ON_VERCEL ? " (Vercel)" : ""}. ` +
          "Set REQUIRE_PRERENDER=1 to make this a hard failure.",
      );
    }
  }
}

main()
  .catch((err) => warn(`unexpected error: ${err.message}`))
  .finally(() => process.exit(process.exitCode ?? 0));
