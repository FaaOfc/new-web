import { NextRequest, NextResponse } from "next/server";
import { getCategory, getEngine } from "@/lib/scraper-registry";
import { runEngine } from "@/lib/scrapr-engine";
import { normalizeResult } from "@/lib/normalize";

export const runtime = "nodejs";
export const maxDuration = 120;

// GET /api/dl/<kategori>/<engine>?url=...   (engine opsional → default engine)
// contoh: /api/dl/igdl/snapsave?url=https://instagram.com/reel/xxx
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const [catSlug, engineSlug] = slug;

  const cat = getCategory(catSlug);
  if (!cat) {
    return NextResponse.json(
      { status: false, message: `Kategori "${catSlug}" tidak ditemukan.` },
      { status: 404 }
    );
  }

  const engineKey = engineSlug || cat.defaultEngine;
  const engine = getEngine(cat, engineKey);
  if (!engine) {
    return NextResponse.json(
      {
        status: false,
        message: `Engine "${engineKey}" tidak ada di kategori ${cat.label}.`,
      },
      { status: 404 }
    );
  }

  const url = request.nextUrl.searchParams.get("url");
  if (!url || !url.trim()) {
    return NextResponse.json(
      { status: false, message: "Parameter URL wajib diisi." },
      { status: 400 }
    );
  }

  // parameter tambahan engine (mis. format=mp3 untuk ytmp3)
  const extraArgs: unknown[] = [];
  if (engine.params) {
    for (const p of engine.params) {
      extraArgs.push(request.nextUrl.searchParams.get(p.name) || p.default);
    }
  }

  try {
    const raw = (await runEngine(cat.libKey, engine.key, url.trim(), extraArgs)) as
      | Record<string, unknown>
      | undefined;

    if (!raw || (typeof raw === "object" && raw.status === false)) {
      const message =
        (raw && typeof raw.message === "string" && raw.message) ||
        "Engine gagal mengambil data. Coba engine lain di bawah.";
      return NextResponse.json({ status: false, message }, { status: 502 });
    }

    const data = normalizeResult(raw);

    return NextResponse.json({
      status: true,
      category: cat.slug,
      categoryLabel: cat.label,
      engine: engine.label,
      data,
      raw: raw,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan tak terduga.";
    return NextResponse.json(
      { status: false, message: `Gagal memproses: ${message}` },
      { status: 500 }
    );
  }
}
