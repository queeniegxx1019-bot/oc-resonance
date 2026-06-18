"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { unlockPremium } from "@/lib/premium";
import { STORAGE_KEY, type ResonanceReport } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import Button from "./Button";

function QrPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-dashed border-sage-500/30 bg-black/25">
        <span className="whitespace-pre-line px-4 text-center text-xs text-sage-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function PremiumUnlockView() {
  const router = useRouter();
  const { t } = useLanguage();

  function handleConfirmPayment() {
    unlockPremium();
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const report = JSON.parse(raw) as ResonanceReport;
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...report, isPremium: true }));
      } catch {
        /* ignore */
      }
    }
    router.push("/report/premium");
  }

  return (
    <>
      <header className="mb-8 text-center">
        <span className="inline-block rounded-full border border-blossom-300/30 bg-blossom-400/15 px-3 py-1 text-xs font-medium text-blossom-300">
          ✦ {t("premiumBadge")}
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
          {t("premiumPageTitle")}
        </h1>
        <p className="mt-3 font-display text-5xl font-semibold text-blossom-300">
          {t("premiumPrice")}
        </p>
        <p className="mt-2 text-sm text-sage-muted">{t("premiumPriceNote")}</p>
      </header>

      <article className="rounded-2xl border border-blossom-400/25 bg-gradient-to-br from-blossom-400/10 via-forest-800/80 to-forest-800/70 p-7 backdrop-blur-md md:p-8">
        <p className="text-center text-sm leading-relaxed text-sage-muted">
          {t("premiumPageDesc")}
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="space-y-3 text-center">
            <QrPlaceholder label={t("wechatQrPlaceholder")} />
            <p className="text-sm font-medium text-sage-300">{t("wechatPay")}</p>
          </div>
          <div className="space-y-3 text-center">
            <QrPlaceholder label={t("alipayQrPlaceholder")} />
            <p className="text-sm font-medium text-sage-300">{t("alipayPay")}</p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-sage-muted/70">{t("premiumPayNote")}</p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <Button onClick={handleConfirmPayment} size="lg">
            {t("premiumConfirmPaid")}
          </Button>
          <Link
            href="/report"
            className="text-sm text-sage-muted transition hover:text-sage-300"
          >
            {t("premiumBackToReport")}
          </Link>
        </div>
      </article>
    </>
  );
}
