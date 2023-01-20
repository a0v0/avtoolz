/**
 * Joins 2 paths together and makes sure there aren't any duplicate seperators
[
    {
      input: ['/'],
      result: '/',
    },
    {
      input: ['/', 'aaa', ':id'],
      result: '/aaa/:id',
    },
    {
      input: ['/bbb', ':id'],
      result: '/bbb/:id',
    },
    {
      input: ['ccc', ':id'],
      result: 'ccc/:id',
    },
    {
      input: ['/', '/', '/', '/ddd/', '/', ':id'],
      result: '/ddd/:id',
    },
    {
      input: ['', '', '', 'eee', '', ':id'],
      result: 'eee/:id',
    },
  ];
 */
export function buildPath(...args: string[]): string {
  const [first] = args;
  const firstTrimmed = first.trim();
  const result = args
    .map((part) => part.trim())
    .map((part, i) => {
      if (i === 0) {
        return part.replace(/[/]*$/g, "");
      } else {
        return part.replace(/(^[/]*|[/]*$)/g, "");
      }
    })
    .filter((x) => x.length)
    .join("/");

  return firstTrimmed === "/" ? `/${result}` : result;
}

/**
 * Get static image asset relative to static directory
 *
 **/
export function getStaticAssetPath(filepath: string) {
  return buildPath("/", filepath);
}
