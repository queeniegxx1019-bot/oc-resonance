"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

type StaticPage = "about" | "contact" | "privacy";

interface StaticPageContentProps {
  page: StaticPage;
}

export default function StaticPageContent({ page }: StaticPageContentProps) {
  const { t } = useLanguage();

  const titles: Record<StaticPage, string> = {
    about: t("aboutTitle"),
    contact: t("contactTitle"),
    privacy: t("privacyTitle"),
  };

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8 text-center">
        <h1 className="font-display text-4xl font-semibold md:text-5xl">{titles[page]}</h1>
      </header>

      <article className="rounded-2xl border border-white/10 bg-forest-800/70 p-7 backdrop-blur-md md:p-9">
        {page === "about" && (
          <div className="space-y-5 text-sm leading-relaxed text-sage-muted md:text-base md:leading-loose">
            <p>{t("aboutP1")}</p>
            <p>{t("aboutP2")}</p>
            <p>{t("aboutP3")}</p>
            <p className="pt-2 text-right font-display italic text-sage-300">
              {t("aboutSignature")}
            </p>
          </div>
        )}

        {page === "contact" && (
          <div className="space-y-6">
            <section className="rounded-xl border border-white/10 bg-black/20 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-sage-500">
                {t("contactEmail")}
              </h2>
              <a
                href={`mailto:${t("contactEmailValue")}`}
                className="mt-2 block font-medium text-sage-300 transition hover:text-mist"
              >
                {t("contactEmailValue")}
              </a>
            </section>

            <section className="rounded-xl border border-white/10 bg-black/20 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-sage-500">
                {t("contactXhs")}
              </h2>
              <p className="mt-2 font-medium text-mist">{t("contactXhsId")}</p>
              <p className="mt-1 text-sm text-sage-muted">{t("contactXhsHandle")}</p>
            </section>
          </div>
        )}

        {page === "privacy" && (
          <div className="space-y-5 text-sm leading-relaxed text-sage-muted md:text-base">
            <p>{t("privacyIntro")}</p>
            <section>
              <h2 className="mb-2 font-display text-lg font-semibold text-sage-300">
                {t("privacySection1Title")}
              </h2>
              <p>{t("privacySection1Body")}</p>
            </section>
            <section>
              <h2 className="mb-2 font-display text-lg font-semibold text-sage-300">
                {t("privacySection2Title")}
              </h2>
              <p>{t("privacySection2Body")}</p>
            </section>
            <section>
              <h2 className="mb-2 font-display text-lg font-semibold text-sage-300">
                {t("privacySection3Title")}
              </h2>
              <p>{t("privacySection3Body")}</p>
            </section>
            <section>
              <h2 className="mb-2 font-display text-lg font-semibold text-sage-300">
                {t("privacySection4Title")}
              </h2>
              <p>
                {t("privacySection4Body")}{" "}
                <Link href="/contact" className="text-sage-300 underline-offset-2 hover:underline">
                  {t("footerContact")}
                </Link>
                {t("privacySection4BodyEnd")}
              </p>
            </section>
          </div>
        )}
      </article>
    </div>
  );
}
