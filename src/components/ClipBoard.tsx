import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { IconButton, Tooltip } from "@mui/material";

const CopyToClipboardButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  };

  return (
    <Tooltip title={isCopied ? "Copied!" : "Copy"} placement="top">
      <IconButton
        onClick={handleCopyToClipboard}
        className="copy-button"
        sx={{
          ml: "auto",
        }}
      >
        {isCopied ? (
          <AssignmentTurnedInIcon
            className="icon copied"
            sx={{
              width: "18px",
              height: "18px",
              color: "#2059EE",
              cursor: "pointer",
              "&:hover": {
                color: "#2059EE",
              },
            }}
          />
        ) : (
          <ContentCopyIcon
            className="icon default"
            sx={{
              width: "18px",
              height: "18px",
              color: "#2059EE",
              cursor: "pointer",
              "&:hover": {
                color: "#2059EE",
              },
            }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default CopyToClipboardButton;
