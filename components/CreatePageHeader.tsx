"use client";

import { useLanguage } from "./LanguageProvider";

export default function CreatePageHeader() {
  const { t } = useLanguage();

  return (
    <header className="mb-10 text-center">
      <h1 className="font-display text-4xl font-semibold md:text-5xl">{t("createTitle")}</h1>
      <p className="mt-3 text-sage-muted">{t("createSubtitle")}</p>
    </header>
  );
}
