import { Blockholder,CustomButton } from "@components";
import { Col, Grid, Link, Row, Spacer } from "@nextui-org/react";
import { BlockLink, Box, Section, Subtitle, Title } from "@primitives";
import { darkTheme } from "@theme/shared";
import NextLink from "next/link";
import { useState } from "react";
import { InView } from "react-intersection-observer";

const CustomizationSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InView as="section" className="inview-section" onChange={setIsVisible}>
      <Spacer css={{ "@xsMax": { mt: "$14" } }} y={10} />
      <Section css={{ position: "relative" }}>
        <Box
          css={{
            position: "absolute",
            top: "-30%",
            right: "-35%",
            zIndex: "-$1",
            [`.${darkTheme} &`]: {
              top: "-30%",
              left: "-35%",
            },
          }}
        >
          <img
            alt="customization background"
            src="/customization-gradient.svg"
          />
        </Box>
        <Row justify="flex-start">
          <Title>Customization made</Title>
        </Row>
        <Row justify="flex-start">
          <Title color="green">easy.</Title>
        </Row>
        <Subtitle>
          Thanks to NextUI is built on top of the amazing CSS-in-JS
          library&nbsp;
          <Link
            css={{ color: "$green600", d: "inline-flex" }}
            href="https://stitches.dev/"
            rel="noreferer noopener"
            target="_blank"
          >
            Stitches
          </Link>
          , you can customize any components in several ways eather using
          the&nbsp;
          <NextLink href="/tools/theme/override-styles#using-the-css-prop">
            <Link css={{ color: "$green600", d: "inline-flex" }}>
              css&nbsp;
            </Link>
          </NextLink>
          prop,&nbsp;
          <NextLink href="/tools/theme/override-styles#using-the-styled-function">
            <Link css={{ color: "$green600", d: "inline-flex" }}>
              styled&nbsp;
            </Link>
          </NextLink>
          function or native CSS selectors.
        </Subtitle>
        <Grid.Container gap={2}>
          <Grid
            css={{
              pl: 0,
              "@xsMax": {
                pr: "0",
              },
            }}
            sm={6}
            xs={12}
          >
            <Col
              css={{
                dflex: "center",
                fd: "column",
                ai: "flex-start",
                h: "100%",
              }}
            >
              {isVisible ? null : <Blockholder height="360px" />}
              <NextLink href="/tools/theme/override-styles">
                <BlockLink color="green">Learn more</BlockLink>
              </NextLink>
            </Col>
          </Grid>
          <Grid
            css={{
              pr: 0,
              mt: "$9",
              "@mdMax": {
                pl: "0",
              },
            }}
            sm={6}
            xs={12}
          >
            <Box css={{ size: "100%", height: 320 }}>
              <Col
                css={{
                  dflex: "center",
                  fd: "column",
                  height: "100%",
                  br: "$lg",
                  bg: "linear-gradient(to right, #4ade80, #06b6d4)",
                }}
              >
                <CustomButton />
              </Col>
            </Box>
          </Grid>
        </Grid.Container>
      </Section>
    </InView>
  );
};

export default CustomizationSection;
