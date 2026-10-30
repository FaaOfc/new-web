import type { Metadata } from "next";
import {
  Smartphone,
  Monitor,
  Apple,
  Terminal,
  Download,
  CheckCircle2,
  PackageOpen,
  Clock,
} from "lucide-react";
import { appDownloads, appInfo, type AppDownload } from "@/lib/appConfig";

export const metadata: Metadata = {
  title: "Unduh Versi Aplikasi — TaoSite",
  description:
    "Unduh aplikasi TaoSite untuk Android, Windows, macOS, dan Linux.",
};

const iconMap = {
  smartphone: Smartphone,
  monitor: Monitor,
  apple: Apple,
  terminal: Terminal,
};

function DownloadCard({ app }: { app: AppDownload }) {
  const Icon = iconMap[app.icon] || Smartphone;
  const available = !!app.url && app.url !== "#";

  return (
    <div className="neo-card p-5 sm:p-6 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="neo-border rounded-xl p-3"
          style={{ backgroundColor: "#f9731618" }}
        >
          <Icon className="size-6 text-orange-500" />
        </div>
        {app.featured && (
          <span className="text-[10px] px-2.5 py-1 rounded-full font-mono font-bold neo-border bg-orange-500 text-white">
            Rekomendasi
          </span>
        )}
      </div>

      {/* Title + version */}
      <h3 className="font-mono font-bold text-lg">{app.platform}</h3>
      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono neo-border bg-[var(--neo-page-bg)]">
          v{app.version}
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono neo-border bg-[var(--neo-page-bg)]">
          {app.size}
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono neo-border bg-[var(--neo-page-bg)]">
          {app.requirements}
        </span>
      </div>

      {app.note && (
        <p className="font-mono text-xs mb-4" style={{ color: "var(--neo-muted-text)" }}>
          {app.note}
        </p>
      )}

      {/* Action */}
      <div className="mt-auto">
        {available ? (
          <a
            href={app.url}
            className="neo-btn w-full py-3 px-4 font-mono font-bold text-sm flex items-center justify-center gap-2 bg-orange-500 text-white border-orange-600 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--neo-shadow-color)] transition-all"
          >
            <Download className="size-4" />
            Unduh untuk {app.platform}
          </a>
        ) : (
          <div className="w-full py-3 px-4 font-mono font-bold text-sm flex items-center justify-center gap-2 neo-border rounded-md bg-[var(--neo-page-bg)] opacity-70 cursor-not-allowed">
            <Clock className="size-4" />
            Belum Tersedia
          </div>
        )}
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] py-8 sm:py-14 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center neo-border rounded-xl p-3 bg-orange-50 dark:bg-orange-950 mb-4">
            <PackageOpen className="size-8 text-orange-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-2">
            Unduh Versi Aplikasi
          </h1>
          <p
            className="text-sm font-mono max-w-md mx-auto"
            style={{ color: "var(--neo-muted-text)" }}
          >
            {appInfo.tagline}
          </p>
          <div className="inline-flex items-center gap-2 neo-btn px-4 py-1.5 bg-[var(--neo-card-bg)] text-sm font-mono mt-4">
            <CheckCircle2 className="size-4 text-green-500" />
            Versi terbaru: v{appInfo.latestVersion}
          </div>
        </div>

        {/* Download grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {appDownloads.map((app) => (
            <DownloadCard key={app.id} app={app} />
          ))}
        </div>

        {/* Info box */}
        <div className="neo-card p-5">
          <h4 className="font-mono font-bold text-sm mb-2 flex items-center gap-2">
            <Terminal className="size-4 text-orange-500" />
            Catatan Instalasi
          </h4>
          <ul
            className="font-mono text-xs space-y-1.5 leading-relaxed list-disc pl-4"
            style={{ color: "var(--neo-muted-text)" }}
          >
            <li>
              Android: file APK diunduh langsung — aktifkan &quot;Instal aplikasi
              dari sumber tidak dikenal&quot; saat pertama kali memasang.
            </li>
            <li>
              Windows: jika muncul peringatan SmartScreen, pilih
              &quot;More info&quot; → &quot;Run anyway&quot;.
            </li>
            <li>
              Link unduhan aplikasi dikelola lewat file{" "}
              <code className="px-1 py-0.5 neo-border rounded bg-[var(--neo-page-bg)]">
                src/lib/appConfig.ts
              </code>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
