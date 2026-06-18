import AmbientBackground from "@/components/AmbientBackground";
import ExamplePreview from "@/components/ExamplePreview";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import HowItWorks from "@/components/HowItWorks";

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <Header active="home" />

      <main className="relative z-10 bg-hero-glow">
        <HomeHero />
        <HowItWorks />
        <ExamplePreview />
      </main>

      <Footer />
    </>
  );
}
