"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { label: t("footerAbout"), href: "/about" },
    { label: t("footerContact"), href: "/contact" },
    { label: t("footerPrivacy"), href: "/privacy" },
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-center md:px-12">
      <nav className="mb-4 flex justify-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-sage-muted transition hover:text-sage-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="text-sm text-sage-muted/80">{t("footerTagline")}</p>
    </footer>
  );
}
