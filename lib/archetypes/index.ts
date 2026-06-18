import type { ResonanceCategory } from "../types";
import { ANIMAL_ARCHETYPES } from "./animals";
import { PLANT_ARCHETYPES } from "./plants";
import type { ArchetypeOption } from "./types";

export type { ArchetypeOption } from "./types";

export const ARCHETYPES: Record<ResonanceCategory, ArchetypeOption[]> = {
  plant: PLANT_ARCHETYPES,
  animal: ANIMAL_ARCHETYPES,
};
