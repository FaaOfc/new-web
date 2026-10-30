import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getEngine } from "@/lib/scraper-registry";
import DownloaderPage from "@/components/downloader/downloader-page";

const cat = getCategory("komikdl");
if (!cat) notFound();
const engine = getEngine(cat, cat.defaultEngine)!;

export const metadata: Metadata = {
  title: "Komik Downloader — TaoSite",
  description: cat.description,
};

export default function Page() {
  return <DownloaderPage category={cat} activeEngine={engine} />;
}
