import {styled} from "@nextui-org/react";
import {StyledCardBlur} from "@primitives";
import {lightTheme} from "@theme/shared";

export const StyledNotifyBanner = styled(StyledCardBlur, {
  dflex: "center",
  fd: "row",
  p: 0,
  br: 0,
  background: "$headerBackground",
  position: "relative",
  zIndex: "$1",
  height: "$$notifyBannerHeight",
  color: "$text",
  width: "100%",
  border: "1.5px solid $border",
  borderTopColor: "transparent",
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  transition: "margin-bottom 0.25s ease 0s, transform 0.25s linear 0s",
  [`.${lightTheme} &`]: {
    "& .notify-gradient": {
      display: "none",
    },
  },
  variants: {
    isVisible: {
      false: {
        transform: "translateY(-$$notifyBannerHeight)",
        mb: "-$$notifyBannerHeight",
      },
    },
  },
});

export const StyledContent = styled("a", {
  display: "flex",
  position: "relative",
  zIndex: "$10",
  fd: "row",
  alignItems: "center",
  textDecoration: "none",
  color: "$text",
  cursor: "pointer",
  transition: "$default",
  "& .chevron-right-icon": {
    transition: "transform cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
  },
  "&:hover": {
    opacity: 0.8,
    "& .chevron-right-icon": {
      transform: "translateX(2px)",
    },
  },
});
