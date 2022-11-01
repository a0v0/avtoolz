/* eslint-disable no-unused-vars */
import { Blockholder, CodeDemo, ShopCard } from "@components";
import landingContent from "@content/landing";
import { Col, Grid, Row, Spacer } from "@nextui-org/react";
import { BlockLink, Box, Section, Subtitle, Title } from "@primitives";
import { darkTheme } from "@theme/shared";
import { get } from "lodash";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { useState } from "react";
import { InView } from "react-intersection-observer";

const codeHighlights = {
  nextui: "3-11",
  modern: "22-37",
  elegant: "54-72",
  retro: "93-107",
};

const darkCodeHighlights = {
  nextui: "10-21",
  modern: "38-53",
  elegant: "73-91",
  retro: "109-124",
};

const CustomThemesSection = () => {
  const [activeHighlight, setActiveHighlight] = useState("nextui");
  const [isVisible, setIsVisible] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <InView as="section" className="inview-section" onChange={setIsVisible}>
      <Spacer css={{ "@xsMax": { mt: "$32" } }} y={10} />
      <Section css={{ position: "relative" }}>
        <Box
          css={{
            position: "absolute",
            top: "-25%",
            right: "-30%",
            zIndex: "-$1",
            [`.${darkTheme} &`]: {
              right: 0,
              left: "-30%",
              "@xsMax": {
                top: "15%",
                left: "10% !important",
              },
            },
            "@xsMax": {
              top: "5%",
              right: "-40% !important",
            },
          }}
        >
          <img alt="theming background" src="/theming-gradient.svg" />
        </Box>
        <Row justify="flex-start">
          <Title>Apply your own</Title>
        </Row>
        <Row justify="flex-start">
          <Title color="blue">theming&nbsp;</Title>
          <Title>decisions.</Title>
        </Row>
        <Subtitle>
          NextUI provides a simple way to customize the default themes, you can
          change the colors, fonts, breakpoints and everything you need.
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
            <Col>
              <ShopCard onChangeTheme={setActiveHighlight} />
              <NextLink href="/tools/theme/customize-theme">
                <BlockLink color="blue">Learn more</BlockLink>
              </NextLink>
            </Col>
          </Grid>
          <Grid
            css={{
              pr: 0,
              "@mdMax": {
                pl: "0",
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
              {isVisible ? (
                <CodeDemo
                  showWindowIcons
                  css={{
                    maxHeight: 350,
                  }}
                  language="jsx"
                  line={get(
                    isDark ? darkCodeHighlights : codeHighlights,
                    activeHighlight
                  )}
                  value={landingContent.themingCode}
                />
              ) : (
                <Blockholder height="350px" />
              )}
            </Col>
          </Grid>
        </Grid.Container>
      </Section>
    </InView>
  );
};

export default CustomThemesSection;
