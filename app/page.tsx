import BackgroundEffects from "@/components/background-effects";
import HeroX from "@/components/hero";
import {ToolsCards} from "@/components/tools";

// async function getData() {
//   try {
//     const sponsors = await getAllSponsors();

//     return {
//       sponsors,
//     };
//   } catch (error) {
//     throw new Error("Failed to fetch data");
//   }
// }

export default async function Home() {
  // const data = await getData();

  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow">
      <section className="flex flex-col items-center justify-center">
        <BackgroundEffects />
        <HeroX />
        <ToolsCards />
      </section>
    </main>
  );
}
