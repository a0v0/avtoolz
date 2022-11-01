import React, {useState} from "react";
import {Section, Title, Subtitle} from "@primitives";
import {InView} from "react-intersection-observer";
import {Grid, Row, Col, Spacer, Text} from "@nextui-org/react";
import landingContent from "@content/landing";
import {CodeDemoBlock, Blockholder} from "@components";

const ComparationSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InView as="section" className="inview-section" onChange={setIsVisible}>
      <Spacer css={{"@xsMax": {mt: "$14"}}} y={10} />
      <Section css={{zIndex: "$10"}}>
        <Row justify="flex-start">
          <Title>Do</Title>
          <Spacer x={0.5} />
          <Title color="cyan">more.</Title>
        </Row>
        <Row justify="flex-start">
          <Title>Write</Title>
          <Spacer x={0.5} />
          <Title color="warning">less code.</Title>
        </Row>
        <Subtitle>
          NextUI components have been created with the Developer&apos;s experience
          <br />
          in mind, avoiding having to import multiple components to display just one.
        </Subtitle>
        <Grid.Container gap={1.5}>
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
                h: "100%",
              }}
            >
              {!isVisible ? (
                <Blockholder height="380px" />
              ) : (
                <CodeDemoBlock
                  showWindowIcons
                  css={{
                    minHeight: 340,
                  }}
                  language="jsx"
                  value={landingContent.comparativeCode.nextui}
                />
              )}
              <Text css={{color: "$text", fontSize: "$xl"}}>NextUI</Text>
            </Col>
          </Grid>
          <Grid
            css={{
              pr: 0,
              "@xsMax": {
                pl: "0",
              },
            }}
            sm={6}
            xs={12}
          >
            <Col css={{dflex: "center", fd: "column", h: "100%"}}>
              {!isVisible ? (
                <Blockholder height="380px" />
              ) : (
                <CodeDemoBlock
                  showWindowIcons
                  css={{
                    height: 340,
                    boxShadow: "none",
                  }}
                  language="jsx"
                  value={landingContent.comparativeCode.others}
                />
              )}
              <Text css={{color: "$accents6", fontSize: "$xl"}}>Others</Text>
            </Col>
          </Grid>
        </Grid.Container>
      </Section>
    </InView>
  );
};

export default ComparationSection;
