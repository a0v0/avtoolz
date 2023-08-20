import { tools } from "@/config/tools";

export function getHrefByTitle(title: string) {
  for (const category of tools) {
    for (const tool of category.tools) {
      if (tool.title === title) {
        return tool.href;
      }
    }
  }
  return null; // Return null if title is not found
}
