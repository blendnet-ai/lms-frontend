import { useState } from "react";
import LiveClassAPI from "../apis/LiveClassAPI";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiCheck, FiCopy } from "react-icons/fi";
import { Role } from "@/types/app";

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
      } else {
        const resp = await LiveClassAPI.getMeetingJoinLink();
        await navigator.clipboard.writeText(resp.joining_url);
      }
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  };

  return (
    <div className="flex items-center ml-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {isCopied ? (
              <FiCheck className="w-[18px] h-[18px] text-blue-600 cursor-pointer" />
            ) : (
              <FiCopy
                onClick={handleCopyToClipboard}
                className="w-[18px] h-[18px] text-blue-600 cursor-pointer"
              />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{isCopied ? "Copied!" : "Copy"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CopyToClipboardButton;
