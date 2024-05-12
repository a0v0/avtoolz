import BackgroundEffects from "@/components/background-effects";
import {Cmdk} from "@/components/cmdk";
import {Footer} from "@/components/footer";
import {Navbar} from "@/components/Navbar";
import {fontSans} from "@/config/fonts";
import {routes as manifest} from "@/config/routes";
import {siteConfig} from "@/config/site";
import "@/styles/globals.css";
import "@/styles/sandpack.css";
import {__PROD__} from "@/utils";
import {clsx} from "@nextui-org/shared-utils";
import {Analytics} from "@vercel/analytics/react";
import {Metadata} from "next";
import {Providers} from "./providers";

const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s • ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: siteConfig.openGraph,
  alternates: {
    canonical: "https://avtoolz.com",
    types: {
      "application/rss+xml": [{url: "https://avtoolz.com/feed.xml", title: "aVToolz RSS Feed"}],
    },
  },
  viewport:
    "viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning dir="ltr" lang="en">
      {/* <head /> */}
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <BackgroundEffects />
        <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
          <div className="relative flex flex-col" id="app-container">
            <Navbar routes={manifest.routes.filter((r) => r.routes.length > 0)} />
            {children}
            <Footer />
          </div>
          <Cmdk />
        </Providers>
        {__PROD__ && <Analytics />}
      </body>
    </html>
  );
}
