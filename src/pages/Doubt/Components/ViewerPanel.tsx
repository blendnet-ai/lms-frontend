import { Box, Button, IconButton } from "@mui/material";
import { Panel } from "react-resizable-panels";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { DoubtSolvingContext } from "../Context/DoubtContext";
export default function ViewerPanel({
  link,
  isOpen,
}: {
  link: string;
  isOpen: boolean;
}) {
  const context = useContext(DoubtSolvingContext);

  return (
    <Panel
      style={{
        display: isOpen ? "flex" : "none",
        flexDirection: "column",
        padding: "5px 20px",
        gap: "10px",
      }}
      defaultSize={20}
    >
      {/* close button  */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => {
            context?.setLinkOpen(false);
          }}
          sx={{}}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* iframe  */}
      <iframe src={link} width="100%" height="100%"></iframe>
    </Panel>
  );
}
