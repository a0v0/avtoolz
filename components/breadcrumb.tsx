"use client";
import {getToolByHref} from "@/config/tools";
import {Icon} from "@iconify/react";

import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
import {usePathname} from "next/navigation";

function Breadcrumb() {
  const path = usePathname();
  const tool = getToolByHref(path);

  return (
    <Breadcrumbs className="flex justify-center my-5">
      <BreadcrumbItem
        href="/"
        startContent={<Icon icon="solar:home-smile-angle-bold" fontSize={20} />}
      >
        Home
      </BreadcrumbItem>

      <BreadcrumbItem
        href="/tools"
        startContent={<Icon icon="fluent:grid-24-filled" fontSize={20} />}
      >
        Tools
      </BreadcrumbItem>
      {path.includes("/tools/") ? (
        <BreadcrumbItem
          startContent={<Icon icon="bi:wrench-adjustable-circle-fill" width="18" height="18" />}
        >
          {tool?.title}
        </BreadcrumbItem>
      ) : null}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
