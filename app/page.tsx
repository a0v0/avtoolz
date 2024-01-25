import BackgroundEffects from "@/components/background-effects";
import HeroX from "@/components/hero";
import {ToolsCards} from "@/components/tools";
import {getAllSponsors} from "@/utils/get-all-sponsors";

async function getData() {
  try {
    const sponsors = await getAllSponsors();

    return {
      sponsors,
    };
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow">
      <section className="flex flex-col items-center justify-center">
        <BackgroundEffects />

        {/* <Hero /> */}
        <HeroX />
        <ToolsCards />
        {/* <FeaturesGrid features={landingContent.topFeatures} />
        <Sponsors />
        <CustomThemes />
        <A11yOtb />
        <DarkMode />
        <Customization />
        <LastButNotLeast />
        <Support sponsors={data.sponsors} />
        <Spacer y={24} />
        <InstallBanner />
        <Community /> */}
        {/* <Spacer y={24} /> */}
      </section>
    </main>
  );
}
