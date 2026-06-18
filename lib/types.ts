import type { Locale } from "@/lib/i18n/translations";

export interface BilingualText {
  zh: string;
  en: string;
}

export interface CharacterInput {
  name: string;
  traits: string;
  strengths: string;
  weaknesses: string;
  summary: string;
  background: string;
  importantEvent: string;
  hobbies: string;
  favoriteFoods: string;
  dislikedFoods: string;
  fears: string;
}

export type ResonanceCategory = "plant" | "animal";

export interface ResonanceMatch {
  category: ResonanceCategory;
  icon: string;
  label: BilingualText;
  name: BilingualText;
  tagline: BilingualText;
  shortPoem: BilingualText;
  deepAnalysis: BilingualText;
  resonanceStory: BilingualText;
  growthInsight: BilingualText;
}

export interface PremiumPlantDetail {
  symbolism: BilingualText;
  flowerLanguage: BilingualText;
  emotionalMeaning: BilingualText;
  growthMeaning: BilingualText;
}

export interface PremiumAnimalDetail {
  instinct: BilingualText;
  behaviorSymbolism: BilingualText;
  relationshipPattern: BilingualText;
  protectiveTraits: BilingualText;
}

export interface GrowthTrajectory {
  past: BilingualText;
  present: BilingualText;
  future: BilingualText;
}

export interface PremiumContent {
  plantDetail: PremiumPlantDetail;
  animalDetail: PremiumAnimalDetail;
  growthTrajectory: GrowthTrajectory;
  narrativeEssay: BilingualText;
}

export interface ResonanceReport {
  version: 3;
  generatedAt: string;
  isPremium: boolean;
  character: {
    name: string;
    summary: string;
  };
  plant: ResonanceMatch;
  animal: ResonanceMatch;
  keywords: BilingualText[];
  premium: PremiumContent;
}

export const STORAGE_KEY = "oc-resonance-report";
export const PENDING_KEY = "oc-resonance-pending";
export const USAGE_KEY = "oc-resonance-usage";
export const DAILY_LIMIT = 3;

export const RESONANCE_ORDER: ResonanceCategory[] = ["plant", "animal"];

export const CATEGORY_META: Record<
  ResonanceCategory,
  { icon: string; label: BilingualText }
> = {
  plant: {
    icon: "🌿",
    label: { zh: "植物共鸣", en: "Plant Resonance" },
  },
  animal: {
    icon: "🐾",
    label: { zh: "动物共鸣", en: "Animal Resonance" },
  },
};

export const EMPTY_CHARACTER: CharacterInput = {
  name: "",
  traits: "",
  strengths: "",
  weaknesses: "",
  summary: "",
  background: "",
  importantEvent: "",
  hobbies: "",
  favoriteFoods: "",
  dislikedFoods: "",
  fears: "",
};

export function pickText(text: BilingualText, locale: Locale): string {
  return text[locale];
}

export function tagsToString(tags: string[]): string {
  return tags.join("、");
}

export function stringToTags(value: string): string[] {
  return value
    .split(/[,，、;\n]/)
    .map((t) => t.trim())
    .filter(Boolean);
}
