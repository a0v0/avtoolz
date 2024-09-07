export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "aVToolz",
  tagline: "Fast, beautiful and modern tools for everyone.",
  description: "Fast, beautiful and modern tools for everyone.",
  ogImage: "https://avtoolz.com/twitter-cards/avtoolz.jpeg",
  siteUrl: "https://avtoolz.com",
  creator: "@a0v0",
  keywords: [
    "aVToolz",
    "pdf-converter",
    "image-converter",
    "image-editor",
    "pdf-editor",
    "text-tools",
    "audio-tools",
    "video-tools",
    "web-tools",
    "developer-tools",
    "ai-tools",
    "AI",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://avtoolz.com",
    siteName: "aVToolz",
    description: "Fast, beautiful and modern tools for everyone.",
    images: [
      {
        // TODO: add og image
        url: "https://avtoolz.com/twitter-cards/avtoolz.jpeg",
        width: 1200,
        height: 630,
        alt: "aVToolz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "aVToolz • Fast, beautiful and modern tools for everyone.",
    description: "Fast, beautiful and modern tools for everyone.",
    image: "https://avtoolz.com/twitter-cards/avtoolz.jpeg",
    creator: "@avtoolz",
  },
  links: {
    github: "https://github.com/a0v0/avtoolz",
    githubRoadmap: "https://github.com/users/a0v0/projects/13/views/1",
    githubNewIssuesURL: "https://github.com/a0v0/avtoolz/issues/new?labels=bug",
    sponsor: "https://patreon.com/a0v0",
    githubLatestRelease: "https://github.com/a0v0/avtoolz/releases/latest",
  },
};
