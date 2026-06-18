"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { canAnalyze } from "@/lib/usage";
import { EMPTY_CHARACTER, PENDING_KEY, type CharacterInput } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import Button from "./Button";
import TagInput, { formInputClass, formLabelClass } from "./TagInput";

export default function CharacterForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [form, setForm] = useState<CharacterInput>({ ...EMPTY_CHARACTER });
  const [error, setError] = useState("");

  function updateField<K extends keyof CharacterInput>(key: K, value: CharacterInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError(t("errorNameRequired"));
      return;
    }

    if (!canAnalyze()) {
      setError(t("errorLimitReached"));
      return;
    }

    sessionStorage.setItem(PENDING_KEY, JSON.stringify(form));
    router.push("/loading");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="rounded-2xl border border-white/10 bg-forest-800/70 p-5 backdrop-blur-md md:p-7">
        <legend className="px-2 font-display text-lg font-semibold text-sage-300">
          {t("formRequired")}
        </legend>
        <div className="mt-4 space-y-5">
          <label className="block space-y-2">
            <span className={formLabelClass}>{t("fieldName")}</span>
            <input
              className={formInputClass}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder={t("fieldNamePlaceholder")}
              required
            />
          </label>

          <TagInput
            label={t("fieldTraits")}
            placeholder={t("fieldTraitsPlaceholder")}
            hint={t("tagHint")}
            value={form.traits}
            onChange={(v) => updateField("traits", v)}
          />

          <TagInput
            label={t("fieldStrengths")}
            placeholder={t("fieldStrengthsPlaceholder")}
            hint={t("tagHint")}
            value={form.strengths}
            onChange={(v) => updateField("strengths", v)}
          />

          <TagInput
            label={t("fieldWeaknesses")}
            placeholder={t("fieldWeaknessesPlaceholder")}
            hint={t("tagHint")}
            value={form.weaknesses}
            onChange={(v) => updateField("weaknesses", v)}
          />

          <label className="block space-y-2">
            <span className={formLabelClass}>{t("fieldSummary")}</span>
            <textarea
              className={`${formInputClass} min-h-[88px] resize-y`}
              value={form.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              placeholder={t("fieldSummaryPlaceholder")}
              rows={3}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-dashed border-sage-500/20 bg-forest-800/50 p-5 backdrop-blur-md md:p-7">
        <legend className="px-2 font-display text-base font-semibold text-sage-muted">
          {t("formOptional")}
        </legend>
        <div className="mt-4 space-y-4">
          <label className="block space-y-2">
            <span className={formLabelClass}>{t("fieldBackground")}</span>
            <textarea
              className={`${formInputClass} min-h-[72px] resize-y`}
              value={form.background}
              onChange={(e) => updateField("background", e.target.value)}
              placeholder={t("fieldBackgroundPlaceholder")}
              rows={2}
            />
          </label>
          <label className="block space-y-2">
            <span className={formLabelClass}>{t("fieldEvent")}</span>
            <textarea
              className={`${formInputClass} min-h-[72px] resize-y`}
              value={form.importantEvent}
              onChange={(e) => updateField("importantEvent", e.target.value)}
              placeholder={t("fieldEventPlaceholder")}
              rows={2}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-dashed border-sage-500/20 bg-forest-800/50 p-5 backdrop-blur-md md:p-7">
        <legend className="px-2 font-display text-base font-semibold text-sage-muted">
          {t("formSupplementary")}
        </legend>
        <div className="mt-4 space-y-5">
          <TagInput
            label={t("fieldHobbies")}
            placeholder={t("fieldHobbiesPlaceholder")}
            hint={t("tagHint")}
            value={form.hobbies}
            onChange={(v) => updateField("hobbies", v)}
          />

          <TagInput
            label={t("fieldFavoriteFoods")}
            placeholder={t("fieldFavoriteFoodsPlaceholder")}
            hint={t("tagHint")}
            value={form.favoriteFoods}
            onChange={(v) => updateField("favoriteFoods", v)}
          />

          <TagInput
            label={t("fieldDislikedFoods")}
            placeholder={t("fieldDislikedFoodsPlaceholder")}
            hint={t("tagHint")}
            value={form.dislikedFoods}
            onChange={(v) => updateField("dislikedFoods", v)}
          />

          <TagInput
            label={t("fieldFears")}
            placeholder={t("fieldFearsPlaceholder")}
            hint={t("tagHint")}
            value={form.fears}
            onChange={(v) => updateField("fears", v)}
          />
        </div>
      </fieldset>

      {error && (
        <p className="rounded-xl border border-blossom-400/30 bg-blossom-400/10 px-4 py-3 text-center text-sm text-blossom-300">
          {error}
        </p>
      )}

      <div className="flex justify-center pt-2 pb-4">
        <Button type="submit" size="lg" className="w-full max-w-sm sm:w-auto">
          {t("submitButton")}
        </Button>
      </div>
    </form>
  );
}
