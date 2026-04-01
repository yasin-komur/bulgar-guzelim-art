"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: "easeOut" as const },
  }),
};


export default function HikayePage() {
  const [cardOpen, setCardOpen] = useState(false);

  return (
    <div className="pt-20">
      {/* Section 1: İlk İzlenim */}
      <section className="min-h-screen flex flex-col justify-center px-5 md:px-[10%] lg:px-[15%] py-20">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="section-label mb-6"
        >
          nasıl başladı
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className="heading-display text-[2.2rem] md:text-[3.5rem] lg:text-[4rem] mb-10"
        >
          Profilini ilk gördüğüm an.
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="glass-card gold-glow p-8 md:p-12 mb-10 max-w-2xl"
        >
          <p className="font-[family-name:var(--font-heading)] text-cream text-lg md:text-xl italic leading-relaxed mb-4">
            &ldquo;Güzel zaman geçirebileceğim, birlikte spor yapıp
            gezebileceğim ve birçok farklı konuda sohbet edebileceğim biri
            ile tanışmak güzel olur. Kaostan uzak, sakin ve anlaşırsak uzun
            vadeli bir ilişki arıyorum.&rdquo;
          </p>
          <p className="text-cream-dim text-sm italic">
            Kalabalıklar benim kabusum.
          </p>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.8}
          className="text-body max-w-xl mb-6"
        >
          O satırları okuyunca bir an durdum. Kaostan uzak, sakin bir hayat...
          birlikte spor yapıp gezebileceğin biri... Tam olarak aradığım şeyi
          yazmıştın. Sonra fotoğraflarına baktım...
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1.1}
          className="font-[family-name:var(--font-heading)] text-gold-light italic text-lg md:text-xl max-w-xl"
        >
          İnanılmaz güzeldin. Gözlerimi alamadım.
        </motion.p>
      </section>

      <div className="divider" />

      {/* Section 2: Tanışma */}
      <section className="min-h-screen flex flex-col justify-center px-5 md:px-[10%] lg:px-[15%] py-20">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="section-label mb-6"
        >
          seninle konuşmak
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className="heading-display text-[2.2rem] md:text-[3.5rem] lg:text-[4rem] mb-10"
        >
          Lafı dolandırmayı sevmiyorum.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="text-body max-w-xl mb-6"
        >
          Yaptığın dövmelerden, kedilerden, spordan, kitaplardan
          konuştuk. Ortak şeyleri konuşabilmek çok güzeldi.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.8}
          className="text-body max-w-xl mb-6"
        >
          Zor bir dönemden geçtiğinin farkındaydım. Hassas kalbine hassas
          adımlarla yaklaşmaya çalıştım.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1.1}
          className="font-[family-name:var(--font-heading)] text-gold-light italic text-lg md:text-xl max-w-xl"
        >
          Hassas olduğun kadar güçlü bir kadın olduğunu da görebiliyorum.
        </motion.p>
      </section>

      <div className="divider" />

      {/* Section 3: İlk Buluşma */}
      <section className="min-h-screen flex flex-col justify-center px-5 md:px-[10%] lg:px-[15%] py-20">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="section-label mb-6"
        >
          ilk buluşma
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className="heading-display text-[2.2rem] md:text-[3.5rem] lg:text-[4rem] mb-10"
        >
          Seni ilk gördüğüm an.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="text-body max-w-xl mb-6"
        >
          Tatlı, çekingen bir gelişin vardı. Gözlerinin güzelliği, tebessüm
          ettiğindeki mimiklerin ve saçlarının özgürlüğü sana dair ilk
          izlenimleri verdi bana.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.8}
          className="text-body max-w-xl mb-6"
        >
          Yağmurda yürüdük, uno oynadık, tatlıcıya geçtik. Ettiğin her
          kelimede ve göz göze gelişimizde sana karşı daha da hayranlık
          beslediğimi hissediyordum.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1.1}
          className="font-[family-name:var(--font-heading)] text-gold-light italic text-lg md:text-xl max-w-xl"
        >
          Sarılmadan önce son tebessümünde eve dönüş yolluğumu almıştım.
        </motion.p>
      </section>

      <div className="divider" />

      {/* Section 4 */}
      <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-[10%] lg:px-[15%] py-20">
        {/* Kapalı kart — tıkla aç */}
        {!cardOpen && (
          <>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="section-label mb-10"
          >
            son bir kart daha
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="glass-card gold-glow p-8 md:p-10 flex flex-col items-center gap-5 cursor-pointer transition-all duration-500 hover:border-gold-dim"
            onClick={() => setCardOpen(true)}
          >
            <span className="text-gold text-4xl font-[family-name:var(--font-heading)]">
              &#10022;
            </span>
            <span className="text-cream-dim text-xs tracking-[0.3em] uppercase">
              Tıkla
            </span>
          </motion.div>
          </>
        )}

        {/* Açılan içerik */}
        {cardOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-10 w-full max-w-md overflow-hidden rounded-2xl gold-glow"
            >
              <img
                src="/photos/hand.png"
                alt=""
                className="w-full h-auto"
                style={{
                  filter: "saturate(0.7) brightness(0.9)",
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="font-[family-name:var(--font-heading)] text-gold-light italic text-lg md:text-xl text-center max-w-lg mb-6"
            >
              Oyundaki el değiştirme kartının sanırım bir anlamı vardı.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="text-body text-center max-w-lg mb-12"
            >
              Birbirimize iyi geleceğimizi düşünüyorum. Hayat çok kısa ve
              yanlış insanlarla harcayamayacağımız kadar değerli.
            </motion.p>
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={cardOpen ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="w-full md:w-auto"
        >
          <Link href="/sana-dair" className="btn-primary">
            Devam et
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
