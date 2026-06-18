import { attachPremiumContent } from "./premium-content";
import { generateResonanceReport } from "./analysis";
import type { CharacterInput, ResonanceReport } from "./types";

export const DEMO_CHARACTER: CharacterInput = {
  name: "Elias Frost",
  traits: "忠诚、安静、敏感、固执",
  strengths: "善良、冷静、责任感强",
  weaknesses: "容易自责、不信任别人",
  summary: "表面冷淡但内心温柔的守护者",
  background: "在边境城市长大，习惯独自承担。",
  importantEvent: "曾失去最重要的同伴，从此更加沉默。",
  hobbies: "",
  favoriteFoods: "",
  dislikedFoods: "",
  fears: "",
};

export function createDemoReport(): ResonanceReport {
  const base = generateResonanceReport(DEMO_CHARACTER, true);
  return attachPremiumContent(base, DEMO_CHARACTER);
}
