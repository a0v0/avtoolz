import { Card, Text } from "@nextui-org/react";
export default function Sidebar() {
  return (
    <Card css={{ h: "100vh", $$cardColor: "$colors$primary" }}>
      <Card.Body>
        <Text h6 size={15} color="white" css={{ m: 0 }}>
          Sidebar
        </Text>
      </Card.Body>
    </Card>
  );
}
