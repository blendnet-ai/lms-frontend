import { Box, Drawer } from "@mui/material";
import useResize from "../../../hooks/useResize";
import { useEffect, useState } from "react";
import TopRightDrawer from "./TopRightDrawer";
import BottomRightDrawer from "./BottomRightDrawer";

type RightDrawerProps = {
  width: number;
  isCodeEditorMaximized: boolean;
  handleCodeEditorMaxOrMin: () => void;
};

export default function RightDrawer(props: RightDrawerProps) {
  const [bottomDrawerHeight, setBottomDrawerHeight] = useState(
    window.innerHeight * 0.5
  );

  const {
    size: topDrawerHeight,
    enableResize: topRightDrawerEnableResize,
    setSize: setTopDrawerHeight,
  } = useResize({
    startSize: window.innerHeight * 0.5,
    resizerOrientation: "horizontal",
  });

  const handleCodeEditorMaxOrMin = () => {
    const newValue = !props.isCodeEditorMaximized;
    if (newValue) {
      setTopDrawerHeight(window.innerHeight);
    } else {
      setTopDrawerHeight(window.innerHeight - bottomDrawerHeight);
    }
    props.handleCodeEditorMaxOrMin();
  };

  useEffect(() => {
    if (!props.isCodeEditorMaximized) {
      const newbottomDrawerHeight = window.innerHeight - topDrawerHeight;
      setBottomDrawerHeight(newbottomDrawerHeight);
    }
  }, [topDrawerHeight]);

  return (
    <Drawer
      sx={{
        width: props.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: props.width,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Box sx={{ padding: "10px" }}>
        <TopRightDrawer
          height={topDrawerHeight}
          width={props.width}
          isCodeEditorMaximized={props.isCodeEditorMaximized}
          handleCodeEditorMaxOrMin={handleCodeEditorMaxOrMin}
          enableResize={topRightDrawerEnableResize}
        />
        {!props.isCodeEditorMaximized && (
          <BottomRightDrawer height={bottomDrawerHeight} />
        )}
      </Box>
    </Drawer>
  );
}
