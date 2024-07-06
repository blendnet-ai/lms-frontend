import { Box } from "@mui/material";
import React from "react";
import FeatureCard from "../Components/FeatureCard";
import { images } from "../../../assets";
import DisplayTextImage from "../Components/DisplayTextImage";

const Features = ({ maxWidth, outerPadding }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: outerPadding,
        // padding: { xs: "2rem", md: "0rem 8rem", lg: "2rem 16rem" },
        // marginTop: { xs: "1rem", md: "2.5rem" },
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
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        {/* Center aligned heading */}
        <DisplayTextImage
          text="Leverage Our AI-Powered Platform To Catapult Your Career To Success!"
          fontSize={{ xs: "1.2rem", md: "40px" }}
          fontWeight="600"
          padding={{ xs: "1rem", md: "0rem" }}
          textWidth={{ xs: "100%", md: "80%" }}
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
            marginTop: { xs: "2rem", md: "6.5rem" },
            padding: { xs: "0rem", md: "0rem 2rem" },
          }}
        >
          <FeatureCard
            title="360° Evaluation"
            desc="Comprehensive assessments to map your technical & soft skills."
            img={images.featureCard1}
            top="-40px"
            right="15px"
          />
          <FeatureCard
            title="AI Skilling"
            desc="AI-powered skilling programs to make you a top 1% professional."
            img={images.featureCard2}
            top="-40px"
            right="0"
          />
          <FeatureCard
            title="Career Resources"
            desc="Profile building, Interview prep, Mentorship & Guidance"
            img={images.featureCard3}
            top="-40px"
            right="15px"
          />
          <FeatureCard
            title="Placement Support"
            desc="Kick-start your career with placements in top companies"
            img={images.featureCard4}
            top="-40px"
            right="15px"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Features;
