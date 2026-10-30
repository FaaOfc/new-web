import type { Metadata } from "next";
import Link from "next/link";
import { Tv, ArrowLeft, BellRing, Film, Popcorn, Clapperboard } from "lucide-react";

export const metadata: Metadata = {
  title: "Nonton Anime — Segera Hadir | TaoSite",
  description: "Fitur streaming anime TaoSite segera hadir.",
};

const upcoming = [
  { icon: Film, label: "Streaming episode subtitle Indonesia" },
  { icon: Popcorn, label: "Daftar anime ongoing & movie terbaru" },
  { icon: Clapperboard, label: "Jadwal tayang dan bookmark favorit" },
];

export default function NontonAnimePage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-start justify-center py-10 sm:py-20 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="flex justify-center mb-5 animate-slide-up">
          <div className="inline-flex items-center justify-center neo-border rounded-xl p-5 bg-violet-50 dark:bg-violet-950">
            <Tv className="size-10 text-violet-500" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 neo-btn px-4 py-1.5 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 text-xs font-mono mb-4 animate-slide-up-delay-1">
          <BellRing className="size-3.5" />
          Segera Hadir
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-mono font-bold mb-3 animate-slide-up-delay-1">
          Nonton Anime
        </h1>
        <p
          className="font-mono text-sm leading-relaxed mb-8 animate-slide-up-delay-2"
          style={{ color: "var(--neo-muted-text)" }}
        >
          Fitur streaming anime sedang dalam pengembangan. Tim kami sedang
          menyiapkan pengalaman nonton terbaik untukmu — nantikan update
          berikutnya!
        </p>

        {/* Upcoming features */}
        <div className="neo-card p-5 text-left mb-8 animate-slide-up-delay-2">
          <h4 className="font-mono font-bold text-sm mb-3">Yang Akan Datang</h4>
          <ul className="space-y-2.5">
            {upcoming.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center gap-2.5 font-mono text-xs">
                  <span className="size-7 shrink-0 rounded-md neo-border bg-violet-50 dark:bg-violet-950 flex items-center justify-center">
                    <Icon className="size-3.5 text-violet-500" />
                  </span>
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Back */}
        <Link
          href="/"
          className="neo-btn inline-flex items-center justify-center gap-2 px-6 py-3 font-mono font-medium text-sm bg-[var(--neo-card-bg)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_var(--neo-shadow-color)] transition-all animate-slide-up-delay-3"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
