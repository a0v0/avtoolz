import { KBarWrapper as KBarProvider } from "@components";
import RouterEvents from "@lib/router-events";
import { NextComponent } from "@lib/types";
import { NextUIProvider } from "@nextui-org/react";
import { isProd } from "@utils/index";
import { debounce } from "lodash";
import { NextPage } from "next";
import PlausibleProvider from "next-plausible";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppInitialProps } from "next/app";
import { NextRouter, Router } from "next/router";
import NProgress from "nprogress";

import globalStyles from "../styles/globalStyles";
import "../styles/sandpack.css";
import { darkTheme, lightTheme } from "../theme/shared";

type AppPropsType<
  R extends NextRouter = NextRouter,
  P = {}
> = AppInitialProps & {
  Component: NextComponent<P>;
  router: R;
  __N_SSG?: boolean;
  __N_SSP?: boolean;
};

type AppProps<P = {}> = AppPropsType<Router, P>;

NProgress.configure({ parent: "#app-container" });

const start = debounce(NProgress.start, 100);

RouterEvents.on("routeChangeStart", start);
RouterEvents.on("routeChangeComplete", (url) => {
  console.log(`Changed to URL: ${url}`);
  start.cancel();
  NProgress.done();
});
RouterEvents.on("routeChangeError", () => {
  start.cancel();
  NProgress.done();
});

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  globalStyles();

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <PlausibleProvider domain="avtoolz.com" enabled={isProd}>
          <KBarProvider>
            <Component {...pageProps} />
          </KBarProvider>
        </PlausibleProvider>
        <style global jsx>{`
          .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
          }
        `}</style>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

export default Application;
