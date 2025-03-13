"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import NextTopLoader from "nextjs-toploader";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <HeroUIProvider>
      {/* <HeroUIProvider navigate={router.push}> */}
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <NextTopLoader color="#18c964" height={2} />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
