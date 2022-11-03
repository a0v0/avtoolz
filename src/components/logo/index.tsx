import { CSS, styled } from "@nextui-org/react";
import React from "react";

export interface LogoProps {
  auto?: boolean;
  size?: number;
  width?: number;
  height?: number;
  small?: boolean;
  fill?: string;
  dark?: boolean;
  className?: string;
  css?: CSS;
}

const StyledSmallLogo = styled("svg", {
  "& path": { fill: "$foreground" },
  variants: {
    auto: {
      true: {
        display: "none",
        "@mdMax": {
          display: "block",
        },
      },
    },
  },
});

const StyledLargeLogo = styled("svg", {
  display: "block",
  "& path": { fill: "$foreground" },
  variants: {
    auto: {
      true: {
        "@mdMax": {
          display: "none",
        },
      },
    },
  },
});

const Logo: React.FC<LogoProps> = ({
  auto,
  size,
  width,
  height,
  small,
  css,
  ...props
}) => {
  const Small = () => (
    <StyledSmallLogo
      auto={auto}
      className="logo__small"
      css={css}
      height={24.48}
      viewBox="0 0 100 24.48"
      width={100}
      {...props}
    >
      <path d="m4.5 17.5c0-1.2 0.8-1.7 2.5-1.9l2.1-0.2v1c0 1.8-1.2 2.9-2.5 2.9-1.5 0-2.1-0.8-2.1-1.8zm8.3-5c0-3.7-2.9-5.3-6.3-5.3-1.4 0-3 0.2-4.4 0.9l-0.9 3.5c1.5-0.8 2.9-1.2 4.5-1.2 2 0 3.4 0.8 3.4 2.2v0.3l-1.9 0.2c-2.9 0.3-6.5 0.8-6.5 4.8 0 2.3 1.8 4.3 4.7 4.3 1.9 0 3.2-1 3.8-2.6l0.1 2.4h3.5zm7 9.5h5l6.7-19.9h-4.3l-4.9 15.8-4.7-15.8h-4.4zm28.3-19.9h-15.5l-0.9 3.5h6.6v16.4h3.9v-16.4h5.9zm5.5 8.1c2.7 0 4.1 2.1 4.1 4.5 0 2.4-1.4 4.5-4.1 4.5-2.7 0-4-2.1-4-4.5 0-2.4 1.3-4.5 4-4.5zm0-3.2c-4.9 0-7.8 3.4-7.8 7.7 0 4.4 2.9 7.8 7.8 7.8 4.9 0 7.8-3.4 7.8-7.8 0-4.3-2.9-7.7-7.8-7.7zm17.2 3.2c2.7 0 4.1 2.1 4.1 4.5 0 2.4-1.4 4.5-4.1 4.5-2.6 0-4-2.1-4-4.5 0-2.4 1.4-4.5 4-4.5zm0-3.2c-4.9 0-7.8 3.4-7.8 7.7 0 4.4 2.9 7.8 7.8 7.8 4.9 0 7.8-3.4 7.8-7.8 0-4.3-2.9-7.7-7.8-7.7zm10.1 15h3.8v-20.8h-3.8zm12.2-11.3l-6.4 11v0.3h11.6l1-3.2h-6.9l6.5-10.9v-0.4h-11.2l-1 3.2z" />
    </StyledSmallLogo>
  );

  const Large = () => (
    <StyledLargeLogo
      auto={auto}
      className="logo__large"
      height={24.48}
      viewBox="0 0 100 24.48"
      width={100}
      {...props}
    >
      <path d="m4.5 17.5c0-1.2 0.8-1.7 2.5-1.9l2.1-0.2v1c0 1.8-1.2 2.9-2.5 2.9-1.5 0-2.1-0.8-2.1-1.8zm8.3-5c0-3.7-2.9-5.3-6.3-5.3-1.4 0-3 0.2-4.4 0.9l-0.9 3.5c1.5-0.8 2.9-1.2 4.5-1.2 2 0 3.4 0.8 3.4 2.2v0.3l-1.9 0.2c-2.9 0.3-6.5 0.8-6.5 4.8 0 2.3 1.8 4.3 4.7 4.3 1.9 0 3.2-1 3.8-2.6l0.1 2.4h3.5zm7 9.5h5l6.7-19.9h-4.3l-4.9 15.8-4.7-15.8h-4.4zm28.3-19.9h-15.5l-0.9 3.5h6.6v16.4h3.9v-16.4h5.9zm5.5 8.1c2.7 0 4.1 2.1 4.1 4.5 0 2.4-1.4 4.5-4.1 4.5-2.7 0-4-2.1-4-4.5 0-2.4 1.3-4.5 4-4.5zm0-3.2c-4.9 0-7.8 3.4-7.8 7.7 0 4.4 2.9 7.8 7.8 7.8 4.9 0 7.8-3.4 7.8-7.8 0-4.3-2.9-7.7-7.8-7.7zm17.2 3.2c2.7 0 4.1 2.1 4.1 4.5 0 2.4-1.4 4.5-4.1 4.5-2.6 0-4-2.1-4-4.5 0-2.4 1.4-4.5 4-4.5zm0-3.2c-4.9 0-7.8 3.4-7.8 7.7 0 4.4 2.9 7.8 7.8 7.8 4.9 0 7.8-3.4 7.8-7.8 0-4.3-2.9-7.7-7.8-7.7zm10.1 15h3.8v-20.8h-3.8zm12.2-11.3l-6.4 11v0.3h11.6l1-3.2h-6.9l6.5-10.9v-0.4h-11.2l-1 3.2z" />
    </StyledLargeLogo>
  );

  if (auto) {
    return (
      <div>
        <Small />
        <Large />
      </div>
    );
  }

  if (small) {
    return <Small />;
  }

  return <Large />;
};

export default Logo;
