import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import { Link } from "@nextui-org/link";
// import { Navbar } from "@nextui-org/navbar";
import { Navbar } from "@/components/nv";
import manifest from "@/config/routes.json";
import clsx from "clsx";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth focus:scroll-auto"
    >
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            {/* <XNavbar /> */}
            <Navbar routes={manifest.routes} />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
