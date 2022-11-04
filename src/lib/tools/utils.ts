import { ParsedUrlQuery } from "querystring";

export type SlugParams = ParsedUrlQuery | undefined;

export interface SlugResponse {
  slug: string;
  tag?: string;
}

// Handle optional catch all route for `/docs`
function getDocsSlug(slug: any): any {
  return slug?.length ? slug : [""];
}

export function getSlug(params: SlugParams): SlugResponse {
  // Handle optional catch all route for `/docs`
  const slug = getDocsSlug(params?.slug);

  if (slug[0] === "tag") {
    return {
      slug: `/${getDocsSlug(slug.slice(2)).join("/")}`,
      tag: slug[1],
    };
  }

  return { slug: `/${slug.join("/")}` };
}
