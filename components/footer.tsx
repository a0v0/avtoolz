"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { Link } from "@nextui-org/react";

const VercelCallout = dynamic(() =>
  import("./vercel-callout").then((mod) => mod.VercelCallout)
);

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/examples")) {
    return null;
  }

  return (
    // <footer className="container mx-auto max-w-7xl pb-12 px-12">
    //   <div className="flex flex-col justify-center items-center gap-1">
    //     <p className="text-sm text-default-400">© {getCurrentYear()} NextUI Inc.</p>
    //     <VercelCallout />
    //   </div>
    // </footer>
    <footer className="w-full flex items-center justify-center py-3">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://en.wikipedia.org/wiki/Earth"
        title="Crafted with ❤️‍🔥 on  Earth"
      >
        <p className="font-normal">
          Crafted with ❤️‍🔥 on{" "}
          <span className="text-default-600 text-blue-500">Earth</span>
        </p>
      </Link>
    </footer>
  );
};
