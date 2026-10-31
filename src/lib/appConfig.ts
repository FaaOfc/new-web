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
  /** Ikon kartu */
  icon: "smartphone" | "monitor" | "apple" | "terminal";
  /** true = kartu ditandai "Rekomendasi" */
  featured?: boolean;
  /** Catatan singkat per platform (opsional) */
  note?: string;
}

export const appInfo = {
  appName: "TaoSite App",
  tagline: "TaoSite dalam genggaman — downloader, CDN & short URL langsung dari HP.",
  latestVersion: "1.0.0",
  lastUpdated: "2026-10-30",
  /** Link unduhan utama (dipakai tombol besar di hero). Kosongkan bila belum ada. */
  primaryUrl: "",
};

export const appDownloads: AppDownload[] = [
  {
    id: "android",
    platform: "Android",
    version: "1.0.0",
    size: "± 24 MB",
    requirements: "Android 8.0+",
    url: "",
    icon: "smartphone",
    featured: true,
    note: "Versi APK langsung — izinkan instalasi dari sumber tidak dikenal.",
  },
  {
    id: "windows",
    platform: "Windows",
    version: "1.0.0",
    size: "± 64 MB",
    requirements: "Windows 10/11 64-bit",
    url: "",
    icon: "monitor",
    note: "Installer .exe untuk PC dan laptop.",
  },
  {
    id: "ios",
    platform: "iOS",
    version: "-",
    size: "-",
    requirements: "iOS 15+",
    url: "",
    icon: "apple",
    note: "Segera hadir di App Store.",
  },
];
