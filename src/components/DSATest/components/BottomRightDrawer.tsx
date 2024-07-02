import { Box, Drawer } from "@mui/material";

type BottomRightDrawerProps = {
  height: number;
};

export default function BottomRightDrawer(props: BottomRightDrawerProps) {
  return (
    <Drawer
      sx={{
        height: props.height,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          height: props.height,
          boxSizing: "border-box",
          position: "absolute",
        },
      }}
      variant="permanent"
      anchor="bottom"
    >
      <Box>Test cases</Box>
    </Drawer>
  );
}
