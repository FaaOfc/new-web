import Link from "next/link";
import {
  Music,
  Camera,
  Facebook,
  Twitter,
  Youtube,
  Image as ImageIcon,
  AtSign,
  MessageSquare,
  HardDrive,
  Cloud,
  Music3,
  Palette,
  AudioLines,
  Play,
  BookOpen,
  Link2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

/** Map nama ikon di registry → komponen lucide */
export const categoryIconMap: Record<string, LucideIcon> = {
  music: Music,
  camera: Camera,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
  image: ImageIcon,
  "at-sign": AtSign,
  "message-square": MessageSquare,
  "hard-drive": HardDrive,
  cloud: Cloud,
  "music-3": Music3,
  palette: Palette,
  "audio-lines": AudioLines,
  play: Play,
  "book-open": BookOpen,
  "link-2": Link2,
};

export function getCategoryIcon(iconName: string): LucideIcon {
  return categoryIconMap[iconName] ?? Link2;
}

interface CategoryViewProps {
  categorySlug: string;
  categoryLabel: string;
  categoryDesc: string;
  color: string;
  iconName: string;
  engines: { slug: string; desc: string }[];
}

/** Halaman kategori: daftar engine yang bisa dipilih */
export default function CategoryView({
  categorySlug,
  categoryLabel,
  categoryDesc,
  color,
  iconName,
  engines,
}: CategoryViewProps) {
  const Icon = getCategoryIcon(iconName);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center neo-border rounded-xl p-3 mb-4"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="size-8" style={{ color }} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-1">
          {categoryLabel} Downloader
        </h1>
        <p className="text-sm font-mono" style={{ color: "var(--neo-muted-text)" }}>
          {categoryDesc}
        </p>
      </div>

      {/* Daftar engine */}
      <div className="space-y-3">
        {engines.map((engine) => (
          <Link
            key={engine.slug}
            href={`/${categorySlug}/${engine.slug}`}
            className="neo-card p-4 flex items-center justify-between gap-3 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_var(--neo-shadow-color)] transition-all duration-200 group block"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="font-mono font-bold text-sm">{engine.slug}</h2>
                <span
                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  ENGINE
                </span>
              </div>
              <p className="font-mono text-xs truncate" style={{ color: "var(--neo-muted-text)" }}>
                {engine.desc}
              </p>
            </div>
            <span
              className="neo-btn p-2 shrink-0 group-hover:opacity-80"
              style={{ backgroundColor: `${color}12` }}
            >
              <ArrowRight className="size-4" style={{ color }} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
