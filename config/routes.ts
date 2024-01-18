import {ToolCategory} from "@/types/tool";
import {Tools} from "./tools";

export const routes = {
  routes: [
    {
      key: "pdf-tools",
      title: "PDF Tools",
      defaultOpen: true,
      color: "green",
      keywords: "PDF tools, PDF editor, PDF converter, PDF viewer, PDF management",
      routes: Tools.filter((tool) => tool.category.includes(ToolCategory.PDF)).map((tool) => ({
        ...tool,
        path: tool.href,
      })),
    },
    {
      key: "image-tools",
      title: "Image Tools",
      defaultOpen: true,
      color: "violet",
      keywords: "Image tools, Image editor, Image converter, Image viewer, Image management",
      routes: Tools.filter((tool) => tool.category.includes(ToolCategory.IMAGE)).map((tool) => ({
        ...tool,
        path: tool.href,
      })),
    },
  ],
  mobileRoutes: [],
};
