import { Button, Link } from "@nextui-org/react";

function AuthButton() {
  return (
    <>
      <Button as={Link} color="primary" href="#" variant="flat">
        Sign In
      </Button>
    </>
  );
}

export default AuthButton;
