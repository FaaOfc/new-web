// ============================================================
// Normalizer hasil scraper — mengubah bentuk result yang bervariasi
// dari setiap engine scrapr menjadi struktur seragam untuk UI.
// ============================================================

export type MediaType = "video" | "audio" | "image" | "file";

export interface NormalizedMedia {
  type: MediaType;
  url: string;
  quality?: string;
  label?: string;
}

export interface NormalizedData {
  title?: string;
  thumbnail?: string;
  author?: string;
  info: { label: string; value: string }[];
  medias: NormalizedMedia[];
}

const VIDEO_EXT = /\.(mp4|webm|mkv|mov|m4v|avi|flv|3gp)(\?|$)/i;
const AUDIO_EXT = /\.(mp3|m4a|wav|opus|flac|aac|ogg)(\?|$)/i;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|bmp)(\?|$)/i;
const FILE_EXT = /\.(pdf|zip|rar|7z|apk|exe|dmg|deb|iso|txt|docx?|xlsx?|pptx?|srt|mkv)(\?|$)/i;

const VIDEO_KEYS = new Set([
  "video", "videos", "hdplay", "play", "wmplay", "nowatermark", "no_watermark",
  "sd", "hd", "hdnowatermark", "watermark", "mp4", "stream", "downloadvideo",
  "dl", "download", "downloads", "medias", "links", "downloadlink",
  "download_link", "fileurl", "file_url", "source", "videourl", "video_url",
]);
const AUDIO_KEYS = new Set([
  "music", "audio", "mp3", "sound", "audio_url", "audiourl", "musicurl", "musicplay",
]);
const IMAGE_KEYS = new Set([
  "image", "images", "img", "imgs", "photos", "photo", "pictures", "pics",
  "pages", "chapterimages", "chapter_images", "imageUrl", "image_url",
]);
const THUMB_KEYS = new Set([
  "thumbnail", "thumbnails", "thumb", "cover", "origin_cover", "poster", "preview",
]);
const TITLE_KEYS = ["title", "name", "fulltitle", "caption", "description", "judul"];
const AUTHOR_KEYS = ["author", "artist", "uploader", "username", "owner"];

const LABEL_OVERRIDES: Record<string, string> = {
  hdplay: "HD", play: "Normal", wmplay: "Watermark", nowatermark: "No Watermark",
  no_watermark: "No Watermark", sd: "SD", hd: "HD", mp4: "MP4", mp3: "MP3",
  music: "Musik", audio: "Audio", image: "Gambar", video: "Video",
};

function isHttp(v: unknown): v is string {
  return typeof v === "string" && /^https?:\/\//i.test(v.trim());
}

function classify(value: string, key: string): MediaType | null {
  const k = key.toLowerCase();
  if (VIDEO_EXT.test(value) || k === "wmplay") return "video";
  if (AUDIO_EXT.test(value)) return "audio";
  if (IMAGE_EXT.test(value)) return "image";
  if (FILE_EXT.test(value)) return "file";
  if (AUDIO_KEYS.has(k)) return "audio";
  if (IMAGE_KEYS.has(k)) return "image";
  if (THUMB_KEYS.has(k)) return null; // thumbnail bukan media unduhan
  if (VIDEO_KEYS.has(k)) return "video";
  return null;
}

function classifyFromObject(obj: Record<string, unknown>): MediaType | null {
  const t = String(obj.type || obj.media_type || obj.format || "").toLowerCase();
  if (t.includes("video")) return "video";
  if (t.includes("audio") || t.includes("music") || t.includes("mp3")) return "audio";
  if (t.includes("image") || t.includes("photo") || t.includes("pic")) return "image";
  const url = String(obj.url || obj.link || "");
  if (AUDIO_EXT.test(url)) return "audio";
  if (IMAGE_EXT.test(url)) return "image";
  if (VIDEO_EXT.test(url)) return "video";
  if (obj.quality || obj.qualityLabel || obj.resolution) return "video";
  if (obj.filename || obj.fileName) return "file";
  return null;
}

export function normalizeResult(payload: unknown): NormalizedData {
  const out: NormalizedData = { info: [], medias: [] };
  const seen = new Set<string>();

  // buka bungkus {status, result} / {status, data}
  let root: unknown = payload;
  if (
    payload && typeof payload === "object" && !Array.isArray(payload) &&
    "result" in (payload as Record<string, unknown>)
  ) {
    root = (payload as Record<string, unknown>).result;
  }

  const infoPairs: { label: string; value: string }[] = [];

  const visit = (node: unknown, keyPath: string, depth: number) => {
    if (node == null || depth > 6) return;

    if (Array.isArray(node)) {
      // array of string URLs
      const strings = node.filter(isHttp);
      if (strings.length > 0 && strings.length === node.length) {
        const type = classify(strings[0], keyPath.split(".").pop() || "");
        for (const s of strings) {
          const t = type || "file";
          pushMedia(s, t);
        }
        return;
      }
      // array of objects
      for (const item of node) {
        if (item && typeof item === "object") {
          visit(item, keyPath, depth + 1);
        } else if (isHttp(item)) {
          pushMedia(item, classify(item, keyPath.split(".").pop() || "") || "file");
        }
      }
      return;
    }

    if (typeof node === "object") {
      const obj = node as Record<string, unknown>;

      // object dengan url langsung (contoh: downloads: [{quality, url}])
      const urlVal = obj.url ?? obj.link ?? obj.downloadLink ?? obj.download_url ?? obj.fileUrl;
      const looksLikeMediaObj = isHttp(urlVal) && Object.keys(obj).length <= 12;
      if (looksLikeMediaObj) {
        const parentKey = keyPath.split(".").pop() || "";
        const type =
          classifyFromObject(obj) ||
          classify(String(urlVal), parentKey) ||
          (parentKey === "music" || parentKey === "audio" ? "audio" : "file");
        const quality =
          typeof obj.quality === "string" || typeof obj.quality === "number"
            ? String(obj.quality)
            : typeof obj.resolution === "string"
              ? obj.resolution
              : typeof obj.size === "string"
                ? obj.size
                : undefined;
        pushMedia(String(urlVal), type, quality);
        // jangan lanjut rekursi dalam — thumbnail boleh diambil
        if (isHttp(obj.thumbnail) && !out.thumbnail) out.thumbnail = obj.thumbnail;
        if (isHttp(obj.thumb) && !out.thumbnail) out.thumbnail = obj.thumb;
        return;
      }

      for (const [k, v] of Object.entries(obj)) {
        const keyLower = k.toLowerCase();

        // metadata scalar
        if (typeof v === "string" || typeof v === "number") {
          const s = String(v);
          if (TITLE_KEYS.includes(keyLower) && s.length < 300 && !out.title && !isHttp(s)) {
            out.title = s;
          } else if (
            (keyLower === "duration" || keyLower === "size" || keyLower === "album" ||
              keyLower === "artist" || keyLower === "type" || keyLower === "quality" ||
              keyLower === "filename" || keyLower === "trackcount" || keyLower === "source") &&
            s.length < 80 && !isHttp(s)
          ) {
            infoPairs.push({ label: k, value: s });
          }
        }

        if (AUTHOR_KEYS.includes(keyLower) && !out.author) {
          if (typeof v === "string") out.author = v;
          else if (v && typeof v === "object") {
            const a = v as Record<string, unknown>;
            out.author =
              (a.nickname as string) || (a.name as string) || (a.unique_id as string) || undefined;
          }
        }

        if (THUMB_KEYS.has(keyLower) && isHttp(v) && !out.thumbnail) {
          out.thumbnail = v;
          continue;
        }

        if (isHttp(v)) {
          const type = classify(v, keyLower);
          if (type) pushMedia(v, type);
          continue;
        }

        visit(v, keyPath ? `${keyPath}.${k}` : k, depth + 1);
      }
    }
  };

  function pushMedia(url: string, type: MediaType, quality?: string) {
    const clean = url.trim();
    if (!clean || seen.has(clean)) return;
    seen.add(clean);
    const key = keyOfUrl(url);
    out.medias.push({
      url: clean,
      type,
      quality,
      label: quality || LABEL_OVERRIDES[key] || undefined,
    });
  }

  function keyOfUrl(url: string): string {
    // cari key asal — dipakai untuk label override; simple heuristic
    const lower = url.toLowerCase();
    for (const k of ["wmplay", "hdplay", "music", "mp3", "mp4"]) {
      if (lower.includes(k)) return k;
    }
    return "";
  }

  visit(root, "", 0);

  // thumbnail fallback: gambar pertama kalau belum ada
  if (!out.thumbnail) {
    const firstImage = out.medias.find((m) => m.type === "image");
    if (firstImage) out.thumbnail = firstImage.url;
  }

  // info: author ringkas
  if (out.author) infoPairs.unshift({ label: "author", value: out.author });
  out.info = infoPairs.slice(0, 8);

  return out;
}
