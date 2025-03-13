import { Icon } from "@iconify-icon/react";
export function Logo({ size = 24 }: { size?: number }) {
  return (
    <Icon icon="fluent-emoji-flat:saluting-face" width={size} height={size} />
  );
}
