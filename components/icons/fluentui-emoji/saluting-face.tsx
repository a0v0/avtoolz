import {Image} from "@nextui-org/react";
import {LogoProps} from "./props";

export const SalutingFaceEmoji: React.FC<LogoProps> = ({size = 150, className, ...props}) => (
  <Image
    alt="Smiling face emoji"
    className={className}
    height={size}
    width={size}
    src="/emoji/saluting_face.svg"
  />
);
