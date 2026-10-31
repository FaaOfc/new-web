"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  UploadCloud,
  Link as LinkIcon,
  Github,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Cloud,
  Zap,
  Shield,
  Globe,
  Download,
  Smartphone,
  Tv,
  Gem,
  MousePointerClick,
  Server,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import IntroScreen from "@/components/intro";
import { scraprCategories, totalEngineCount } from "@/lib/scraper-registry";
import { getCategoryIcon } from "@/components/downloader/category-view";

const features = [
  {
    id: "cdn",
    title: "CDN Hosting",
    subtitle: "Host file apa pun, MIME apa pun",
    description:
      "Upload gambar, video, dokumen, hingga aplikasi — semuanya disimpan di GitHub dan disajikan lewat domainmu sendiri dengan MIME type yang benar.",
    href: "/cdn",
    icon: "upload" as const,
    color: "#f97316",
  },
  {
    id: "shorturl",
    title: "URL Shortener",
    subtitle: "Perpendek URL instan",
    description:
      "Ubah URL panjang menjadi link pendek yang mudah dibagikan. Bisa pakai kode kustom. Semua mapping tersimpan di GitHub Gist — gratis.",
    href: "/short",
    icon: "link" as const,
    color: "#10b981",
  },
  {
    id: "downloader",
    title: `${totalEngineCount} Engine Downloader`,
    subtitle: "16 platform: TikTok, IG, YouTube, dll.",
    description:
      "Unduh video, foto, dan audio dari TikTok, Instagram, Facebook, YouTube, Spotify, anime, komik, sampai bypass shortlink — semua gratis tanpa login.",
    href: "/ttdl",
    icon: "download" as const,
    color: "#0d9488",
  },
  {
    id: "downloads",
    title: "Versi Aplikasi",
    subtitle: "TaoSite di genggamanmu",
    description:
      "Unduh aplikasi TaoSite untuk Android & Windows — semua fitur versi web dalam kemasan aplikasi. Link resmi hanya di halaman unduhan.",
    href: "/downloads",
    icon: "smartphone" as const,
    color: "#e11d48",
  },
  {
    id: "anime",
    title: "Nonton Anime",
    subtitle: "Segera hadir",
    description:
      "Streaming anime favorit dengan kualitas hingga 1080p dan subtitle Indonesia. Fitur sedang dalam pengembangan — pantau terus!",
    href: "/nonton-anime",
    icon: "tv" as const,
    color: "#a855f7",
  },
  {
    id: "topup",
    title: "Top UP Murah",
    subtitle: "Segera hadir",
    description:
      "Top up Diamond ML, UC PUBG, Genesis Genshin, dan voucher game lain dengan harga termurah dan proses instan. Segera hadir!",
    href: "/topup",
    icon: "gem" as const,
    color: "#f59e0b",
  },
];

const featureIconMap = {
  upload: UploadCloud,
  link: LinkIcon,
  download: Download,
  smartphone: Smartphone,
  tv: Tv,
  gem: Gem,
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

  const goToSlide = useCallback(
    (index: number) => {
      if (index === displayIndex || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayIndex(index);
        setActiveIndex(index);
        setTimeout(() => setIsTransitioning(false), 50);
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
    if (touchDeltaX.current < -threshold) goNext();
    else if (touchDeltaX.current > threshold) goPrev();
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleManualNav = (fn: () => void) => {
    setIsPaused(true);
    fn();
    setTimeout(() => setIsPaused(false), 5000);
  };

  const currentFeature = features[displayIndex];
  const CurrentIcon = featureIconMap[currentFeature.icon];

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
                Open Source &middot; Gratis &middot; Tanpa Login
              </div>
              <h1 className="text-4xl sm:text-5xl font-mono font-bold tracking-tight mb-4">
                {siteConfig.siteName}
              </h1>
              <p
                className="text-base sm:text-lg font-mono max-w-xl mx-auto mb-6"
                style={{ color: "var(--neo-muted-text)" }}
              >
                {siteConfig.tagline}. Host file, perpendek URL, unduh media dari{" "}
                {totalEngineCount} engine — semuanya di satu tempat.
              </p>
            </div>
          </div>
        </section>

        {/* Features Carousel */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-mono font-bold mb-1">
                  Fitur Lengkap
                </h2>
                <p
                  className="font-mono text-xs sm:text-sm"
                  style={{ color: "var(--neo-muted-text)" }}
                >
                  {displayIndex + 1} / {total} — Geser atau klik untuk pindah
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleManualNav(goPrev)}
                  className="neo-btn p-2 bg-[var(--neo-card-bg)] hover:opacity-80"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => handleManualNav(goNext)}
                  className="neo-btn p-2 bg-[var(--neo-card-bg)] hover:opacity-80"
                  aria-label="Berikutnya"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

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
                  <div
                    className="neo-border rounded-xl p-3 mx-auto mb-4 w-fit"
                    style={{ backgroundColor: `${currentFeature.color}15` }}
                  >
                    <CurrentIcon
                      className="size-6"
                      style={{ color: currentFeature.color }}
                    />
                  </div>
                  <h3 className="font-mono font-bold text-lg mb-1">
                    {currentFeature.title}
                  </h3>
                  <p
                    className="font-mono text-xs mb-3"
                    style={{ color: "var(--neo-muted-text)" }}
                  >
                    {currentFeature.subtitle}
                  </p>
                  <p
                    className="text-sm mb-5 leading-relaxed"
                    style={{ color: "var(--neo-muted-text)" }}
                  >
                    {currentFeature.description}
                  </p>
                  <Link
                    href={currentFeature.href}
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
                    backgroundColor:
                      i === activeIndex ? f.color : "var(--neo-border-color)",
                    opacity: i === activeIndex ? 1 : 0.3,
                  }}
                  aria-label={`Ke ${f.title}`}
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
                { icon: <Cloud className="size-5" />, label: "Free CDN", desc: "Hosting tanpa biaya" },
                { icon: <Zap className="size-5" />, label: "Instan", desc: "Hasil dalam hitungan detik" },
                { icon: <Shield className="size-5" />, label: "Tanpa Login", desc: "Tanpa database user" },
                { icon: <Globe className="size-5" />, label: `${totalEngineCount} Engine`, desc: "16 platform media" },
              ].map((stat) => (
                <div key={stat.label} className="neo-card p-4 text-center animate-slide-up">
                  <div className="flex justify-center mb-2 text-orange-500">{stat.icon}</div>
                  <div className="font-mono font-bold text-sm">{stat.label}</div>
                  <div className="font-mono text-xs" style={{ color: "var(--neo-muted-text)" }}>
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kategori Downloader */}
        <section className="py-8 sm:py-12" style={{ backgroundColor: "var(--neo-card-bg)" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-mono font-bold mb-2">
                Kategori Downloader
              </h2>
              <p className="font-mono text-xs sm:text-sm" style={{ color: "var(--neo-muted-text)" }}>
                Pilih kategori, lalu pilih engine — contoh: /igdl/snapsave
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {scraprCategories.map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                return (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="neo-card p-4 flex flex-col items-center text-center gap-2 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_var(--neo-shadow-color)] transition-all duration-200"
                  >
                    <span
                      className="neo-border rounded-lg p-2"
                      style={{ backgroundColor: `${cat.color}12` }}
                    >
                      <Icon className="size-5" style={{ color: cat.color }} />
                    </span>
                    <span className="font-mono font-bold text-xs">{cat.label}</span>
                    <span className="font-mono text-[10px]" style={{ color: "var(--neo-muted-text)" }}>
                      {cat.engines.length} engine
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-mono font-bold mb-2">Cara Kerja</h2>
              <p className="font-mono text-xs sm:text-sm" style={{ color: "var(--neo-muted-text)" }}>
                Sederhana, cepat, dan gratis
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  step: "01",
                  title: "Upload / Input",
                  desc: "Drag file untuk CDN, atau tempel URL media yang mau diunduh",
                  icon: <MousePointerClick className="size-6" />,
                },
                {
                  step: "02",
                  title: "Proses Otomatis",
                  desc: "File masuk GitHub, URL pendek tersimpan di Gist, engine scraper memproses media",
                  icon: <Server className="size-6" />,
                },
                {
                  step: "03",
                  title: "Hasil Instan!",
                  desc: "Dapatkan URL hosting, link pendek, atau tombol unduh media favoritmu",
                  icon: <Globe className="size-6" />,
                },
              ].map((item) => (
                <div key={item.step} className="neo-card p-5 sm:p-6 text-center">
                  <div className="text-orange-500 flex justify-center mb-3">{item.icon}</div>
                  <div className="font-mono font-bold text-xs text-orange-500 mb-1">
                    STEP {item.step}
                  </div>
                  <h3 className="font-mono font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--neo-muted-text)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
