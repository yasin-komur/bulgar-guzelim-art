import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { FilmGrain } from "@/components/FilmGrain";
import { GoldParticles } from "@/components/GoldParticles";
import { MusicPlayer } from "@/components/MusicPlayer";

export const metadata: Metadata = {
  title: "Sinem — Sana Bir Şey Hazırladım",
  description: "Bu sayfalar sadece senin için.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="forest-backdrop" aria-hidden="true" />
        <FilmGrain />
        <GoldParticles />
        <Navbar />
        <MusicPlayer />

        {/* Background ambient glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.05)_0%,transparent_70%)]" />
        </div>

        {/* Audio element - replace src when music is ready */}
        <audio id="bg-music" preload="auto" />

        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
