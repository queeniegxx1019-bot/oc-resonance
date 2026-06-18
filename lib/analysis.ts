import { ARCHETYPES, type ArchetypeOption } from "./archetypes";
import { generateMatchReason } from "./match-reason";
import { attachPremiumContent } from "./premium-content";
import type { BilingualText, CharacterInput, ResonanceReport } from "./types";
import { CATEGORY_META, type ResonanceCategory } from "./types";

const KEYWORD_POOL: BilingualText[] = [
  { zh: "守护", en: "Guardianship" },
  { zh: "忠诚", en: "Loyalty" },
  { zh: "隐忍", en: "Restraint" },
  { zh: "温柔", en: "Tenderness" },
  { zh: "希望", en: "Hope" },
  { zh: "孤独", en: "Solitude" },
  { zh: "坚韧", en: "Resilience" },
  { zh: "敏感", en: "Sensitivity" },
  { zh: "神秘", en: "Mystery" },
  { zh: "成长", en: "Growth" },
  { zh: "信任", en: "Trust" },
  { zh: "边界", en: "Boundaries" },
];

const KEYWORD_SIGNALS: { keywords: string[]; label: BilingualText }[] = [
  { keywords: ["protect", "guard", "shield", "守护", "保护"], label: { zh: "守护", en: "Guardianship" } },
  { keywords: ["loyal", "devotion", "commit", "忠诚", "忠心"], label: { zh: "忠诚", en: "Loyalty" } },
  { keywords: ["quiet", "reserved", "restrain", "安静", "内敛", "隐忍"], label: { zh: "隐忍", en: "Restraint" } },
  { keywords: ["gentle", "kind", "compassion", "温柔", "善良"], label: { zh: "温柔", en: "Tenderness" } },
  { keywords: ["hope", "renew", "heal", "希望", "治愈"], label: { zh: "希望", en: "Hope" } },
  { keywords: ["alone", "solitude", "lone", "孤独", "独自"], label: { zh: "孤独", en: "Solitude" } },
  { keywords: ["persist", "survive", "endure", "坚韧", "顽强", "坚持"], label: { zh: "坚韧", en: "Resilience" } },
  { keywords: ["sensitive", "empathy", "敏感", "共情"], label: { zh: "敏感", en: "Sensitivity" } },
  { keywords: ["mysterious", "secret", "hidden", "神秘", "隐藏"], label: { zh: "神秘", en: "Mystery" } },
  { keywords: ["grow", "change", "better", "成长", "改变"], label: { zh: "成长", en: "Growth" } },
  { keywords: ["trust", "bond", "friend", "信任", "羁绊"], label: { zh: "信任", en: "Trust" } },
  { keywords: ["boundaries", "wall", "defensive", "边界", "防御"], label: { zh: "边界", en: "Boundaries" } },
  { keywords: ["abandon", "loss", "失去", "抛弃", "attach", "attachment", "羁绊"], label: { zh: "羁绊", en: "Attachment" } },
  { keywords: ["garden", "园艺", "draw", "绘画", "art", "photo", "摄影", "read", "阅读"], label: { zh: "审美", en: "Aesthetic" } },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function collectCoreCorpus(data: CharacterInput): string {
  return [
    data.name,
    data.traits,
    data.strengths,
    data.weaknesses,
    data.summary,
    data.background,
    data.importantEvent,
  ]
    .filter(Boolean)
    .join(" ");
}

function collectSupplementaryCorpus(data: CharacterInput): string {
  return [data.hobbies, data.favoriteFoods, data.dislikedFoods, data.fears]
    .filter(Boolean)
    .join(" ");
}

function collectCorpus(data: CharacterInput): string {
  return [collectCoreCorpus(data), collectSupplementaryCorpus(data)].filter(Boolean).join(" ");
}

function extractTraits(data: CharacterInput): string[] {
  const explicit = (data.traits || "")
    .split(/[,，、;\n]/)
    .map((t) => t.trim())
    .filter(Boolean);

  const inferred: string[] = [];
  const corpus = collectCoreCorpus(data).toLowerCase();

  const traitSignals: [string, string][] = [
    ["quiet", "Quiet"],
    ["安静", "Quiet"],
    ["loyal", "Loyal"],
    ["忠诚", "Loyal"],
    ["protect", "Protective"],
    ["守护", "Protective"],
    ["sensitive", "Sensitive"],
    ["敏感", "Sensitive"],
    ["stubborn", "Stubborn"],
    ["固执", "Stubborn"],
  ];

  for (const [keyword, label] of traitSignals) {
    if (corpus.includes(keyword) && !inferred.includes(label)) inferred.push(label);
  }

  return [...new Set([...explicit, ...inferred])].slice(0, 6);
}

function scoreArchetype(
  archetype: ArchetypeOption,
  coreCorpus: string,
  supplementaryCorpus: string,
  traits: string[],
) {
  const coreLower = coreCorpus.toLowerCase();
  const suppLower = supplementaryCorpus.toLowerCase();
  let score = 0;
  const matchedKeywords: string[] = [];

  for (const keyword of archetype.keywords) {
    const kw = keyword.trim().toLowerCase();
    if (coreLower.includes(kw)) {
      score += 2;
      matchedKeywords.push(kw);
    } else if (suppLower.includes(kw)) {
      score += 0.6;
      matchedKeywords.push(kw);
    }
  }

  const traitText = traits.join(" ").toLowerCase();
  for (const keyword of archetype.keywords) {
    const kw = keyword.trim().toLowerCase();
    if (traitText.includes(kw) && !matchedKeywords.includes(kw)) {
      score += 1.5;
      matchedKeywords.push(kw);
    }
  }

  return { score, matchedKeywords };
}

function personalizePoem(
  poem: BilingualText,
  characterName: string,
): BilingualText {
  const name = characterName || "你的角色";
  const nameEn = characterName || "your character";

  return {
    zh: poem.zh.replace(/你的角色/g, name),
    en: poem.en.replace(/Your character/g, nameEn),
  };
}

function pickKeywords(corpus: string, supplementary: string, seed: number): BilingualText[] {
  const lower = `${corpus} ${supplementary}`.toLowerCase();
  const matched: BilingualText[] = [];

  for (const signal of KEYWORD_SIGNALS) {
    if (signal.keywords.some((k) => lower.includes(k.toLowerCase()))) {
      matched.push(signal.label);
    }
  }

  if (supplementary) {
    const suppLower = supplementary.toLowerCase();
    if (/园艺|garden|plant|花/.test(suppLower) && !matched.some((m) => m.zh === "审美")) {
      matched.push({ zh: "审美", en: "Aesthetic" });
    }
    if (/失去|abandon|孤独|alone/.test(suppLower) && !matched.some((m) => m.zh === "忠诚")) {
      matched.push({ zh: "忠诚", en: "Loyalty" });
    }
    if (/深海|dark|黑暗|deep/.test(suppLower) && !matched.some((m) => m.zh === "神秘")) {
      matched.push({ zh: "神秘", en: "Mystery" });
    }
  }

  if (matched.length < 5) {
    for (let i = 0; matched.length < 5 && i < KEYWORD_POOL.length; i++) {
      const candidate = KEYWORD_POOL[(seed + i * 3) % KEYWORD_POOL.length];
      if (!matched.some((m) => m.zh === candidate.zh)) matched.push(candidate);
    }
  }

  return matched.slice(0, 5);
}

interface AnalysisContext {
  coreCorpus: string;
  supplementaryCorpus: string;
  traits: string[];
}

function supplementaryCategoryBoost(
  category: ResonanceCategory,
  supplementary: string,
): number {
  if (!supplementary.trim()) return 0;
  const s = supplementary.toLowerCase();
  if (category === "plant") {
    if (/园艺|garden|plant|绘画|draw|art|摄影|photo|花/.test(s)) return 1.2;
    if (/甜|sweet|草莓|cake|warm|热可可|cocoa/.test(s)) return 0.5;
  }
  if (category === "animal") {
    if (/失去|abandon|loss|孤独|alone|深海|deep|dark|黑暗|sea/.test(s)) return 1.0;
    if (/阅读|read|观察|observe/.test(s)) return 0.4;
  }
  return 0;
}

function pickArchetype(category: ResonanceCategory, context: AnalysisContext, seed: number) {
  const { coreCorpus, supplementaryCorpus, traits } = context;
  const options = ARCHETYPES[category];

  const scored = options
    .map((item, index) => {
      const { score, matchedKeywords } = scoreArchetype(
        item,
        coreCorpus,
        supplementaryCorpus,
        traits,
      );
      return {
        item,
        index,
        score:
          score +
          supplementaryCategoryBoost(category, supplementaryCorpus) +
          ((seed + index * 17) % 5) * 0.15,
        matchedKeywords,
      };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index);

  return {
    item: scored[0].item,
    matchedKeywords: scored[0].matchedKeywords,
  };
}

function buildMatch(
  category: ResonanceCategory,
  picked: ArchetypeOption,
  matchedKeywords: string[],
  traits: string[],
  characterName: string,
): ResonanceReport["plant"] {
  const meta = CATEGORY_META[category];
  return {
    category,
    icon: meta.icon,
    label: meta.label,
    name: picked.name,
    tagline: picked.tagline,
    imageUrl: picked.imageUrl,
    matchReason: generateMatchReason(picked, matchedKeywords, traits, category, characterName),
    shortPoem: personalizePoem(picked.shortPoem, characterName),
    deepAnalysis: picked.deepAnalysis,
    resonanceStory: picked.resonanceStory,
    growthInsight: picked.growthInsight,
  };
}

export function generateResonanceReport(
  characterData: CharacterInput,
  isPremium = false,
): ResonanceReport {
  const name = characterData.name?.trim() || "未命名角色";
  const summary = characterData.summary?.trim() || "";
  const coreCorpus = collectCoreCorpus(characterData);
  const supplementaryCorpus = collectSupplementaryCorpus(characterData);
  const corpus = collectCorpus(characterData);
  const seed = hashString(corpus || name);

  const traits = extractTraits(characterData);
  const context: AnalysisContext = { coreCorpus, supplementaryCorpus, traits };

  const plantPicked = pickArchetype("plant", context, seed);
  const animalPicked = pickArchetype("animal", context, seed + 47);

  const base: Omit<ResonanceReport, "premium"> = {
    version: 3,
    generatedAt: new Date().toISOString(),
    isPremium,
    character: { name, summary },
    plant: buildMatch("plant", plantPicked.item, plantPicked.matchedKeywords, traits, name),
    animal: buildMatch("animal", animalPicked.item, animalPicked.matchedKeywords, traits, name),
    keywords: pickKeywords(corpus, supplementaryCorpus, seed),
  };

  return attachPremiumContent(base, characterData);
}
