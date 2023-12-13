import { XNavbar } from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import { Link } from "@nextui-org/link";
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
            <XNavbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href=""
                title="Crafted with ❤️‍🔥 on Earth"
              >
                <span className="text-default-600">Crafted with ❤️‍🔥 on</span>
                <p className="text-primary">Earth</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
