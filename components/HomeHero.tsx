"use client";

import Button from "./Button";
import BotanicalIllustration from "./BotanicalIllustration";
import { useLanguage } from "./LanguageProvider";

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="px-5 pb-12 pt-8 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-sage-muted md:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button href="/create" size="lg">
              {t("heroCta")}
            </Button>
            <Button href="/example" variant="secondary" size="lg">
              {t("heroCtaSecondary")}
            </Button>
          </div>
        </div>
        <div className="w-full flex-1">
          <BotanicalIllustration />
        </div>
      </div>
    </section>
  );
}
