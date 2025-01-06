import { routes as manifest } from "@/config/routes";
import { Spacer } from "@nextui-org/react";
// import {sectionWrapper, title} from "../primitives";
import { sectionWrapper, title } from "@/lib/primitives";
import { ToolsGrid } from "./grid";

export const AllTools = () => {
  return (
    <section id="all_tools" className={sectionWrapper({})}>
      {manifest.items.map((category) =>
        category.routes.length > 0 ? (
          <div
            id={category.key + "_cat"}
            key={category.key}
            className="flex flex-col gap-8"
          >
            <h1
              id={category.key + "_title"}
              className={title({
                size: "md",
                color: category.color as
                  | "violet"
                  | "yellow"
                  | "blue"
                  | "cyan"
                  | "green"
                  | "pink"
                  | "foreground"
                  | undefined,
              })}
            >
              # {category.title}
            </h1>

            <ToolsGrid
              id={category.key + "_tools"}
              classNames={{
                base: "lg:grid-cols-3",
                iconWrapper: "bg-transparent",
                header: "pt-2",
                body: "pt-0 pb-2",
              }}
              features={category.routes}
            />
            <Spacer y={10} />
          </div>
        ) : null
      )}
    </section>
  );
};
