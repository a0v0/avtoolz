export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "aVToolz • Modern, fast, and user-friendly tools for everyone.",
  description: "Modern, fast, and user-friendly tools for everyone.",
  ogImage: "https://avtoolz.com/twitter-cards/avtoolz.jpeg",
  author: "Anubhav Mahur",
  email: "",
  siteUrl: "https://avtoolz.com",
  creator: "@a0v0",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://avtoolz.com",
    siteName: "aVToolz",
    description: "Modern, fast, and user-friendly tools for everyone.",
    images: [
      {
        url: "https://avtoolz.com/twitter-cards/avtoolz.jpeg",
        width: 1200,
        height: 630,
        alt: "aVToolz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "aVToolz • Modern, fast, and user-friendly tools for everyone.",
    description: "Modern, fast, and user-friendly tools for everyone.",
    image: "https://avtoolz.com/twitter-cards/avtoolz.jpeg",
    creator: "@avtoolz",
  },
  links: {
    github: "https://github.com/a0v0/avtoolz",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui-docs-v2.vercel.app",
    // discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/a0v0",
    portfolio: "https://github.com/a0v0",
  },
};
