import Image from "next/image";
import {LogoProps} from "./props";

export const SmilingFaceWithHeartsEmoji: React.FC<LogoProps> = ({
  size = 150,
  className,
  ...props
}) => (
  <Image
    alt="Smiling face with hearts emoji"
    className={className}
    height={size}
    width={size}
    src="/emoji/smiling_face_with_hearts.svg"
  />
);
