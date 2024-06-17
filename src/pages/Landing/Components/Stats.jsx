import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Stats = ({ text, count }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const duration = 1000;
    const frameRate = 20;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const randomIntFromInterval = (min, max) => {
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
        }
      }, 1000 / frameRate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [count]);

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "2rem", md: "4rem" },
          fontWeight: "600",
          textAlign: "center",
          background: `linear-gradient(180deg, #189F6C 0%, #96CFBA 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayCount}+
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: "1rem",
          color: "#142349",
          textAlign: "center",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Stats;
