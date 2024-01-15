import { IconSvgProps } from "@/types";
import { Image } from "@nextui-org/react";

export interface LogoProps extends IconSvgProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 150,
  className,
  ...props
}) => <Image className={className} width={size} src="/logo.svg" />;
