"use client";

import { useState, useCallback } from "react";
import {
  Loader2,
  Download,
  Link2,
  Video,
  Music,
  Image as ImageIcon,
  File as FileIcon,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import type { MediaType } from "@/lib/normalize";

export interface UiMedia {
  url: string;
  type: MediaType;
  label?: string;
  size?: string;
}

export interface DownloaderClientProps {
  /** Slug kategori, mis. "igdl" */
  categorySlug: string;
  /** Label kategori, mis. "Instagram" */
  categoryLabel: string;
  /** Warna aksen kategori */
  color: string;
  /** Slug engine aktif, mis. "snapsave" */
  engineSlug: string;
  /** Nama tampilan engine */
  engineLabel: string;
  /** Placeholder input URL */
  placeholder?: string;
  /** true = tampilkan pilihan format MP4/MP3 (khusus ytmp3) */
  hasFormatChoice?: boolean;
  /** Daftar engine lain dalam kategori untuk switch cepat */
  siblingEngines?: { slug: string; desc: string }[];
}

function TypeIcon({ type }: { type: MediaType }) {
  const cls = "size-3.5 shrink-0";
  switch (type) {
    case "video":
      return <Video className={cls} />;
    case "audio":
      return <Music className={cls} />;
    case "image":
      return <ImageIcon className={cls} />;
    case "link":
      return <ExternalLink className={cls} />;
    default:
      return <FileIcon className={cls} />;
  }
}

const TYPE_LABEL: Record<MediaType, string> = {
  video: "VIDEO",
  audio: "AUDIO",
  image: "FOTO",
  file: "FILE",
  link: "LINK",
};

async function forceDownload(url: string, filename: string) {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("fetch failed");
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
    return true;
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
    return false;
  }
}

export default function DownloaderClient({
  categorySlug,
  categoryLabel,
  color,
  engineSlug,
  engineLabel,
  placeholder,
  hasFormatChoice,
  siblingEngines,
}: DownloaderClientProps) {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"mp4" | "mp3">("mp4");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [medias, setMedias] = useState<UiMedia[]>([]);
  const [scrolledId, setScrolledId] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!url.trim()) return;

      setLoading(true);
      setError(null);
      setNotice(null);
      setTitle(null);
      setThumbnail(null);
      setMedias([]);

      try {
        const params = new URLSearchParams({ url: url.trim() });
        if (hasFormatChoice) params.set("format", format);
        const res = await fetch(`/api/dl/${categorySlug}/${engineSlug}?${params.toString()}`);
        const json = await res.json();

        if (json.ok && Array.isArray(json.medias) && json.medias.length > 0) {
          setTitle(typeof json.title === "string" ? json.title : null);
          setThumbnail(typeof json.thumbnail === "string" ? json.thumbnail : null);
          setMedias(json.medias as UiMedia[]);
          const links = (json.medias as UiMedia[]).filter((m) => m.type === "link").length;
          if (links === json.medias.length && links > 0) {
            setNotice(
              `Ditemukan ${links} tautan. Klik salah satu untuk membuka halaman tujuan.`
            );
          }
        } else {
          throw new Error(json.message || "Gagal memproses URL.");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan. Coba lagi atau gunakan engine lain."
        );
      } finally {
        setLoading(false);
      }
    },
    [url, format, hasFormatChoice, categorySlug, engineSlug]
  );

  const handleDownload = (media: UiMedia, index: number) => {
    const ext = media.url.split("?")[0].split(".").pop()?.slice(0, 5) || "bin";
    const safeTitle = (title || `taosite_${categorySlug}`).replace(/[^a-z0-9-_ ]/gi, "").slice(0, 40).trim().replace(/\s+/g, "_");
    const filename = `${safeTitle}_${index + 1}.${ext}`;
    void forceDownload(media.url, filename);
  };

  const hasResult = medias.length > 0;
  const listId = `media-list-${categorySlug}-${engineSlug}`;

  const scrollList = (dir: -1 | 1) => {
    document.getElementById(listId)?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-1">
          {categoryLabel} — {engineLabel}
        </h1>
        <p className="text-sm font-mono" style={{ color: "var(--neo-muted-text)" }}>
          Tempel URL {categoryLabel} lalu klik Process
        </p>
      </div>

      {/* Input Card */}
      <div className="neo-card p-3 sm:p-4 mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Link2 className="size-4" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={placeholder || "https://..."}
              required
              className="neo-border rounded-lg w-full pl-10 pr-3 py-2.5 font-mono text-sm bg-transparent focus:outline-none focus:ring-2"
              style={{ boxShadow: "none" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="neo-btn text-white px-5 py-2.5 font-mono font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 shrink-0"
            style={{ backgroundColor: "#18181b" }}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="size-4" />
                Process
              </>
            )}
          </button>
        </form>

        {/* Pilihan format (ytmp3) */}
        {hasFormatChoice && (
          <div className="flex items-center gap-2 mt-3">
            <span className="font-mono text-xs" style={{ color: "var(--neo-muted-text)" }}>
              Format:
            </span>
            {(["mp4", "mp3"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`neo-btn px-3 py-1 font-mono text-xs font-bold uppercase ${
                  format === f ? "text-white" : "bg-transparent"
                }`}
                style={format === f ? { backgroundColor: color, color: "#fff" } : { color }}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-3 my-8">
          <div className="w-9 h-9 border-4 border-gray-200 border-t-[#18181b] rounded-full animate-spin dark:border-zinc-700 dark:border-t-white" />
          <p className="text-sm font-mono text-gray-500 animate-pulse">
            Mengambil data dari server...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="neo-card p-4 text-center font-mono text-sm text-red-600 dark:text-red-400 mb-6 flex items-center gap-2 justify-center">
          <AlertTriangle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Notice */}
      {notice && !error && (
        <div className="neo-card p-3 text-center font-mono text-xs mb-6 flex items-center gap-2 justify-center" style={{ color: "var(--neo-muted-text)" }}>
          <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
          {notice}
        </div>
      )}

      {/* Hasil */}
      {hasResult && (
        <div className="neo-card p-5 sm:p-6 overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200 dark:border-zinc-700 mb-4 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="neo-border rounded-md p-1.5 shrink-0"
                style={{ backgroundColor: `${color}18`, borderColor: color }}
              >
                <CheckCircle2 className="size-4" style={{ color }} />
              </span>
              <span className="font-mono font-bold text-sm truncate">
                {title || "Hasil Pencarian"}
              </span>
            </div>
            <span
              className="text-[10px] px-2.5 py-1 rounded-full font-mono font-bold neo-border shrink-0"
              style={{ backgroundColor: `${color}12` }}
            >
              {medias.length} ITEM
            </span>
          </div>

          {thumbnail && (
            <div className="mb-4 neo-border rounded-lg overflow-hidden max-h-56">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnail} alt="Thumbnail" className="w-full object-cover" />
            </div>
          )}

          <div className="relative group">
            {medias.length > 4 && (
              <>
                <button
                  onClick={() => scrollList(-1)}
                  className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/80 text-white hidden sm:flex items-center justify-center neo-btn border-black"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => scrollList(1)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/80 text-white hidden sm:flex items-center justify-center neo-btn border-black"
                  aria-label="Berikutnya"
                >
                  <ChevronRight className="size-4" />
                </button>
              </>
            )}
            <div
              id={listId}
              onMouseEnter={() => setScrolledId(listId)}
              className="flex flex-col gap-2.5 max-h-[420px] overflow-y-auto chat-scroll pr-1"
            >
              {medias.map((media, i) => (
                <div
                  key={`${media.url}-${i}`}
                  className="flex items-center gap-3 neo-border rounded-lg px-3 py-2.5"
                >
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    #{i + 1} {TYPE_LABEL[media.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs truncate">
                      {media.label || media.url.replace(/^https?:\/\//, "").slice(0, 60)}
                    </p>
                    {media.size && (
                      <p className="font-mono text-[10px]" style={{ color: "var(--neo-muted-text)" }}>
                        {media.size}
                      </p>
                    )}
                  </div>
                  {media.type === "link" ? (
                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn px-3 py-1.5 font-mono font-bold text-xs flex items-center gap-1.5 shrink-0 hover:opacity-80"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      <ExternalLink className="size-3" />
                      Buka
                    </a>
                  ) : (
                    <button
                      onClick={() => handleDownload(media, i)}
                      className="neo-btn text-white px-3 py-1.5 font-mono font-bold text-xs flex items-center gap-1.5 shrink-0 hover:opacity-80"
                      style={{ backgroundColor: color }}
                    >
                      <Download className="size-3" />
                      Unduh
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Switch engine cepat */}
          {siblingEngines && siblingEngines.length > 0 && (
            <div className="mt-5 pt-4 border-t border-dashed" style={{ borderColor: "var(--neo-border-color)" }}>
              <p className="font-mono text-xs mb-2" style={{ color: "var(--neo-muted-text)" }}>
                Gagal? Coba engine lain:
              </p>
              <div className="flex flex-wrap gap-2">
                {siblingEngines.map((eng) => (
                  <a
                    key={eng.slug}
                    href={`/${categorySlug}/${eng.slug}`}
                    className={`neo-btn px-3 py-1.5 font-mono text-xs font-medium bg-[var(--neo-card-bg)] hover:opacity-80 ${
                      eng.slug === engineSlug ? "opacity-40 pointer-events-none" : ""
                    }`}
                  >
                    {eng.slug}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
