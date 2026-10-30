import type { Metadata } from "next";
import Link from "next/link";
import { Coins, ArrowLeft, BellRing, Gamepad2, Gem, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Top UP Murah — Segera Hadir | TaoSite",
  description: "Layanan top up game murah & cepat TaoSite segera hadir.",
};

const upcoming = [
  { icon: Gamepad2, label: "Top up game populer: ML, FF, Genshin, dll." },
  { icon: Gem, label: "Harga termurah & proses otomatis 24 jam" },
  { icon: Zap, label: "Pembayaran QRIS, e-wallet, dan voucher" },
];

export default function TopupPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-start justify-center py-10 sm:py-20 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="flex justify-center mb-5 animate-slide-up">
          <div className="inline-flex items-center justify-center neo-border rounded-xl p-5 bg-amber-50 dark:bg-amber-950">
            <Coins className="size-10 text-amber-500" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 neo-btn px-4 py-1.5 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs font-mono mb-4 animate-slide-up-delay-1">
          <BellRing className="size-3.5" />
          Segera Hadir
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-mono font-bold mb-3 animate-slide-up-delay-1">
          Top UP Murah
        </h1>
        <p
          className="font-mono text-sm leading-relaxed mb-8 animate-slide-up-delay-2"
          style={{ color: "var(--neo-muted-text)" }}
        >
          Layanan top up game dengan harga termurah sedang disiapkan. Tunggu
          kabar baiknya — top up cepat, aman, dan pastinya murah!
        </p>

        {/* Upcoming features */}
        <div className="neo-card p-5 text-left mb-8 animate-slide-up-delay-2">
          <h4 className="font-mono font-bold text-sm mb-3">Yang Akan Datang</h4>
          <ul className="space-y-2.5">
            {upcoming.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center gap-2.5 font-mono text-xs">
                  <span className="size-7 shrink-0 rounded-md neo-border bg-amber-50 dark:bg-amber-950 flex items-center justify-center">
                    <Icon className="size-3.5 text-amber-500" />
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
