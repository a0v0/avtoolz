"use client";
import {getToolByHref} from "@/config/tools";
import BuildCircleRoundedIcon from "@mui/icons-material/BuildCircleRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
export default function ToolLayout({children}: {children: React.ReactNode}) {
  const path = usePathname();
  const tool = getToolByHref(path);
  const router = useRouter();

  return (
    <main className="h-screen overflow-auto px-2">
      <Breadcrumbs className="flex justify-center mt-4">
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
      {children}
    </main>
  );
}
