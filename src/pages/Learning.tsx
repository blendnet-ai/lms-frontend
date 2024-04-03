import ReactPlayer from "react-player";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from "@floating-ui/react";
import Chatbot from "react-chatbot-kit";
import { useState } from "react";
import "react-chatbot-kit/build/main.css";
import Fab from "@mui/material/Fab";

import "./../styles/Learning.css";
import "./../App.css";
import config from "../configs/chatbotConfig";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";

interface Props {
  url: string;
}

function Learning({ url }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    strategy: "fixed",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  const fabStyles = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <>
      <ReactPlayer url={url} />
      <Fab
        sx={fabStyles}
        ref={refs.setReference}
        {...getReferenceProps()}
        color="primary"
        aria-label="add"
      ></Fab>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

export default Learning;
