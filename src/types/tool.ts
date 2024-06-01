export enum ToolCategory {
  IMAGE = 'image',
  PDF = 'pdf',
}

export interface ToolType {
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
}
