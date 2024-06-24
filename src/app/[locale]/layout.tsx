import "@/styles/global.css";

import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";

import { Cmdk } from "@/components/cmdk";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { AppConfig } from "@/utils/AppConfig";
import { getPathnameFromMetadataState } from "@/utils/Helpers";

import { getToolByHref } from "@/config/tools";
import { Providers } from "../providers";

// export const metadata: Metadata = {
//   icons: [
//     {
//       rel: 'apple-touch-icon',
//       url: '/apple-touch-icon.png',
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '32x32',
//       url: '/favicon-32x32.png',
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '16x16',
//       url: '/favicon-16x16.png',
//     },
//     {
//       rel: 'icon',
//       url: '/favicon.ico',
//     },
//   ],
// };

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
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(props.params.locale)) notFound();

  // Using internationalization in Client Components
  const messages = useMessages();

  return (
    <html suppressHydrationWarning lang={props.params.locale}>
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <NextIntlClientProvider
            locale={props.params.locale}
            messages={messages}
          >
            <Header routes={routes.items.filter((r) => r.routes.length > 0)} />
            {props.children}
            <Footer />
            <Cmdk />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
