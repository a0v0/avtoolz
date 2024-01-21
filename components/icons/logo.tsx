import {SalutingFaceEmoji} from "./fluentui-emoji";
import {LogoProps} from "./fluentui-emoji/props";

export const Logo: React.FC<LogoProps> = ({size = 150, className, ...props}) => (
  <SalutingFaceEmoji size={size} className={className} {...props} />
);
