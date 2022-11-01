import { Route } from "@lib/tools/page";
import { Container } from "@nextui-org/react";
import React from "react";

import Footer from "./footer";
import Header from "./header";
import Navbar from "./navbar";

export interface Props {
  routes: Route[];
  currentRoute?: Route;
  tag?: string;
  slug?: string;
}

const DefaultLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  routes,
}) => {
  return (
    <div id="app-container">
      <Header />
      <Navbar hasNotify isHome routes={routes} />
      <Container
        alignContent="space-between"
        as="main"
        className="main-container"
        css={{
          position: "relative",
          pt: "$$notifyBannerHeight", // only when the notify banner is visible
          minHeight: "100vh",
          marginTop: "var(--nextui--navbarHeight)",
          "@mdMax": {
            overflowX: "hidden",
          },
        }}
        display="flex"
        id="main-container"
        lg={true}
      >
        {children}
        <Footer />
      </Container>
    </div>
  );
};

export default DefaultLayout;
