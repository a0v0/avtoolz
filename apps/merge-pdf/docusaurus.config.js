// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "PDF Merger X",
  tagline: "",
  url: "https://avtoolz.com",
  baseUrl: "/",
  onBrokenLinks: "ignore",
  titleDelimiter: "•", // Defaults to `|`
  onBrokenMarkdownLinks: "warn",
  // favicon: "favicon.ico",
  // organizationName: "a0v0", // Usually your GitHub org/user name.
  // projectName: "aVToolz", // Usually your repo name.

  // themes: [
  //   [
  //     require.resolve("@easyops-cn/docusaurus-search-local"),
  //     {
  //       hashed: true,
  //       indexDocs: true,
  //       indexBlog: false,
  //       indexPages: false,
  //       blogRouteBasePath: "/",
  //       docsRouteBasePath: "/",
  //       highlightSearchTermsOnTargetPage: true,
  //       searchResultLimits: 8,
  //       searchBarShortcut: true,
  //       searchBarShortcutHint: true,
  //     },
  //   ],
  // ],
  presets: [
    [
      "@docusaurus/preset-classic",
      // @ts-ignore
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
          customCss: require.resolve("../../src/css/custom.css"),
        },
        // sitemap: {
        //   changefreq: "weekly",
        //   priority: 0.5,
        //   ignorePatterns: ["/tags/**"],
        //   filename: "sitemap.xml",
        // },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: "PDF Merger X",
        // hideOnScroll: true,
        logo: {
          alt: "aVToolz Logo",
          src: "logo.webp",
          href: "/",
          target: "_self", // By default, this value is calculated based on the `href` attribute (the external link will open in a new tab, all others in the current one).
        },
        items: [
          {
            href: "https://github.com/a0v0/avtoolz/issues/new?labels=bug",
            label: "Report Bugs",
            position: "right",
          },
          {
            href: "https://github.com/a0v0/avtoolz/discussions/new?category=ideas",
            label: "Feature Request",
            position: "right",
          },
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
        defaultMode: "dark",
      },
    }),
};

module.exports = config;
