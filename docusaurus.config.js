// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "aVToolz",
  tagline: "🔥A Swiss Army Toolbox to save your day...",
  url: "https://avtoolz.com",
  baseUrl: "/",
  onBrokenLinks: "ignore",
  titleDelimiter: "•", // Defaults to `|`
  onBrokenMarkdownLinks: "warn",
  favicon: "favicon.ico",
  organizationName: "Frisbane", // Usually your GitHub org/user name.
  projectName: "Frisbane Developer Docs", // Usually your repo name.
  themes: [
    "docusaurus-theme-redoc",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        blogRouteBasePath: "/",
        docsRouteBasePath: "/",
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      },
    ],
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/", // Serve the docs at the site's root
          // editUrl: "https://gitlab.com/",
          remarkPlugins: [require("mdx-mermaid")],
        },
        blog: false, // Optional: disable the blog plugin
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "aVToolz",
        logo: {
          alt: "aVToolz Logo",
          src: "logo.svg",
          href: "/",
          target: "_self", // By default, this value is calculated based on the `href` attribute (the external link will open in a new tab, all others in the current one).
        },
        items: [
          {
            href: "https://t.me/avtoolz",
            label: "Telegram",
            position: "right",
          },
          {
            href: "https://github.com/a0v0/avtoolz",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["yaml", "bash", "go"],
      },
      colorMode: {
        defaultMode: "light",
      },
    }),
};

module.exports = config;
