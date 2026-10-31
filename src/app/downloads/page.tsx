import type { Metadata } from "next";
import {
  Smartphone,
  Monitor,
  Apple,
  Terminal,
  Download,
  Package,
  RefreshCw,
  Info,
} from "lucide-react";
import { appInfo, appDownloads } from "@/lib/appConfig";

export const metadata: Metadata = {
  title: "Unduh Versi Aplikasi — TaoSite",
  description:
    "Unduh aplikasi TaoSite untuk Android, Windows, dan iOS. Downloader, CDN, dan short URL dalam satu aplikasi.",
};

const ICONS = {
  smartphone: Smartphone,
  monitor: Monitor,
  apple: Apple,
  terminal: Terminal,
} as const;

function isAvailable(url: string) {
  return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
}

export default function DownloadsPage() {
  const anyAvailable =
    appDownloads.some((d) => isAvailable(d.url)) || isAvailable(appInfo.primaryUrl);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 w-full">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center neo-border rounded-xl p-4 bg-orange-50 dark:bg-orange-950 mb-4">
          <Package className="size-8 text-orange-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-2">
          Unduh Versi Aplikasi
        </h1>
        <p className="font-mono text-sm" style={{ color: "var(--neo-muted-text)" }}>
          {appInfo.tagline}
        </p>
        <div
          className="inline-flex items-center gap-2 neo-btn px-3 py-1.5 mt-4 font-mono text-xs"
          style={{ color: "var(--neo-muted-text)" }}
        >
          <RefreshCw className="size-3.5" />
          Versi terbaru: v{appInfo.latestVersion} &middot; update {appInfo.lastUpdated}
        </div>
      </div>

      {/* Tombol unduh utama */}
      {anyAvailable ? (
        <div className="neo-card p-6 sm:p-8 mb-8 text-center bg-orange-50 dark:bg-orange-950/40">
          <h2 className="font-mono font-bold text-lg mb-1">{appInfo.appName}</h2>
          <p className="font-mono text-xs mb-5" style={{ color: "var(--neo-muted-text)" }}>
            Unduhan cepat — rekomendasi untuk platform kamu
          </p>
          <a
            href={appInfo.primaryUrl}
            className="neo-btn inline-flex items-center gap-2 px-6 py-3 font-mono font-bold text-sm bg-orange-500 text-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--neo-shadow-color)] transition-all"
          >
            <Download className="size-4" />
            Unduh Sekarang
          </a>
        </div>
      ) : (
        <div
          className="neo-card p-6 sm:p-8 mb-8 text-center"
          style={{ backgroundColor: "var(--neo-page-bg)" }}
        >
          <div className="inline-flex items-center justify-center neo-border rounded-xl p-3 mb-3 bg-[var(--neo-card-bg)]">
            <Info className="size-6 text-orange-500" />
          </div>
          <h2 className="font-mono font-bold text-base mb-1">Segera Hadir</h2>
          <p
            className="font-mono text-xs max-w-sm mx-auto leading-relaxed"
            style={{ color: "var(--neo-muted-text)" }}
          >
            Versi aplikasi sedang dalam tahap finalisasi. Pantau halaman ini — link
            unduhan akan muncul di sini begitu rilis.
          </p>
        </div>
      )}

      {/* Kartu per platform */}
      <div className="space-y-3">
        {appDownloads.map((app) => {
          const Icon = ICONS[app.icon] ?? Smartphone;
          const available = isAvailable(app.url);
          return (
            <div key={app.id} className="neo-card p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div
                  className="neo-border rounded-lg p-3 shrink-0"
                  style={{ backgroundColor: "#f9731615" }}
                >
                  <Icon className="size-6 text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-mono font-bold text-sm">{app.platform}</h3>
                    {app.featured && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-orange-500 text-white">
                        REKOMENDASI
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs mt-0.5" style={{ color: "var(--neo-muted-text)" }}>
                    v{app.version} &middot; {app.size} &middot; {app.requirements}
                  </p>
                  {app.note && (
                    <p className="font-mono text-[10px] mt-1" style={{ color: "var(--neo-muted-text)" }}>
                      {app.note}
                    </p>
                  )}
                </div>
                {available ? (
                  <a
                    href={app.url}
                    className="neo-btn shrink-0 inline-flex items-center gap-1.5 px-4 py-2 font-mono font-bold text-xs bg-[#18181b] text-white hover:opacity-80"
                  >
                    <Download className="size-3.5" />
                    Unduh
                  </a>
                ) : (
                  <span
                    className="neo-btn shrink-0 inline-flex items-center gap-1.5 px-4 py-2 font-mono font-bold text-xs opacity-50 cursor-not-allowed select-none"
                    style={{ color: "var(--neo-muted-text)" }}
                    aria-disabled
                  >
                    Belum tersedia
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Catatan keamanan */}
      <div className="neo-card p-4 mt-8">
        <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--neo-muted-text)" }}>
          <strong className="text-orange-500">Tips keamanan:</strong> unduh aplikasi
          hanya dari halaman ini. Jika unduhan tidak dimulai otomatis, klik kanan
          tombol unduh lalu pilih &quot;Save link as&quot;.
        </p>
      </div>
    </div>
  );
}
