import { Logo } from "@/components/icons/logo";
import { subtitle, title } from "@/lib/primitives";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";

function Hero() {
  const t = useTranslations("home.hero");
  return (
    <main className="h-screen text-center  mt-24">
      <center>
        <Logo />
      </center>
      <h1 className={title()}>Your Online&nbsp;</h1>
      <br />
      <h1 className={title({ color: "green" })}>Utitlity Toolbox&nbsp;</h1>
      <h2
        className={subtitle({
          fullWidth: true,
          class: "text-center",
        })}
      >
        {t("tagline")}
      </h2>
      <Button
        as={Link}
        endContent={
          <span className="icon-[solar--arrow-right-bold-duotone] size-6"></span>
        }
        color="success"
        variant="ghost"
        href="/tools"
      >
        {t("browse_all")}
      </Button>
    </main>
  );
}

export default Hero;
