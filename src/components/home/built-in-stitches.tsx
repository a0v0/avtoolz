import { Blockholder, CodeDemo } from "@components";
import landingContent from "@content/landing";
import {
  Col,
  Collapse,
  Grid,
  Link,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { BlockLink, Box, Section, Subtitle, Title } from "@primitives";
import cn from "classnames";
import NextLink from "next/link";
import * as React from "react";
import { InView } from "react-intersection-observer";

const items = [
  {
    id: "property_shorthands",
    title: "Property shorthands",
    description:
      "Using a shorthand property, you can write more concise and more readable CSS, saving time and energy.",
    lines: "2-9",
  },
  {
    id: "property_bundles",
    title: "Property bundles",
    description:
      "Property bundles are CSS properties that let you set the values of multiple other CSS properties simultaneously.",
    lines: "11-26",
  },
  {
    id: "simplify_syntax",
    title: "Simplify syntax",
    description:
      "NextUI provides a set of out of the box Stitches utilities that simplify CSS syntax.",
    lines: "29-48",
  },
];

const BuiltInStitchesSection = () => {
  const [activeItem, setActiveItem] = React.useState(items[0]);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleChange = (value: number) => {
    setActiveItem(items[value - 1]);
  };

  return (
    <InView as="section" className="inview-section" onChange={setIsVisible}>
      <Spacer css={{ "@xsMax": { mt: "$16" } }} y={10} />
      <Section css={{ position: "relative" }}>
        <Box
          css={{
            position: "absolute",
            top: 0,
            left: "-10%",
            zIndex: "-$1",
            "@xsMax": {
              top: "20%",
              left: "-90%",
            },
          }}
        >
          <img alt="theming background" src="/stitches-gradient.svg" />
        </Box>
        <Row justify="flex-start">
          <Title>Built-in Stitches</Title>
        </Row>
        <Row justify="flex-start">
          <Title color="violet">utilities.</Title>
        </Row>
        <Subtitle>
          NextUI provides a set of out of the box&nbsp;
          <Link
            css={{ color: "#FF1CF7", d: "inline-flex" }}
            href="https://stitches.dev/"
            rel="noreferer noopener"
            target="_blank"
          >
            Stitches
          </Link>
          &nbsp;utilities for speeding up your workflow by abbreviating CSS
          properties, grouping multiple CSS properties together, or simplifying
          a tricky syntax.
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
              <Collapse.Group accordion onChange={handleChange}>
                {items.map(({ id, title, description }) => (
                  <Collapse
                    key={id}
                    className={cn({ active: activeItem.id === id })}
                    css={{
                      br: "$lg",
                      border: "none",
                      p: "0 $lg",
                      margin: "$md 0",
                      "& .nextui-collapse-title": {
                        color: "$accents4",
                        fontSize: "1.7rem",
                        transition: "color 0.2s ease-in-out",
                      },
                      "&.active": {
                        bf: "saturate(180%) blur(14px)",
                        bg: "rgba(255, 255, 255, 0.05)",
                        boxShadow: "$md",
                      },
                      "&.active .nextui-collapse-view": {
                        pb: 0,
                      },
                      "&.active .nextui-collapse-title": {
                        color: "$text",
                      },
                      "&:hover": {
                        "&:not(.active) .nextui-collapse-title": {
                          color: "$accents7",
                        },
                      },
                    }}
                    expanded={id === items[0].id}
                    showArrow={false}
                    title={title}
                  >
                    <Text
                      css={{
                        fs: "1.4rem",
                        color: "$accents6",
                        "@xsMax": {
                          fs: "1rem",
                        },
                      }}
                    >
                      {description}
                    </Text>
                  </Collapse>
                ))}
              </Collapse.Group>
              <NextLink href="/tools/theme/utilities">
                <BlockLink color="violet">Learn more</BlockLink>
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
              "@xsMax": {
                mt: "$18",
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
                mt: "-10%",
              }}
            >
              {isVisible ? (
                <CodeDemo
                  showWindowIcons
                  css={{
                    maxHeight: 420,
                  }}
                  language="jsx"
                  line={activeItem.lines}
                  value={landingContent.stitchesUtilitiesCode}
                />
              ) : (
                <Blockholder height="420px" />
              )}
            </Col>
          </Grid>
        </Grid.Container>
      </Section>
    </InView>
  );
};

export default BuiltInStitchesSection;
