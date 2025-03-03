import { Logo } from "@/components/icons/logo";
import { subtitle, title } from "@/lib/primitives";
import { Link } from "@heroui/link";
import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

function Hero() {
  const t = useTranslations("home.hero");
  return (
    <main className="h-screen flex flex-col items-center justify-center -mt-20">
      <Logo className="w-36 text-center" />

      <h1 className={title()}>Your Online&nbsp;</h1>
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
