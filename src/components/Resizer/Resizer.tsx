type Resizer = {
  enableResize: () => void;
  orientation: "vertical" | "horizontal";
};

export default function Resizer(props: Resizer) {
  return (
    <div
      style={{
        position: "absolute",
        cursor: "col-resize",
        // backgroundColor: "grey",
        ...(props.orientation === "vertical"
          ? {
              width: "5px",
              top: "0",
              right: "0",
              bottom: "0",
            }
          : {
              height: "5px",
              left: "0",
              bottom: "0",
              right: "0",
            }),
      }}
      onMouseDown={props.enableResize}
    />
  );
}
