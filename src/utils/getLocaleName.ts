/**
 * Returns the localized name of a given locale code.
 *
 * @param localeCode - The locale code to get the name for (e.g., "en", "fr", "es").
 * @param displayLocale - The locale to use for displaying the name (default is "en").
 * @returns The localized name of the locale code, or the locale code itself if `Intl.DisplayNames` is not supported.
 */
export const getLocaleName = (
  localeCode: string,
  displayLocale: string = "en"
): string => {
  if (typeof Intl.DisplayNames !== "undefined") {
    return (
      new Intl.DisplayNames([displayLocale], { type: "language" }).of(
        localeCode
      ) || localeCode
    );
  }
  return localeCode; // Fallback if Intl.DisplayNames is not supported
};
