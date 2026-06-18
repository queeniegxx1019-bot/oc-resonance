import type { BilingualText } from "../types";

export interface ArchetypeOption {
  name: BilingualText;
  tagline: BilingualText;
  keywords: string[];
  imageUrl: string;
  shortPoem: BilingualText;
  deepAnalysis: BilingualText;
  resonanceStory: BilingualText;
  growthInsight: BilingualText;
}

export function archetype(data: ArchetypeOption): ArchetypeOption {
  return data;
}
