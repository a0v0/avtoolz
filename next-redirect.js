const shell = require("shelljs");
const path = require("path");

const rootDir = path.join(__dirname, ".");
const contentDir = path.join(rootDir, "content");
const docsDir = path.join(contentDir, "docs");
const componentsDocsDir = path.join(docsDir, "components");

const getComponentsName = () => {
  const names = shell
    .ls("-R", componentsDocsDir)
    .map((file) => path.join(process.cwd(), componentsDocsDir, file))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));
  return names;
};
const getComponentsRoute = (names = []) => {
  return names.map((name) => {
    return {
      source: `/${name}`,
      destination: `/tools/components/${name}`,
      permanent: true,
    };
  });
};

async function redirect() {
  const componentsName = getComponentsName();
  return [
    ...getComponentsRoute(componentsName),
    {
      source: "/docs",
      destination: "/tools/guide/getting-started",
      permanent: true,
    },
    {
      source: "/tools/getting-started",
      destination: "/tools/guide/getting-started",
      permanent: true,
    },
    {
      source: "/guide",
      destination: "/tools/guide/getting-started",
      permanent: true,
    },
    {
      source: "/learn",
      destination: "/tools/guide/getting-started",
      permanent: true,
    },
    {
      source: "/theme",
      destination: "/tools/theme/default-theme",
      permanent: true,
    },
    {
      source: "/tools/theme",
      destination: "/tools/theme/default-theme",
      permanent: true,
    },
    {
      source: "/components/:path*",
      permanent: true,
      destination: "/tools/components/:path*",
    },
    {
      source: "/tools/components",
      destination: "/tools/components/button",
      permanent: true,
    },
    {
      source: "/components",
      destination: "/tools/components/button",
      permanent: true,
    },
  ];
}

module.exports = redirect;
