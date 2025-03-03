import type { IconSvgProps } from "@/types/svg";

export const MergePDFIcon = ({
  size = 48,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      className={"rounded-lg " + props.className}
      viewBox="0 0 48 48"
      fill="none"
      height={size || height}
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="48"
        height="48"
        className="fill-success-900 dark:fill-success-50"
      />
      <path
        d="M21 16.5V9.75C21 9.55109 20.921 9.36032 20.7803 9.21967C20.6397 9.07902 20.4489 9 20.25 9H9.75C9.55109 9 9.36032 9.07902 9.21967 9.21967C9.07902 9.36032 9 9.55109 9 9.75V38.25C9 38.4489 9.07902 38.6397 9.21967 38.7803C9.36032 38.921 9.55109 39 9.75 39H20.25C20.4489 39 20.6397 38.921 20.7803 38.7803C20.921 38.6397 21 38.4489 21 38.25V31.5M27 31.5V38.25C27 38.4489 27.079 38.6397 27.2197 38.7803C27.3603 38.921 27.5511 39 27.75 39H38.25C38.4489 39 38.6397 38.921 38.7803 38.7803C38.921 38.6397 39 38.4489 39 38.25V9.75C39 9.55109 38.921 9.36032 38.7803 9.21967C38.6397 9.07902 38.4489 9 38.25 9H27.75C27.5511 9 27.3603 9.07902 27.2197 9.21967C27.079 9.36032 27 9.55109 27 9.75V16.5M27 24H39M9.75 24H21"
        className="stroke-success-500"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        d="M30.5618 27.6135L29.3677 26.421L26.982 24.0338L29.3685 21.6473L30.561 20.4548M17.5312 27.6135L18.7245 26.421L21.111 24.0338L18.7245 21.6473L17.5312 20.4548"
        className="stroke-success-500"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
