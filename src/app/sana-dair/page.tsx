"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const items = [
  {
    title: "Güçlülüğün",
    description:
      "Zor bir dönemden geçiyorsun ama ayakta duruyorsun. Ne istediğini biliyorsun. Bu çok değerli.",
  },
  {
    title: "Samimiyetin",
    description:
      "Lafı dolandırmadın, açık konuştun. Hassas bir dönemde olduğunu söylemekten çekinmedin. Bu güven çok değerli.",
  },
  {
    title: "Tutkun",
    description:
      "Dövmelerin, üretme isteğin, çizimlerin... Ellerinle bir şeyler yaratıyorsun. Bu benim için hayranlık verici bir şey.",
  },
  {
    title: "Huzurun",
    description:
      "Kaostan uzak, sakin bir hayat istiyorsun. Ben de tam olarak bunu arıyorum. Gözlerimizle iletişim kurabileceğimiz, iletişim kurarken yorulmadığımız bir hayat.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: "easeOut" as const },
  }),
};

export default function SanaDairPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-[10%] lg:px-[15%] py-28">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="section-label mb-6"
      >
        sende fark ettiğim şeyler
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.2}
        className="heading-display text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] mb-16 text-center"
      >
        Sana Dair.
      </motion.h2>

      <div className="w-full max-w-2xl">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.6 + i * 0.4}
            className={`flex gap-5 py-7 ${
              i < items.length - 1
                ? "border-b border-white/[0.06]"
                : ""
            }`}
          >
            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <div>
              <h3 className="text-cream font-medium text-base md:text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-body">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2.8}
        className="mt-16 w-full md:w-auto"
      >
        <Link href="/itiraf" className="btn-primary">
          Devam et
        </Link>
      </motion.div>
    </section>
  );
}
