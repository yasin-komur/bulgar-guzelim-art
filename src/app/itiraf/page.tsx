"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const tooltips = [
  "Yakalarsan~",
  "Çok yavaşsın",
  "Neredeyse tuttun",
  "Olmadı",
  "Pes et artık",
  "Bu buton seni sevmiyor",
  "Taklacı güvercin kartı atıyorum",
  "Reverse! Soruyu ben soruyorum",
  "Aduket kartı — geçersiz",
  "Kanepe kartı — otur izle",
  "+4 acılı çiğ köfte",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: "easeOut" as const },
  }),
};

function getRandomPos(currentPos: { x: number; y: number } | null) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const btnW = 150;
  const btnH = 52;
  const safeTop = 70;
  const safeBottom = 20;
  const safeX = 16;

  let x: number, y: number;
  let attempts = 0;

  do {
    x = Math.random() * (vw - btnW - safeX * 2) + safeX;
    y = Math.random() * (vh - btnH - safeTop - safeBottom) + safeTop;
    attempts++;
  } while (
    attempts < 30 &&
    currentPos &&
    Math.abs(x - currentPos.x) < 120 &&
    Math.abs(y - currentPos.y) < 120
  );

  return { x, y };
}

export default function ItirafPage() {
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [tooltipText, setTooltipText] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const noPosRef = useRef(noPos);
  const tooltipIdx = useRef(0);
  const isMoving = useRef(false);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    noPosRef.current = noPos;
  }, [noPos]);

  useEffect(() => {
    return () => {
      if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  function runAway() {
    if (isMoving.current) return;
    isMoving.current = true;
    setTimeout(() => {
      isMoving.current = false;
    }, 400);

    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setShowTooltip(false);

    const newPos = getRandomPos(noPosRef.current);
    setNoPos(newPos);
    setMoveCount((c) => c + 1);

    const text = tooltips[tooltipIdx.current % tooltips.length];
    tooltipIdx.current++;

    const delay = moveCount === 0 ? 100 : 380;
    tooltipTimer.current = setTimeout(() => {
      setTooltipText(text);
      setShowTooltip(true);
      hideTimer.current = setTimeout(() => {
        setShowTooltip(false);
      }, 1400);
    }, delay);
  }

  const hasEscaped = noPos !== null;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-[10%] lg:px-[15%] py-28 relative">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="section-label mb-6"
      >
        asıl mesele
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="heading-display text-[2.2rem] md:text-[3.5rem] lg:text-[4rem] mb-6 text-center"
      >
        Seni daha yakından tanımak istiyorum.
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.5}
        className="font-heading text-cream-dim italic text-base md:text-lg text-center max-w-lg mb-10"
      >
        Seninle tanışmak ve yan yana yürümek güzeldi. Hassas bir dönemde
        olduğunu ve toparlandığını biliyorum. Bu sayfaları senden hoşlanan
        bir adamın duygularını ifade etme biçimi olarak gör, üzerinde bir
        baskı hissetme.
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.8}
        className="text-cream text-lg md:text-xl font-heading mb-10"
      >
        Ne dersin?
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1.1}
        className="flex gap-4 w-full md:w-auto md:gap-6"
      >
        <Link
          href="/final"
          className="btn-primary flex-1 md:flex-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(52,211,153,0.1))",
          }}
        >
          Ben de isterim
        </Link>

        {/* Hayır — tek buton, kaçınca fixed olur */}
        <button
          onMouseEnter={(e) => {
            e.preventDefault();
            runAway();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            runAway();
          }}
          className="btn-primary"
          style={
            hasEscaped
              ? {
                  position: "fixed",
                  zIndex: 50,
                  left: noPos.x,
                  top: noPos.y,
                  width: "auto",
                  minWidth: 140,
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "rgba(212,208,200,0.45)",
                  transition:
                    moveCount > 1
                      ? "left 0.35s cubic-bezier(0.25, 1, 0.5, 1), top 0.35s cubic-bezier(0.25, 1, 0.5, 1)"
                      : "none",
                }
              : {
                  flex: "1 1 0%",
                  width: "auto",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "rgba(212,208,200,0.45)",
                }
          }
        >
          Hayır
        </button>
      </motion.div>

      {/* Tooltip */}
      {showTooltip && noPos && (
        <div
          key={tooltipIdx.current}
          className="fixed z-[51] glass-card px-4 py-2 text-gold-light text-xs tracking-wider pointer-events-none"
          style={{
            left: noPos.x,
            top: noPos.y - 40,
            animation: "tooltip-pop 0.25s ease-out both",
          }}
        >
          {tooltipText}
        </div>
      )}

      <style jsx>{`
        @keyframes tooltip-pop {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
