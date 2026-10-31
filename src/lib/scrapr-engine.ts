// ============================================================
// SCRAPER ENGINE LOADER — TaoSite (server-only)
// ------------------------------------------------------------
// Semua engine @coflyn/scrapr ter-bundle statis via engine-map
// (di-generate scripts/gen_engine_map.py) — kompatibel Turbopack
// dan aman untuk serverless Vercel tanpa file-tracing tambahan.
// ============================================================

import { getEngineModule } from "@/lib/engine-map";

export interface ScraprRawResult {
  status?: boolean;
  message?: string;
  result?: unknown;
}

/**
 * Jalankan engine scrapr.
 * @param categoryDir  Nama folder kategori di vendor/scrapr/lib (mis. "instagram")
 * @param engineName   Nama folder engine (mis. "snapsave")
 * @param url          URL target yang akan di-scrape
 * @param options      Opsi tambahan (mis. { format: "mp3" } untuk ytmp3)
 */
export async function runScraprEngine(
  categoryDir: string,
  engineName: string,
  url: string,
  options?: Record<string, unknown>
): Promise<ScraprRawResult> {
  const mod = getEngineModule(`${categoryDir}/${engineName}`);

  if (!mod) {
    throw new Error(`Engine tidak ditemukan: ${categoryDir}/${engineName}`);
  }

  const scrape = (mod as { scrape?: unknown }).scrape;

  if (typeof scrape !== "function") {
    throw new Error(`Engine ${categoryDir}/${engineName} tidak valid (scrape tidak ada).`);
  }

  const result = await (scrape as (
    url: string,
    options?: Record<string, unknown>
  ) => Promise<ScraprRawResult> | ScraprRawResult)(url, options ?? {});

  return result;
}
