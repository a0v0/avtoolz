import {FeaturesGrid} from "@/components/marketing/features-grid";
import {Tools} from "@/config/tools";

function page() {
  return (
    // TODO: add a mini navbar to search, sort and filter tools
    <>
      <main className="container mx-auto max-w-7xl px-6 flex-grow mt-10">
        <section className="flex flex-col items-center justify-center">
          <FeaturesGrid
            classNames={{
              base: "lg:grid-cols-3",
              iconWrapper: "bg-transparent",
              header: "pt-2",
              body: "pt-0 pb-2",
            }}
            features={Tools}
          />
        </section>
      </main>
    </>
  );
}

export default page;
