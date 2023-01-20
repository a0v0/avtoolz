import { useColorMode } from "@docusaurus/theme-common";
import { Image } from "@nextui-org/react";
import { getStaticAssetPath } from "@site/src/utils/paths";
import React from "react";

const Logo: React.FC = () => {
  const { isDarkTheme } = useColorMode();
  return (
    <Image
      src={
        isDarkTheme
          ? getStaticAssetPath("/avtoolz-banner-dark-shadow.webp")
          : getStaticAssetPath("/avtoolz-banner-light-shadow.webp")
      }
      alt="aVToolz site logo"
      title=""
      height="30vh"
      objectFit="contain"
    />
  );
};

export default Logo;
