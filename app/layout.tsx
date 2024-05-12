import BackgroundEffects from "@/components/background-effects";
import {Cmdk} from "@/components/cmdk";
import {Footer} from "@/components/footer";
import {Navbar} from "@/components/Navbar";
import {fontSans} from "@/config/fonts";
import {routes as manifest} from "@/config/routes";
import {siteConfig} from "@/config/site";
import {getToolByHref} from "@/config/tools";
import "@/styles/globals.css";
import "@/styles/sandpack.css";
import {__PROD__} from "@/utils";
import {getPathnameFromMetadataState} from "@/utils/links";
import {clsx} from "@nextui-org/shared-utils";
import {Analytics} from "@vercel/analytics/react";
import {Metadata, Viewport} from "next";
import {Providers} from "./providers";

export async function generateMetadata(_: any, state: any): Promise<Metadata> {
  // TODO: migrate to a better solution once nextjs allows reading pathname in generateMetadata
  const pathname = getPathnameFromMetadataState(state);
  const tool = getToolByHref(pathname ?? "");
  var title = `${siteConfig.name} • ${siteConfig.tagline}`;
  var description = siteConfig.description;

  if (tool) {
    title = `${tool.title} • ${siteConfig.name}`;
    description = tool.description;
  } else if (pathname === "/tools") {
    title = `Tools • ${siteConfig.name}`;
    description = "All the available tools in aVToolz.";
  }

  return {
    title: title,
    description: description,
    keywords: siteConfig.keywords,

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
  };
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
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
