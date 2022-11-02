import { Container, CSS, Link, Row, Text } from "@nextui-org/react";
import React from "react";

export interface Props {
  css?: CSS;
  containerCss?: CSS;
}

const Footer: React.FC<Props> = ({ css, containerCss }) => {
  // const year = new Date().getFullYear();
  return (
    <Container
      fluid
      className="footer__container"
      css={{
        zIndex: "$1",
        padding: "$md $sm",
        "@xsMax": {
          padding: "$sm $xs",
        },
        ...containerCss,
      }}
      gap={2}
    >
      <Row css={css} justify="center">
        {/* <Text
          span
          className="footer__copy"
          css={{
            fontSize: '$xs',
            color: '$accents6',
            '@mdMax': {
              fontSize: '$xs'
            }
          }}
        >
          &copy;&nbsp;Copyright&nbsp;{year}&nbsp;NextUI
        </Text>
        <Spacer x={0.5} /> */}
        <Text
          span
          className="footer__by"
          css={{
            fontSize: "$sm",
            color: "$accents7",
            dflex: "center",
          }}
        >
          Created&nbsp;by&nbsp;
          <Link href="https://github.com/a0v0" rel="noreferrer" target="_blank">
            aV
          </Link>
        </Text>
      </Row>
      {/* <Row css={css} justify="center">
        <VercelCallout />
      </Row> */}
    </Container>
  );
};

export default Footer;
