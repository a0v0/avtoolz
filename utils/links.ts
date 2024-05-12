export const isActive = (pathname: string | undefined | null, href: string) =>
  pathname && pathname.startsWith(href);

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
