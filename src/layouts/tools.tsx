import { Fixed, Sidebar } from "@components";
import Header from "@layouts/header";
import { MetaProps } from "@lib/tools/meta";
import { Route } from "@lib/tools/page";
import { Col, Container, Row } from "@nextui-org/react";
import { StyledImg } from "@primitives";
import { darkTheme } from "@theme/shared";
import { appears } from "@utils/animations";
import { getHeadings, Heading } from "@utils/get-headings";
import React, { useEffect, useState } from "react";

import Footer from "./footer";
import Navbar from "./navbar";

export interface Props {
  routes: Route[];
  currentRoute?: Route;
  prevRoute?: Route;
  nextRoute?: Route;
  meta?: MetaProps;
  tag?: string;
  slug?: string;
}

const ToolsLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  routes,
  tag,
  slug,
  meta,
}) => {
  const [, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    setHeadings(getHeadings());
  }, [routes]);

  return (
    <div id="app-container">
      <Header {...meta} />
      <Navbar routes={routes} />
      <Container
        as="main"
        className="docs__container"
        css={{ position: "relative" }}
        display="flex"
        id="main-container"
        lg={true}
      >
        <Row
          className="docs__content"
          css={{
            "@lg": {
              pt: "1rem",
            },
          }}
          gap={0}
        >
          <Col
            css={{
              width: "25%",
              display: "none",
              "@md": {
                display: "block",
              },
            }}
          >
            <Fixed
              className="docs__left-sidebar"
              css={{
                maxHeight: "calc(100vh - 4rem)",
                overflow: "auto",
                zIndex: "$2",
                pb: "$28",
                "&::-webkit-scrollbar": {
                  width: "0px",
                },
              }}
              offset={92}
            >
              <Sidebar routes={routes} slug={slug} tag={tag} />
            </Fixed>
          </Col>
          <Col
            className="docs__center"
            css={{
              zIndex: "$10",
              maxWidth: "100%",
              overflow: "hidden",
              mt: "$$navbarHeight",
              "@xsMax": {
                p: 0,
              },
            }}
          >
            <br></br>
            <br></br>
            {children}
          </Col>
          {/* <Col
            css={{
              width: "28%",
              height: "100%",
              display: "none",
              "@lg": {
                display: "block",
              },
            }}
          >
            <Fixed
              className="docs__right-sidebar"
              css={{
                width: "100%",
                zIndex: "$2",
                pb: "$20",
                "&::-webkit-scrollbar": {
                  width: "0px",
                },
              }}
              offset={92}
            >
              <TableOfContent headings={headings} />
            </Fixed>
          </Col> */}
          <StyledImg
            alt="gradient blue background"
            className="docs__gradient-blue"
            css={{
              display: "none",
              opacity: 0,
              position: "fixed",
              zIndex: "$1",
              bottom: "-50%",
              left: "-10%",
              right: "-50%",
              animation: `${appears} 200ms 100ms ease forwards`,
              [`.${darkTheme} &`]: {
                display: "block",
              },
            }}
            src="/gradient-left-dark.svg"
          />
          <StyledImg
            alt="gradient violet background"
            className="docs__gradient-violet"
            css={{
              display: "none",
              top: 0,
              opacity: 0,
              position: "fixed",
              animation: `${appears} 200ms 100ms ease forwards`,
              "@lg": {
                top: "-50%",
                right: "-50%",
              },
              "@mdMax": {
                top: "-35%",
                right: "-45%",
              },
              [`.${darkTheme} &`]: {
                display: "block",
              },
            }}
            src="/gradient-right-dark.svg"
          />
        </Row>
        <Footer css={{ jc: "flex-end" }} />
      </Container>
    </div>
  );
};

export default ToolsLayout;
