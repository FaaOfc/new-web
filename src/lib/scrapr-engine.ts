import path from "path";
import { createRequire } from "module";

// PENTING: pemuatan module scrapr dilakukan lewat indirection (new Function)
// agar bundler (Turbopack/webpack) TIDAK mencoba menganalisis & meng-bundle
// file vendor secara statis — require dijalankan murni di runtime Node.js.
const nodeRequire = createRequire(import.meta.url);
const dynamicRequire = new Function(
  "req",
  "p",
  "return req(p);"
) as (req: NodeRequire, p: string) => unknown;

type ScraprFn = (...args: unknown[]) => Promise<unknown>;

interface ScraprModule {
  [category: string]: Record<string, ScraprFn> | ScraprFn;
}

let cached: ScraprModule | null = null;

/**
 * Load library scrapr yang di-vendor di /vendor/scrapr.
 * Menggunakan createRequire + path runtime agar TIDAK di-bundle oleh Next.js
 * (menghindari error bundling untuk optional dependency seperti puppeteer/playwright).
 */
export function loadScrapr(): ScraprModule {
  if (cached) return cached;
  const entry = path.join(process.cwd(), "vendor", "scrapr", "index.js");
  cached = dynamicRequire(nodeRequire, entry) as ScraprModule;
  return cached;
}

/**
 * Panggil satu engine scrapr dengan timeout.
 */
export async function runEngine(
  libKey: string,
  engineKey: string,
  url: string,
  extraArgs: unknown[] = [],
  timeoutMs = 90_000
): Promise<unknown> {
  const scrapr = loadScrapr();
  const cat = scrapr[libKey] as Record<string, ScraprFn> | undefined;
  if (!cat) throw new Error(`Kategori "${libKey}" tidak ada di scrapr.`);
  const fn = cat[engineKey];
  if (typeof fn !== "function")
    throw new Error(`Engine "${engineKey}" tidak ada di scrapr/${libKey}.`);

  return Promise.race([
    fn(url, ...extraArgs),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout — engine terlalu lama merespons.")), timeoutMs)
    ),
  ]);
}
