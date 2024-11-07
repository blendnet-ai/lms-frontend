import React from "react";
import { Mic } from "@mui/icons-material";
import { styled, keyframes, IconButton } from "@mui/material";

interface MicPulsateWithBordersProps {
  animate: boolean;
  clickHandler?: () => void;
}

const pulseBorder = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const MicWrapper = styled("div")<Pick<MicPulsateWithBordersProps, "animate">>(
  ({ theme, animate }) => ({
    position: "relative",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",

    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: `2px solid ${theme.palette.primary.main}`,
      animation: animate ? `${pulseBorder} 1.5s infinite ease-out` : "none",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: `2px solid ${theme.palette.primary.main}`,
      animation: animate ? `${pulseBorder} 1.5s infinite ease-out` : "none",
      animationDelay: animate ? "0.75s" : "0s",
    },
  })
);

const MicIcon = styled(Mic)({
  fontSize: "48px",
  color: "#1976d2",
  position: "relative",
  zIndex: 2,
});

const MicPulsate: React.FC<MicPulsateWithBordersProps> = ({
  animate,
  clickHandler,
}) => (
  <MicWrapper animate={animate} onClick={clickHandler}>
    <IconButton>
      <MicIcon />
    </IconButton>
  </MicWrapper>
);

export default MicPulsate;
