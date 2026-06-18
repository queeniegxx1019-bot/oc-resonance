"use client";

import Button from "./Button";
import { useLanguage } from "./LanguageProvider";

export default function ExamplePreview() {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-lg">
        <h2 className="text-center font-display text-3xl font-semibold md:text-4xl">
          {t("exampleTitle")}
        </h2>

        <article className="mt-8 rounded-2xl border border-white/10 bg-forest-800/70 p-8 backdrop-blur-md">
          <div className="space-y-5 text-center">
            <div>
              <p className="text-sm text-sage-400">🌿 {t("plantResonance")}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-sage-300">
                {t("examplePlant")}
              </p>
            </div>
            <div>
              <p className="text-sm text-sage-400">🐾 {t("animalResonance")}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-sage-300">
                {t("exampleAnimal")}
              </p>
            </div>
            <p className="text-sm tracking-wide text-sage-muted">✨ {t("exampleKeywords")}</p>
          </div>

          <div className="mt-8 flex justify-center">
            <Button href="/example" variant="secondary">
              {t("exampleCta")}
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
