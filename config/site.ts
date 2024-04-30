export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "aVToolz • Fast, beautiful and modern tools for everyone.",
  description: "Fast, beautiful and modern tools for everyone.",
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
    description: "Fast, beautiful and modern tools for everyone.",
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
    title: "aVToolz • Fast, beautiful and modern tools for everyone.",
    description: "Fast, beautiful and modern tools for everyone.",
    image: "https://avtoolz.com/twitter-cards/avtoolz.jpeg",
    creator: "@avtoolz",
  },
  links: {
    github: "https://github.com/a0v0/avtoolz",
    githubRoadmap: "https://github.com/users/a0v0/projects/13/views/1",
    githubIssues:
      "https://github.com/a0v0/avtoolz/issues/new?q=is%3Aopen+label%3A%22%3Abug%3A+Type%3A+Bug%22+sort%3Aupdated-desc",
    sponsor: "https://patreon.com/a0v0",
  },
};
