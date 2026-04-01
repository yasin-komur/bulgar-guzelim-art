"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-10 relative">
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="section-label mb-8"
      >
        sana bir şey hazırladım
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
        className="text-body text-center max-w-[90%] md:max-w-xl mb-12"
      >
        Bu sayfalar senin için. Senden hoşlanıyorum ve ben duygularını bu
        şekilde ifade eden bir adamım.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
        className="w-full md:w-auto"
      >
        <Link href="/hikaye" className="btn-primary">
          Başla
        </Link>
      </motion.div>

      {/* Bottom links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8, ease: "easeOut" }}
        className="absolute bottom-8 flex gap-8"
      >
        {[
          { href: "/hikaye", label: "Hikaye" },
          { href: "/sana-dair", label: "Sana Dair" },
          { href: "/itiraf", label: "İtiraf" },
          { href: "/mektuplar", label: "Mektuplar" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[0.6rem] tracking-[0.3em] uppercase text-cream-dim hover:text-gold transition-colors duration-500"
          >
            {link.label}
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
