"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: "easeOut" as const },
  }),
};

interface Letter {
  id: number;
  title: string;
  date: string;
  paragraphs: string[];
}

const letters: Letter[] = [
  {
    id: 1,
    title: "İlk Buluşma",
    date: "31 Mart 2026",
    paragraphs: [
      "Seni canlı olarak ilk gördüğümde nasıl yaklaşacağımdan çok emin olamadım. Tatlı, çekingen bir gelişin vardı ve seni rahatsız etmek de istemedim. Normalde konuşkan olacağını düşünmemiştim ve direkt bir şeyleri konuşmaya başlaman iyi hissettirdi. Kendine has bir şirinliğin vardı. Gözlerinin güzelliği, tebessüm ettiğindeki mimiklerin ve saçlarının özgürlüğü sana dair ilk izlenimleri verdi bana.",

      "Dinlemeyi seviyorum. İnsanın kafasındakileri dışarı atması, kendini rahatlamasının ona verdiği huzur beni mutlu ediyor. Fakat her zaman aynı hisle mi dinliyorum insanları emin değildim. Seni dinlerken iyi hissettim, mutlu oldum ve huzurla doldum. Biraz yürüdük. Yağmur yağmasına aşık bir adam olarak yanımızda eşlikçi olması beni mutlu etti. Şemsiyenin altından zaman zaman yüzünü görüyordum. Seni rahatsız etmek istemediğim için sürekli bakamadım ama baktıkça daha da hoşlandığımı fark ettim senden. Karşılıksız bir tebessümün getirdiği hafif bir huzur vardı her hareketinde.",

      "Önceki muhabbetlerimizden uno oynamak aklımda vardı. Her hareketimde rahat olduğundan ve huzurlu hissettiğinden emin olmak istedim. Eğlendik ve sonuç şaibeli de olsa sen kazandın :) Ben unoda hiç kaybetmezdim. Ama mutlu oldum kazanmana ve eğlenmene. Ettiğin her kelime ve göz göze gelişimizde sana karşı daha da hayranlık beslediğimi hissediyordum. Mimiklerin mat mor bir küreden çıkmış pembe huzur bulutları gibiydi. Gülüşüne sarılmak istedim, seni rahatsız etmek istemedim.",

      "Sonra tatlıcıya geçtik. Sen şekerli tavuk pilavı tarzı bir şey söyledin ben de klasik tercihimden devam ettim. Hayatını ve yaptıklarını daha detaylı konuşmaya başladık. Bu kadar yetenekli olman ve sanatla iç içe olman beni inanılmaz mutlu etti. Konuşacak bir şeyleri olmalı insanın, sorular sorabilmeli karşısındaki insana. Öğrenebilmeli ondan bir şeyler. Ben senden gerçekten bir şeyler öğrenebildiğimi gördüm. Keşfetmek istedim parmak uçlarında dolaşan sanat perilerini, teşekkür etmek istedim onlara dünyayı güzelliştirdikleri ve boşluklarımı keyifle doldurdukları için.",

      "Eve bırakırken seni farklı bir tarafını gördüm. İlişkilere bakış açını biraz daha anladım ve bu beni mutlu etti. Çok benzer düşündüğümüzü ve ortak gelecek hayallerimizin olduğunu fark ettim. Sessiz ve şaşkın gülüşlerde saklamaya çalıştım bunu ama söylediğin her şey aklımdaki kararlı dalgaları sakinleşmeye davet etti. Elinden tuttu onların, derin bir nefes al dedi.",

      "Sarılmadan önce son tebessümünde eve dönüş yolluğumu almıştım. Yazmak istediklerim vardı. Başlamalıydım.",
    ],
  },
  {
    id: 2,
    title: "Turisha",
    date: "1 Nisan 2026",
    paragraphs: [
      "Hayatın kısalığını herkes düşünür. Ne getireceğini bilemeyiz. İyi hissettiğimizde kötü, kötü hissettiğimizde ise iyi şeyler gelebilir başımıza. İnişlerle, çıkışlarla dolu bir hayat. Bazı gözler saklı bu hayatta, güzel saçlar saklı, tatlı tebessümler saklı.",

      "Ne istediğini bilen bir insan olmaya çalıştım her zaman. Dokunduğum her insanda nezaket bırakmaya çalıştım. Dik durmak için elimden gelen her şeyi yaptım. Çünkü ben bir aile hayali kuruyordum ve onun için de güçlü olmalıydım.",

      "Bir yandan içimde sürekli kaynayan saldırmaya hazır bir adam da vardı. Zamanla yönetmeyi öğrendim. Nezaketi zayıflık olarak görenler için zaman zaman çıkardım onu. Onurumu önde tuttum, geceleri kafamı yastığa rahat koymak istedim.",

      "Duygusal ilişkilerin ne kadar yorucu olabileceğinin ve sonrasında getirdiği ağırlığın da farkındayım. Fakat hayallerimize ulaşmanın bedeli olarak görmeye başladım bunu. Göz bebeklerin sek sek oynarken bu satırlardaki kelimelerde senin de hislerini anlıyorum. Neler yaşadığını hissedebiliyorum. Anlatmadıklarını görebiliyorum. Üşüyen duygularının üstünü örtmek ve altlarına atkılar koymak istiyorum. Neden olmasın diyorum. Hayat çok kısa. Bir karınca gibi emek verip inşa edebiliriz o hayatı. Neden olmasın diyorum doğru bir kadınla. Neden sarmayalım birbirimizi. Neden kaybolmayalım birbirimizin dünyasında.",

      "Zorlanıyorum zaman zaman. Karakterini kaybetmiş olmanın alkışlandığı bir zamandayız. Yapılan kötülüklerle övünülen, iyilerin genelde üzüldüğü bir dünya. Ben çok da iyi bir adam değilim. Ama iyilerin mutlu olmasını istiyorum. Uyuyamıyorum yoksa. Göz kapaklarımı kendine doğru çekiyor adalet tanrıları. Sen uyuyamazsın diyorlar bana. Kötü de olsan iyileri mutlu edeceksin diyorlar.",

      "Böylece yaşayıp gitmenin eşiğindeyim ve bir boşluk var puslu dünyamda. Adını sayıklıyor solgun ağaçlarım. Su su diye değil, o o diye sesleniyorlar. Hassas diyorum onlara ihtiyacınız olan şey. Bekleyin diyorum.",

      "Bir karınca gördüm bana doğru gelen. Bacakları mavinin her tonuyla sarılmış, gövdesi ise açılan bir beyaza doğru çalıyor. Sırtında yeşil bir küre var. Vücudunun bir parçası gibi, zararsız gözüküyor sanki. Bir anda bağırıyor bana karınca. Duyamıyorum tam ne dediğini, kulaklarımı açıyorum iyice. Tekrardan bağırıyor!",

      "Turisha!",

      "Anlıyorum sanki. Ama ben bilmezdim karınca dilini. Nasıl olur diyorum.",

      "Küreden bir anda bir siluet yükseliyor. Şirin gözleri, rüzgarı tarayan kirpikleri ve ıssız saçlarıyla.",

      "Tu-ri-shaa",

      "Anlıyorum diyorum.",

      "\"O kadın\".",
    ],
  },
];

export default function MektuplarPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [showStork, setShowStork] = useState(false);
  const storkRef = useRef<HTMLDivElement>(null);
  const formBtnRef = useRef<HTMLDivElement>(null);

  const allRead = readIds.size === letters.length && letters.length > 0;

  const canSend = useMemo(() => {
    const cleaned = phone.replace(/[^\d+]/g, "");
    return cleaned.length >= 10;
  }, [phone]);

  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const handleOpen = useCallback(
    (id: number) => {
      const isOpen = openId === id;
      setOpenId(isOpen ? null : id);
      if (!isOpen) {
        setReadIds((prev) => new Set(prev).add(id));
        // Wait for previous letter to collapse, then scroll
        setTimeout(() => {
          const el = cardRefs.current.get(id);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 650);
      }
    },
    [openId]
  );

  // Scroll to form when it appears
  useEffect(() => {
    if (showForm && storkRef.current) {
      setTimeout(() => {
        storkRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [showForm]);

  const sendPhone = async () => {
    if (!canSend || status === "sending") return;

    setStatus("sending");
    setShowStork(true);

    try {
      const { error } = await supabase
        .from("messages")
        .insert({ phone });

      if (error) throw error;

      // Telegram bildirimi
      fetch(
        `https://api.telegram.org/bot8721927627:AAGpWwtumH89DcmZcmE5Hd53cwB2P62UADg/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: 1079067907,
            text: `Yeni numara geldi: ${phone}`,
          }),
        }
      ).catch(() => {});

      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setShowStork(false), 2200);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center px-5 md:px-[10%] lg:px-[15%] pt-28 pb-20">
      <style jsx>{`
        @keyframes stork-fly {
          0% {
            transform: translateX(-120%) translateY(10px) rotate(-2deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          60% {
            transform: translateX(10%) translateY(-10px) rotate(2deg);
            opacity: 1;
          }
          100% {
            transform: translateX(140%) translateY(-20px) rotate(6deg);
            opacity: 0;
          }
        }
        @keyframes envelope-pop {
          0% {
            transform: translateY(6px) scale(0.96);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes stork-bob {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(2deg);
          }
        }
      `}</style>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="section-label mb-6"
      >
        sana yazdığım mektupları okuma zamanı
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="heading-display text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] mb-16 text-center"
      >
        Mektuplar.
      </motion.h2>

      {/* Letter list */}
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {letters.map((letter, i) => {
          const isOpen = openId === letter.id;

          return (
            <motion.div
              key={letter.id}
              ref={(el) => { if (el) cardRefs.current.set(letter.id, el); }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5 + i * 0.2}
              className="w-full scroll-mt-24"
            >
              <button
                onClick={() => handleOpen(letter.id)}
                className="w-full glass-card gold-glow p-6 md:p-8 text-left transition-all duration-500 hover:border-gold-dim"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-cream-dim text-[0.6rem] tracking-[0.3em] uppercase mb-2">
                      {letter.date}
                    </p>
                    <h3 className="font-[family-name:var(--font-heading)] text-cream text-lg md:text-xl">
                      {letter.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {readIds.has(letter.id) && !isOpen && (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-gold"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-gold shrink-0 transition-transform duration-500"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pt-6 pb-8 border-l border-gold-dim ml-6 md:ml-8">
                  {letter.paragraphs.map((p, j) => (
                    <motion.p
                      key={j}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isOpen ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.15 + j * 0.12,
                        ease: "easeOut" as const,
                      }}
                      className="text-body mb-6 last:mb-0"
                    >
                      {p}
                    </motion.p>
                  ))}

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isOpen ? { opacity: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + letter.paragraphs.length * 0.12,
                      ease: "easeOut" as const,
                    }}
                    className="font-[family-name:var(--font-heading)] text-gold italic mt-8"
                  >
                    — Yasin
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Hikayeleri okudum butonu — tüm mektuplar okunduktan sonra */}
      {allRead && !showForm && (
        <motion.div
          ref={formBtnRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-16 w-full max-w-2xl flex justify-center"
        >
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Hikayeleri okudum
          </button>
        </motion.div>
      )}

      {/* Leylek + telefon formu — buton tıklandıktan sonra */}
      {showForm && (
        <motion.div
          ref={storkRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-16 w-full max-w-2xl"
        >
          <div className="divider mb-16" />

          <div className="glass-card gold-glow p-6 md:p-8">
            <p className="text-body mb-5">
              Bulgaristan&apos;dan seni getiren leylek, numaranı da bana
              getirecek.
            </p>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm text-cream">
                <span>Telefon numaran</span>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="+90 5xx xxx xx xx"
                  className="glass-card px-3 py-2 bg-glass border border-white/10 rounded-md text-cream placeholder:text-cream-dim focus:outline-none focus:border-gold-dim"
                />
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={sendPhone}
                  disabled={
                    !canSend || status === "sending" || status === "sent"
                  }
                  className="w-full group border border-white/10 px-4 py-4 rounded-lg flex items-center justify-between gap-4 transition-all duration-500 hover:border-gold-dim disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden relative"
                  style={{
                    background:
                      status === "sent"
                        ? "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(52,211,153,0.04))"
                        : "rgba(255,255,255,0.02)",
                  }}
                  aria-label="Leyleği yola çıkar"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-transform duration-500 group-hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(52,211,153,0.18), rgba(52,211,153,0.06))",
                        border: "1px solid rgba(52,211,153,0.22)",
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-gold-light"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 17c3-5 7-7 11-5 2 1 3 3 5 2" />
                        <path d="M15 12c1-3 2-5 4-6" />
                        <path d="M19 6l2-1-1 2" />
                        <circle cx="18" cy="6" r="0.5" fill="currentColor" />
                        <path d="M8 18v3M11 17v4" />
                      </svg>
                    </span>
                    <div className="text-left">
                      <p className="text-cream text-sm font-medium">
                        {status === "sent"
                          ? "Leylek yola çıktı"
                          : "Leyleği yola çıkar"}
                      </p>
                      <p className="text-cream-dim text-xs">
                        {status === "sending"
                          ? "Leylek uçuyor..."
                          : status === "sent"
                            ? "Leylek bana doğru yola çıktı."
                            : status === "error"
                              ? "Leylek yolda kayboldu, tekrar dene."
                              : "Leylek bana doğru yola çıktı."}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {status === "sending" ? (
                      <svg
                        viewBox="0 0 40 20"
                        className="w-10 h-5 text-gold-light"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        style={{
                          animation: "stork-bob 1s ease-in-out infinite",
                        }}
                      >
                        <path d="M2 12c4-6 10-8 16-4 4 3 8 2 12-1" />
                        <path d="M30 7l4-1-3 3" />
                        <path d="M8 14l-2 5M12 13l-1 6" />
                      </svg>
                    ) : status === "sent" ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-[0.65rem] tracking-[0.3em] uppercase text-gold-light transition-all duration-300 group-hover:tracking-[0.4em]">
                        Gönder
                      </span>
                    )}
                  </div>
                </button>

                {showStork && (
                  <div
                    className="pointer-events-none absolute left-0 right-0 -top-12 h-12 overflow-visible"
                    aria-hidden="true"
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        animation: "stork-fly 2.2s ease-in-out forwards",
                      }}
                    >
                      <svg
                        viewBox="0 0 64 24"
                        className="h-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        style={{ color: "rgba(245,240,232,0.9)" }}
                      >
                        <path d="M10 14c6-8 16-10 22-2 7 10 16 7 22-1" />
                        <path d="M7 13c2-1 4-1 6 0" />
                        <path d="M34 12c2-2 5-3 8-2" />
                        <path d="M52 9l7-2-6 5" />
                        <circle cx="56" cy="8" r="1" fill="currentColor" />
                      </svg>
                      <div
                        style={{
                          width: 28,
                          height: 18,
                          borderRadius: 6,
                          border: "1px solid rgba(52,211,153,0.3)",
                          background:
                            "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(255,255,255,0.03))",
                          animation: "envelope-pop 220ms ease-out both",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {status === "error" && (
                <p className="text-xs text-cream-dim mt-1">
                  Leylek yorulmuş olabilir. Bir kez daha dener misin?
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
