import AmbientBackground from "@/components/AmbientBackground";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StaticPageContent from "@/components/StaticPageContent";

export default function AboutPage() {
  return (
    <>
      <AmbientBackground showFlowers={false} />
      <Header active="home" />
      <main className="relative z-10 px-5 pb-16 pt-4 md:px-12">
        <StaticPageContent page="about" />
      </main>
      <Footer />
    </>
  );
}
