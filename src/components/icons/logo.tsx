import FluentUIEmoji, { EmpojiType } from './fluentui-emoji';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size, className }) => (
  <FluentUIEmoji
    size={size}
    className={className}
    emojiType={EmpojiType.SALUTING_FACE}
  />
);
