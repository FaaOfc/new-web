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
  Smartphone,
  Tv,
  Gem,
  Sun,
  Moon,
  Menu,
  X,
  Users,
  Heart,
  FileText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { scraprCategories } from "@/lib/scraper-registry";
import { getCategoryIcon } from "@/components/downloader/category-view";

const mainNav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cdn", label: "CDN", icon: UploadCloud },
  { href: "/short", label: "ShortURL", icon: LinkIcon },
];

const extraNav = [
  { href: "/downloads", label: "Unduh Aplikasi", icon: Smartphone },
  { href: "/nonton-anime", label: "Nonton Anime", icon: Tv },
  { href: "/topup", label: "Top UP Murah", icon: Gem },
];

const infoNav = [
  { href: "/about", label: "About", icon: Users },
  { href: "/thanks", label: "Thanks To", icon: Heart },
  { href: "/tos", label: "ToS", icon: FileText },
  { href: "/credits", label: "Credits", icon: Sparkles },
];

function NavLink({
  href,
  label,
  Icon,
  pathname,
  onNavigate,
  color,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
  pathname: string;
  onNavigate?: () => void;
  color?: string;
}) {
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-2 px-3 py-2 rounded-md font-mono text-sm font-medium transition-all ${
        active
          ? "bg-[var(--neo-border-color)] text-[var(--neo-card-bg)] shadow-none"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <Icon
        className="size-4 shrink-0"
        style={color && !active ? { color } : undefined}
      />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="p-4 border-b-2 flex items-center gap-2 shrink-0"
        style={{ borderColor: "var(--neo-border-color)" }}
      >
        <Zap className="size-5 text-orange-500 shrink-0" />
        <span className="font-mono font-bold text-base tracking-tight truncate">
          TaoSite
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1 chat-scroll">
        {/* Tools utama */}
        {mainNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            Icon={item.icon}
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        ))}

        {/* Ekstra: Downloads / Anime / TopUp */}
        <div className="pt-1">
          {extraNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              Icon={item.icon}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          ))}
        </div>

        {/* Separator */}
        <div
          className="my-2 mx-1"
          style={{ borderBottom: "1px dashed var(--neo-border-color)", opacity: 0.5 }}
        />
        <p
          className="px-3 pb-1 font-mono text-[10px] uppercase tracking-wider"
          style={{ color: "var(--neo-muted-text)" }}
        >
          Downloader
        </p>

        {/* 16 kategori downloader */}
        {scraprCategories.map((cat) => (
          <NavLink
            key={cat.slug}
            href={`/${cat.slug}`}
            label={cat.label}
            Icon={getCategoryIcon(cat.icon)}
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
            color={cat.color}
          />
        ))}

        {/* Separator */}
        <div
          className="my-2 mx-1"
          style={{ borderBottom: "1px dashed var(--neo-border-color)", opacity: 0.5 }}
        />

        {/* Info pages */}
        {infoNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            Icon={item.icon}
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        ))}
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
      {/* Top bar */}
      <div
        className="sm:hidden fixed top-0 left-0 right-0 z-50 neo-border bg-[var(--neo-card-bg)] flex items-center justify-between px-3 h-12"
      >
        <div className="flex items-center gap-2 font-mono font-bold text-base">
          <Zap className="size-4 text-orange-500" />
          TaoSite
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="neo-btn p-1.5 bg-[var(--neo-card-bg)]"
          aria-label="Buka menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
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
