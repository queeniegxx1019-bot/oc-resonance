"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-0.5 text-xs font-medium">
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={`rounded-full px-3 py-1.5 transition ${
          locale === "zh" ? "bg-sage-300/20 text-sage-300" : "text-sage-muted hover:text-sage-300"
        }`}
        aria-pressed={locale === "zh"}
      >
        中文
      </button>
      <span className="text-sage-muted/40" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-3 py-1.5 transition ${
          locale === "en" ? "bg-sage-300/20 text-sage-300" : "text-sage-muted hover:text-sage-300"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
