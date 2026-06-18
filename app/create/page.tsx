import AmbientBackground from "@/components/AmbientBackground";
import CharacterForm from "@/components/CharacterForm";
import CreatePageHeader from "@/components/CreatePageHeader";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function CreatePage() {
  return (
    <>
      <AmbientBackground showFlowers={false} />
      <Header active="create" />

      <main className="relative z-10 px-5 pb-16 pt-4 md:px-12">
        <div className="mx-auto max-w-2xl">
          <CreatePageHeader />
          <CharacterForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
