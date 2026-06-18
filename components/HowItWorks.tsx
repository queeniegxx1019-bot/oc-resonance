"use client";

import { useLanguage } from "./LanguageProvider";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { title: t("step1Title"), description: t("step1Desc") },
    { title: t("step2Title"), description: t("step2Desc") },
    { title: t("step3Title"), description: t("step3Desc") },
  ];

  return (
    <section className="relative z-10 border-y border-white/10 bg-black/20 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center font-display text-3xl font-semibold md:text-4xl">
          {t("howTitle")}
        </h2>
        <ol className="mt-10 space-y-0">
          {steps.map((step, index) => (
            <li key={step.title}>
              <div className="flex gap-5 rounded-2xl border border-white/10 bg-forest-800/70 p-5 backdrop-blur-md">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-300/15 text-sm font-semibold text-sage-300">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-sage-muted">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="py-1 text-center text-lg text-sage-500/60" aria-hidden="true">
                  ↓
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
