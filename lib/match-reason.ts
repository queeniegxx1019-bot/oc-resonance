import type { BilingualText } from "./types";
import type { ResonanceCategory } from "./types";
import type { ArchetypeOption } from "./archetypes";

const THEME_SIGNALS: { keywords: string[]; zh: string; en: string }[] = [
  { keywords: ["protect", "guard", "shield", "守护", "保护"], zh: "守护他人的倾向", en: "a drive to protect others" },
  { keywords: ["loyal", "devotion", "commit", "忠诚", "忠心", "bond"], zh: "对羁绊的执着", en: "devotion to bonds" },
  { keywords: ["quiet", "reserved", "restrain", "安静", "内敛", "隐忍", "silent"], zh: "内敛的情感表达", en: "inward emotional expression" },
  { keywords: ["gentle", "kind", "compassion", "温柔", "善良", "soft"], zh: "温柔与共情", en: "tenderness and empathy" },
  { keywords: ["hope", "renew", "heal", "希望", "治愈"], zh: "在困境中仍向光", en: "orientation toward light amid hardship" },
  { keywords: ["alone", "solitude", "lone", "孤独", "独自", "solitary"], zh: "习惯独自承担", en: "a habit of carrying things alone" },
  { keywords: ["persist", "survive", "endure", "坚韧", "顽强", "坚持", "tenacious"], zh: "不轻易放弃的韧性", en: "resilience that refuses easy surrender" },
  { keywords: ["sensitive", "empathy", "敏感", "共情"], zh: "对情绪的敏锐感知", en: "acute sensitivity to emotion" },
  { keywords: ["mysterious", "secret", "hidden", "神秘", "隐藏"], zh: "保留秘密与距离", en: "keeping mystery and distance" },
  { keywords: ["grow", "change", "transform", "成长", "改变", "蜕变"], zh: "持续自我更新", en: "ongoing self-renewal" },
  { keywords: ["trust", "friend", "信任", "羁绊"], zh: "对信任的谨慎或渴望", en: "caution or longing around trust" },
  { keywords: ["boundaries", "wall", "defensive", "边界", "防御", "thorn"], zh: "用边界自我保护", en: "self-protection through boundaries" },
  { keywords: ["clever", "wise", "smart", "observe", "聪明", "智慧", "观察"], zh: "洞察与判断", en: "insight and judgment" },
  { keywords: ["fierce", "proud", "passion", "激烈", "骄傲", "热情"], zh: "外显的力量与骄傲", en: "visible strength and pride" },
  { keywords: ["adapt", "flexible", "change", "适应", "柔韧", "灵活"], zh: "面对变化时的调整力", en: "capacity to adjust to change" },
];

const TRAIT_THEME_MAP: Record<string, { zh: string; en: string }> = {
  quiet: { zh: "安静克制", en: "quiet restraint" },
  loyal: { zh: "忠诚持守", en: "loyal steadfastness" },
  protective: { zh: "保护本能", en: "protective instinct" },
  sensitive: { zh: "情感敏感", en: "emotional sensitivity" },
  stubborn: { zh: "固执坚守", en: "stubborn persistence" },
};

function uniqueThemes(
  matchedKeywords: string[],
  traits: string[],
): { zh: string[]; en: string[] } {
  const zh: string[] = [];
  const en: string[] = [];
  const lower = matchedKeywords.map((k) => k.toLowerCase());

  for (const signal of THEME_SIGNALS) {
    if (signal.keywords.some((k) => lower.includes(k.toLowerCase()))) {
      zh.push(signal.zh);
      en.push(signal.en);
    }
  }

  for (const trait of traits) {
    const key = trait.toLowerCase();
    const mapped = TRAIT_THEME_MAP[key];
    if (mapped && !zh.includes(mapped.zh)) {
      zh.push(mapped.zh);
      en.push(mapped.en);
    }
  }

  return { zh: zh.slice(0, 3), en: en.slice(0, 3) };
}

function joinThemes(items: string[], locale: "zh" | "en"): string {
  if (items.length === 0) {
    return locale === "zh" ? "性格中多层次的情感张力" : "layered emotional tension in their personality";
  }
  if (items.length === 1) return items[0];
  if (items.length === 2) {
    return locale === "zh" ? `${items[0]}与${items[1]}` : `${items[0]} and ${items[1]}`;
  }
  return locale === "zh"
    ? `${items[0]}、${items[1]}与${items[2]}`
    : `${items[0]}, ${items[1]}, and ${items[2]}`;
}

export function generateMatchReason(
  archetype: ArchetypeOption,
  matchedKeywords: string[],
  traits: string[],
  category: ResonanceCategory,
  characterName: string,
): BilingualText {
  const themes = uniqueThemes(matchedKeywords, traits);
  const name = characterName || "该角色";
  const nameEn = characterName || "this character";
  const symbolZh = archetype.name.zh;
  const symbolEn = archetype.name.en;
  const tagZh = archetype.tagline.zh;
  const tagEn = archetype.tagline.en;
  const themeZh = joinThemes(themes.zh, "zh");
  const themeEn = joinThemes(themes.en, "en");
  const kindZh = category === "plant" ? "植物" : "动物";
  const kindEn = category === "plant" ? "plant" : "animal";

  return {
    zh: `${symbolZh}的核心气质是「${tagZh}」。在${name}的性格脉络里，我们读到了${themeZh}等线索——这些并非表面标签，而是与${symbolZh}在象征体系中的角色互相印证。因此选择这一${kindZh}，不是因为名称好听，而是因为${name}的情感节奏与生命隐喻之间，存在一种自然的重合。`,
    en: `${symbolEn} centers on the idea that ${tagEn.toLowerCase()}. In ${nameEn}'s emotional pattern, we trace ${themeEn} — not as decorative labels, but as signals that echo how this ${kindEn} functions symbolically. The match is not arbitrary naming; it is the natural overlap between how ${nameEn} moves through feeling and what ${symbolEn} has long represented.`,
  };
}
