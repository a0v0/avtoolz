import { Metadata } from "next";

export type SiteConfig = typeof siteConfig;

// TODO: Modify the site config
export const siteConfig = {
  name: "aVToolz",
  description: "Make beautiful websites regardless of your design experience.",
  keywords: [
    "Merge PDF",
    "split PDF",
    "combine PDF",
    "extract PDF",
    "compress PDF",
    "convert PDF",
    "Word to PDF",
    "Excel to PDF",
    "Powerpoint to PDF",
    "PDF to JPG",
    "JPG to PDF",
  ],
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/a0v0/avtoolz",
    twitter: "",
    docs: "", //"https://nextui.org",
    discord: "", //"https://discord.gg/9b6yyZKmH4",
    sponsor: "", //"https://patreon.com/jrgarciadev",
  },
  // TODO: add opengraph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://avtoolz.com/",
    siteName: "aVToolz",
    description: "",
    images: [
      {
        url: "https://avtoolz.com/avtoolz-banner.webp",
        width: 1200,
        height: 630,
        alt: "aVToolz",
      },
    ],
  },
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },

  // TODO: Add keywords
  keywords: siteConfig.keywords,

  openGraph: siteConfig.openGraph,

  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  creator: "aV",
  authors: [
    {
      name: "aV",
      url: "https://github.com/a0v0",
    },
  ],
  viewport:
    "viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
