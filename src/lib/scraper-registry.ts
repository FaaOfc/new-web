// ============================================================
// Registry Scraper — TaoSite
// Semua engine diambil dari library @coflyn/scrapr (vendor/scrapr).
// Kategori yang dikecualikan: bandcamp, applemusic, bilibili, rednote.
// ============================================================

export interface EngineParam {
  name: string;
  values: string[];
  default: string;
}

export interface EngineDef {
  /** key module di dalam kategori scrapr, contoh: scrapr.instagram.snapsave */
  key: string;
  /** label tampil di UI */
  label: string;
  /** catatan singkat engine (opsional) */
  note?: string;
  /** parameter tambahan (mis. format mp4/mp3) */
  params?: EngineParam[];
}

export interface CategoryDef {
  /** slug URL, contoh /igdl/snapsave */
  slug: string;
  /** nama folder di scrapr/lib */
  libKey: string;
  label: string;
  subtitle: string;
  description: string;
  /** warna aksen kategori (hex) */
  color: string;
  /** nama ikon lucide-react */
  icon: string;
  /** placeholder input URL */
  placeholder: string;
  /** contoh URL untuk tombol "Coba contoh" */
  example?: string;
  /** engine default jika user buka /<slug> tanpa sub */
  defaultEngine: string;
  engines: EngineDef[];
}

export const categories: CategoryDef[] = [
  {
    slug: "ttdl",
    libKey: "tiktok",
    label: "TikTok",
    subtitle: "Downloader TikTok",
    description:
      "Unduh video TikTok tanpa watermark, photo slide, dan audio MP3. Pilih engine di bawah jika satu engine sedang bermasalah.",
    color: "#0d9488",
    icon: "Music2",
    placeholder: "https://www.tiktok.com/@username/video/xxxxx",
    example: "https://www.tiktok.com/@tiktok/video/7106594312292453675",
    defaultEngine: "tikdownloader",
    engines: [
      { key: "tikdownloader", label: "TikDownloader" },
      { key: "snaptik", label: "SnapTik" },
      { key: "ssstik", label: "SSSTik" },
      { key: "savetik", label: "SaveTik", note: "Butuh Chrome (puppeteer)" },
      { key: "tiktokio", label: "TikTokIO" },
    ],
  },
  {
    slug: "igdl",
    libKey: "instagram",
    label: "Instagram",
    subtitle: "Downloader Instagram",
    description:
      "Unduh Reels, video post, foto, dan carousel Instagram. Mendukung banyak engine — ganti via tab di bawah.",
    color: "#be123c",
    icon: "Camera",
    placeholder: "https://www.instagram.com/reel/xxxxx",
    defaultEngine: "snapsave",
    engines: [
      { key: "snapsave", label: "SnapSave" },
      { key: "snapinsta", label: "SnapInsta", note: "Butuh Chrome (playwright)" },
      { key: "indown", label: "InDown" },
      { key: "direct", label: "Direct" },
    ],
  },
  {
    slug: "fbdl",
    libKey: "facebook",
    label: "Facebook",
    subtitle: "Downloader Facebook",
    description:
      "Unduh video Facebook dengan pilihan kualitas SD atau HD langsung dari link post/reel.",
    color: "#2563eb",
    icon: "Monitor",
    placeholder: "https://www.facebook.com/watch?v=xxxxx",
    defaultEngine: "snapsave",
    engines: [
      { key: "snapsave", label: "SnapSave" },
      { key: "fdown", label: "FDown", note: "Butuh Chrome (puppeteer)" },
    ],
  },
  {
    slug: "twdl",
    libKey: "twitter",
    label: "Twitter / X",
    subtitle: "Downloader Twitter / X",
    description:
      "Unduh video & gambar dari tweet. Paste URL tweet yang ingin diunduh.",
    color: "#64748b",
    icon: "Twitter",
    placeholder: "https://x.com/username/status/xxxxx",
    defaultEngine: "savetwt",
    engines: [
      { key: "savetwt", label: "SaveTWT" },
      { key: "direct", label: "Direct" },
      { key: "tvd", label: "TVD" },
      { key: "tweeload", label: "Tweeload" },
    ],
  },
  {
    slug: "ytdl",
    libKey: "youtube",
    label: "YouTube",
    subtitle: "Downloader YouTube",
    description:
      "Unduh video YouTube (MP4) atau konversi ke audio (MP3), serta seluruh video dalam sebuah playlist.",
    color: "#dc2626",
    icon: "Youtube",
    placeholder: "https://www.youtube.com/watch?v=xxxxx",
    defaultEngine: "ytmp3gg",
    engines: [
      { key: "ytmp3gg", label: "YTMP3 GG" },
      {
        key: "ytmp3",
        label: "YTMP3",
        params: [
          {
            name: "format",
            values: ["mp4", "mp3"],
            default: "mp4",
          },
        ],
      },
      { key: "playlist", label: "Playlist" },
    ],
  },
  {
    slug: "pindl",
    libKey: "pinterest",
    label: "Pinterest",
    subtitle: "Downloader Pinterest",
    description: "Unduh gambar & video pin Pinterest dalam kualitas asli.",
    color: "#e11d48",
    icon: "Pin",
    placeholder: "https://id.pinterest.com/pin/xxxxx",
    defaultEngine: "pindown",
    engines: [
      { key: "pindown", label: "PinDown" },
      { key: "direct", label: "Direct" },
    ],
  },
  {
    slug: "threaddl",
    libKey: "threads",
    label: "Threads",
    subtitle: "Downloader Threads",
    description: "Unduh gambar & video dari post Threads (meta threads.net).",
    color: "#374151",
    icon: "AtSign",
    placeholder: "https://www.threads.net/@username/post/xxxxx",
    defaultEngine: "threadster",
    engines: [{ key: "threadster", label: "Threadster" }],
  },
  {
    slug: "reddl",
    libKey: "reddit",
    label: "Reddit",
    subtitle: "Downloader Reddit",
    description: "Unduh video, gambar, dan media dari post Reddit.",
    color: "#ea580c",
    icon: "MessagesSquare",
    placeholder: "https://www.reddit.com/r/sub/comments/xxxxx",
    defaultEngine: "rapidsave",
    engines: [{ key: "rapidsave", label: "RapidSave" }],
  },
  {
    slug: "teraboxdl",
    libKey: "terabox",
    label: "Terabox",
    subtitle: "Downloader Terabox",
    description: "Ambil direct link file dari share link Terabox.",
    color: "#0891b2",
    icon: "CloudDownload",
    placeholder: "https://1024terabox.com/s/xxxxx",
    defaultEngine: "sechno",
    engines: [{ key: "sechno", label: "Sechno" }],
  },
  {
    slug: "scdl",
    libKey: "soundcloud",
    label: "SoundCloud",
    subtitle: "Downloader SoundCloud",
    description: "Unduh lagu/audio dari SoundCloud menjadi file MP3.",
    color: "#f97316",
    icon: "AudioWaveform",
    placeholder: "https://soundcloud.com/artist/lagu",
    defaultEngine: "klickaud",
    engines: [{ key: "klickaud", label: "KlickAud" }],
  },
  {
    slug: "douyindl",
    libKey: "douyin",
    label: "Douyin",
    subtitle: "Downloader Douyin",
    description: "Unduh video Douyin (TikTok China) tanpa watermark.",
    color: "#06b6d4",
    icon: "Video",
    placeholder: "https://v.douyin.com/xxxxx",
    defaultEngine: "direct",
    engines: [{ key: "direct", label: "Direct" }],
  },
  {
    slug: "pixivdl",
    libKey: "pixiv",
    label: "Pixiv",
    subtitle: "Downloader Pixiv",
    description:
      "Unduh artwork/single image atau semua gambar dalam satu post manga Pixiv.",
    color: "#0284c7",
    icon: "Brush",
    placeholder: "https://www.pixiv.net/en/artworks/xxxxx",
    defaultEngine: "ajax",
    engines: [{ key: "ajax", label: "Pixiv Ajax" }],
  },
  {
    slug: "spdl",
    libKey: "spotify",
    label: "Spotify",
    subtitle: "Downloader Spotify",
    description:
      "Unduh lagu Spotify (MP3 320kbps) dari link track, album, atau playlist.",
    color: "#16a34a",
    icon: "Disc3",
    placeholder: "https://open.spotify.com/track/xxxxx",
    defaultEngine: "spotidown",
    engines: [
      { key: "spotidown", label: "SpotiDown" },
      { key: "spotmate", label: "SpotMate" },
      { key: "soundloaders", label: "SoundLoaders" },
      { key: "spotisaver", label: "Spotisaver" },
    ],
  },
  {
    slug: "animedl",
    libKey: "anime",
    label: "Anime",
    subtitle: "Downloader Anime",
    description:
      "Ambil link download episode anime dari Otakudesu, Nimegami, Gogoanime, dan Animetosho. Bisa pakai URL series — episode terakhir otomatis dipilih.",
    color: "#a855f7",
    icon: "Tv",
    placeholder: "https://otakudesu.blog/anime/xxx/episode-xxx/",
    defaultEngine: "otakudesu",
    engines: [
      { key: "otakudesu", label: "Otakudesu" },
      { key: "nimegami", label: "Nimegami" },
      { key: "gogoanime", label: "Gogoanime" },
      { key: "animetosho", label: "Animetosho" },
    ],
  },
  {
    slug: "komikdl",
    libKey: "comic",
    label: "Komik",
    subtitle: "Downloader Komik",
    description:
      "Unduh semua halaman gambar dari satu chapter komik. Bisa pakai URL series — chapter terakhir otomatis dipilih.",
    color: "#f59e0b",
    icon: "BookOpen",
    placeholder: "https://komikcast.info/manga-xxx/chapter-xxx/",
    defaultEngine: "komikcast",
    engines: [
      { key: "komikcast", label: "KomikCast" },
      { key: "kiryuu", label: "Kiryuu" },
      { key: "komiku", label: "Komiku" },
      { key: "mangadex", label: "MangaDex" },
      { key: "komikindo", label: "Komikindo" },
      { key: "bacakomik", label: "BacaKomik" },
      { key: "manhwaindo", label: "ManhuaIndo" },
      { key: "asurascans", label: "Asura Scans" },
      { key: "mangabats", label: "Mangabats" },
    ],
  },
  {
    slug: "resolver",
    libKey: "resolver",
    label: "Resolver Link",
    subtitle: "Direct link & unshortener",
    description:
      "Ubah link jadi direct link: Sfile, Mediafire, Google Drive, Pixeldrain, Catbox, Doodstream, dan lainnya. Bisa juga membuka safelink & shortlink.",
    color: "#8b5cf6",
    icon: "Link2",
    placeholder: "https://sfile.mobi/xxxxx",
    defaultEngine: "sfile",
    engines: [
      { key: "sfile", label: "Sfile" },
      { key: "mediafire", label: "MediaFire" },
      { key: "safelinku", label: "SafelinkU" },
      { key: "pixeldrain", label: "Pixeldrain" },
      { key: "catbox", label: "Catbox" },
      { key: "krakenfiles", label: "Krakenfiles" },
      { key: "doodstream", label: "Doodstream" },
      { key: "gdrive", label: "Google Drive" },
      { key: "sub2unlock", label: "Sub2Unlock" },
      { key: "rekonise", label: "Rekonise" },
      { key: "unshorten", label: "Unshorten" },
    ],
  },
];

export function getCategory(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getEngine(
  cat: CategoryDef,
  key: string
): EngineDef | undefined {
  return cat.engines.find((e) => e.key === key);
}

export function categoryByLib(libKey: string): CategoryDef | undefined {
  return categories.find((c) => c.libKey === libKey);
}
