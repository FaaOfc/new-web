"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Zap,
  Home,
  UploadCloud,
  LinkIcon,
  Sun,
  Moon,
  Menu,
  X,
  Users,
  Heart,
  FileText,
  Sparkles,
  ChevronDown,
  Smartphone,
  Tv,
  Coins,
} from "lucide-react";
import { categories } from "@/lib/scraper-registry";
import { getCategoryIcon } from "./downloader/icon-map";

const mainNav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cdn", label: "CDN", icon: UploadCloud },
  { href: "/short", label: "ShortURL", icon: LinkIcon },
];

const extraNav = [
  { href: "/downloads", label: "Unduh Aplikasi", icon: Smartphone },
  {
    href: "/nonton-anime",
    label: "Nonton Anime",
    icon: Tv,
    badge: "Soon",
  },
  {
    href: "/topup",
    label: "Top UP Murah",
    icon: Coins,
    badge: "Soon",
  },
];

const infoNav = [
  { href: "/about", label: "About", icon: Users },
  { href: "/thanks", label: "Thanks To", icon: Heart },
  { href: "/tos", label: "ToS", icon: FileText },
  { href: "/credits", label: "Credits", icon: Sparkles },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 pt-3 pb-1 font-mono text-[10px] font-bold uppercase tracking-wider"
      style={{ color: "var(--neo-muted-text)" }}
    >
      {children}
    </div>
  );
}

/** Toggle tema bentuk ikon kecil (header sidebar & bar mobile) */
function ThemeToggleIcon({
  mounted,
  theme,
  setTheme,
}: {
  mounted: boolean;
  theme: string | undefined;
  setTheme: (t: string) => void;
}) {
  if (!mounted) {
    return <div className="w-8 h-8" aria-hidden />;
  }
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="neo-btn p-1.5 bg-[var(--neo-card-bg)] hover:opacity-80 shrink-0"
      aria-label={isDark ? "Ganti ke tema terang" : "Ganti ke tema gelap"}
      title={isDark ? "Tema terang" : "Tema gelap"}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  // auto-expand kategori yang sedang aktif
  useEffect(() => {
    const active = categories.find(
      (c) => pathname === `/${c.slug}` || pathname.startsWith(`/${c.slug}/`)
    );
    if (active) setOpenCat(active.slug);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (active: boolean) =>
    `flex items-center gap-2 px-3 py-2 rounded-md font-mono text-sm font-medium transition-all ${
      active
        ? "bg-[var(--neo-border-color)] text-[var(--neo-card-bg)] shadow-none"
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo + toggle tema cepat */}
      <div
        className="p-4 border-b-2 flex items-center gap-2 shrink-0"
        style={{ borderColor: "var(--neo-border-color)" }}
      >
        <Zap className="size-5 text-orange-500 shrink-0" />
        <span className="font-mono font-bold text-base tracking-tight truncate">
          TaoSite
        </span>
        <div className="ml-auto">
          <ThemeToggleIcon mounted={mounted} theme={theme} setTheme={setTheme} />
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 chat-scroll">
        {/* Menu utama */}
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={linkClass(isActive(item.href))}
            >
              <Icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        {/* Lainnya — diposisikan di atas Downloader */}
        <SectionLabel>Lainnya</SectionLabel>
        {extraNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={linkClass(isActive(item.href))}
            >
              <Icon className="size-4 shrink-0" />
              <span className="truncate flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold neo-border bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 shrink-0">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Downloader — kategori dengan sub-engine */}
        <SectionLabel>Downloader</SectionLabel>
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.icon);
          const catActive =
            pathname === `/${cat.slug}` || pathname.startsWith(`/${cat.slug}/`);
          const open = openCat === cat.slug;
          return (
            <div key={cat.slug}>
              <button
                onClick={() => setOpenCat(open ? null : cat.slug)}
                className={`${linkClass(catActive)} w-full`}
                aria-expanded={open}
              >
                <Icon
                  className="size-4 shrink-0"
                  style={catActive ? undefined : { color: cat.color }}
                />
                <span className="truncate flex-1 text-left">{cat.label} DL</span>
                <ChevronDown
                  className={`size-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && (
                <div className="ml-4 pl-2 border-l-2 space-y-0.5 py-1" style={{ borderColor: "var(--neo-border-color)", borderOpacity: 0.4 }}>
                  {cat.engines.map((eng) => {
                    const href = `/${cat.slug}/${eng.key}`;
                    const engActive = pathname === href;
                    return (
                      <Link
                        key={eng.key}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-2 py-1.5 rounded-md font-mono text-xs transition-all ${
                          engActive
                            ? "bg-[var(--neo-border-color)] text-[var(--neo-card-bg)] shadow-none font-bold"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        style={
                          engActive
                            ? undefined
                            : { color: "var(--neo-muted-text)" }
                        }
                      >
                        {eng.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Info pages */}
        {infoNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={linkClass(isActive(item.href))}
            >
              <Icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle at bottom */}
      <div
        className="p-3 border-t-2 shrink-0"
        style={{ borderColor: "var(--neo-border-color)" }}
      >
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="neo-btn w-full flex items-center gap-2 px-3 py-2 font-mono text-sm bg-[var(--neo-card-bg)] hover:opacity-80"
          >
            {theme === "dark" ? (
              <Sun className="size-4 shrink-0" />
            ) : (
              <Moon className="size-4 shrink-0" />
            )}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside
        className="hidden sm:flex w-52 shrink-0 border-r-2 flex-col sticky top-0 h-screen bg-[var(--neo-card-bg)] z-40"
        style={{ borderColor: "var(--neo-border-color)" }}
      >
        {navContent}
      </aside>

      {/* Mobile: top bar + overlay sidebar */}
      <div
        className="sm:hidden fixed top-0 left-0 right-0 z-50 neo-border bg-[var(--neo-card-bg)] flex items-center justify-between px-3 h-12"
      >
        <div className="flex items-center gap-2 font-mono font-bold text-base">
          <Zap className="size-4 text-orange-500" />
          TaoSite
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggleIcon mounted={mounted} theme={theme} setTheme={setTheme} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="neo-btn p-1.5 bg-[var(--neo-card-bg)]"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div
            className="sm:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="sm:hidden fixed top-0 left-0 bottom-0 w-56 z-50 border-r-2 bg-[var(--neo-card-bg)] animate-slide-left"
            style={{ borderColor: "var(--neo-border-color)" }}
          >
            {navContent}
          </aside>
        </>
      )}
    </>
  );
}
