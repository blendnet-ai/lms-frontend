import { useState } from "react";
import { IconButton } from "@mui/material";
import { Role } from "../App";
import LiveClassAPI from "../apis/LiveClassAPI";
import { Tooltip } from "react-tooltip";
import { FiCheck, FiCopy } from "react-icons/fi";

const CopyToClipboardButton = ({
  text,
  role,
  meetingId,
}: {
  text: string;
  role: Role;
  meetingId?: number;
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
        const resp = await LiveClassAPI.getMeetingJoinLink(meetingId!);
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
    <div className="flex items-center ml-auto">
      {/* <button
        onClick={handleCopyToClipboard}
        className="copy-button"
        style={{
          marginLeft: "auto",
        }}
      > */}
        {isCopied ? (
          <FiCheck
          className="icon copied"
          style={{
            width: "18px",
            height: "18px",
            color: "#2059EE",
            cursor: "pointer",
          }}
          />
        ) : (
          <FiCopy
          onClick={handleCopyToClipboard}
            data-tooltip-content={isCopied ? "Copied!" : "Copy"}
            data-tooltip-id="my-tooltip"
            data-tooltip-place="top"
            style={{
              width: "18px",
              height: "18px",
              color: "#2059EE",
              cursor: "pointer",
            }}
          />
        )}
      {/* </button> */}
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default CopyToClipboardButton;
