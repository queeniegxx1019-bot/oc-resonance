"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pickText, RESONANCE_ORDER, STORAGE_KEY, type ResonanceReport } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import Button from "./Button";

function PoemBlock({ text }: { text: string }) {
  return (
    <div className="whitespace-pre-line text-base leading-loose text-mist/95 md:text-lg">
      {text}
    </div>
  );
}

export default function FreeReportView() {
  const { locale, t } = useLanguage();
  const [report, setReport] = useState<ResonanceReport | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setLoaded(true);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as ResonanceReport;
      if (parsed.version !== 3 || !parsed.plant || !parsed.animal || !parsed.premium) {
        sessionStorage.removeItem(STORAGE_KEY);
        setReport(null);
      } else {
        setReport(parsed);
      }
    } catch {
      setReport(null);
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="py-20 text-center text-sage-muted">
        <p>{t("reportLoading")}</p>
      </div>
    );
  }

  if (!report?.character?.name) {
    return (
      <div className="py-20 text-center text-sage-muted">
        <p>{t("reportNoData")}</p>
        <Link href="/create" className="mt-2 inline-block text-sage-300 hover:underline">
          {t("reportCreateLink")}
        </Link>
      </div>
    );
  }

  const items = RESONANCE_ORDER.map((key) => report[key]);

  return (
    <>
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-sage-500">{t("reportEyebrow")}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold italic md:text-5xl">
          {report.character.name}
        </h1>
      </header>

      <section className="mb-10 space-y-6">
        {items.map((item) => (
          <article
            key={item.category}
            className="rounded-2xl border border-white/10 bg-card-shine bg-forest-800/70 p-7 backdrop-blur-md md:p-8"
          >
            <p className="flex items-center gap-2 text-sm font-medium text-sage-400">
              <span className="text-xl">{item.icon}</span>
              {pickText(item.label, locale)}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-300 md:text-4xl">
              {pickText(item.name, locale)}
            </h2>
            <div className="mt-5">
              <PoemBlock text={pickText(item.shortPoem, locale)} />
            </div>
          </article>
        ))}
      </section>

      <section className="mb-10 rounded-2xl border border-white/10 bg-forest-800/70 p-7 text-center backdrop-blur-md">
        <p className="text-sm font-medium text-sage-400">✨ {t("keywordsTitle")}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          {report.keywords.map((kw) => (
            <span
              key={kw.zh}
              className="rounded-full border border-sage-300/25 bg-sage-300/10 px-4 py-1.5 text-sm font-medium text-sage-300"
            >
              {pickText(kw, locale)}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-blossom-400/25 bg-gradient-to-br from-blossom-400/10 via-forest-800/80 to-forest-800/70 p-8 text-center backdrop-blur-md">
        <h2 className="font-display text-2xl font-semibold">{t("unlockTitle")}</h2>
        <p className="mt-3 font-display text-4xl font-semibold text-blossom-300">
          {t("premiumPrice")}
        </p>
        <p className="mt-1 text-xs text-sage-muted">{t("premiumPriceNote")}</p>
        <div className="mt-6">
          <Button href="/premium" size="lg">
            {t("unlockCta")}
          </Button>
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Button variant="ghost" href="/create">
          {t("analyzeAnother")}
        </Button>
      </div>
    </>
  );
}
