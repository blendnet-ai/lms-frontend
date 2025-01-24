import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { IconButton, Tooltip } from "@mui/material";
import { Role } from "../App";
import LiveClassAPI from "../apis/LiveClassAPI";

const CopyToClipboardButton = ({
  text,
  role,
}: {
  text: string;
  role: Role;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      if (role === Role.COURSE_PROVIDER_ADMIN) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } else {
        const resp = await LiveClassAPI.getMeetingJoinLink();
        await navigator.clipboard.writeText(resp.joining_url);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
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
