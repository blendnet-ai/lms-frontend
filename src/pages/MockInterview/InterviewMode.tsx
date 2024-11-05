import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Timer from "../../components/DSATest/components/Timer";
import { useEffect, useRef, useState } from "react";

const MAX_SPEAKING_SECONDS = 120;

const InterviewMode = () => {
  const { mode } = useParams();

  const submitSolution = (navToReport: boolean) => {
    console.log("submitting solution");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        backgroundColor: "#EFF6FF",
        width: "100%",
        height: "100vh",
      }}
    >
      {/* Header Bar*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          mx: "2rem",
        }}
      >
        {/* Heading  */}
        <Typography
          sx={{
            fontSize: 24,
            color: "#225BEF",
            fontWeight: 600,
          }}
        >
          Mock Interview : Behavioural
        </Typography>

        {/* Options */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <Timer assessmentId={2} submitSolution={submitSolution} />

          {["Next", "Chat", "End Interview"].map((option) => (
            <Button
              key={option}
              sx={{
                backgroundColor: option === "Next" ? "#2059EE" : "#ED5050",
                color: "white",
                borderRadius: "10px",
                padding: "0rem 1rem",
                "&:hover": {
                  backgroundColor: option === "Next" ? "#2059EE" : "#ED5050",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  textTransform: "none",
                }}
              >
                {option}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          mx: "2rem",
          backgroundColor: "white",
          height: "100%",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        {/* Company tag  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#EFF6FF",
            width: "fit-content",
            borderRadius: "10px",
          }}
        >
          <CardMedia
            component="img"
            image="https://res.cloudinary.com/dnjcut34n/image/upload/v1730727557/misc/microsoft_uc1r9g.png"
            sx={{
              width: "50px",
              height: "50px",
              margin: "0.5rem",
            }}
          />

          <Typography
            sx={{
              fontSize: 14,
              color: "#225BEF",
              fontWeight: 600,
            }}
          >
            SDE I, Microsoft
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewMode;
