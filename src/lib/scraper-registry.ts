// ============================================================
// SCRAPER REGISTRY — TaoSite
// ------------------------------------------------------------
// Sumber engine: @coflyn/scrapr (vendored di /vendor/scrapr)
// Kategori dikecualikan sesuai permintaan: bandcamp,
// applemusic, bilibili, rednote.
// Slug kategori dipakai sebagai path URL situs:
//   /<kategori>/<engine>  contoh: /igdl/snapsave
// API: /api/dl/<kategori>/<engine>?url=<url>
// ============================================================

export interface ScraprEngine {
  /** Slug engine untuk URL, contoh: "snapsave" */
  slug: string;
  /** Nama folder engine di vendor/scrapr/lib/<kategori>/ */
  name: string;
  /** Deskripsi singkat engine (id) */
  desc: string;
}

export interface ScraprCategory {
  /** Slug kategori untuk URL, contoh: "igdl" */
  slug: string;
  /** Nama folder kategori di vendor/scrapr/lib/ */
  dir: string;
  label: string;
  /** Deskripsi singkat kategori (id) */
  desc: string;
  /** Nama ikon lucide-react (di-map di komponen) */
  icon: string;
  /** Warna aksen kategori (hex) */
  color: string;
  engines: ScraprEngine[];
}

export const scraprCategories: ScraprCategory[] = [
  {
    slug: "ttdl",
    dir: "tiktok",
    label: "TikTok",
    desc: "Video TikTok tanpa watermark, audio MP3, photo slide & carousel.",
    icon: "music",
    color: "#0d9488",
    engines: [
      { slug: "tikdownloader", name: "tikdownloader", desc: "Download video TikTok HD tanpa watermark" },
      { slug: "snaptik", name: "snaptik", desc: "Server Snaptik — video HD & MP3" },
      { slug: "ssstik", name: "ssstik", desc: "Server SSSTik — video, audio & slideshow" },
      { slug: "savetik", name: "savetik", desc: "Server Savetik — video & MP3" },
      { slug: "tiktokio", name: "tiktokio", desc: "Server TikTokIO — video tanpa watermark" },
    ],
  },
  {
    slug: "igdl",
    dir: "instagram",
    label: "Instagram",
    desc: "Reels, post video, foto single & carousel Instagram.",
    icon: "camera",
    color: "#be123c",
    engines: [
      { slug: "snapsave", name: "snapsave", desc: "Server SnapSave — reels, video & carousel" },
      { slug: "snapinsta", name: "snapinsta", desc: "Server SnapInsta — reels & post" },
      { slug: "indown", name: "indown", desc: "Server InDown — video & foto" },
      { slug: "direct", name: "direct", desc: "Ekstraksi langsung tanpa server pihak ketiga" },
    ],
  },
  {
    slug: "fbdl",
    dir: "facebook",
    label: "Facebook",
    desc: "Video Facebook kualitas SD & HD.",
    icon: "facebook",
    color: "#2563eb",
    engines: [
      { slug: "snapsave", name: "snapsave", desc: "Server SnapSave — video SD & HD" },
      { slug: "fdown", name: "fdown", desc: "Server FDown — video SD & HD" },
    ],
  },
  {
    slug: "twdl",
    dir: "twitter",
    label: "Twitter / X",
    desc: "Video & gambar dari Twitter / X.",
    icon: "twitter",
    color: "#111827",
    engines: [
      { slug: "savetwt", name: "savetwt", desc: "Server SaveTwt — video & gambar" },
      { slug: "direct", name: "direct", desc: "Ekstraksi langsung dari halaman tweet" },
      { slug: "tvd", name: "tvd", desc: "Server TVD — video Twitter" },
      { slug: "tweeload", name: "tweeload", desc: "Server Tweeload — video & gambar" },
    ],
  },
  {
    slug: "ytdl",
    dir: "youtube",
    label: "YouTube",
    desc: "Video & audio YouTube — MP4, MP3, sampai playlist.",
    icon: "youtube",
    color: "#dc2626",
    engines: [
      { slug: "ytmp3gg", name: "ytmp3gg", desc: "Server YTMP3GG — video & audio" },
      { slug: "ytmp3", name: "ytmp3", desc: "Konversi YouTube ke MP4 / MP3 (pilih format)" },
      { slug: "playlist", name: "playlist", desc: "Ambil seluruh item dari playlist YouTube" },
    ],
  },
  {
    slug: "pindl",
    dir: "pinterest",
    label: "Pinterest",
    desc: "Gambar & video Pinterest kualitas asli.",
    icon: "image",
    color: "#e60023",
    engines: [
      { slug: "pindown", name: "pindown", desc: "Server PinDown — gambar & video" },
      { slug: "direct", name: "direct", desc: "Ekstraksi langsung tanpa server pihak ketiga" },
    ],
  },
  {
    slug: "threaddl",
    dir: "threads",
    label: "Threads",
    desc: "Video & gambar dari Threads.",
    icon: "at-sign",
    color: "#0f172a",
    engines: [
      { slug: "threadster", name: "threadster", desc: "Server Threadster — media Threads" },
    ],
  },
  {
    slug: "reddl",
    dir: "reddit",
    label: "Reddit",
    desc: "Video & gambar Reddit (RapidSave).",
    icon: "message-square",
    color: "#ff4500",
    engines: [
      { slug: "rapidsave", name: "rapidsave", desc: "Server RapidSave — video + audio Reddit" },
    ],
  },
  {
    slug: "teraboxdl",
    dir: "terabox",
    label: "Terabox",
    desc: "Unduh file langsung dari Terabox.",
    icon: "hard-drive",
    color: "#0ea5e9",
    engines: [
      { slug: "sechno", name: "sechno", desc: "Server Sechno — direct link Terabox" },
    ],
  },
  {
    slug: "scdl",
    dir: "soundcloud",
    label: "SoundCloud",
    desc: "Audio MP3 dari SoundCloud.",
    icon: "cloud",
    color: "#ff5500",
    engines: [
      { slug: "klickaud", name: "klickaud", desc: "Server KlickAud — MP3 128kbps" },
    ],
  },
  {
    slug: "douyindl",
    dir: "douyin",
    label: "Douyin",
    desc: "Video & gambar Douyin tanpa watermark.",
    icon: "music-3",
    color: "#22c55e",
    engines: [
      { slug: "direct", name: "direct", desc: "Ekstraksi langsung — video, foto & musik" },
    ],
  },
  {
    slug: "pixivdl",
    dir: "pixiv",
    label: "Pixiv",
    desc: "Ilustrasi, manga & ugoira Pixiv.",
    icon: "palette",
    color: "#0096fa",
    engines: [
      { slug: "ajax", name: "ajax", desc: "Ekstraksi via API Ajax Pixiv" },
    ],
  },
  {
    slug: "spdl",
    dir: "spotify",
    label: "Spotify",
    desc: "Track & playlist Spotify menjadi MP3.",
    icon: "audio-lines",
    color: "#1db954",
    engines: [
      { slug: "spotidown", name: "spotidown", desc: "Server SpotiDown — MP3 per track" },
      { slug: "spotmate", name: "spotmate", desc: "Server SpotMate — track & playlist" },
      { slug: "soundloaders", name: "soundloaders", desc: "Server SoundLoaders — MP3" },
      { slug: "spotisaver", name: "spotisaver", desc: "Server Spotisaver — MP3" },
    ],
  },
  {
    slug: "animedl",
    dir: "anime",
    label: "Anime",
    desc: "Episode & batch anime dari situs streaming favorit.",
    icon: "play",
    color: "#a855f7",
    engines: [
      { slug: "otakudesu", name: "otakudesu", desc: "OtakuDesu — episode & download link" },
      { slug: "nimegami", name: "nimegami", desc: "NimeGami — episode multi-server" },
      { slug: "gogoanime", name: "gogoanime", desc: "GogoAnime — episode multi-kualitas" },
      { slug: "animetosho", name: "animetosho", desc: "AnimeTosho — episode / batch torrent & magnet" },
    ],
  },
  {
    slug: "komikdl",
    dir: "comic",
    label: "Komik",
    desc: "Chapter komik, manga & manhwa per halaman gambar.",
    icon: "book-open",
    color: "#f59e0b",
    engines: [
      { slug: "komikcast", name: "komikcast", desc: "KomikCast — chapter per gambar" },
      { slug: "kiryuu", name: "kiryuu", desc: "Kiryuu — chapter per gambar" },
      { slug: "komiku", name: "komiku", desc: "Komiku — chapter per gambar" },
      { slug: "mangadex", name: "mangadex", desc: "MangaDex — chapter via API resmi" },
      { slug: "komikindo", name: "komikindo", desc: "KomikIndo — chapter per gambar" },
      { slug: "bacakomik", name: "bacakomik", desc: "BacaKomik — chapter per gambar" },
      { slug: "manhwaindo", name: "manhwaindo", desc: "ManhwaIndo — chapter per gambar" },
      { slug: "asurascans", name: "asurascans", desc: "AsuraScans — chapter per gambar" },
      { slug: "mangabats", name: "mangabats", desc: "MangaBats — chapter per gambar" },
    ],
  },
  {
    slug: "resolver",
    dir: "resolver",
    label: "Resolver Link",
    desc: "Bypass shortlink & dapatkan direct link asli.",
    icon: "link-2",
    color: "#6b7280",
    engines: [
      { slug: "sfile", name: "sfile", desc: "Direct link Sfile.mobi" },
      { slug: "mediafire", name: "mediafire", desc: "Direct link MediaFire" },
      { slug: "safelinku", name: "safelinku", desc: "Bypass SafelinkU" },
      { slug: "pixeldrain", name: "pixeldrain", desc: "Direct link Pixeldrain" },
      { slug: "catbox", name: "catbox", desc: "Direct link Catbox" },
      { slug: "krakenfiles", name: "krakenfiles", desc: "Direct link KrakenFiles" },
      { slug: "doodstream", name: "doodstream", desc: "Direct link DoodStream" },
      { slug: "gdrive", name: "gdrive", desc: "Direct link Google Drive" },
      { slug: "sub2unlock", name: "sub2unlock", desc: "Bypass Sub2Unlock" },
      { slug: "rekonise", name: "rekonise", desc: "Bypass Rekonise" },
      { slug: "unshorten", name: "unshorten", desc: "Unshorten URL apa pun (follow redirect)" },
    ],
  },
];

export const totalEngineCount = scraprCategories.reduce(
  (acc, cat) => acc + cat.engines.length,
  0
);

/** Cari kategori berdasarkan slug situs (mis. "igdl") */
export function findCategory(slug: string): ScraprCategory | undefined {
  return scraprCategories.find((c) => c.slug === slug);
}

/** Cari engine dalam sebuah kategori */
export function findEngine(
  categorySlug: string,
  engineSlug: string
): { category: ScraprCategory; engine: ScraprEngine } | undefined {
  const category = findCategory(categorySlug);
  if (!category) return undefined;
  const engine = category.engines.find((e) => e.slug === engineSlug);
  if (!engine) return undefined;
  return { category, engine };
}
