import Hero from "@/components/hero";
import { ToolsCards } from "@/components/ToolsGrid";

export default function Index() {
  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow">
      <section className="flex flex-col items-center ">
        {/* <BackgroundEffects /> */}
        <Hero />
        <ToolsCards />
      </section>
    </main>
  );
}
