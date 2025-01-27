import React, { useState } from "react";
import { Mic } from "lucide-react";

interface MicPulsateWithBordersProps {
  animate: boolean;
  clickHandler?: () => void;
}

const MicPulsate: React.FC<MicPulsateWithBordersProps> = ({
  animate,
  clickHandler,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    clickHandler?.();
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex h-[60px] w-[60px] items-center justify-center mt-5 cursor-pointer"
    >
      <div
        className={`absolute h-full w-full rounded-full border-2 border-primary
          ${animate ? "animate-pulse-border" : ""}`}
      />
      <div
        className={`absolute h-full w-full rounded-full border-2 border-primary
          ${animate ? "animate-pulse-border-delayed" : ""}`}
      />
      <div
        className={`relative z-10 rounded-full bg-white p-3
          hover:bg-gray-100 active:bg-gray-200
          transform transition-all duration-200 ease-in-out
          ${isPressed ? "scale-90 animate-click" : ""}
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          flex items-center justify-center`}
      >
        <Mic
          className={`h-8 w-8 text-primary transition-colors
          ${isPressed ? "text-primary/80" : "hover:text-primary/90"}`}
        />
      </div>
    </div>
  );
};

export default MicPulsate;
