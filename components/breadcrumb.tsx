"use client";
import {getToolByHref} from "@/config/tools";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
import {usePathname} from "next/navigation";

function Breadcrumb() {
  const path = usePathname();
  const tool = getToolByHref(path);

  return (
    <Breadcrumbs className="flex justify-center my-5">
      <BreadcrumbItem href="/" startContent={<HomeRoundedIcon fontSize="small" />}>
        Home
      </BreadcrumbItem>

      <BreadcrumbItem href="/tools" startContent={<GridViewRoundedIcon fontSize="small" />}>
        Tools
      </BreadcrumbItem>
      {path.includes("/tools/") ? (
        <BreadcrumbItem startContent={<BuildCircleRoundedIcon fontSize="small" />}>
          {tool?.title}
        </BreadcrumbItem>
      ) : null}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
