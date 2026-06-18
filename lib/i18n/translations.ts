export type Locale = "zh" | "en";

export const LOCALE_KEY = "oc-resonance-locale";
export const DEFAULT_LOCALE: Locale = "zh";

export type TranslationKey = keyof typeof translations.zh;

export const translations = {
  zh: {
    navHome: "首页",
    navCreate: "创建",
    siteName: "OC Resonance",

    heroTitle: "发现你的OC的植物塑与动物塑",
    heroSubtitle: "通过AI分析角色性格与特质，\n找到最契合TA灵魂的植物与动物。",
    heroCta: "开始分析",
    heroCtaSecondary: "查看示例",

    howTitle: "如何使用",
    step1Title: "填写你的OC信息",
    step1Desc: "名字、性格关键词、优缺点与简介——不到一分钟。",
    step2Title: "AI分析角色特征",
    step2Desc: "从性格、价值观与情感模式中，寻找最有意义的共鸣。",
    step3Title: "获得植物与动物共鸣结果",
    step3Desc: "诗意、美观、适合截图——像一篇精致的小红书笔记。",

    exampleTitle: "示例预览",
    examplePlant: "白山茶",
    exampleAnimal: "白狼",
    exampleKeywords: "守护 · 忠诚 · 温柔",
    exampleCta: "查看完整示例",

    createTitle: "创建角色档案",
    createSubtitle: "填写角色信息，寻找TA的植物与动物塑。",

    formRequired: "必填",
    formOptional: "（可选）",
    fieldName: "OC名称",
    fieldNamePlaceholder: "Elias Frost",
    fieldTraits: "性格关键词",
    fieldTraitsPlaceholder: "输入后按回车添加",
    fieldStrengths: "优点",
    fieldStrengthsPlaceholder: "善良、冷静、责任感强",
    fieldWeaknesses: "缺点",
    fieldWeaknessesPlaceholder: "容易自责、不信任别人",
    fieldSummary: "OC简介",
    fieldSummaryPlaceholder: "表面冷淡但内心温柔的守护者",
    fieldBackground: "角色背景",
    fieldBackgroundPlaceholder: "简要描述角色的来历或处境……",
    fieldEvent: "重要事件",
    fieldEventPlaceholder: "一个改变角色的关键时刻……",

    formSupplementary: "角色补充信息（选填）",
    fieldHobbies: "爱好",
    fieldHobbiesPlaceholder: "绘画、阅读、园艺、摄影",
    fieldFavoriteFoods: "喜欢吃的东西",
    fieldFavoriteFoodsPlaceholder: "草莓蛋糕、热可可、拉面",
    fieldDislikedFoods: "讨厌吃的东西",
    fieldDislikedFoodsPlaceholder: "香菜、苦瓜、海鲜",
    fieldFears: "害怕的东西",
    fieldFearsPlaceholder: "失去重要的人、深海、黑暗、孤独",

    tagHint: "按 Enter 添加标签",
    submitButton: "开始共鸣分析",
    errorNameRequired: "请输入 OC 名称。",
    errorLimitReached: "今日免费次数已用完（每日 3 次）。",

    loadingMsg1: "正在聆听角色的故事……",
    loadingMsg2: "正在寻找最契合的生命象征……",
    loadingMsg3: "正在连接植物与动物共鸣……",

    reportEyebrow: "共鸣结果",
    reportNoData: "未找到共鸣结果。",
    reportCreateLink: "创建角色",
    reportLoading: "正在加载……",
    plantResonance: "植物共鸣",
    animalResonance: "动物共鸣",
    keywordsTitle: "共鸣关键词",

    unlockTitle: "解锁完整共鸣报告",
    unlockCta: "查看完整版分析",

    premiumEyebrow: "完整共鸣报告",
    plantDeepTitle: "植物深度解析",
    animalDeepTitle: "动物深度解析",
    symbolism: "象征意义",
    flowerLanguage: "花语",
    emotionalMeaning: "情感含义",
    growthMeaning: "成长寓意",
    instinct: "本能特质",
    behaviorSymbolism: "行为象征",
    relationshipPattern: "关系模式",
    protectiveTraits: "守护特质",
    growthTrajectoryTitle: "角色成长轨迹",
    past: "过去",
    present: "现在",
    future: "未来",
    narrativeTitle: "共鸣故事",

    sharePosterTitle: "分享卡片",
    sharePosterHint: "竖版 9:16，适合小红书截图",
    savePoster: "保存分享卡片",
    downloadImage: "下载图片",
    shareResult: "分享结果",
    analyzeAnother: "再分析一个",
    toastCopied: "已复制到剪贴板",
    toastShareUnavailable: "当前浏览器不支持分享",
    toastPrint: "在打印对话框中选择「另存为 PDF」",

    premiumBadge: "高级版",
    premiumPrice: "¥3.9",
    premiumPriceNote: "一次性解锁本次报告",
    premiumUnlock: "解锁完整报告",
    premiumDemoNote: "扫码支付后，点击下方按钮查看完整报告",

    premiumPageTitle: "解锁完整共鸣报告",
    premiumPageDesc: "扫码完成支付后，即可解锁深层象征解读、角色成长轨迹与完整共鸣故事。",
    wechatPay: "微信支付",
    alipayPay: "支付宝",
    wechatQrPlaceholder: "微信收款码\n（待替换）",
    alipayQrPlaceholder: "支付宝收款码\n（待替换）",
    premiumPayNote: "支付完成后，请点击下方按钮进入完整报告。",
    premiumConfirmPaid: "我已完成付款",
    premiumBackToReport: "返回免费报告",

    aboutTitle: "关于 OC Resonance",
    aboutP1:
      "很长一段时间之前，我在小红书发布了一条帖子：「你发oc我发植物塑」。虽然没有多少点赞，也没有多少人关注或者留言，但我总能在这些寥寥无几的评论下进行回复时感到很欣慰和享受——世界上有这么多各种各样的植物真是一种乐趣啊啊啊！！！",
    aboutP2:
      "我仿佛一直对植物和动物有莫大的兴趣。作为一个高中生，后来也对 OC 创作、写作等方面萌生了想要深耕的想法。于是我做了这个网站，想让大家都能从这个网站中发现社会与自然的联系，能发现自己笔下的 OC 的另一面。",
    aboutP3: "希望大家能在这里玩的开心！",
    aboutSignature: "Queenie... 2026.6.18",

    contactTitle: "联系我们",
    contactEmail: "邮件",
    contactEmailValue: "queeniegxx1019@gmail.com",
    contactXhs: "小红书",
    contactXhsId: "9223711100",
    contactXhsHandle: "(@Quk1)",

    privacyTitle: "隐私政策",
    privacyIntro:
      "欢迎使用 OC Resonance。本隐私政策说明我们如何处理你在使用本网站时提供的信息。",
    privacySection1Title: "用户输入的使用",
    privacySection1Body:
      "你在创建角色时填写的名称、性格特点、优缺点、简介及可选的背景信息，仅用于生成植物与动物共鸣分析，不会用于任何其他目的。",
    privacySection2Title: "不出售个人信息",
    privacySection2Body:
      "我们不会出售、出租或以其他方式向第三方提供你的个人信息。",
    privacySection3Title: "AI 生成的分析结果",
    privacySection3Body:
      "本网站的共鸣分析结果由 AI 根据你提供的角色信息自动生成，仅供创作参考与娱乐用途，不构成心理学、医学或学术诊断。",
    privacySection4Title: "数据删除",
    privacySection4Body: "如需删除与你相关的数据，请通过",
    privacySection4BodyEnd: "页面联系创作者，我们会尽快处理你的请求。",

    footerAbout: "关于",
    footerPrivacy: "隐私政策",
    footerContact: "联系",
    footerTagline: "OC Resonance · 为 OC 创作者而生",

    posterFooter: "Discover Your Character's Symbolic Soul",
  },
  en: {
    navHome: "Home",
    navCreate: "Create",
    siteName: "OC Resonance",

    heroTitle: "Discover Your OC's Plant & Animal Form",
    heroSubtitle:
      "AI analyzes personality and traits\nto find the plant and animal that resonate with their soul.",
    heroCta: "Start Analysis",
    heroCtaSecondary: "View Example",

    howTitle: "How It Works",
    step1Title: "Fill in your OC's info",
    step1Desc: "Name, trait tags, strengths, weaknesses, and summary — under one minute.",
    step2Title: "AI analyzes character traits",
    step2Desc: "Finds meaningful resonance from personality, values, and emotional patterns.",
    step3Title: "Get plant & animal resonance",
    step3Desc: "Poetic, aesthetic, screenshot-ready — like a curated social post.",

    exampleTitle: "Example Preview",
    examplePlant: "White Camellia",
    exampleAnimal: "White Wolf",
    exampleKeywords: "Guardianship · Loyalty · Tenderness",
    exampleCta: "View Full Example",

    createTitle: "Create Character Profile",
    createSubtitle: "Fill in character info to find their plant and animal form.",

    formRequired: "Required",
    formOptional: "(Optional)",
    fieldName: "OC Name",
    fieldNamePlaceholder: "Elias Frost",
    fieldTraits: "Personality Tags",
    fieldTraitsPlaceholder: "Press Enter to add",
    fieldStrengths: "Strengths",
    fieldStrengthsPlaceholder: "Kind, calm, responsible",
    fieldWeaknesses: "Weaknesses",
    fieldWeaknessesPlaceholder: "Self-blaming, distrustful",
    fieldSummary: "OC Summary",
    fieldSummaryPlaceholder: "A cold surface hiding a gentle guardian's heart",
    fieldBackground: "Background",
    fieldBackgroundPlaceholder: "Origin or current situation…",
    fieldEvent: "Important Event",
    fieldEventPlaceholder: "A moment that changed them…",

    formSupplementary: "Supplementary Info (Optional)",
    fieldHobbies: "Hobbies",
    fieldHobbiesPlaceholder: "Drawing, reading, gardening, photography",
    fieldFavoriteFoods: "Favorite Foods",
    fieldFavoriteFoodsPlaceholder: "Strawberry cake, hot cocoa, ramen",
    fieldDislikedFoods: "Disliked Foods",
    fieldDislikedFoodsPlaceholder: "Cilantro, bitter melon, seafood",
    fieldFears: "Fears",
    fieldFearsPlaceholder: "Losing someone important, the deep sea, darkness, solitude",

    tagHint: "Press Enter to add a tag",
    submitButton: "Start Resonance Analysis",
    errorNameRequired: "Please enter an OC name.",
    errorLimitReached: "Free daily limit reached (3 per day).",

    loadingMsg1: "Listening to your character's story…",
    loadingMsg2: "Searching for the most fitting life symbols…",
    loadingMsg3: "Connecting plant and animal resonance…",

    reportEyebrow: "Resonance Result",
    reportNoData: "No resonance result found.",
    reportCreateLink: "Create a character",
    reportLoading: "Loading…",
    plantResonance: "Plant Resonance",
    animalResonance: "Animal Resonance",
    keywordsTitle: "Resonance Keywords",

    unlockTitle: "Unlock Full Resonance Report",
    unlockCta: "View Full Analysis",

    premiumEyebrow: "Full Resonance Report",
    plantDeepTitle: "Deep Plant Analysis",
    animalDeepTitle: "Deep Animal Analysis",
    symbolism: "Symbolism",
    flowerLanguage: "Flower Language",
    emotionalMeaning: "Emotional Meaning",
    growthMeaning: "Growth Meaning",
    instinct: "Instinct",
    behaviorSymbolism: "Behavior Symbolism",
    relationshipPattern: "Relationship Pattern",
    protectiveTraits: "Protective Traits",
    growthTrajectoryTitle: "Character Growth Arc",
    past: "Past",
    present: "Present",
    future: "Future",
    narrativeTitle: "Resonance Story",

    sharePosterTitle: "Share Card",
    sharePosterHint: "9:16 vertical layout for Xiaohongshu",
    savePoster: "Save Share Card",
    downloadImage: "Download Image",
    shareResult: "Share",
    analyzeAnother: "Analyze Another",
    toastCopied: "Copied to clipboard",
    toastShareUnavailable: "Sharing not available",
    toastPrint: "Choose Save as PDF in print dialog",

    premiumBadge: "Premium",
    premiumPrice: "¥3.9",
    premiumPriceNote: "One-time unlock for this report",
    premiumUnlock: "Unlock Full Report",
    premiumDemoNote: "After scanning to pay, tap the button below for your full report",

    premiumPageTitle: "Unlock Full Resonance Report",
    premiumPageDesc:
      "After payment, unlock deep symbolic analysis, growth arc, and the full resonance story.",
    wechatPay: "WeChat Pay",
    alipayPay: "Alipay",
    wechatQrPlaceholder: "WeChat QR Code\n(placeholder)",
    alipayQrPlaceholder: "Alipay QR Code\n(placeholder)",
    premiumPayNote: "After paying, tap the button below to open your full report.",
    premiumConfirmPaid: "I Have Completed Payment",
    premiumBackToReport: "Back to Free Report",

    aboutTitle: "About OC Resonance",
    aboutP1:
      "A while ago, I posted on Xiaohongshu: \"Send me your OC, I'll send you a plant form.\" It didn't get many likes, follows, or comments — but replying to those few always felt warm and joyful. So many kinds of plants in the world — what a delight!!!",
    aboutP2:
      "I've always been deeply drawn to plants and animals. As a high school student, I also grew serious about OC creation and writing — so I built this site, hoping everyone can discover the link between society and nature here, and find another side of the characters they write.",
    aboutP3: "Hope you have fun here!",
    aboutSignature: "Queenie... 2026.6.18",

    contactTitle: "Contact",
    contactEmail: "Email",
    contactEmailValue: "queeniegxx1019@gmail.com",
    contactXhs: "Xiaohongshu",
    contactXhsId: "9223711100",
    contactXhsHandle: "(@Quk1)",

    privacyTitle: "Privacy Policy",
    privacyIntro:
      "Welcome to OC Resonance. This policy explains how we handle information you provide when using this site.",
    privacySection1Title: "Use of Your Input",
    privacySection1Body:
      "Character name, traits, strengths, weaknesses, summary, and optional background are used only to generate plant and animal resonance analysis — for no other purpose.",
    privacySection2Title: "We Do Not Sell Personal Information",
    privacySection2Body:
      "We do not sell, rent, or otherwise provide your personal information to third parties.",
    privacySection3Title: "AI-Generated Results",
    privacySection3Body:
      "Resonance analysis on this site is automatically generated by AI from the character information you provide. It is intended for creative reference and entertainment only — not psychological, medical, or academic diagnosis.",
    privacySection4Title: "Data Deletion",
    privacySection4Body: "To request deletion of data related to you, please contact the creator via the",
    privacySection4BodyEnd: " page and we will process your request as soon as possible.",

    footerAbout: "About",
    footerPrivacy: "Privacy",
    footerContact: "Contact",
    footerTagline: "OC Resonance · For OC creators",

    posterFooter: "Discover Your Character's Symbolic Soul",
  },
} as const;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key];
}

export function bt(text: { zh: string; en: string }, locale: Locale): string {
  return text[locale];
}
