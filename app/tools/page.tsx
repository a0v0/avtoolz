import {ToolsGrid} from "@/components/marketing/features-grid";
import {Tools} from "@/config/tools";

function page() {
  return (
    // TODO: add a mini navbar to search, sort and filter tools

    <section className="flex flex-col items-center justify-center px-4">
      <ToolsGrid
        classNames={{
          base: "lg:grid-cols-3",
          iconWrapper: "bg-transparent",
          header: "pt-2",
          body: "pt-0 pb-2",
        }}
        features={Tools}
      />
    </section>
  );
}

export default page;
