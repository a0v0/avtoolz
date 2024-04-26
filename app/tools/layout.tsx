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
        <BreadcrumbItem
          onPress={() => router.push("/")}
          startContent={<HomeRoundedIcon fontSize="small" />}
        >
          Home
        </BreadcrumbItem>
        {/* TODO: route to tools page */}
        <BreadcrumbItem startContent={<GridViewRoundedIcon fontSize="small" />}>
          Tools
        </BreadcrumbItem>
        <BreadcrumbItem startContent={<BuildCircleRoundedIcon fontSize="small" />}>
          {tool?.title}
        </BreadcrumbItem>
      </Breadcrumbs>
      {children}
    </main>
  );
}
