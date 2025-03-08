import "@/styles/global.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import { Cmdk } from "@/components/cmdk";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { getPathnameFromMetadataState } from "@/utils/helpers";

import { getToolByHref } from "@/config/tools";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "./providers";

export async function generateMetadata(_: any, state: any): Promise<Metadata> {
  // FIXME: migrate to a better solution once nextjs allows reading pathname in generateMetadata
  const pathname = getPathnameFromMetadataState(state);
  const tool = getToolByHref(pathname ?? "");
  let title = `${siteConfig.name} • ${siteConfig.tagline}`;

  let { description } = siteConfig;

  if (tool) {
    title = `${tool.title} • ${siteConfig.name}`;
    description = tool.description;
  } else if (pathname === "/tools") {
    title = `Tools • ${siteConfig.name}`;
    description = "All the available tools in aVToolz.";
  }

  return {
    title,
    description,
    keywords: siteConfig.keywords,

    icons: {
      icon: "/favicon.ico",
    },
    manifest: "/manifest",
    openGraph: siteConfig.openGraph,
    alternates: {
      canonical: "https://avtoolz.com",
      types: {
        "application/rss+xml": [
          { url: "https://avtoolz.com/feed.xml", title: "aVToolz RSS Feed" },
        ],
      },
    },
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html suppressHydrationWarning lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navbar routes={routes.items.filter((r) => r.routes.length > 0)} />
            {props.children}
            <Footer />
            <Cmdk />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
