import { Tools } from "@/libs/tools";
import { ToolCategory } from "@/types/tool";
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
            features={Tools.filter((tool) =>
              tool.category.includes(ToolCategory.PDF)
            )}
          />
        </div>
        <Spacer y={10} />
        <div className="flex flex-col gap-8">
          <div>
            <h1 className={title({ size: "lg", color: "violet" })}>
              # Image Tools
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
            features={Tools.filter((tool) =>
              tool.category.includes(ToolCategory.IMAGE)
            )}
          />
        </div>
      </section>
    </>
  );
};