import { Box, Divider } from "@mui/material";
import { Panel } from "react-resizable-panels";
import DifficultyChip from "../../DifficultyChip/DifficultyChip";

type LeftPanelProps = {
  title: string;
  question: string;
  visible: boolean;
};

export default function LeftPanel(props: LeftPanelProps) {
  return (
    <Panel
      style={{
        display: props.visible ? "inline" : "none",
      }}
    >
      <Box
        sx={{
          padding: "6px",
        }}
      >
        <DifficultyChip />
      </Box>

      <Box
        sx={{
          padding: "10px 30px 10px 30px",
          borderRadius: "10px",
          border: "1px solid #CFE4FF",
          backgroundColor: "white",
          // overflowY: "scroll",
          height: "100%",
        }}
      >
        <h2 style={{ color: "#2059EE", fontWeight: "550" }}>{props.title}</h2>
        <Divider />
        <div
          dangerouslySetInnerHTML={{
            __html: props.question,
          }}
        />
      </Box>
    </Panel>
  );
}
