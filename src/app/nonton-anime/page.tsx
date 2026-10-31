import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Nonton Anime — Segera Hadir — TaoSite",
  description:
    "Fitur streaming & nonton anime di TaoSite segera hadir. Pantau terus halaman ini.",
};

export default function NontonAnimePage() {
  return (
    <ComingSoon
      title="Nonton Anime"
      subtitle="Streaming anime favoritmu, langsung dari TaoSite"
      description="Kami sedang menyiapkan fitur nonton anime dengan katalog lengkap, kualitas hingga 1080p, dan subtitle Indonesia. Sabar ya — segera hadir!"
      iconName="tv"
      color="#a855f7"
      features={[
        "Katalog anime lengkap dengan pencarian & filter",
        "Kualitas streaming hingga 1080p",
        "Subtitle Indonesia",
        "Riwayat tontonan & lanjut otomatis",
        "Gratis tanpa iklan mengganggu",
      ]}
    />
  );
}
