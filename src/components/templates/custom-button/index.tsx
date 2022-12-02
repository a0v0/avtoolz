import { Button } from "@nextui-org/react";
import { useRef } from "react";

const CustomButton = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return <Button>Click me</Button>;
};

export default CustomButton;
