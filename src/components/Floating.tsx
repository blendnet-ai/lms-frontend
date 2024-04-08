import { useState } from "react";
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

// import "./styles.css";

type Props = {
  right: number;
  bottom: number;
  component: JSX.Element;
  visible: boolean;
  id: number;
  onVisible: (arg0: number | null) => void;
  onClose: () => void;
};

export default function Floating({
  right,
  bottom,
  component,
  visible,
  id,
  onVisible,
  onClose,
}: Props) {
  const [isOpen, _setIsOpen] = useState(false);
  const setIsOpen = (open: boolean) => {
    _setIsOpen(open);
    if (open) onVisible(id);
    else onVisible(null);
    console.log(open);
    if (!open) onClose();
  };

  const { refs, floatingStyles, context } = useFloating({
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

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "100px",
          margin: 0,
          top: "auto",
          right: right,
          bottom: bottom,
          left: "auto",
          position: "fixed",
          display: visible ? "visible" : "none",
        }}
      >
        Add review
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            {component}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
