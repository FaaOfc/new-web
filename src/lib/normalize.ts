// ============================================================
// RESULT NORMALIZER — TaoSite
// ------------------------------------------------------------
// Mengubah bentuk hasil engine scrapr yang bermacam-macam
// menjadi satu format seragam untuk UI:
//   { ok, title, thumbnail, medias: [{ url, type, label }] }
// ============================================================

export type MediaType = "video" | "image" | "audio" | "file" | "link";

export interface NormalizedMedia {
  url: string;
  type: MediaType;
  /** Label tombol, mis. "HD", "MP3 128kbps", "Halaman 3" */
  label?: string;
  /** Info tambahan seperti ukuran file */
  size?: string;
}

export interface NormalizedResult {
  ok: boolean;
  message?: string;
  title?: string;
  thumbnail?: string;
  medias: NormalizedMedia[];
}

const VIDEO_EXT = /\.(mp4|mkv|mov|webm|avi|flv|m4v|3gp)(\?|$)/i;
const AUDIO_EXT = /\.(mp3|m4a|wav|opus|flac|aac|ogg)(\?|$)/i;
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|bmp|avif)(\?|$)/i;

function guessTypeFromUrl(url: string): MediaType {
  if (VIDEO_EXT.test(url)) return "video";
  if (AUDIO_EXT.test(url)) return "audio";
  if (IMAGE_EXT.test(url)) return "image";
  return "file";
}

function guessTypeFromText(text: unknown, url: string): MediaType {
  const t = String(text ?? "").toLowerCase();
  if (/\b(mp4|hd|sd|video|720p|1080p|480p|360p|wm\b|nowatermark|no watermark|tiktok)\b/.test(t) && !/mp3|audio/.test(t))
    return "video";
  if (/\b(mp3|audio|m4a|opus|128kbps|320kbps|sound|music)\b/.test(t)) return "audio";
  if (/\b(jpg|jpeg|png|webp|foto|photo|image|gambar|slide)\b/.test(t)) return "image";
  if (/\b(halaman|episode|chapter|page|server)\b/.test(t)) return "link";
  return guessTypeFromUrl(url);
}

function isHttpUrl(value: unknown): value is string {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function normalizeUrl(u: string): string {
  return u.startsWith("//") ? `https:${u}` : u;
}

function pushMedia(
  out: NormalizedMedia[],
  seen: Set<string>,
  url: string,
  type?: MediaType,
  label?: string,
  size?: string
) {
  const fixed = normalizeUrl(url.trim());
  if (!isHttpUrl(fixed) || seen.has(fixed)) return;
  seen.add(fixed);
  out.push({
    url: fixed,
    type: type ?? guessTypeFromUrl(fixed),
    label: label && label.trim() ? label.trim() : undefined,
    size: size && typeof size === "string" ? size : undefined,
  });
}

/** Kunci meta yang TIDAK boleh diperlakukan sebagai daftar media */
const META_KEYS = new Set([
  "status",
  "message",
  "title",
  "caption",
  "description",
  "thumbnail",
  "thumb",
  "poster",
  "cover",
  "author",
  "uploader",
  "duration",
  "source",
  "id",
  "type",
  "quality",
  "size",
  "ext",
  "filename",
  "track_url",
  "requested_url",
  "original_url",
]);

function labelFromObject(obj: Record<string, unknown>): string | undefined {
  const candidates = ["label", "quality", "type", "resolution", "name", "text", "title", "filename"];
  for (const key of candidates) {
    const val = obj[key];
    if (typeof val === "string" && val.trim() && !isHttpUrl(val)) return val.trim();
  }
  return undefined;
}

function walk(value: unknown, out: NormalizedMedia[], seen: Set<string>, depth = 0) {
  if (depth > 4 || value == null) return;

  // Array → telusuri tiap item
  if (Array.isArray(value)) {
    for (const item of value) walk(item, out, seen, depth + 1);
    return;
  }

  // Primitif
  if (typeof value === "string" || typeof value === "number") {
    if (isHttpUrl(String(value))) pushMedia(out, seen, String(value));
    return;
  }

  // Object
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;

    // Object media yang punya URL langsung
    const urlKeys = ["url", "video", "audio", "image", "img", "src", "link", "download_url", "direct"];
    let pushed = false;
    for (const key of urlKeys) {
      const val = obj[key];
      if (isHttpUrl(val)) {
        const explicitType = obj.type ?? obj.label ?? obj.quality;
        const type =
          key === "video"
            ? "video"
            : key === "audio" || key === "download_url"
              ? guessTypeFromText(explicitType, val)
              : guessTypeFromText(explicitType, val);
        pushMedia(out, seen, val, type, labelFromObject(obj), typeof obj.size === "string" ? obj.size : undefined);
        pushed = true;
      } else if (key === "image" && Array.isArray(val)) {
        for (const item of val) {
          if (isHttpUrl(item)) pushMedia(out, seen, item, "image");
          else walk(item, out, seen, depth + 1);
        }
        pushed = true;
      }
    }
    if (pushed) {
      // Tetap telusuri sub-array lain (mis. di dalam item ada daftar server)
      for (const [key, val] of Object.entries(obj)) {
        if (urlKeys.includes(key) || META_KEYS.has(key)) continue;
        if (Array.isArray(val)) walk(val, out, seen, depth + 1);
      }
      return;
    }

    // Tanpa URL langsung → telusuri isi object/array
    for (const [key, val] of Object.entries(obj)) {
      if (META_KEYS.has(key)) continue;
      if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
        walk(val, out, seen, depth + 1);
      } else if (isHttpUrl(val)) {
        pushMedia(out, seen, val, guessTypeFromText(key, val), undefined);
      }
    }
  }
}

/**
 * Normalisasi hasil engine scrapr menjadi format seragam.
 * Media bertipe "link" (episode anime / chapter komik) tetap
 * ditampilkan sebagai daftar tautan.
 */
export function normalizeScraprResult(raw: unknown): NormalizedResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, message: "Hasil engine tidak valid.", medias: [] };
  }

  const obj = raw as Record<string, unknown>;

  if (obj.status === false || obj.error) {
    return {
      ok: false,
      message:
        typeof obj.message === "string"
          ? obj.message
          : "Engine gagal memproses URL. Coba engine lain di kategori ini.",
      medias: [],
    };
  }

  const result = (obj.result ?? obj) as Record<string, unknown>;
  const medias: NormalizedMedia[] = [];
  const seen = new Set<string>();

  // Kasus khusus: playlist/episode/chapter — item berupa { title, url } ke halaman
  walk(result, medias, seen);

  // Judul & thumbnail
  const title =
    typeof result.title === "string"
      ? result.title
      : typeof result.caption === "string"
        ? result.caption
        : undefined;
  const thumbnail =
    (isHttpUrl(result.thumbnail) && result.thumbnail) ||
    (isHttpUrl(result.thumb) && result.thumb) ||
    (isHttpUrl(result.cover) && result.cover) ||
    (isHttpUrl(result.poster) && result.poster) ||
    undefined;

  if (medias.length === 0) {
    return {
      ok: false,
      message: "Tidak ada media yang ditemukan di URL tersebut. Pastikan URL benar atau coba engine lain.",
      title,
      medias: [],
    };
  }

  return { ok: true, title, thumbnail, medias };
}
