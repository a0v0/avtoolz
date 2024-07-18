import autoAnimate from "@formkit/auto-animate";
import { Card } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";

interface ToolTemplateProps {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}

function ToolTemplate(props: ToolTemplateProps) {
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div
      ref={parent}
      className="container mx-auto lg:flex justify-center flex-row   min-h-[calc(90vh_-_108px)]"
    >
      {props.rightChildren ? (
        <>
          <div>{props.leftChildren}</div>

          <Card className="lg:md:w-1/4 mx-3 p-4 h-fit sticky top-24 ">
            {props.rightChildren}
          </Card>
        </>
      ) : (
        <div className=" w-full">{props.leftChildren}</div>
      )}
    </div>
  );
}

export default ToolTemplate;
