import { Row, Spacer } from "@nextui-org/react";
import { Section, Subtitle, Title } from "@primitives";

const LastButNotLeastSection = () => {
  return (
    <Section css={{ zIndex: "$10" }}>
      <Spacer css={{ "@xsMax": { mt: "$14" } }} y={6} />
      <Row justify="center">
        <Title>Last&nbsp;</Title>
        <Title color="warning">but&nbsp;</Title>
      </Row>
      <Row justify="center">
        <Title>not&nbsp;</Title>
        <Title color="pink">least.</Title>
      </Row>
      <Row justify="center">
        <Subtitle css={{ textAlign: "center" }}>
          A fully-featured React UI library.
        </Subtitle>
      </Row>
    </Section>
  );
};

export default LastButNotLeastSection;
