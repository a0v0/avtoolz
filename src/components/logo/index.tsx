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
      height={height || size || 25}
      viewBox="0 0 43 43"
      width={width || size || 25}
      {...props}
    >
      {/* <path d="M32 43H11a10.928 10.928 0 01-7.778-3.222A10.928 10.928 0 010 32V11a10.928 10.928 0 013.222-7.778A10.928 10.928 0 0111 0h21a10.929 10.929 0 017.779 3.222A10.927 10.927 0 0143 11v21a10.927 10.927 0 01-3.222 7.778A10.929 10.929 0 0132 43zM11.314 12.293v12.033a6.35 6.35 0 00.87 3.31 6.243 6.243 0 002.422 2.3 7.458 7.458 0 003.595.843 7.474 7.474 0 003.6-.839 6.2 6.2 0 002.418-2.3 6.381 6.381 0 00.869-3.315V12.292h-1.659V24.21a5.149 5.149 0 01-.643 2.578 4.6 4.6 0 01-1.824 1.779 5.668 5.668 0 01-2.759.648 5.646 5.646 0 01-2.756-.648 4.64 4.64 0 01-1.823-1.779 5.116 5.116 0 01-.648-2.578V12.292zm18.6 0v18.175h1.66V12.293z" /> */}
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
