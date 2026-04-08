"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

function createConfetti(container: HTMLDivElement) {
  const colors = [
    "rgba(96,165,250,0.85)",
    "rgba(147,197,253,0.85)",
    "rgba(96,165,250,0.55)",
    "rgba(245,240,232,0.6)",
    "rgba(96,165,250,0.35)",
  ];

  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = Math.random() * 6 + 3;
    const isRect = Math.random() > 0.5;

    el.style.cssText = `
      position: fixed;
      width: ${isRect ? size : size * 0.4}px;
      height: ${isRect ? size * 0.4 : size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: -10px;
      border-radius: ${Math.random() > 0.5 ? "50%" : "1px"};
      pointer-events: none;
      z-index: 60;
      animation: confetti-fall ${2.5 + Math.random() * 3}s linear ${Math.random() * 2}s forwards;
    `;

    container.appendChild(el);
    setTimeout(() => el.remove(), 6000);
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: "easeOut" as const },
  }),
};

export default function FinalPage() {
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (confettiRef.current) {
      createConfetti(confettiRef.current);
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg);
            opacity: 0;
          }
        }
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          15% {
            transform: scale(1.15);
          }
          30% {
            transform: scale(1);
          }
          45% {
            transform: scale(1.08);
          }
        }
      `}</style>

      <div ref={confettiRef} />

      {/* Subtle photo background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/photos/photo-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            opacity: 0.045,
            filter: "blur(2px) saturate(0.3)",
          }}
        />
        {/* Dark overlay to blend with theme */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center 30%, rgba(5,11,26,0.7) 0%, rgba(5,11,26,0.95) 70%)",
          }}
        />
      </div>

      <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-[10%] lg:px-[15%] py-28 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="text-gold text-4xl mb-10"
          style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}
        >
          &#10022;
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="heading-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] mb-8 text-center"
        >
          Tebessümünü hissediyorum.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-[family-name:var(--font-heading)] text-cream-dim italic text-base md:text-lg text-center max-w-lg mb-8"
        >
          Eşlik ettiğin akşam için teşekkür ederim. Yağmurlu bir akşamla
          birlikte ruhuma iyi geldin. Umarım ben de sana iyi gelmişimdir.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.4}
          className="text-body text-center max-w-md mb-14"
        >
          Şimdi senin için hazırladığım 2 tane mektup var. Onları okumanı isterim.
        </motion.p>

        {/* Mektuplarımı oku butonu */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.8}
          className="w-full md:w-auto"
        >
          <Link href="/mektuplar" className="btn-primary">
            Mektuplarımı oku
          </Link>
        </motion.div>
      </section>
    </>
  );
}
