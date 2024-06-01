import { ToolCategory } from '@/types/tool';

import { Tools } from './tools';

export interface Route {
  key?: string;
  title?: string;
  subtitle?: string;
  section?: string;
  heading?: boolean;
  keywords?: string;
  iconSrc?: string;
  defaultOpen?: boolean;
  path?: string;
  routes?: Route[];
  updated?: boolean;
  newPost?: boolean;
  comingSoon?: boolean;
}

export const routes = {
  items: [
    {
      key: 'pdf-tools',
      title: 'PDF Tools',
      defaultOpen: true,
      color: 'green',
      keywords:
        'PDF tools, PDF editor, PDF converter, PDF viewer, PDF management',
      routes: Tools.filter((tool) =>
        tool.category.includes(ToolCategory.PDF),
      ).map((tool) => ({
        ...tool,
        path: tool.href,
      })),
    },
    {
      key: 'image-tools',
      title: 'Image Tools',
      defaultOpen: true,
      color: 'violet',
      keywords:
        'Image tools, Image editor, Image converter, Image viewer, Image management',
      routes: Tools.filter((tool) =>
        tool.category.includes(ToolCategory.IMAGE),
      ).map((tool) => ({
        ...tool,
        path: tool.href,
      })),
    },
  ],
};
