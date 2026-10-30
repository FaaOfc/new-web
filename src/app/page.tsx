 "use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  UploadCloud,
  Link as LinkIcon,
  Github,
  Palette,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Cloud,
  Zap,
  Shield,
  Globe,
  Music2,
  Camera,
  Monitor,
  Twitter,
  Youtube,
  Disc3,
  Tv,
  BookOpen,
  Link2,
  Smartphone,
  MousePointerClick,
  Server,
  Heart,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import IntroScreen from "@/components/intro";

const iconMap = {
  "upload-cloud": UploadCloud,
  link: LinkIcon,
  github: Github,
  palette: Palette,
  music2: Music2,
  camera: Camera,
  monitor: Monitor,
  twitter: Twitter,
  youtube: Youtube,
  disc3: Disc3,
  tv: Tv,
  bookopen: BookOpen,
  link2: Link2,
  smartphone: Smartphone,
  heart: Heart,
};

const features = [
  {
    id: "cdn",
    title: "CDN Hosting",
    subtitle: "Host any file, any mimetype",
    description:
      "Upload images, videos, documents, executables — anything. Your files are stored on GitHub and served through your own domain with proper MIME types.",
    icon: "upload-cloud" as const,
    color: "#f97316",
  },
  {
    id: "shorturl",
    title: "URL Shortener",
    subtitle: "Shorten any URL instantly",
    description:
      "Transform long URLs into short, shareable links. Optionally customize your short codes. All mappings stored in a GitHub Gist — zero cost.",
    icon: "link" as const,
    color: "#10b981",
  },
  {
    id: "ttdl",
    title: "TikTok Downloader",
    subtitle: "Download video tanpa watermark",
    description:
      "Unduh video TikTok tanpa watermark dalam kualitas HD. 5 engine pilihan: TikDownloader, SnapTik, SSSTik, SaveTik, dan TikTokIO.",
    icon: "music2" as const,
    color: "#0d9488",
  },
  {
    id: "igdl",
    title: "Instagram Downloader",
    subtitle: "Download Reels & Post",
    description:
      "Unduh Reels, video post, foto single & multiple carousel dari Instagram. Cukup paste URL dan langsung download.",
    icon: "camera" as const,
    color: "#be123c",
  },
  {
    id: "fbdl",
    title: "Facebook Downloader",
    subtitle: "Download Video SD & HD",
    description:
      "Unduh video Facebook dengan pilihan kualitas SD atau HD. Cukup paste URL video Facebook dan langsung download.",
    icon: "monitor" as const,
    color: "#2563eb",
  },
  {
    id: "twdl",
    title: "Twitter / X Downloader",
    subtitle: "Download media dari tweet",
    description:
      "Unduh video & gambar dari tweet Twitter / X. 4 engine pilihan: SaveTWT, Direct, TVD, dan Tweeload.",
    icon: "twitter" as const,
    color: "#64748b",
  },
  {
    id: "ytdl",
    title: "YouTube Downloader",
    subtitle: "MP4 & MP3 + Playlist",
    description:
      "Unduh video YouTube dalam bentuk MP4 atau konversi ke MP3. Mendukung juga unduh seluruh video dalam sebuah playlist.",
    icon: "youtube" as const,
    color: "#dc2626",
  },
  {
    id: "spdl",
    title: "Spotify Downloader",
    subtitle: "Download lagu MP3 320kbps",
    description:
      "Unduh lagu dari link Spotify menjadi file MP3 berkualitas tinggi. 4 engine pilihan: SpotiDown, SpotMate, SoundLoaders, Spotisaver.",
    icon: "disc3" as const,
    color: "#16a34a",
  },
  {
    id: "animedl",
    title: "Anime Downloader",
    subtitle: "Otakudesu, Gogoanime & lainnya",
    description:
      "Ambil link download episode anime dari Otakudesu, Nimegami, Gogoanime, dan Animetosho. URL series otomatis diarahkan ke episode terakhir.",
    icon: "tv" as const,
    color: "#a855f7",
  },
  {
    id: "komikdl",
    title: "Komik Downloader",
    subtitle: "9 sumber komik populer",
    description:
      "Unduh semua halaman chapter komik dari KomikCast, Kiryuu, Komiku, MangaDex, Komikindo, dan 4 sumber lainnya.",
    icon: "bookopen" as const,
    color: "#f59e0b",
  },
  {
    id: "resolver",
    title: "Resolver Link",
    subtitle: "Direct link & unshortener",
    description:
      "Ubah link jadi direct link: Sfile, Mediafire, Google Drive, Pixeldrain, dan lainnya. Bisa juga membuka safelink & shortlink.",
    icon: "link2" as const,
    color: "#8b5cf6",
  },
  {
    id: "downloads",
    title: "Unduh Versi Aplikasi",
    subtitle: "TaoSite di HP & desktop",
    description:
      "Akses semua fitur TaoSite langsung dari aplikasi. Tersedia untuk Android, Windows, macOS, dan Linux.",
    icon: "smartphone" as const,
    color: "#0891b2",
  },
];

const routeMap: Record<string, string> = {
  cdn: "/cdn",
  shorturl: "/short",
  ttdl: "/ttdl",
  igdl: "/igdl",
  fbdl: "/fbdl",
  twdl: "/twdl",
  ytdl: "/ytdl",
  spdl: "/spdl",
  animedl: "/animedl",
  komikdl: "/komikdl",
  resolver: "/resolver",
  downloads: "/downloads",
};

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("tao_intro_seen");
    if (!seen) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("tao_intro_seen", "1");
    setShowIntro(false);
    setIntroComplete(true);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = features.length;

  // Smooth fade transition when changing slides
  const goToSlide = useCallback(
    (index: number) => {
      if (index === displayIndex || isTransitioning) return;
      setIsTransitioning(true);
      // Fade out, then swap content, then fade in
      setTimeout(() => {
        setDisplayIndex(index);
        setActiveIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    },
    [displayIndex, isTransitioning]
  );

  const goNext = useCallback(() => {
    goToSlide((displayIndex + 1) % total);
  }, [displayIndex, total, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((displayIndex - 1 + total) % total);
  }, [displayIndex, total, goToSlide]);

  // Auto-play every 10 seconds
  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => {
      goNext();
    }, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, goNext]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      goNext();
    } else if (touchDeltaX.current > threshold) {
      goPrev();
    }
    // Resume auto-play after 5s of no interaction
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Pause auto-play on button click, resume after 5s
  const handleManualNav = (fn: () => void) => {
    setIsPaused(true);
    fn();
    setTimeout(() => setIsPaused(false), 5000);
  };

  const currentFeature = features[displayIndex];
  const CurrentIcon = iconMap[currentFeature.icon];

  return (
    <>
      {/* Intro Splash Screen */}
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}

      <div
        className={`flex flex-col transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20">
        <div className="absolute inset-0 bg-dots opacity-[0.03]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 neo-btn px-4 py-1.5 bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-400 text-sm font-mono mb-6">
              <Zap className="size-4" />
              Open Source &middot; Free Forever
            </div>
            <h1 className="text-4xl sm:text-5xl font-mono font-bold tracking-tight mb-4">
              {siteConfig.siteName}
            </h1>
            <p className="text-base sm:text-lg font-mono max-w-xl mx-auto mb-6" style={{ color: "var(--neo-muted-text)" }}>
              {siteConfig.tagline}. Host files, shorten URLs, dan unduh media dari 16+ platform, all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Features Carousel */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold mb-1">Fitur Lengkap</h2>
              <p className="font-mono text-xs sm:text-sm" style={{ color: "var(--neo-muted-text)" }}>
                {displayIndex + 1} / {total} — Geser atau klik untuk pindah
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleManualNav(goPrev)}
                className="neo-btn p-2 bg-[var(--neo-card-bg)] hover:opacity-80"
                aria-label="Previous"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => handleManualNav(goNext)}
                className="neo-btn p-2 bg-[var(--neo-card-bg)] hover:opacity-80"
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Carousel Card — centered, with fade transition */}
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="transition-opacity duration-300 ease-in-out"
              style={{ opacity: isTransitioning ? 0 : 1 }}
            >
              <div className="neo-card p-6 sm:p-8 max-w-md mx-auto text-center">
                {/* Icon */}
                <div
                  className="neo-border rounded-xl p-3 mx-auto mb-4 w-fit"
                  style={{ backgroundColor: `${currentFeature.color}15` }}
                >
                  <CurrentIcon className="size-6" style={{ color: currentFeature.color }} />
                </div>
                {/* Title */}
                <h3 className="font-mono font-bold text-lg mb-1">{currentFeature.title}</h3>
                <p className="font-mono text-xs mb-3" style={{ color: "var(--neo-muted-text)" }}>
                  {currentFeature.subtitle}
                </p>
                {/* Description */}
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--neo-muted-text)" }}>
                  {currentFeature.description}
                </p>
                {/* CTA Button — centered */}
                <Link
                  href={routeMap[currentFeature.id] || "/"}
                  className="neo-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono font-medium text-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--neo-shadow-color)] transition-all duration-200"
                  style={{
                    backgroundColor: `${currentFeature.color}15`,
                    color: currentFeature.color,
                    borderColor: currentFeature.color,
                  }}
                >
                  Buka {currentFeature.title}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {features.map((f, i) => (
              <button
                key={f.id}
                onClick={() => handleManualNav(() => goToSlide(i))}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 8,
                  backgroundColor: i === activeIndex ? f.color : "var(--neo-border-color)",
                  opacity: i === activeIndex ? 1 : 0.3,
                }}
                aria-label={`Go to ${f.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <Cloud className="size-5" />, label: "Free CDN", desc: "No cost hosting" },
              { icon: <Zap className="size-5" />, label: "Instant", desc: "Sub-second uploads" },
              { icon: <Shield className="size-5" />, label: "Secure", desc: "GitHub-backed" },
              { icon: <Globe className="size-5" />, label: "18+ Tools", desc: "All in one app" },
            ].map((stat) => (
              <div key={stat.label} className="neo-card p-4 text-center animate-slide-up">
                <div className="flex justify-center mb-2 text-orange-500">{stat.icon}</div>
                <div className="font-mono font-bold text-sm">{stat.label}</div>
                <div className="font-mono text-xs" style={{ color: "var(--neo-muted-text)" }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All downloader categories */}
      <section className="py-8 sm:py-12" style={{ backgroundColor: "var(--neo-card-bg)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-mono font-bold mb-2">Semua Downloader</h2>
            <p className="font-mono text-xs sm:text-sm" style={{ color: "var(--neo-muted-text)" }}>16 kategori · 40+ engine pilihan</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { slug: "ttdl", label: "TikTok", color: "#0d9488" },
              { slug: "igdl", label: "Instagram", color: "#be123c" },
              { slug: "fbdl", label: "Facebook", color: "#2563eb" },
              { slug: "twdl", label: "Twitter / X", color: "#64748b" },
              { slug: "ytdl", label: "YouTube", color: "#dc2626" },
              { slug: "pindl", label: "Pinterest", color: "#e11d48" },
              { slug: "threaddl", label: "Threads", color: "#374151" },
              { slug: "reddl", label: "Reddit", color: "#ea580c" },
              { slug: "teraboxdl", label: "Terabox", color: "#0891b2" },
              { slug: "scdl", label: "SoundCloud", color: "#f97316" },
              { slug: "douyindl", label: "Douyin", color: "#06b6d4" },
              { slug: "pixivdl", label: "Pixiv", color: "#0284c7" },
              { slug: "spdl", label: "Spotify", color: "#16a34a" },
              { slug: "animedl", label: "Anime", color: "#a855f7" },
              { slug: "komikdl", label: "Komik", color: "#f59e0b" },
              { slug: "resolver", label: "Resolver", color: "#8b5cf6" },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="neo-card p-4 text-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--neo-shadow-color)] transition-all"
              >
                <div className="font-mono font-bold text-sm" style={{ color: c.color }}>
                  {c.label}
                </div>
                <div className="font-mono text-[10px] mt-0.5" style={{ color: "var(--neo-muted-text)" }}>
                  /{c.slug}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-mono font-bold mb-2">Cara Kerja</h2>
            <p className="font-mono text-xs sm:text-sm" style={{ color: "var(--neo-muted-text)" }}>Sederhana, cepat, dan gratis</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "01", title: "Upload / Input", desc: "Drag file untuk CDN, masukkan URL, atau pilih kategori downloader", icon: <MousePointerClick className="size-6" /> },
              { step: "02", title: "Proses Otomatis", desc: "File ke hosting, URL ke database, media diproses oleh engine scraper", icon: <Server className="size-6" /> },
              { step: "03", title: "Hasil Instan!", desc: "Dapatkan URL, download media, atau bagikan link langsung", icon: <Globe className="size-6" /> },
            ].map((item) => (
              <div key={item.step} className="neo-card p-5 sm:p-6 text-center">
                <div className="text-orange-500 flex justify-center mb-3">{item.icon}</div>
                <div className="font-mono font-bold text-xs text-orange-500 mb-1">STEP {item.step}</div>
                <h3 className="font-mono font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--neo-muted-text)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
