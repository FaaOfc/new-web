import type { Metadata } from "next";
import { Tv, Gem, Clock, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  subtitle: string;
  description: string;
  iconName: "tv" | "gem";
  color: string;
  features: string[];
}

export default function ComingSoon({
  title,
  subtitle,
  description,
  iconName,
  color,
  features,
}: ComingSoonProps) {
  const Icon = iconName === "tv" ? Tv : Gem;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-start justify-center py-8 sm:py-16 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Icon besar */}
        <div
          className="inline-flex items-center justify-center neo-border rounded-2xl p-5 mb-5 animate-slide-up"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="size-12" style={{ color }} />
        </div>

        {/* Badge Segera Hadir */}
        <div
          className="inline-flex items-center gap-2 neo-btn px-4 py-1.5 font-mono text-xs font-bold mb-4 animate-slide-up-delay-1"
          style={{ backgroundColor: `${color}12`, color }}
        >
          <Clock className="size-3.5" />
          SEGERA HADIR
        </div>

        <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-2 animate-slide-up-delay-1">
          {title}
        </h1>
        <p className="text-sm font-mono mb-3" style={{ color: "var(--neo-muted-text)" }}>
          {subtitle}
        </p>
        <p
          className="text-sm font-mono leading-relaxed mb-8 max-w-md mx-auto animate-slide-up-delay-2"
          style={{ color: "var(--neo-muted-text)" }}
        >
          {description}
        </p>

        {/* Fitur yang akan hadir */}
        <div className="neo-card p-5 text-left mb-8 animate-slide-up-delay-3">
          <h2 className="font-mono font-bold text-sm mb-3 flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            Yang akan hadir:
          </h2>
          <ul className="space-y-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="font-mono text-xs flex items-start gap-2"
                style={{ color: "var(--neo-muted-text)" }}
              >
                <span className="mt-1 shrink-0" style={{ color }}>
                  ▸
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up-delay-3">
          <Link
            href="/"
            className="neo-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono font-medium text-sm bg-[var(--neo-card-bg)] hover:opacity-80"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Beranda
          </Link>
          <a
            href="/downloads"
            className="neo-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono font-medium text-sm text-white hover:opacity-90"
            style={{ backgroundColor: color }}
          >
            <Bell className="size-4" />
            Lihat Halaman Unduhan
          </a>
        </div>
      </div>
    </div>
  );
}
