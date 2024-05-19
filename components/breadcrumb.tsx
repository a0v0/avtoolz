"use client";
import {getToolByHref} from "@/config/tools";

import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
import {usePathname} from "next/navigation";

function Breadcrumb() {
  const path = usePathname();
  const tool = getToolByHref(path);

  return (
    <Breadcrumbs className="flex justify-center my-5">
      <BreadcrumbItem
        href="/"
        startContent={<span className="icon-[solar--home-smile-angle-bold] size-5"></span>}
      >
        Home
      </BreadcrumbItem>

      <BreadcrumbItem
        href="/tools"
        startContent={<span className="icon-[fluent--grid-24-filled] size-5"></span>}
      >
        Tools
      </BreadcrumbItem>
      {path.includes("/tools/") ? (
        <BreadcrumbItem
          startContent={
            <span className="icon-[bi--wrench-adjustable-circle-fill] size-[18px]"></span>
          }
        >
          {tool?.title}
        </BreadcrumbItem>
      ) : null}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
