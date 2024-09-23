import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Stats = ({
  text,
  count,
  countSuffix,
}: {
  text: string;
  count: number;
  countSuffix: string;
}) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false); // Add this state
  const ref = useRef(null);

  useEffect(() => {
    const duration = 1000;
    const frameRate = 20;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const randomIntFromInterval = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const updateCounter = () => {
      frame = 0;
      const intervalId = setInterval(() => {
        if (frame < totalFrames) {
          setDisplayCount(randomIntFromInterval(0, 99));
          frame++;
        } else {
          setDisplayCount(count);
          clearInterval(intervalId);
          setHasAnimated(true); // Mark the animation as done
        }
      }, 1000 / frameRate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            updateCounter();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current!);

    return () => observer.disconnect();
  }, [count, hasAnimated]); // Add hasAnimated to dependencies

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "2rem", md: "56px" },
          fontWeight: "700",
          textAlign: "center",
          background: `linear-gradient(270deg, #6A4BE4 43.92%, #063FD4 58.28%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayCount}
        {countSuffix}+
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "1rem", md: "1.5rem" },
          color: "#142349",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Stats;
