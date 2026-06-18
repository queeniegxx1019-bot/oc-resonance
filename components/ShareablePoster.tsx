"use client";

import Image from "next/image";
import { useState } from "react";
import { bt } from "@/lib/i18n/translations";
import { pickText, type ResonanceReport } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";

interface ShareablePosterProps {
  report: ResonanceReport;
  premium?: boolean;
  id?: string;
}

function IllustrationBlock({
  imageUrl,
  emoji,
  label,
}: {
  imageUrl?: string;
  emoji: string;
  label: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-sage-300/15 to-blossom-400/10 shadow-glow">
        {imageUrl && !failed ? (
          <Image
            src={imageUrl}
            alt={label}
            fill
            className="object-cover"
            sizes="112px"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-5xl">{emoji}</span>
        )}
        <div className="absolute -inset-2 rounded-full bg-sage-300/5 blur-xl" />
      </div>
      <p className="mt-2 max-w-[8rem] text-center text-[10px] uppercase tracking-wider text-sage-muted">
        {label}
      </p>
    </div>
  );
}

export default function ShareablePoster({ report, premium = false, id }: ShareablePosterProps) {
  const { locale, t } = useLanguage();

  return (
    <div
      id={id}
      className={`relative mx-auto w-full max-w-[360px] overflow-hidden rounded-3xl border border-white/15 shadow-glow-lg ${
        premium
          ? "bg-gradient-to-b from-[#1a2820] via-[#162018] to-[#1e1420]"
          : "bg-gradient-to-b from-[#1a2820] via-[#162018] to-[#121a14]"
      }`}
      style={{ aspectRatio: "9/16" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,228,160,0.14),transparent_55%)]" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blossom-400/10 blur-3xl" />
      <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-sage-300/10 blur-3xl" />

      <div className="relative flex h-full flex-col px-6 py-8">
        <header className="text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-sage-500">OC Resonance</p>
          {premium && (
            <span className="mt-1.5 inline-block rounded-full border border-blossom-300/30 bg-blossom-400/15 px-2 py-0.5 text-[9px] font-medium text-blossom-300">
              ✦ {t("premiumBadge")}
            </span>
          )}
          <h2 className="mt-2 font-display text-3xl font-semibold italic leading-tight text-mist">
            {report.character.name}
          </h2>
        </header>

        <div className="my-5 flex flex-1 items-center justify-center gap-6">
          <IllustrationBlock
            imageUrl={report.plant.imageUrl}
            emoji="🌿"
            label={pickText(report.plant.name, locale)}
          />
          <IllustrationBlock
            imageUrl={report.animal.imageUrl}
            emoji="🐾"
            label={pickText(report.animal.name, locale)}
          />
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
          <div>
            <p className="text-xs text-sage-400">🌿 {t("plantResonance")}</p>
            <p className="font-display text-xl font-semibold text-sage-300">
              {pickText(report.plant.name, locale)}
            </p>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div>
            <p className="text-xs text-sage-400">🐾 {t("animalResonance")}</p>
            <p className="font-display text-xl font-semibold text-sage-300">
              {pickText(report.animal.name, locale)}
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {report.keywords.map((kw) => (
              <span
                key={kw.zh}
                className="rounded-full border border-sage-300/20 bg-sage-300/10 px-3 py-1 text-xs text-sage-300"
              >
                {bt(kw, locale)}
              </span>
            ))}
          </div>
        </div>

        <footer className="mt-auto pt-5 text-center">
          <p className="text-[10px] font-medium tracking-wider text-sage-400">OC Resonance</p>
          <p className="mt-0.5 text-[9px] text-sage-muted/60">{t("posterFooter")}</p>
        </footer>
      </div>
    </div>
  );
}
