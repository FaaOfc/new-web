import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Top UP Murah — Segera Hadir — TaoSite",
  description:
    "Layanan top up game & voucher murah di TaoSite segera hadir. Pantau terus halaman ini.",
};

export default function TopupPage() {
  return (
    <ComingSoon
      title="Top UP Murah"
      subtitle="Top up game & voucher dengan harga termurah"
      description="Kami sedang menyiapkan layanan top up Diamond, UC, dan voucher game dengan harga paling murah serta proses instan. Sabar ya — segera hadir!"
      iconName="gem"
      color="#f59e0b"
      features={[
        "Top up Diamond ML, UC PUBG, Genesis Genshin & lainnya",
        "Harga termurah dengan promo rutin",
        "Proses instan otomatis 24/7",
        "Pembayaran QRIS, e-wallet & bank",
        "Layanan pelanggan responsif",
      ]}
    />
  );
}
