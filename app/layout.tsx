import BackgroundEffects from "@/components/background-effects";
import {Cmdk} from "@/components/cmdk";
import {Footer} from "@/components/footer";
import {Navbar} from "@/components/navbar";
import {fontSans} from "@/config/fonts";
import {routes as manifest} from "@/config/routes";
import "@/styles/globals.css";
import "@/styles/sandpack.css";
import {__PROD__} from "@/utils";
import {clsx} from "@nextui-org/shared-utils";
import {Analytics} from "@vercel/analytics/react";
import {Providers} from "./providers";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning dir="ltr" lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <BackgroundEffects />
        <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
          <div className="relative flex flex-col" id="app-container">
            <Navbar mobileRoutes={manifest.mobileRoutes} routes={manifest.routes} />
            {children}
            {/* FIXME: add footer to bottom always */}
            <Footer />
          </div>
          <Cmdk />
        </Providers>
        {__PROD__ && <Analytics />}
      </body>
    </html>
  );
}
