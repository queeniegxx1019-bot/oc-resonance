"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "./LanguageProvider";

interface HeaderProps {
  active?: "home" | "create";
}

export default function Header({ active = "home" }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-12">
      <Link href="/" className="group inline-flex items-center gap-2.5 text-mist no-underline">
        <span className="text-lg text-sage-300 transition group-hover:scale-110">✦</span>
        <span className="font-display text-2xl font-semibold tracking-wide">{t("siteName")}</span>
      </Link>
      <div className="flex items-center gap-4 md:gap-6">
        <LanguageSwitcher />
        <nav className="flex gap-5">
          <Link
            href="/"
            className={`text-sm font-medium transition ${
              active === "home" ? "text-sage-300" : "text-sage-muted hover:text-sage-300"
            }`}
          >
            {t("navHome")}
          </Link>
          <Link
            href="/create"
            className={`text-sm font-medium transition ${
              active === "create" ? "text-sage-300" : "text-sage-muted hover:text-sage-300"
            }`}
          >
            {t("navCreate")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
