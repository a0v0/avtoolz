export enum ToolCategory {
  IMAGE = "image",
  PDF = "pdf",
}

export type ToolType = {
  key: string;
  title: string;
  description: string;
  icon: JSX.Element;
  showFullDescription: boolean;
  href: string;
  isExternal: boolean;
  category: ToolCategory[];
  keywords: string; // comma separated
  updated: boolean;
  newPost: boolean;
};
