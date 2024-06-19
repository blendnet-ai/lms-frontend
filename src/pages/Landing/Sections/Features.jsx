import { Box } from "@mui/material";
import React from "react";
import FeatureCard from "../Components/FeatureCard";
import { images } from "../../../assets";
import DisplayTextImage from "../Components/DisplayTextImage";

const Features = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: { xs: "2rem", md: "0rem 8rem" },
        marginTop: { xs: "1rem", md: "2.5rem" },
      }}
    >
      {/* Inner content  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url(${images.backgroundLanding})`,
          padding: { xs: "2rem", md: "6rem 2rem" },
          borderRadius: "20px",
        }}
      >
        {/* Center aligned heading */}
        <DisplayTextImage
          text="Leverage Our Unified, AI-Powered Platform To Catapult You To Success!"
          fontSize={{ xs: "1.2rem", md: "30px" }}
          fontWeight="600"
          padding={{ xs: "1rem", md: "0rem" }}
          textWidth={{ xs: "100%", md: "60%" }}
          textAlignment="center"
          highlightWords={["AI-Powered", "Success!"]}
        />

        {/* Grid Cards for features */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: "2rem",
            rowGap: { xs: "2rem", md: "5rem" },
            marginTop: { xs: "2rem", md: "8rem" },
            padding: { xs: "0rem", md: "0rem 2rem" },
          }}
        >
          <FeatureCard
            title="360° Evaluation"
            desc="Comprehensive assessments to map your technical & soft skills."
            img={images.featureCard1}
          />
          <FeatureCard
            title="AI-led Skilling"
            desc="AI-powered skilling programs to make you a top 1% professional."
            img={images.featureCard2}
          />
          <FeatureCard
            title="Career Resources"
            desc="Profile building, Interview prep and  Mentorship to make you placement ready"
            img={images.featureCard3}
          />
          <FeatureCard
            title="Placement Support"
            desc="Get placed in top companies and startups to fast forward your career"
            img={images.featureCard4}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Features;
