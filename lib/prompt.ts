import type { CharacterInput } from "./types";

export const MASTER_SYSTEM_PROMPT = `你是一位专业的角色分析师、象征学专家、植物象征研究者与动物象征研究者。

你的任务是为原创角色（OC）生成「植物共鸣」与「动物共鸣」解读。

重要原则：
- 不要生成心理学报告、人格测试或学术论文
- 不要随机分配象征，必须基于角色性格、优缺点与情感模式进行有意义的匹配
- 核心依据（权重最高）：性格特点、优点、缺点、一句话概括
- 补充依据（权重较低）：爱好、饮食偏好、害怕的事物——仅作辅助信号，不可盖过核心性格
- 文风必须诗意、感性、美观，适合小红书截图分享
- 所有输出必须同时包含中文（zh）与英文（en）两个版本

补充信息的使用方式（若用户提供）：
- 爱好：可影响共鸣关键词与叙事风格（如园艺强化植物象征，阅读强化观察与智慧）
- 喜欢的食物：可贡献情感与审美气质（如甜食与温暖、热饮与治愈）
- 讨厌的食物：可辅助理解角色的边界与敏感点
- 害怕的事物：可强化象征主题（如害怕失去→忠诚与守护；深海/黑暗→神秘与警觉；孤独→羁绊与依附）
- 若补充字段为空，仅依据核心信息分析即可

分析步骤：
1. 提取性格特质（以核心字段为主）
2. 识别核心价值观与情感模式
3. 从 strengths / weaknesses 中理解角色的内在张力
4. 若有补充信息，作为次要信号纳入植物与动物匹配
5. 匹配最契合的植物共鸣与动物共鸣
6. 生成 5 个共鸣关键词

输出 JSON 格式：

{
  "plant": {
    "name": { "zh": "", "en": "" },
    "tagline": { "zh": "", "en": "" },
    "shortPoem": { "zh": "", "en": "" },
    "deepAnalysis": { "zh": "", "en": "" },
    "resonanceStory": { "zh": "", "en": "" },
    "growthInsight": { "zh": "", "en": "" }
  },
  "animal": { ... 同上结构 ... },
  "keywords": [
    { "zh": "", "en": "" }
  ]
}

shortPoem 为免费版内容（3-5 行诗意短文，含换行 \\n）。
deepAnalysis、resonanceStory、growthInsight 为高级版内容，应明显比 shortPoem 更丰富。

只返回合法 JSON，不要 markdown 代码块或额外说明。`;

export function buildCharacterBrief(data: CharacterInput): string {
  const coreSections: [string, string | undefined][] = [
    ["角色名字 / Character Name", data.name],
    ["性格特点 / Personality Traits", data.traits],
    ["优点 / Strengths", data.strengths],
    ["缺点 / Weaknesses", data.weaknesses],
    ["一句话概括 / One-Sentence Summary", data.summary],
    ["角色背景 / Background", data.background || undefined],
    ["重要事件 / Important Event", data.importantEvent || undefined],
  ];

  const supplementarySections: [string, string | undefined][] = [
    ["爱好 / Hobbies", data.hobbies || undefined],
    ["喜欢吃的东西 / Favorite Foods", data.favoriteFoods || undefined],
    ["讨厌吃的东西 / Disliked Foods", data.dislikedFoods || undefined],
    ["害怕的东西 / Fears", data.fears || undefined],
  ];

  const core = coreSections
    .filter(([, value]) => value?.trim())
    .map(([label, value]) => `## ${label}\n${value!.trim()}`)
    .join("\n\n");

  const supplementary = supplementarySections
    .filter(([, value]) => value?.trim())
    .map(([label, value]) => `## ${label}\n${value!.trim()}`)
    .join("\n\n");

  if (!supplementary) return core;

  return `${core}\n\n### 角色补充信息（选填，作辅助参考）\n\n${supplementary}`;
}

export function buildUserPrompt(characterData: CharacterInput): string {
  return `请分析以下原创角色，返回 JSON 格式的植物共鸣与动物共鸣报告。
核心性格字段应作为主要依据；若有补充信息，请作为次要信号使用，不可盖过性格、优缺点。

${buildCharacterBrief(characterData)}`;
}

export function buildChatPayload(characterData: CharacterInput) {
  return {
    system: MASTER_SYSTEM_PROMPT,
    user: buildUserPrompt(characterData),
  };
}
