"use client";
import {routes as manifest} from "@/config/routes";
import {Spacer} from "@nextui-org/react";
import {FeaturesGrid} from "../marketing/features-grid";
import {sectionWrapper, title} from "../primitives";

export const ToolsCards = () => {
  return (
    <>
      <section id="all_tools" className={sectionWrapper({})}>
        {manifest.routes.map((category) => (
          <div key={category.key} className="flex flex-col gap-8">
            <div>
              <h1
                className={title({
                  size: "lg",
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
            </div>
            <FeaturesGrid
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
        ))}
      </section>
    </>
  );
};
