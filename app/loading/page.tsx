import AmbientBackground from "@/components/AmbientBackground";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingView from "@/components/LoadingView";

export default function LoadingPage() {
  return (
    <>
      <AmbientBackground showFlowers={false} />
      <Header active="create" />

      <main className="relative z-10 px-5 pb-16 pt-4 md:px-12">
        <LoadingView />
      </main>

      <Footer />
    </>
  );
}
