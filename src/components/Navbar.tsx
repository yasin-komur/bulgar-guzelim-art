"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hikaye", label: "Hikaye" },
  { href: "/sana-dair", label: "Sana Dair" },
  { href: "/itiraf", label: "İtiraf" },
  { href: "/mektuplar", label: "Mektuplar" },
];

export function Navbar() {
  const pathname = usePathname();

  if (pathname === "/final") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-4 bg-gradient-to-b from-bg/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between w-full">
        <Link
          href="/"
          className="font-[family-name:var(--font-heading)] text-gold text-xl font-medium tracking-wide"
        >
          S.
        </Link>

        {/* pr-14 ile müzik butonuna yer aç */}
        <div className="flex items-center gap-4 md:gap-8 pr-14">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[0.6rem] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase transition-colors duration-500 ${
                  isActive
                    ? "text-gold"
                    : "text-cream-dim hover:text-gold-light"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500 ${
                    isActive ? "w-full" : "w-0 hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
