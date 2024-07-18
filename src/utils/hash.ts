// generate hash based on provided list of string

// @a0v0 pickup from here
// generate hash of image preview and save them as id which will make it easier to
export function generateHash(strings: string[]): string {
  return strings.reduce((acc, str) => {
    return (
      acc + str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    );
  }, "");
}
// Compare this snippet from src/app/%5Blocale%5D/%28unauth%29/tools/image-to-pdf/page.tsx:
