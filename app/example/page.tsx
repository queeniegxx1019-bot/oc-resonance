"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AmbientBackground from "@/components/AmbientBackground";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { createDemoReport } from "@/lib/demo";
import { unlockPremium } from "@/lib/premium";
import { STORAGE_KEY } from "@/lib/types";
import { useLanguage } from "@/components/LanguageProvider";

export default function ExamplePage() {
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(createDemoReport()));
    unlockPremium();
    router.replace("/report/premium");
  }, [router]);

  return (
    <>
      <AmbientBackground showFlowers={false} />
      <Header active="home" />
      <main className="relative z-10 flex min-h-[50vh] items-center justify-center">
        <p className="text-sage-muted">{t("reportLoading")}</p>
      </main>
      <Footer />
    </>
  );
}
