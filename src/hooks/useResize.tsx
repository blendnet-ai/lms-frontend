import { useCallback, useEffect, useState } from "react";

type UseResizeProps = {
  startWidth: number;
};

type UseResizeReturn = {
  width: number;
  enableResize: () => void;
};

const useResize = ({ startWidth }: UseResizeProps): UseResizeReturn => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(startWidth);

  const enableResize = useCallback(() => {
    setIsResizing(true);
  }, [setIsResizing]);

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        setWidth(newWidth);
      }
    },
    [startWidth, isResizing, setWidth]
  );

  useEffect(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", disableResize);
    };
  }, [disableResize, resize]);

  return { width, enableResize };
};

export default useResize;
