import { useCallback, useEffect, useState } from "react";

type UseResizeProps = {
  startSize: number;
  resizerOrientation: "vertical" | "horizontal";
};

type UseResizeReturn = {
  size: number;
  enableResize: () => void;
};

const useResize = ({
  startSize,
  resizerOrientation,
}: UseResizeProps): UseResizeReturn => {
  const [isResizing, setIsResizing] = useState(false);
  const [size, setWidth] = useState(startSize);

  const enableResize = useCallback(() => {
    setIsResizing(true);
  }, [setIsResizing]);

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        let newWidth = 0;
        if (resizerOrientation == "vertical") {
          newWidth = e.clientX;
        } else {
          newWidth = e.clientY;
        }
        setWidth(newWidth);
      }
    },
    [startSize, isResizing, setWidth]
  );

  useEffect(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", disableResize);
    };
  }, [disableResize, resize]);

  return { size, enableResize };
};

export default useResize;
