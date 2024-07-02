import { Box, Drawer } from "@mui/material";
import Resizer from "../../Resizer/Resizer";

type LeftDrawerProps = {
  width: number;
  title: string;
  question: string;
  enableResize: () => void;
};

export default function LeftDrawer(props: LeftDrawerProps) {
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
      anchor="left"
    >
      <Box sx={{ padding: "10px" }}>
        <h2>{props.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: props.question,
          }}
        />
      </Box>
      <Resizer enableResize={props.enableResize} orientation="vertical" />
    </Drawer>
  );
}
