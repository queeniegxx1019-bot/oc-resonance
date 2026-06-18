"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isPremiumUnlocked } from "@/lib/premium";
import { pickText, STORAGE_KEY, type ResonanceReport } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import Button from "./Button";
import ShareablePoster from "./ShareablePoster";

function DetailGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-white/5 bg-black/15 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-sage-500">
            {item.label}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-sage-muted">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default function PremiumReportView() {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [report, setReport] = useState<ResonanceReport | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!isPremiumUnlocked()) {
      router.replace("/premium");
      return;
    }

    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setLoaded(true);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as ResonanceReport;
      if (!parsed.premium) {
        setReport(null);
      } else {
        setReport({ ...parsed, isPremium: true });
      }
    } catch {
      setReport(null);
    }
    setLoaded(true);
  }, [router]);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 3200);
  }

  function handleDownload() {
    window.print();
    showToast(t("toastPrint"));
  }

  async function handleShare() {
    if (!report) return;
    const text = [
      `✦ ${report.character.name} — OC Resonance`,
      `🌿 ${pickText(report.plant.name, locale)}`,
      `🐾 ${pickText(report.animal.name, locale)}`,
    ].join("\n");

    try {
      if (navigator.share) {
        await navigator.share({ title: report.character.name, text });
        return;
      }
    } catch {
      /* fallback */
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast(t("toastCopied"));
    } catch {
      showToast(t("toastShareUnavailable"));
    }
  }

  if (!loaded) {
    return (
      <div className="py-20 text-center text-sage-muted">
        <p>{t("reportLoading")}</p>
      </div>
    );
  }

  if (!report?.premium) {
    return (
      <div className="py-20 text-center text-sage-muted">
        <p>{t("reportNoData")}</p>
        <Link href="/create" className="mt-2 inline-block text-sage-300 hover:underline">
          {t("reportCreateLink")}
        </Link>
      </div>
    );
  }

  const { premium: p } = report;

  return (
    <>
      <header className="mb-10 text-center">
        <span className="inline-block rounded-full border border-blossom-300/30 bg-blossom-400/15 px-3 py-1 text-xs font-medium text-blossom-300">
          ✦ {t("premiumBadge")}
        </span>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-sage-500">
          {t("premiumEyebrow")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold italic md:text-5xl">
          {report.character.name}
        </h1>
      </header>

      <article className="mb-8 rounded-2xl border border-white/10 bg-forest-800/70 p-7 backdrop-blur-md md:p-8">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-sage-300">
          🌿 {t("plantDeepTitle")}
        </h2>
        <DetailGrid
          items={[
            { label: t("symbolism"), value: pickText(p.plantDetail.symbolism, locale) },
            { label: t("flowerLanguage"), value: pickText(p.plantDetail.flowerLanguage, locale) },
            {
              label: t("emotionalMeaning"),
              value: pickText(p.plantDetail.emotionalMeaning, locale),
            },
            { label: t("growthMeaning"), value: pickText(p.plantDetail.growthMeaning, locale) },
          ]}
        />
      </article>

      <article className="mb-8 rounded-2xl border border-white/10 bg-forest-800/70 p-7 backdrop-blur-md md:p-8">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-sage-300">
          🐾 {t("animalDeepTitle")}
        </h2>
        <DetailGrid
          items={[
            { label: t("instinct"), value: pickText(p.animalDetail.instinct, locale) },
            {
              label: t("behaviorSymbolism"),
              value: pickText(p.animalDetail.behaviorSymbolism, locale),
            },
            {
              label: t("relationshipPattern"),
              value: pickText(p.animalDetail.relationshipPattern, locale),
            },
            {
              label: t("protectiveTraits"),
              value: pickText(p.animalDetail.protectiveTraits, locale),
            },
          ]}
        />
      </article>

      <article className="mb-8 rounded-2xl border border-white/10 bg-forest-800/70 p-7 backdrop-blur-md md:p-8">
        <h2 className="font-display text-2xl font-semibold text-sage-300">
          ✨ {t("growthTrajectoryTitle")}
        </h2>
        <div className="mt-5 space-y-4">
          {(
            [
              [t("past"), p.growthTrajectory.past],
              [t("present"), p.growthTrajectory.present],
              [t("future"), p.growthTrajectory.future],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/5 bg-black/15 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-sage-500">
                {label}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-sage-muted">
                {pickText(value, locale)}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="mb-10 rounded-2xl border border-white/10 bg-card-shine bg-forest-800/70 p-7 backdrop-blur-md md:p-8">
        <h2 className="font-display text-2xl font-semibold text-sage-300">
          🌙 {t("narrativeTitle")}
        </h2>
        <div className="mt-5 whitespace-pre-line text-sm leading-loose text-sage-muted md:text-base md:leading-loose">
          {pickText(p.narrativeEssay, locale)}
        </div>
      </article>

      <section className="mb-10 print:hidden">
        <h2 className="mb-2 text-center font-display text-2xl font-semibold">
          {t("sharePosterTitle")}
        </h2>
        <p className="mb-6 text-center text-sm text-sage-muted">{t("sharePosterHint")}</p>
        <ShareablePoster report={report} premium id="share-poster" />
      </section>

      <div className="flex flex-wrap justify-center gap-4 print:hidden">
        <Button variant="secondary" onClick={handleDownload}>
          {t("downloadImage")}
        </Button>
        <Button onClick={handleShare}>{t("shareResult")}</Button>
        <Button variant="ghost" href="/create">
          {t("analyzeAnother")}
        </Button>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/20 bg-forest-700/95 px-6 py-3 text-sm shadow-xl backdrop-blur-md">
          {toast}
        </div>
      )}
    </>
  );
}
