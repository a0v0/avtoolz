interface ToolTemplateProps {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}

function ToolTemplate(props: ToolTemplateProps) {
  return (
    <div className="container mx-auto bg-red-300 flex flex-row">
      {props.rightChildren ? (
        <>
          <div className="bg-blue-400 basis-4/6 ">{props.leftChildren}</div>
          <div className="bg-green-400 basis-2/6">{props.rightChildren}</div>
        </>
      ) : (
        <div className="bg-blue-400 w-full">{props.leftChildren}</div>
      )}
    </div>
  );
}

export default ToolTemplate;
