import { Card, Text } from "@nextui-org/react";
export default function Content() {
  return (
    <Card css={{ h: "$20", $$cardColor: "$colors$primary" }}>
      <Card.Body>
        <Text h6 size={15} color="white" css={{ m: 0 }}>
          Content
        </Text>
      </Card.Body>
    </Card>
  );
}
