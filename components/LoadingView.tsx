"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateResonanceReport } from "@/lib/analysis";
import { isPremiumUnlocked } from "@/lib/premium";
import { incrementUsage } from "@/lib/usage";
import {
  EMPTY_CHARACTER,
  PENDING_KEY,
  STORAGE_KEY,
  type CharacterInput,
  type ResonanceReport,
} from "@/lib/types";
import { useLanguage } from "./LanguageProvider";

const LOADING_MESSAGES = ["loadingMsg1", "loadingMsg2", "loadingMsg3"] as const;
const MIN_DURATION = 3000;
const MAX_DURATION = 5500;

export default function LoadingView() {
  const router = useRouter();
  const { t } = useLanguage();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1800);

    const start = Date.now();
    const duration =
      MIN_DURATION + Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION));

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / duration) * 100));
    }, 50);

    async function runAnalysis() {
      const raw = sessionStorage.getItem(PENDING_KEY);
      if (!raw) {
        router.replace("/create");
        return;
      }

      let character: CharacterInput;
      try {
        character = { ...EMPTY_CHARACTER, ...(JSON.parse(raw) as CharacterInput) };
      } catch {
        router.replace("/create");
        return;
      }

      await new Promise((r) => setTimeout(r, duration));

      const report: ResonanceReport = generateResonanceReport(
        character,
        isPremiumUnlocked(),
      );
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(report));
      sessionStorage.removeItem(PENDING_KEY);
      incrementUsage();
      router.replace("/report");
    }

    runAnalysis();

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [router]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* Botanical circle progress */}
      <div className="relative mb-10 h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(201,228,160,0.6)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
            className="transition-[stroke-dashoffset] duration-100"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-float text-4xl">🌿</span>
        </div>
        {/* Orbiting leaves */}
        <span className="absolute left-0 top-1/2 animate-float text-lg opacity-60">🍃</span>
        <span className="absolute right-0 top-1/3 animate-float text-lg opacity-50 [animation-delay:-3s]">
          🍃
        </span>
      </div>

      <p className="font-display text-xl text-sage-300 transition-opacity duration-500 md:text-2xl">
        {t(LOADING_MESSAGES[messageIndex])}
      </p>

      {/* Drifting leaves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute animate-float text-2xl opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${-i * 2.5}s`,
            }}
          >
            🍂
          </span>
        ))}
      </div>
    </div>
  );
}
