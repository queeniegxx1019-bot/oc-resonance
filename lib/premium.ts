export const PREMIUM_KEY = "oc-resonance-premium";

export function isPremiumUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(PREMIUM_KEY) === "true";
}

export function unlockPremium(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREMIUM_KEY, "true");
}

export function lockPremium(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PREMIUM_KEY);
}

export const PREMIUM_PRICE = 3.9;
