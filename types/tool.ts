export enum ToolCategory {
  IMAGE = "image",
  PDF = "pdf",
}

export type ToolType = {
  title: string;
  description: string;
  showFullDescription: boolean;
  icon: JSX.Element;
  href: string;
  isExternal: boolean;
  category: ToolCategory[];
  tags: string[];
};
