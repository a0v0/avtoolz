import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { AppConfig } from "./AppConfig";

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === AppConfig.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeFromLast<T>(path: string, key: string): string | T {
  const i = path.lastIndexOf(key);

  return i === -1 ? path : path.substring(0, i);
}
export function addTagToSlug(slug: string, tag?: string) {
  return tag ? slug.replace("/docs", `/docs/tag/${tag}`) : slug;
}

export const getRoutePaths = (path: string, tag?: string) => {
  const pagePath = path ? removeFromLast<string>(path, ".") : path;
  const pathname = pagePath ? addTagToSlug(pagePath, tag) : pagePath;

  return {
    pagePath,
    pathname,
  };
};

/**
 *
 * Get the pathname from the metadata state
 * This dives into async storage of promise state to get the pathname
 *
 * This is much more performant that using headers() from next as this doesn't opt out from the cache
 * @param state
 *
 * credit: https://github.com/vercel/next.js/discussions/50189#discussioncomment-9224262
 */
export const getPathnameFromMetadataState = (state: any): string => {
  const res = Object.getOwnPropertySymbols(state || {})
    .map((p) => state[p])
    .find((state) => state?.hasOwnProperty?.("urlPathname"));

  return res?.urlPathname.replace(/\?.+/, "") ?? "";
};
