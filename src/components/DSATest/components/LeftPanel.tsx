import { Box, Drawer } from "@mui/material";
import { Panel } from "react-resizable-panels";

type LeftPanelProps = {
  title: string;
  question: string;
};

export default function LeftPanel(props: LeftPanelProps) {
  return (
    <Panel>
      <Box sx={{ padding: "10px" }}>
        <h2>{props.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: props.question,
          }}
        />
      </Box>
    </Panel>
  );
}
