// ============================================================
// KONFIGURASI UNDUH VERSI APLIKASI — TaoSite
// ------------------------------------------------------------
// Ubah link unduhan aplikasi di file INI SAJA (tidak perlu
// menyentuh kode halaman). Nilai `url` kosong (""), null, atau
// "#" akan otomatis ditampilkan sebagai "Belum tersedia".
// ============================================================

export interface AppDownload {
  id: string;
  /** Nama platform, contoh: Android, Windows */
  platform: string;
  /** Versi aplikasi saat ini */
  version: string;
  /** Ukuran file (perkiraan), tampil di kartu */
  size: string;
  /** Syarat minimum, contoh: "Android 8.0+" */
  requirements: string;
  /**
   * LINK UNDUH — GANTI DI SINI.
   * Contoh: "https://cdn.taosite.my.id/app/taosite-v1.0.0.apk"
   * Kosongkan ("") bila belum ada → tombol nonaktif.
   */
  url: string;
  /** Nama ikon lucide yang dipakai di kartu */
  icon: "smartphone" | "monitor" | "apple" | "terminal";
  /** true = kartu ditandai "Rekomendasi" */
  featured?: boolean;
  /** Catatan singkat per platform (opsional) */
  note?: string;
}

export const appInfo = {
  appName: "TaoSite App",
  tagline:
    "Akses semua fitur TaoSite langsung dari HP — downloader, CDN, dan short URL dalam satu aplikasi.",
  latestVersion: "1.0.0",
  updatedAt: "2026-10-30",
};

export const appDownloads: AppDownload[] = [
  {
    id: "android",
    platform: "Android",
    version: "1.0.0",
    size: "~25 MB",
    requirements: "Android 8.0+",
    // TODO: taruh link APK di sini, contoh: "/app/taosite-1.0.0.apk"
    url: "",
    icon: "smartphone",
    featured: true,
    note: "Versi APK langsung — izinkan instalasi dari sumber tidak dikenal.",
  },
  {
    id: "windows",
    platform: "Windows",
    version: "1.0.0",
    size: "~60 MB",
    requirements: "Windows 10/11 64-bit",
    // TODO: taruh link installer .exe di sini
    url: "",
    icon: "monitor",
    note: "Installer offline untuk Windows 10 dan 11.",
  },
  {
    id: "macos",
    platform: "macOS",
    version: "1.0.0",
    size: "~70 MB",
    requirements: "macOS 12+",
    // TODO: taruh link .dmg di sini
    url: "",
    icon: "apple",
  },
  {
    id: "linux",
    platform: "Linux",
    version: "1.0.0",
    size: "~55 MB",
    requirements: "Ubuntu 20.04+ / Debian",
    // TODO: taruh link .deb atau .AppImage di sini
    url: "",
    icon: "terminal",
    note: "Tersedia dalam format .deb dan .AppImage.",
  },
];
