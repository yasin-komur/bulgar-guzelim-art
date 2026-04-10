"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [justSent, setJustSent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 5500);
    const t3 = setTimeout(() => setStage(3), 13000);

    // Visitor notification — session başına bir kere
    if (!sessionStorage.getItem("visited")) {
      sessionStorage.setItem("visited", "1");
      const now = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
      fetch(
        `https://api.telegram.org/bot8721927627:AAGpWwtumH89DcmZcmE5Hd53cwB2P62UADg/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: 1079067907,
            text: `Siteye birisi girdi.\nTarih: ${now}`,
          }),
        }
      ).catch(() => {});
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const sendMessage = async () => {
    const text = message.trim();
    if (!text || sending) return;

    setSending(true);

    try {
      // Save to Supabase
      await supabase.from("messages").insert({ phone: `[mesaj] ${text}` });

      // Telegram notification
      await fetch(
        `https://api.telegram.org/bot8721927627:AAGpWwtumH89DcmZcmE5Hd53cwB2P62UADg/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: 1079067907,
            text: `Sinem yeni bir mesaj gönderdi:\n\n${text}`,
          }),
        }
      );

      setSentCount((c) => c + 1);
      setMessage("");
      setJustSent(true);
      setTimeout(() => setJustSent(false), 2000);
      textareaRef.current?.focus();
    } catch {
      // sessizce yut
    } finally {
      setSending(false);
    }
  };

  const fadeSlow = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-10 py-20 relative">
      {/* Stage 0-1: First sentence */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.p
            key="first"
            variants={fadeSlow}
            initial="hidden"
            animate="visible"
            className="font-heading text-cream italic text-xl md:text-3xl text-center max-w-2xl mb-12 leading-relaxed"
          >
            Uzun zaman oldu, buraya geleceğini hissediyordum.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Stage 2: Second message — slow word-by-word feel */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            key="second"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="max-w-2xl text-center mb-14"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
              className="text-body text-base md:text-lg leading-loose mb-6"
            >
              Şimdi gözlerini kapat ve yavaş bir şekilde derin bir nefes al,
              sonra yine sakince ver nefesini. Nefesinin oluşturduğu meltemi
              hissedeceğim.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5, delay: 4, ease: "easeOut" }}
              className="text-body text-base md:text-lg leading-loose"
            >
              Gözlerini açtıktan sonra duygularını yaz. Kelimeler birçok
              yaranın merhemidir.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3: Message box */}
      <AnimatePresence>
        {stage >= 3 && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full max-w-xl"
          >
            <div className="glass-card gold-glow p-5 md:p-6">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Buraya yaz..."
                rows={5}
                className="w-full bg-transparent text-cream placeholder:text-cream-dim text-base md:text-lg leading-relaxed resize-none focus:outline-none font-light"
                style={{ fontFamily: "var(--font-body)" }}
              />

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
                <span className="text-cream-dim text-[0.65rem] tracking-[0.2em] uppercase">
                  {sentCount > 0
                    ? `${sentCount} mesaj gönderildi`
                    : "İstediğin kadar yazabilirsin"}
                </span>

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!message.trim() || sending}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    width: "auto",
                    minWidth: 140,
                    padding: "0.7rem 1.8rem",
                    fontSize: "0.7rem",
                  }}
                >
                  {sending ? "Gönderiliyor" : "Gönder"}
                </button>
              </div>
            </div>

            {/* Confirmation pulse */}
            <AnimatePresence>
              {justSent && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center text-gold-light text-xs tracking-wider mt-4 italic"
                >
                  duydum seni
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
