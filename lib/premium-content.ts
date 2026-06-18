import type {
  BilingualText,
  CharacterInput,
  PremiumContent,
  ResonanceMatch,
  ResonanceReport,
} from "./types";

function splitSentences(text: string, count: number): string[] {
  const parts = text.split(/(?<=[。！？\.!?])\s*/).filter(Boolean);
  if (parts.length >= count) return parts.slice(0, count);
  const chunks: string[] = [];
  const chunkSize = Math.ceil(text.length / count);
  for (let i = 0; i < count; i++) {
    chunks.push(text.slice(i * chunkSize, (i + 1) * chunkSize).trim());
  }
  return chunks.filter(Boolean);
}

function buildPlantDetail(plant: ResonanceMatch, name: string): PremiumContent["plantDetail"] {
  const zhParts = splitSentences(plant.deepAnalysis.zh, 4);
  const enParts = splitSentences(plant.deepAnalysis.en, 4);

  return {
    symbolism: {
      zh: zhParts[0] || plant.deepAnalysis.zh,
      en: enParts[0] || plant.deepAnalysis.en,
    },
    flowerLanguage: {
      zh: `${pickName(plant.name.zh)}的花语，藏在${name}沉默的选择里——${plant.tagline.zh}。`,
      en: `The language of ${plant.name.en} lives in ${name}'s quiet choices — ${plant.tagline.en.toLowerCase()}.`,
    },
    emotionalMeaning: {
      zh: zhParts[1] || plant.resonanceStory.zh,
      en: enParts[1] || plant.resonanceStory.en,
    },
    growthMeaning: {
      zh: plant.growthInsight.zh,
      en: plant.growthInsight.en,
    },
  };
}

function buildAnimalDetail(animal: ResonanceMatch, name: string): PremiumContent["animalDetail"] {
  const zhParts = splitSentences(animal.deepAnalysis.zh, 4);
  const enParts = splitSentences(animal.deepAnalysis.en, 4);

  return {
    instinct: {
      zh: zhParts[0] || animal.deepAnalysis.zh,
      en: enParts[0] || animal.deepAnalysis.en,
    },
    behaviorSymbolism: {
      zh: `${pickName(animal.name.zh)}的行为象征，映照${name}面对世界的方式——${animal.tagline.zh}。`,
      en: `${animal.name.en} behavior mirrors how ${name} meets the world — ${animal.tagline.en.toLowerCase()}.`,
    },
    relationshipPattern: {
      zh: zhParts[1] || animal.resonanceStory.zh,
      en: enParts[1] || animal.resonanceStory.en,
    },
    protectiveTraits: {
      zh: animal.growthInsight.zh,
      en: animal.growthInsight.en,
    },
  };
}

function pickName(name: string): string {
  return name;
}

function buildGrowthTrajectory(
  data: CharacterInput,
  plant: ResonanceMatch,
  animal: ResonanceMatch,
): PremiumContent["growthTrajectory"] {
  const name = data.name.trim() || "TA";
  const hasBackground = Boolean(data.background?.trim());
  const hasEvent = Boolean(data.importantEvent?.trim());

  return {
    past: {
      zh: hasEvent
        ? `${data.importantEvent.trim()}——这成为${name}性格深处的一道纹路，像${plant.name.zh}在寒风中留下的痕迹。`
        : hasBackground
          ? `${data.background.trim()}。那些经历在${name}心里生根，塑造了他们如今看世界的方式。`
          : `${name}的过去并不总是被说出口，但${animal.name.zh}式的警觉，暗示着曾经历过的风雨与失去。`,
      en: hasEvent
        ? `${data.importantEvent.trim()} — a line etched deep in ${name}, like marks the ${plant.name.en} keeps after winter.`
        : hasBackground
          ? `${data.background.trim()}. Those experiences took root in ${name}, shaping how they see the world today.`
          : `${name}'s past is not always spoken aloud, yet ${animal.name.en}-like vigilance hints at storms and losses already weathered.`,
    },
    present: {
      zh: data.summary?.trim()
        ? `此刻的${name}：${data.summary.trim()}。${plant.name.zh}与${animal.name.zh}的共鸣，正是他们当下灵魂状态的写照。`
        : `此刻的${name}，在${plant.name.zh}的安静与${animal.name.zh}的忠诚之间维持着微妙的平衡——外冷内热，警惕而温柔。`,
      en: data.summary?.trim()
        ? `${name} now: ${data.summary.trim()}. The resonance of ${plant.name.en} and ${animal.name.en} mirrors their soul in this moment.`
        : `${name} now balances ${plant.name.en}'s quiet grace and ${animal.name.en}'s loyal vigilance — guarded yet tender.`,
    },
    future: {
      zh: plant.growthInsight.zh,
      en: plant.growthInsight.en,
    },
  };
}

function buildSupplementaryNote(data: CharacterInput, locale: "zh" | "en"): string {
  const parts: string[] = [];
  if (data.hobbies?.trim()) parts.push(locale === "zh" ? `爱好：${data.hobbies.trim()}` : `Hobbies: ${data.hobbies.trim()}`);
  if (data.favoriteFoods?.trim())
    parts.push(locale === "zh" ? `喜欢的食物：${data.favoriteFoods.trim()}` : `Favorite foods: ${data.favoriteFoods.trim()}`);
  if (data.dislikedFoods?.trim())
    parts.push(locale === "zh" ? `讨厌的食物：${data.dislikedFoods.trim()}` : `Disliked foods: ${data.dislikedFoods.trim()}`);
  if (data.fears?.trim()) parts.push(locale === "zh" ? `害怕：${data.fears.trim()}` : `Fears: ${data.fears.trim()}`);
  if (parts.length === 0) return "";

  if (locale === "zh") {
    return `\n\n在生活细节里，${parts.join("；")}——这些补充信息像侧光一样，为${data.name.trim() || "角色"}的共鸣添了一层更私密的色调，却不改变其性格的主旋律。`;
  }
  return `\n\nIn daily detail — ${parts.join("; ")} — these supplementary notes add a more intimate shade to ${data.name.trim() || "the character"}'s resonance, without changing the main melody of their personality.`;
}

function buildNarrativeEssay(
  data: CharacterInput,
  plant: ResonanceMatch,
  animal: ResonanceMatch,
): BilingualText {
  const name = data.name.trim() || "这个角色";
  const nameEn = data.name.trim() || "this character";
  const traits = data.traits || "沉默、坚韧";
  const strengths = data.strengths || "隐藏在冷静外表下的温柔";
  const weaknesses = data.weaknesses || "难以轻易敞开的内心";
  const summary = data.summary?.trim() || "一个在保护与距离之间维持平衡的人";

  const supplementaryNoteZh = buildSupplementaryNote(data, "zh");
  const supplementaryNoteEn = buildSupplementaryNote(data, "en");

  const zh = [
    `【共鸣故事】`,
    ``,
    `在无数可能的象征里，${name}最终与${plant.name.zh}和${animal.name.zh}产生了最深的共鸣。这不是随机分配的结果，而是性格、经历、价值选择与情感模式彼此呼应后的必然。当你第一次读到这两个名字，或许会感到一种说不清的「对了」——那正是因为它们早已藏在${name}的故事里，只是等待被温柔地叫出名字。`,
    ``,
    plant.resonanceStory.zh,
    ``,
    `若将${name}比作一种植物，${plant.name.zh}是最诚实的选择。${plant.deepAnalysis.zh} ${plant.tagline.zh}——这不仅是诗意的形容，而是${name}在关系里反复上演的行为逻辑：在不被期待的时候坚持，在被需要的时候才靠近，在失去之后仍然保留给予的能力。`,
    ``,
    `从花语的角度看，${plant.name.zh}所代表的语言，是一种不喧哗的深情。${name}很少用语言表达「我在乎」，却会在细节里留下证据：一次没有说出口的陪伴，一个提前准备好的退路，一种在冲突里依然选择克制的温柔。${data.background?.trim() ? `结合${name}的背景——${data.background.trim()}——这种植物般的生长方式，更像是在特定土壤里缓慢而坚定地扎根。` : "这种植物般的生长方式，更像是在特定土壤里缓慢而坚定地扎根。"}`,
    ``,
    `而在动物的世界里，${animal.name.zh}承载了${name}最本真的本能。${animal.resonanceStory.zh} ${animal.deepAnalysis.zh} 当危险靠近，${name}的第一反应往往不是逃离，而是确认重要的人是否安全；当信任尚未建立，${name}会像${animal.name.zh}一样保持距离，但那不是冷漠，而是对关系负责的方式。`,
    ``,
    `如果把${name}的关系模式放在${animal.name.zh}的象征里阅读，你会看见一种非常具体的忠诚：不泛滥、不表演、不轻易承诺，可一旦承诺，就会用很长时间去兑现。${data.importantEvent?.trim() ? `尤其当${data.importantEvent.trim()}之后，这种本能被进一步加深——${name}学会了在靠近与退后之间保持分寸，也学会了把伤口转化为守护他人的理由。` : `${name}学会了在靠近与退后之间保持分寸，也学会了把伤口转化为守护他人的理由。`}`,
    ``,
    `当${plant.name.zh}的温柔与${animal.name.zh}的忠诚重叠在同一个人身上，我们看见的，是一个在失去里依然选择守护的灵魂。${summary}。${name}或许不擅长表达，但他们的存在本身，就是一种承诺：我在，我不会轻易离开，我会用我自己的方式爱你。`,
    ``,
    `那些「${traits}」的特质，与「${strengths}」交织，在关键时刻化为行动。而「${weaknesses}」并非需要被抹去的缺陷，而是${name}曾经认真活过、认真受伤、仍然选择继续前行的证据。正因为知道脆弱是什么，${name}才更懂得在别人的脆弱面前放慢声音。`,
    supplementaryNoteZh,
    ``,
    ``,
    `若把${name}的人生拆成三个层次来读——`,
    `在「过去」，他们携带经验与记忆；`,
    `在「现在」，他们呈现${plant.name.zh}式的克制与${animal.name.zh}式的警觉；`,
    `在「未来」，他们仍有空间学习：在守护别人的同时，也允许自己被守护。`,
    ``,
    `如果要用一句话形容${name}的共鸣——`,
    `${plant.tagline.zh}；${animal.tagline.zh}。`,
    ``,
    `愿${name}在未来的故事里，像${plant.name.zh}一样在属于自己的季节里盛开，像${animal.name.zh}一样，在值得的人面前，走进那场暴风雪。也愿每一位读到这份共鸣的人，能在${name}身上看见某种熟悉的、被温柔确认的部分——那或许就是 OC 最珍贵的意义：让虚构的灵魂，触碰到真实的情感。`,
  ].join("\n");

  const en = [
    `[Resonance Story]`,
    ``,
    `Among countless symbols, ${nameEn} resonates deepest with the ${plant.name.en} and the ${animal.name.en}. This is not random — it is the inevitability of personality, history, values, and emotional pattern answering one another. When you first read these names, you may feel a quiet certainty: they were already hidden in ${nameEn}'s story, waiting to be gently named.`,
    ``,
    plant.resonanceStory.en,
    ``,
    `As a plant, the ${plant.name.en} is the most honest mirror. ${plant.deepAnalysis.en} ${plant.tagline.en} — this is not decorative poetry, but the logic ${nameEn} repeats in relationships: persisting when uncelebrated, approaching when needed, still able to give after loss.`,
    ``,
    `In the language of flowers, the ${plant.name.en} speaks a love that does not shout. ${nameEn} rarely says "I care" aloud, yet leaves evidence in detail: unspoken companionship, a prepared escape route, restraint chosen even in conflict. ${data.background?.trim() ? `Against the background of ${data.background.trim()}, this plant-like growth reads as slow, rooted endurance in particular soil.` : "This plant-like growth reads as slow, rooted endurance in particular soil."}`,
    ``,
    `In the language of animals, the ${animal.name.en} carries ${nameEn}'s truest instinct. ${animal.resonanceStory.en} ${animal.deepAnalysis.en} When danger approaches, ${nameEn}'s first impulse is often not flight, but checking whether those who matter are safe; when trust is unearned, ${nameEn} keeps distance like the ${animal.name.en} — not from coldness, but from respect for the bond.`,
    ``,
    `Read through the ${animal.name.en}, ${nameEn}'s loyalty is specific: not performative, not easily given, but long-kept once promised. ${data.importantEvent?.trim() ? `After ${data.importantEvent.trim()}, this instinct deepens — ${nameEn} learns the measure between approach and retreat, turning wounds into reasons to guard others.` : `${nameEn} learns the measure between approach and retreat, turning wounds into reasons to guard others.`}`,
    ``,
    `When the tenderness of ${plant.name.en} overlaps with the loyalty of ${animal.name.en}, we see a soul that still chooses to protect after loss. ${summary}. ${nameEn} may not speak easily — but their presence is a promise: I am here; I will not leave lightly; I will love you in my own way.`,
    ``,
    `Traits of ${traits}, woven with ${strengths}, become action when it matters. ${weaknesses} is not a flaw to erase, but evidence that ${nameEn} has lived fully, been hurt honestly, and still chosen to continue. Because they know vulnerability, they know to soften their voice beside others' fragility.`,
    supplementaryNoteEn,
    ``,
    `Read across three layers — past carrying memory, present showing ${plant.name.en} restraint and ${animal.name.en} vigilance, future still room to learn: to guard others while allowing themselves to be guarded.`,
    ``,
    `In one line — ${plant.tagline.en}; ${animal.tagline.en}.`,
    ``,
    `May ${nameEn} bloom in their own season like ${plant.name.en}, and like ${animal.name.en}, walk into the blizzard for those who matter. And may every reader find in ${nameEn} some familiar part of themselves gently confirmed — perhaps the truest gift of an OC: letting a fictional soul touch something real.`,
  ].join("\n");

  return { zh, en };
}

export function buildPremiumContent(
  data: CharacterInput,
  plant: ResonanceMatch,
  animal: ResonanceMatch,
): PremiumContent {
  const name = data.name.trim() || "TA";
  return {
    plantDetail: buildPlantDetail(plant, name),
    animalDetail: buildAnimalDetail(animal, name),
    growthTrajectory: buildGrowthTrajectory(data, plant, animal),
    narrativeEssay: buildNarrativeEssay(data, plant, animal),
  };
}

export function attachPremiumContent(
  report: Omit<ResonanceReport, "premium">,
  data: CharacterInput,
): ResonanceReport {
  return {
    ...report,
    premium: buildPremiumContent(data, report.plant, report.animal),
  };
}
