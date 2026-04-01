"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

const playlist = ["/music/bg.mp3", "/music/bg2.mp3"];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackIdx = useRef(0);
  const hasAutoPlayed = useRef(false);
  const pathname = usePathname();

  const playTrack = useCallback((idx: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    trackIdx.current = idx;
    audio.src = playlist[idx];
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const onTrackEnd = useCallback(() => {
    const next = (trackIdx.current + 1) % playlist.length;
    playTrack(next);
  }, [playTrack]);

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (!audio) return;
    audioRef.current = audio;
    audio.src = playlist[0];
    audio.addEventListener("ended", onTrackEnd);
    return () => audio.removeEventListener("ended", onTrackEnd);
  }, [onTrackEnd]);

  const tryAutoPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || hasAutoPlayed.current) return;
    audio.play().then(() => {
      hasAutoPlayed.current = true;
      setIsPlaying(true);
      document.removeEventListener("click", tryAutoPlay);
      document.removeEventListener("touchstart", tryAutoPlay);
      document.removeEventListener("scroll", tryAutoPlay);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    tryAutoPlay();
    document.addEventListener("click", tryAutoPlay);
    document.addEventListener("touchstart", tryAutoPlay);
    document.addEventListener("scroll", tryAutoPlay);
    return () => {
      document.removeEventListener("click", tryAutoPlay);
      document.removeEventListener("touchstart", tryAutoPlay);
      document.removeEventListener("scroll", tryAutoPlay);
    };
  }, [tryAutoPlay]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        hasAutoPlayed.current = true;
      }).catch(() => {});
    }
  };

  if (pathname === "/final") return null;

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-5 md:right-10 z-50 w-10 h-10 rounded-full glass-card flex items-center justify-center gap-[3px] transition-all duration-500 hover:border-gold-dim"
      aria-label={isPlaying ? "Müziği durdur" : "Müziği çal"}
    >
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-[2px] bg-gold rounded-full transition-all duration-300 ${
            isPlaying ? "animate-bars" : "h-2"
          }`}
          style={
            isPlaying
              ? {
                  animation: `bars 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                }
              : {}
          }
        />
      ))}
      <style jsx>{`
        @keyframes bars {
          0% {
            height: 4px;
          }
          100% {
            height: 14px;
          }
        }
      `}</style>
    </button>
  );
}
