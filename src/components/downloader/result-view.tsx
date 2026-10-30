"use client";

import { useState } from "react";
import {
  Download,
  Video,
  Music,
  Image as ImageIcon,
  FileDown,
  ChevronDown,
  User,
} from "lucide-react";
import type { NormalizedData, NormalizedMedia } from "@/lib/normalize";

// Download gambar via blob agar tersimpan dengan nama file rapi
async function downloadImage(url: string, platform: string, index: number) {
  const shortId = Math.random().toString(36).slice(2, 7);
  const filename = `taosite_${platform}_photo_${index}_${shortId}.jpg`;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank");
  }
}

const typeConfig: Record<
  string,
  { label: string; icon: typeof Video; badge: string }
> = {
  video: { label: "Video", icon: Video, badge: "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300" },
  audio: { label: "Audio", icon: Music, badge: "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300" },
  image: { label: "Foto", icon: ImageIcon, badge: "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300" },
  file: { label: "File", icon: FileDown, badge: "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300" },
};

function MediaCard({
  item,
  index,
  platform,
}: {
  item: NormalizedMedia;
  index: number;
  platform: string;
}) {
  const cfg = typeConfig[item.type] || typeConfig.file;
  const Icon = cfg.icon;

  if (item.type === "image") {
    return (
      <div className="flex-none w-[180px] snap-start neo-card overflow-hidden flex flex-col">
        <div className="relative aspect-[3/4] bg-black/5 dark:bg-white/10">
          <img
            src={item.url}
            alt={`Media ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
            #{index + 1}
          </span>
        </div>
        <div className="p-2 mt-auto">
          <button
            onClick={() => downloadImage(item.url, platform, index + 1)}
            className="neo-btn bg-[#18181b] dark:bg-[var(--neo-card-bg)] text-white dark:text-[var(--neo-foreground, #e4e4e7)] py-2 w-full font-mono font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-800"
          >
            <ImageIcon className="size-3" /> Download
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 neo-border rounded-lg bg-[var(--neo-page-bg)]">
      <div
        className={`shrink-0 size-10 rounded-lg neo-border flex items-center justify-center ${cfg.badge}`}
      >
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono font-bold text-sm truncate">
          {cfg.label} {item.quality ? `· ${item.quality}` : ""}
        </div>
        <div className="font-mono text-xs truncate" style={{ color: "var(--neo-muted-text)" }}>
          {item.label || item.url.slice(0, 60)}
        </div>
      </div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="neo-btn shrink-0 bg-[#18181b] text-white px-4 py-2 font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-gray-800"
      >
        <Download className="size-3.5" />
        Download
      </a>
    </div>
  );
}

export default function ResultView({
  data,
  platform,
  engineLabel,
}: {
  data: NormalizedData;
  platform: string;
  engineLabel: string;
}) {
  const [showRaw, setShowRaw] = useState(false);

  const groups: Record<string, NormalizedMedia[]> = {};
  for (const m of data.medias) {
    (groups[m.type] ||= []).push(m);
  }

  const order = ["video", "audio", "image", "file"];
  const noMedia = data.medias.length === 0;

  return (
    <div className="neo-card p-5 sm:p-6 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200 dark:border-zinc-700 mb-4 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono font-bold text-sm">Hasil</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold neo-border bg-[var(--neo-page-bg)] shrink-0">
            {engineLabel}
          </span>
        </div>
        <span className="text-xs px-3 py-1 rounded-full font-mono font-bold neo-border bg-[var(--neo-page-bg)] shrink-0">
          {data.medias.length} Media
        </span>
      </div>

      {/* Info: title / author / thumbnail */}
      {(data.title || data.thumbnail || data.author) && (
        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          {data.thumbnail && (
            <div className="w-full sm:w-40 shrink-0">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden neo-border">
                <img
                  src={data.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
            {data.title && (
              <h4 className="font-mono font-bold text-sm sm:text-base leading-snug line-clamp-3">
                {data.title}
              </h4>
            )}
            {data.author && (
              <p className="font-mono text-xs flex items-center gap-1.5" style={{ color: "var(--neo-muted-text)" }}>
                <User className="size-3.5 shrink-0" />
                {data.author}
              </p>
            )}
            {data.info.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {data.info.map((i) => (
                  <span
                    key={i.label}
                    className="text-[10px] px-2 py-0.5 rounded-full font-mono neo-border bg-[var(--neo-page-bg)]"
                  >
                    {i.label}: {i.value}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Media groups */}
      {noMedia && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950 border-2 border-amber-300 dark:border-amber-700 rounded-xl text-center font-mono text-sm text-amber-700 dark:text-amber-300 mb-4">
          Engine merespons, tapi tidak ada media yang bisa diekstrak. Cek detail
          JSON di bawah atau coba engine lain.
        </div>
      )}

      <div className="flex flex-col gap-4">
        {order.map((type) => {
          const items = groups[type];
          if (!items || items.length === 0) return null;
          const cfg = typeConfig[type];
          const Icon = cfg.icon;
          return (
            <div key={type} className="flex flex-col gap-3">
              <h4 className="font-mono font-bold text-sm flex items-center gap-2">
                <Icon className="size-4" />
                {cfg.label}
                <span className="font-normal" style={{ color: "var(--neo-muted-text)" }}>
                  ({items.length})
                </span>
              </h4>
              {type === "image" && items.length > 1 ? (
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory py-1 -mx-1 px-1">
                  {items.map((item, i) => (
                    <MediaCard key={item.url} item={item} index={i} platform={platform} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {items.map((item, i) => (
                    <MediaCard
                      key={item.url}
                      item={item}
                      index={type === "image" ? i : i}
                      platform={platform}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Raw JSON */}
      <div className="mt-5">
        <button
          onClick={() => setShowRaw((v) => !v)}
          className="neo-btn w-full px-4 py-2 font-mono text-xs bg-[var(--neo-card-bg)] flex items-center justify-center gap-2 hover:opacity-80"
        >
          <ChevronDown
            className={`size-4 transition-transform ${showRaw ? "rotate-180" : ""}`}
          />
          {showRaw ? "Sembunyikan" : "Lihat"} Detail JSON
        </button>
        {showRaw && (
          <pre className="mt-3 p-4 neo-border rounded-lg bg-[var(--neo-page-bg)] text-[10px] sm:text-xs font-mono overflow-auto max-h-80 chat-scroll whitespace-pre-wrap break-all">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
