import { DAILY_LIMIT, USAGE_KEY } from "./types";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getUsageCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw) as { date: string; count: number };
    return data.date === todayKey() ? data.count : 0;
  } catch {
    return 0;
  }
}

export function incrementUsage(): void {
  if (typeof window === "undefined") return;
  const count = getUsageCount() + 1;
  localStorage.setItem(USAGE_KEY, JSON.stringify({ date: todayKey(), count }));
}

export function canAnalyze(): boolean {
  return getUsageCount() < DAILY_LIMIT;
}

export function remainingAnalyses(): number {
  return Math.max(0, DAILY_LIMIT - getUsageCount());
}
