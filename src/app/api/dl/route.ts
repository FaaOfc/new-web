import { NextResponse } from "next/server";
import { scraprCategories, totalEngineCount } from "@/lib/scraper-registry";

export const runtime = "nodejs";

/**
 * Index API downloader TaoSite.
 * GET /api/dl — daftar semua kategori & engine yang tersedia.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    usage: "/api/dl/<kategori>/<engine>?url=<url>",
    totalCategories: scraprCategories.length,
    totalEngines: totalEngineCount,
    categories: scraprCategories.map((cat) => ({
      slug: cat.slug,
      label: cat.label,
      engines: cat.engines.map((e) => e.slug),
    })),
  });
}
