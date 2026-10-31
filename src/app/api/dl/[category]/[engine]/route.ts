import { NextRequest, NextResponse } from "next/server";
import { findEngine } from "@/lib/scraper-registry";
import { runScraprEngine } from "@/lib/scrapr-engine";
import { normalizeScraprResult } from "@/lib/normalize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * API downloader universal TaoSite.
 * GET /api/dl/<kategori>/<engine>?url=<url>
 * contoh: /api/dl/igdl/snapsave?url=https://instagram.com/reel/xxx
 *
 * Opsi opsional:
 *  - ytmp3: &format=mp4|mp3 (default mp4)
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ category: string; engine: string }> }
) {
  const { category, engine } = await context.params;
  const target = request.nextUrl.searchParams.get("url");

  if (!target) {
    return NextResponse.json(
      { ok: false, message: "Parameter ?url= wajib diisi." },
      { status: 400 }
    );
  }

  const found = findEngine(category, engine);
  if (!found) {
    return NextResponse.json(
      { ok: false, message: `Engine ${category}/${engine} tidak terdaftar.` },
      { status: 404 }
    );
  }

  try {
    const options: Record<string, unknown> = {};
    if (category === "ytdl" && engine === "ytmp3") {
      const format = request.nextUrl.searchParams.get("format");
      options.format = format === "mp3" ? "mp3" : "mp4";
    }

    const raw = await runScraprEngine(found.category.dir, found.engine.name, target, options);
    const normalized = normalizeScraprResult(raw);

    return NextResponse.json(
      { ...normalized, engine: `${category}/${engine}` },
      { status: normalized.ok ? 200 : 502 }
    );
  } catch (error) {
    console.error(`Scraper error ${category}/${engine}:`, error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? `Gagal memproses: ${error.message.slice(0, 160)}`
            : "Terjadi kesalahan saat memproses URL.",
        engine: `${category}/${engine}`,
      },
      { status: 500 }
    );
  }
}
