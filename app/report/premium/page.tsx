import AmbientBackground from "@/components/AmbientBackground";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PremiumReportView from "@/components/PremiumReportView";

export default function PremiumReportPage() {
  return (
    <>
      <AmbientBackground showFlowers={false} />
      <Header active="create" />

      <main className="relative z-10 px-5 pb-16 pt-4 md:px-12">
        <div className="mx-auto max-w-3xl">
          <PremiumReportView />
        </div>
      </main>

      <Footer />
    </>
  );
}
