import React from "react";
import cn from "classnames";
import {Grid, Text, Tooltip, GridProps, useClipboard} from "@nextui-org/react";

interface Props {
  color: string;
  title: string;
  hexColor: string;
  inverted?: boolean;
  textColor?: string;
}

export type ItemProps = Props & GridProps;

const Item: React.FC<ItemProps> = ({color, title, textColor, hexColor, ...props}) => {
  const isGradient = color.includes("gradient");

  const {copy} = useClipboard();

  const renderItem = () => {
    return (
      <Grid
        className={cn("color", {
          "is-gradient": isGradient,
        })}
        css={{
          size: "100px",
          px: "$5",
          dflex: "center",
          marginBottom: "20px",
          flexDirection: "column",
          transition: "$default",
          cursor: "pointer",
          background: color,
          marginRight: "10px",
          br: "$lg",
          ".text": {
            fontSize: "$xs",
            wordBreak: "break-all",
            textAlign: "center",
          },
          "&:hover": {
            transform: "translateY(5px)",
          },
          "@smMax": {
            size: "80px",
          },
        }}
        {...props}
      >
        {isGradient ? (
          <Text
            className="text"
            css={{
              m: 0,
              fontWeight: "$semibold",
              color: textColor,
              "@smMax": {
                fontSize: "$xs",
              },
            }}
          >
            {title}
          </Text>
        ) : (
          <>
            <Text
              className="text"
              css={{
                m: 0,
                fontWeight: "$semibold",
                color: textColor,
                "@smMax": {
                  fontSize: "$xs",
                },
              }}
            >
              {title}
            </Text>
            <Text
              className="hex-text"
              css={{
                m: 0,
                fontSize: "$xs",
                color: textColor,
                opacity: 0.8,
                tt: "uppercase",
                fontWeight: "$bold",
              }}
            >
              {hexColor}
            </Text>
          </>
        )}
      </Grid>
    );
  };

  return (
    <>
      {isGradient ? (
        <Tooltip content={hexColor} title="Gradient" trigger="click">
          <>{renderItem()}</>
        </Tooltip>
      ) : (
        <Tooltip content="Copied!" trigger="click" onClick={() => copy(hexColor.trim())}>
          <>{renderItem()}</>
        </Tooltip>
      )}
    </>
  );
};

export default Item;
