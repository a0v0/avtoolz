export type SiteConfig = typeof siteConfig;

// TODO: Modify the site config
export const siteConfig = {
  name: "aVToolz",
  description: "Make beautiful websites regardless of your design experience.",
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
