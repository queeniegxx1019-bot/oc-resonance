import { attachPremiumContent } from "./premium-content";
import type { BilingualText, CharacterInput, ResonanceReport } from "./types";
import { CATEGORY_META, type ResonanceCategory } from "./types";

interface ArchetypeOption {
  name: BilingualText;
  tagline: BilingualText;
  keywords: string[];
  shortPoem: BilingualText;
  deepAnalysis: BilingualText;
  resonanceStory: BilingualText;
  growthInsight: BilingualText;
}

const ARCHETYPES: Record<ResonanceCategory, ArchetypeOption[]> = {
  plant: [
    {
      name: { zh: "白山茶", en: "White Camellia" },
      tagline: {
        zh: "安静地盛开在寒冷季节",
        en: "Quietly blooming through the cold season",
      },
      keywords: [
        "loyal", "quiet", "guard", "protect", "dignity", "gentle", "reserved",
        "忠诚", "安静", "守护", "保护", "尊严", "温柔", "内敛", "冷淡",
      ],
      shortPoem: {
        zh: "安静地盛开在寒冷季节。\n\n即使经历过失去，\n依然保留温柔与善意。\n\n你的角色并不擅长表达感情，\n却总是在最重要的时候陪伴别人。",
        en: "Quietly blooming through the cold season.\n\nEven after loss,\ntenderness and kindness remain.\n\nYour character rarely speaks their heart,\nyet always appears when it matters most.",
      },
      deepAnalysis: {
        zh: "白山茶在东亚文化里象征含蓄的爱与不屈的尊严。它不张扬，却在最艰难的季节里依然选择开放——这与你角色「外冷内热」的情感结构高度吻合。他们不是没有感情，而是把感情藏得很深，只在被信任的人面前，才愿意展示柔软的一面。",
        en: "In East Asian symbolism, white camellia stands for restrained affection and unyielding dignity. It does not perform its beauty — it persists through harsh seasons. This mirrors your character's emotionally guarded warmth: feeling deeply, expressing rarely, softening only for those who have earned trust.",
      },
      resonanceStory: {
        zh: "如果把你角色的人生写成一首诗，它会是冬日里的一株白山茶——经历风雪，却未忘记如何温柔。他们或许曾失去重要的人，或许曾在沉默中独自承担，但每一次选择守护，都像花瓣在寒风中轻轻打开。",
        en: "If your character's life were a poem, it would be white camellia in winter — weathered by frost, yet never forgetting how to be gentle. They may have lost someone, may have carried silence alone, but every act of protection is a petal opening against the cold.",
      },
      growthInsight: {
        zh: "角色的成长方向，是学会在守护别人的同时，也允许自己被守护。白山茶最终明白：温柔不是弱点，而是经过考验后仍然选择开放的能力。",
        en: "Their growth lies in learning to be guarded and held at once — to protect others while allowing themselves to be cared for. Like the camellia, tenderness is not weakness, but the courage to bloom after being tested.",
      },
    },
    {
      name: { zh: "夜昙", en: "Night-Blooming Cereus" },
      tagline: {
        zh: "只在无人注视的夜里，短暂而完整地绽放",
        en: "Blooming fully only in nights no one watches",
      },
      keywords: [
        "mysterious", "hidden", "secret", "night", "solitude", "introvert", "rare",
        "神秘", "隐藏", "秘密", "孤独", "内向", "稀有", "沉默",
      ],
      shortPoem: {
        zh: "只在无人注视的夜里，\n短暂而完整地绽放。\n\n你的角色习惯把真实藏在深处，\n不是不愿被看见，\n而是害怕被误读。",
        en: "Blooming fully only in unwatched nights.\n\nYour character keeps truth folded inward —\nnot because they refuse to be seen,\nbut because they fear being misread.",
      },
      deepAnalysis: {
        zh: "夜昙的美是瞬息的、私密的。它象征那些只在安全空间里才完整呈现的自我。你的角色可能在外人面前保持疏离，却在少数时刻展现出令人惊艳的深度与真实。",
        en: "The night-blooming cereus is fleeting and intimate — beauty revealed only when the world is not looking. Your character may seem distant in public, yet in rare moments reveals a depth that catches people off guard.",
      },
      resonanceStory: {
        zh: "他们像一朵只在深夜开放的花——白天是寻常的样子，夜晚才是完整的自己。也许只有一个人、一个场景、一段记忆，见过他们真正盛开的样子。",
        en: "They are a flower that opens only after dark — ordinary by day, complete by night. Perhaps only one person, one place, one memory has ever seen them in full bloom.",
      },
      growthInsight: {
        zh: "成长意味着找到值得绽放的对象——不是向所有人敞开，而是不再把全部的自己永远藏在夜里。",
        en: "Growth means finding someone worth blooming for — not performing for everyone, but no longer keeping their whole self locked in eternal night.",
      },
    },
    {
      name: { zh: "野藤", en: "Wild Ivy" },
      tagline: {
        zh: "在裂缝里生长，在风雨里攀附",
        en: "Growing through cracks, clinging through storms",
      },
      keywords: [
        "survivor", "stubborn", "persist", "war", "trauma", "hold", "tenacious",
        "生存", "固执", "坚持", "创伤", "顽强", "韧性", "不放弃",
      ],
      shortPoem: {
        zh: "在裂缝里生长，在风雨里攀附。\n\n你的角色经历过太多，\n却始终没有放弃。\n\n他们或许不完美，\n但从未停止向前。",
        en: "Growing through cracks, holding on through storms.\n\nYour character has endured much,\nyet never stopped moving forward.\n\nThey may be imperfect,\nbut they never surrendered.",
      },
      deepAnalysis: {
        zh: "野藤象征在逆境中依然寻找依附与方向的生存本能。你的角色不是天生的强者，而是在一次次失去里学会了抓住什么、保护什么。他们的固执，其实是活下来的方式。",
        en: "Wild ivy symbolizes survival instinct — finding hold and direction even in ruin. Your character is not born strong; they learned to cling and protect through repeated loss. Their stubbornness is, in part, how they stayed alive.",
      },
      resonanceStory: {
        zh: "他们像藤蔓一样，把根扎在最不容易的地方，却把枝叶伸向光。即使被折断，也会从新的方向继续生长。",
        en: "Like ivy, they root in the hardest places yet reach toward light. Even when broken, they grow again from a new direction.",
      },
      growthInsight: {
        zh: "真正的成长，是学会在攀附之外，也能独立站立——不是不再依赖，而是选择依赖。",
        en: "True growth is learning to stand without always clinging — not rejecting attachment, but choosing it freely.",
      },
    },
    {
      name: { zh: "樱花", en: "Cherry Blossom" },
      tagline: {
        zh: "短暂的美，与接受消逝的温柔",
        en: "Brief beauty and the tenderness of letting go",
      },
      keywords: [
        "beauty", "loss", "memory", "sorrow", "accept", "friend", "childhood",
        "美丽", "失去", "记忆", "悲伤", "接受", "朋友", "童年", "怀念",
      ],
      shortPoem: {
        zh: "短暂的美，与接受消逝的温柔。\n\n你的角色懂得失去的重量，\n因此更珍惜当下的每一刻。\n\n他们或许带着淡淡的哀愁，\n却也拥有治愈别人的力量。",
        en: "Brief beauty and the grace of impermanence.\n\nYour character knows the weight of loss,\nand cherishes each present moment.\n\nThey carry a quiet sorrow,\nyet hold the power to heal others.",
      },
      deepAnalysis: {
        zh: "樱花在日本美学里代表物哀——美正因为会消逝而更加珍贵。你的角色对失去有深刻的感知，这让他们对别人的痛苦格外敏感，也让他们难以轻易放下。",
        en: "Cherry blossom embodies mono no aware — beauty intensified by impermanence. Your character feels loss acutely, making them deeply attuned to others' pain, and slow to release what has passed.",
      },
      resonanceStory: {
        zh: "每当风吹过，他们仿佛都能看见过往的花瓣。那些逝去的人与时光，并没有消失——只是换了一种方式，留在他们心里。",
        en: "When the wind rises, they almost see past petals falling again. What was lost has not vanished — it lives on inside them, differently.",
      },
      growthInsight: {
        zh: "成长不是忘记，而是带着记忆继续生活——像樱花明白：凋零不是终点，而是下一个季节的开始。",
        en: "Growth is not forgetting, but living forward with memory — like blossom knowing that falling is not the end, but the beginning of another season.",
      },
    },
    {
      name: { zh: "带刺玫瑰", en: "Thorned Rose" },
      tagline: {
        zh: "用刺保护柔软的心",
        en: "Thorns guarding a soft heart",
      },
      keywords: [
        "passion", "anger", "fierce", "boundaries", "defensive", "protect", "sharp",
        "热情", "愤怒", "激烈", "边界", "防御", "保护", "尖锐", "刺",
      ],
      shortPoem: {
        zh: "用刺保护柔软的心。\n\n你的角色看起来不好接近，\n但那只是因为他们太清楚——\n真心一旦被伤害，很难再次完整。",
        en: "Thorns guarding a soft heart.\n\nYour character seems hard to approach —\nbecause they know too well\nhow difficult it is to become whole again after being hurt.",
      },
      deepAnalysis: {
        zh: "玫瑰的刺不是攻击，而是边界。你的角色用尖锐的外表保护内在的热烈与真诚。他们一旦信任，会给出全部；一旦受伤，会用距离重建安全。",
        en: "The rose's thorns are boundaries, not weapons. Your character shields fierce sincerity behind sharp edges. Once trust is given, they offer everything; once wounded, they rebuild safety through distance.",
      },
      resonanceStory: {
        zh: "他们像一朵开在荒原上的玫瑰——美丽、危险、令人想要靠近又不敢轻易触碰。只有最耐心的人，才能看见刺下的那片柔软。",
        en: "They are a rose on barren ground — beautiful, dangerous, drawing people near while warning them away. Only the most patient can see the softness beneath the thorns.",
      },
      growthInsight: {
        zh: "成长是学会区分：哪些刺是必要的防御，哪些刺只是习惯——并在对的人面前，愿意收起一两根刺。",
        en: "Growth means learning which thorns are necessary defense and which are habit — and, for the right person, letting one or two fall.",
      },
    },
    {
      name: { zh: "垂柳", en: "Willow" },
      tagline: {
        zh: "在风中弯曲，却不折断",
        en: "Bending in the wind without breaking",
      },
      keywords: [
        "grief", "sad", "flexible", "adapt", "empathy", "mourn", "gentle", "soft",
        "悲伤", "柔韧", "适应", "共情", "哀悼", "温柔", "柔软", "敏感",
      ],
      shortPoem: {
        zh: "在风中弯曲，却不折断。\n\n你的角色承载过很多情绪——\n自己的，也包括别人的。\n\n他们像水边的柳，\n把悲伤化进沉默的摇曳里。",
        en: "Bending in the wind without breaking.\n\nYour character has carried much emotion —\ntheir own, and others' too.\n\nLike willow by water,\nthey fold grief into quiet swaying.",
      },
      deepAnalysis: {
        zh: "垂柳象征柔韧的哀伤与深层的共情。你的角色可能不声不响地吸收周围的情绪，用适应代替对抗。他们的柔软不是软弱，而是一种历经风浪后的生存智慧。",
        en: "Willow symbolizes flexible grief and deep empathy. Your character may quietly absorb the emotions around them, choosing adaptation over confrontation. Their softness is not weakness, but wisdom earned through storms.",
      },
      resonanceStory: {
        zh: "他们总在水边、在风里、在别人的眼泪旁边。像柳条轻轻拂过水面，他们安慰人的方式，也是安静而持续的。",
        en: "They are found by water, in wind, beside others' tears. Like branches brushing the surface, their comfort is quiet and continuous.",
      },
      growthInsight: {
        zh: "成长是学会在共情的同时保留自我——像柳树依然扎根，即使枝条随风云动。",
        en: "Growth is empathizing without losing the self — like willow whose roots hold firm even as branches move with the wind.",
      },
    },
  ],
  animal: [
    {
      name: { zh: "白狼", en: "White Wolf" },
      tagline: {
        zh: "警惕而忠诚",
        en: "Alert and loyal",
      },
      keywords: [
        "cautious", "loyal", "protect", "guard", "pack", "fierce", "lone", "trust",
        "警惕", "忠诚", "保护", "守护", "狼", " fierce", "孤独", "信任",
      ],
      shortPoem: {
        zh: "警惕而忠诚。\n\n不会轻易靠近任何人，\n却愿意为了重要的人走进暴风雪。\n\n受过伤，\n却依然选择守护。",
        en: "Alert and loyal.\n\nThey will not approach anyone easily,\nyet will walk into blizzards for those who matter.\n\nWounded before,\nthey still choose to guard.",
      },
      deepAnalysis: {
        zh: "白狼在象征体系里代表孤高的忠诚与族群之间的羁绊。你的角色在信任上极为谨慎，一旦认定归属，会用生命去守护。他们的孤独不是冷漠，而是对背叛的警觉。",
        en: "The white wolf represents solitary nobility and fierce pack loyalty. Your character is cautious with trust; once belonging is chosen, they guard it with their life. Their solitude is not coldness, but vigilance born from past betrayal.",
      },
      resonanceStory: {
        zh: "他们像一匹走在雪线边缘的白狼——独自巡逻，独自承担，却在听见同伴呼唤时，毫不犹豫地回头。",
        en: "They are a white wolf on the snow line — patrolling alone, bearing weight alone, yet turning without hesitation when a companion calls.",
      },
      growthInsight: {
        zh: "成长是允许自己从「孤狼」变成「选择孤独或同行」——不是不再需要人，而是不再害怕需要人。",
        en: "Growth is moving from lone wolf to one who chooses solitude or company — not needing no one, but no longer fearing the need.",
      },
    },
    {
      name: { zh: "北极狐", en: "Arctic Fox" },
      tagline: {
        zh: "在风雪中学会变色与生存",
        en: "Learning to change color and survive the snow",
      },
      keywords: [
        "adapt", "cautious", "clever", "survive", "cold", "watch", "change",
        "适应", "谨慎", "聪明", "生存", "寒冷", "观察", "变化", "灵活",
      ],
      shortPoem: {
        zh: "在风雪中学会变色与生存。\n\n你的角色善于观察环境，\n在必要时调整自己。\n\n这不是虚伪，\n而是活下去的智慧。",
        en: "Learning to change and survive the snow.\n\nYour character reads the world carefully,\nadapting when they must.\n\nThis is not pretense —\nit is the wisdom of staying alive.",
      },
      deepAnalysis: {
        zh: "北极狐随季节变换毛色，象征高度适应力与敏锐的危机感知。你的角色可能经历过环境巨变，因此学会了在变化中保护自己与所在乎的人。",
        en: "The arctic fox shifts with the seasons — a symbol of adaptability and sharp survival instinct. Your character may have lived through upheaval, learning to protect themselves and those they care for by changing with circumstance.",
      },
      resonanceStory: {
        zh: "他们像雪地里一闪而过的影子——轻巧、警觉、几乎不留下痕迹。但熟悉他们的人知道，那层「变色」的外壳下，有一颗从未改变的心。",
        en: "They are a shadow crossing snow — light, alert, leaving almost no trace. Those who know them understand: beneath the shifting coat, one heart remains unchanged.",
      },
      growthInsight: {
        zh: "成长是在适应世界的同时，不再丢失那个真实的自己——即使风雪再大，也记得原本的颜色。",
        en: "Growth is adapting without losing the true self — remembering their original color even when the storm demands change.",
      },
    },
    {
      name: { zh: "乌鸦", en: "Raven" },
      tagline: {
        zh: "在边界行走的智慧者",
        en: "A wise walker between worlds",
      },
      keywords: [
        "clever", "smart", "mysterious", "observe", "know", "magic", "death", "secret",
        "聪明", "智慧", "神秘", "观察", "知晓", "秘密", "死亡", "预兆",
      ],
      shortPoem: {
        zh: "在边界行走的智慧者。\n\n你的角色看得比别人更深，\n却也因此常常显得疏离。\n\n他们知道太多，\n所以选择沉默。",
        en: "A wise walker between worlds.\n\nYour character sees deeper than most,\nand is often mistaken for distant because of it.\n\nThey know too much,\nand choose silence.",
      },
      deepAnalysis: {
        zh: "乌鸦在诸多文化里是通灵者与知识的携带者。你的角色具有超越表面的洞察力，能察觉别人忽略的细节与预兆。他们的神秘并非表演，而是认知过深后的自然状态。",
        en: "Across cultures, the raven carries knowledge and omens. Your character perceives what others overlook — patterns, warnings, hidden truths. Their mystery is not performance, but the natural state of seeing too clearly.",
      },
      resonanceStory: {
        zh: "他们站在故事与故事之间的阴影里，像乌鸦落在枝头——不喧哗，却一眼看穿局势的走向。",
        en: "They stand in the shadow between stories, like a raven on a branch — quiet, yet seeing where events will fall.",
      },
      growthInsight: {
        zh: "成长是学会把洞察变成连接，而不只是旁观——从知晓者，变成引路人。",
        en: "Growth is turning insight into connection, not only observation — from one who knows, to one who guides.",
      },
    },
    {
      name: { zh: "雄鹿", en: "Stag" },
      tagline: {
        zh: "沉默的领袖与荣誉的化身",
        en: "Silent leader and embodiment of honor",
      },
      keywords: [
        "noble", "leader", "proud", "honor", "duty", "guardian", "strong",
        "高贵", "领袖", "骄傲", "荣誉", "责任", "守护", "强大", "威严",
      ],
      shortPoem: {
        zh: "沉默的领袖与荣誉的化身。\n\n你的角色习惯承担责任，\n把别人的安全放在自己之前。\n\n他们很少索取，\n却总在关键时刻站出来。",
        en: "Silent leader, embodiment of honor.\n\nYour character carries responsibility naturally,\nplacing others' safety before their own.\n\nThey ask little,\nyet always step forward when it counts.",
      },
      deepAnalysis: {
        zh: "雄鹿象征高贵的领导力与无声的权威。你的角色可能并不渴望权力，却在危机中成为他人依赖的中心。他们的骄傲来自责任，而非虚荣。",
        en: "The stag symbolizes noble leadership and quiet authority. Your character may not seek power, yet becomes the center others rely on in crisis. Their pride comes from duty, not vanity.",
      },
      resonanceStory: {
        zh: "他们像森林深处那头静立的鹿——不主动攻击，却用存在本身稳住整个族群。角上的每一道纹路，都是一次承担过的重量。",
        en: "They are the stag standing deep in the forest — not aggressive, yet stabilizing the herd by presence alone. Every line on their antlers marks a weight once carried.",
      },
      growthInsight: {
        zh: "成长是明白：领袖也需要被照顾——荣誉不等于永远坚强。",
        en: "Growth is understanding that leaders need care too — honor is not the same as eternal strength.",
      },
    },
    {
      name: { zh: "黑猫", en: "Black Cat" },
      tagline: {
        zh: "被误解的独立灵魂",
        en: "An independent soul often misunderstood",
      },
      keywords: [
        "independent", "alone", "misunderstood", "intuition", "secret", "free",
        "独立", "孤独", "误解", "直觉", "秘密", "自由", "神秘", "猫",
      ],
      shortPoem: {
        zh: "被误解的独立灵魂。\n\n你的角色习惯独自行走，\n不是不需要陪伴，\n而是太熟悉被误读的感觉。\n\n他们的直觉，\n往往比语言更准确。",
        en: "An independent soul, often misunderstood.\n\nYour character walks alone —\nnot because they need no company,\nbut because they know misreading too well.\n\nTheir intuition speaks clearer than words.",
      },
      deepAnalysis: {
        zh: "黑猫象征独立、直觉与被污名化的优雅。你的角色可能因外表或选择而被误解，却始终保持自己的节奏。他们靠近谁、远离谁，全凭内在的感知。",
        en: "The black cat symbolizes independence, intuition, and grace under stigma. Your character may be misread for how they look or choose to live, yet keeps their own rhythm. Who they approach or avoid follows inner knowing.",
      },
      resonanceStory: {
        zh: "他们像夜色里悄然走过的猫——不解释，不讨好，只在想停留的地方停留。懂的人，自然会懂。",
        en: "They are a cat moving through night — explaining nothing, pleasing no one, staying only where they wish. Those meant to understand, will.",
      },
      growthInsight: {
        zh: "成长是找到不必解释也能被看见的关系——独立不等于永远孤立。",
        en: "Growth is finding relationships where they are seen without explanation — independence need not mean permanent isolation.",
      },
    },
    {
      name: { zh: "猫头鹰", en: "Owl" },
      tagline: {
        zh: "在沉默中积累智慧",
        en: "Gathering wisdom in silence",
      },
      keywords: [
        "wise", "watch", "quiet", "knowledge", "observe", "teacher", "night",
        "智慧", "观察", "安静", "知识", "洞察", "老师", "夜", "沉默",
      ],
      shortPoem: {
        zh: "在沉默中积累智慧。\n\n你的角色更擅长倾听与观察，\n而不是急于表达。\n\n他们看得远，\n因此走得慢——但每一步都经过思考。",
        en: "Gathering wisdom in silence.\n\nYour character listens and watches\nmore readily than they speak.\n\nThey see far,\nand move slowly — each step considered.",
      },
      deepAnalysis: {
        zh: "猫头鹰象征通过观察获得的智慧。你的角色不急于行动，而是在充分理解后才做出判断。他们的安静不是空白，而是思考正在发生。",
        en: "The owl symbolizes wisdom earned through watching. Your character does not rush to act; they judge only after understanding. Their quiet is not emptiness — thought is happening inside.",
      },
      resonanceStory: {
        zh: "他们像站在枝头的猫头鹰——在所有人都睡去的时候，替世界守着那些未被说出的真相。",
        en: "They are an owl on the branch — while the world sleeps, keeping watch over truths not yet spoken.",
      },
      growthInsight: {
        zh: "成长是把自己看见的东西，适时地说出来——智慧只有被分享，才能照亮别人。",
        en: "Growth is speaking what they see, when the moment is right — wisdom illuminates others only when shared.",
      },
    },
  ],
};

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
  summary: string,
): BilingualText {
  const name = characterName || "你的角色";
  const nameEn = characterName || "your character";
  const summaryZh = summary ? `\n\n${summary}` : "";
  const summaryEn = summary ? `\n\n${summary}` : "";

  return {
    zh: poem.zh.replace(/你的角色/g, name).concat(summaryZh ? `\n\n「${summary}」——这便是他们给人的第一印象。` : ""),
    en: poem.en.replace(/Your character/g, nameEn).concat(summaryEn ? `\n\n"${summary}" — the first impression they leave.` : ""),
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

  return scored[0].item;
}

function buildMatch(
  category: ResonanceCategory,
  picked: ArchetypeOption,
  characterName: string,
  summary: string,
): ResonanceReport["plant"] {
  const meta = CATEGORY_META[category];
  return {
    category,
    icon: meta.icon,
    label: meta.label,
    name: picked.name,
    tagline: picked.tagline,
    shortPoem: personalizePoem(picked.shortPoem, characterName, summary),
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
    plant: buildMatch("plant", plantPicked, name, summary),
    animal: buildMatch("animal", animalPicked, name, summary),
    keywords: pickKeywords(corpus, supplementaryCorpus, seed),
  };

  return attachPremiumContent(base, characterData);
}
