import { MimeType } from "@/lib/mime";
import { type ClassValue, clsx } from "clsx";
import { join } from "lodash";
import { twMerge } from "tailwind-merge";

/**
 * Retrieves the base URL for the application.
 *
 * The base URL is determined based on the following conditions:
 * 1. If the environment variable NEXT_PUBLIC_APP_URL is defined, it is used as the base URL.
 * 2. If the environment variable VERCEL_URL is defined, it is used as the base URL with the "https://" protocol.
 * 3. If none of the above conditions are met, the base URL defaults to "http://localhost:3000".
 *
 * @returns The base URL for the application.
 */
export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to combine.
 * @returns The combined class names as a string.
 */
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
  const res = Object.getOwnPropertySymbols(state)
    .map((item) => state[item])
    .find((state) => state?.hasOwnProperty("url"))?.url?.pathname;

  // return res?.urlPathname.replace(/\?.+/, "") ?? "";
  return res ?? "";
};

/**
 * Downloads a file by creating a temporary URL for the given object URL and triggering a download.
 * @param objectURL - The object URL representing the file data.
 * @param filename - The name of the file to be downloaded.
 * @throws {Error} If invalid objectURL or filename is provided.
 */
export function downloadURL(objectURL: string, filename: string) {
  if (!objectURL || !filename) {
    throw new Error("Invalid objectURL or filename provided");
  }

  const link = document.createElement("a");
  link.href = objectURL;
  link.download = filename;
  link.click();

  // Revoke the object URL to avoid memory leaks
  URL.revokeObjectURL(objectURL);
}

/**
 * Returns the file type based on the MIME type of the file.
 * @param file - The file object.
 * @returns The file type.
 */
export function getFileType(file: File): string {
  switch (file.type) {
    case "image/svg+xml":
      return "svg";

    default:
      // @ts-ignore
      return file.type.split("/")[1].toLowerCase();
  }
}

/**
 * Returns the icon path for a given file based on its type.
 * @param file - The file object.
 * @returns The icon path.
 */
export function getFileTypeIcon(file: File): string {
  switch (file.type) {
    case "application/pdf":
      return "/svgrepo/pdf.svg";
    case "image/jpeg":
      return "/svgrepo/jpg.svg";
    case "image/jpg":
      return "/svgrepo/jpg.svg";
    case "image/png":
      return "/svgrepo/png.svg";
    case "image/svg+xml":
      return "/svgrepo/svg.svg";

    default:
      return "/svgrepo/unkown-file.svg";
  }
}

/**
 * Generates a watermarked filename based on the original filename and output type.
 * @param filename - The original filename.
 * @param outputType - The output type (MIME type).
 * @returns The watermarked filename.
 */
export function getWatermarkedFilename(filename: string, outputType: MimeType) {
  let extension = "";
  switch (outputType) {
    case "application/pdf":
      extension = ".pdf";
  }

  // strip last extension from filename
  filename = filename.replace(/\.[^/.]+$/, "");

  // add watermark

  return join(["avtoolz", filename], "_") + extension;
}
