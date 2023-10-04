import { pdfTools } from "@/libs/constants";
import { Spacer } from "@nextui-org/react";
import { FeaturesGrid } from "./features-grid";
import { sectionWrapper, title } from "./primitives";

export const ToolsCards = () => {
  return (
    <>
      <Spacer y={28} />

      <section id="all_tools" className={sectionWrapper({})}>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className={title({ size: "lg", color: "green" })}>
              # PDF Tools
            </h1>
          </div>
          <FeaturesGrid
            classNames={{
              base: "lg:grid-cols-3",
              iconWrapper: "bg-transparent",
              header: "pt-2",
              body: "pt-0 pb-2",
              // description: "hidden",
            }}
            features={pdfTools}
          />
        </div>
      </section>
    </>
  );
};
