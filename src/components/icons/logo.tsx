import FluentUIEmoji, { EmpojiType } from "./fluentui-emoji";

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => (
  <FluentUIEmoji className={className} emojiType={EmpojiType.SALUTING_FACE} />
);
