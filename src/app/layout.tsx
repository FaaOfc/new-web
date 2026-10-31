import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaoSite — CDN · ShortURL · Multi-Platform Downloader",
  description:
    "Super-efficient multifunction web app. Free CDN hosting, URL shortener, dan 54 engine downloader multi-platform — tanpa login, gratis selamanya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen flex bg-[var(--neo-page-bg)]">
            <Sidebar />
            {/* Mobile top offset */}
            <div className="flex-1 sm:mt-0 mt-12 min-h-screen flex flex-col">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
