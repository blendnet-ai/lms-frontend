import { Box, CardMedia } from "@mui/material";
import React from "react";
import FeatureCard from "../Components/FeatureCard";
import { icons, images } from "../../../assets";
import DisplayTextImage from "../Components/DisplayTextImage";

const Features = ({ maxWidth, outerPadding }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: outerPadding,
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
        <Box sx={{
          display: "flex",
          margin: "auto",
          width: "100%",
          position: "relative",
          justifyContent: "center",
          ml: { xs: "0", md: "3rem" }
        }}>
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              position: "absolute",
              top: "-10px",
              left: "150px",
              width: "150px"
            }}
            image={images.dishaMadam}
          />

          {/* Center aligned heading */}
          <DisplayTextImage
            text="Leverage DISHA As Your Always Available AI Tutor!"
            fontSize={{ xs: "24px", md: "40px" }}
            fontWeight="600"
            padding={{ xs: "1rem", md: "0rem" }}
            textWidth={{ xs: "100%", md: "80%" }}
            textAlignment="center"
            highlightWordsList={["Always", "Available"]}
            underlineImageUrl={icons.textUnderline}
            underlineImageWords={["Always"]}
            highlightWordsFontWeight="600"
            underlineHeight="100%"
            transform={{ xs: "translateX(-50%)", md: "translate(-21%,11%)" }}
            underlineBottom={{ xs: "-0px", md: "-0px" }}
            underlineWidth={{ xs: "100%", md: "320px" }}
            width="60%"
          />
        </Box>

        {/* Grid Cards for features */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: "4rem",
            rowGap: { xs: "4rem", md: "5rem" },
            marginTop: { xs: "2rem", md: "9rem" },
            padding: { xs: "0rem", md: "0rem 2rem" },
          }}
        >
          <FeatureCard
            title="Accurate & Grounded"
            desc="responses based on verified knowledge repositories"
            img={images.featureCard1}
            top="-140px"
            right="15px"
            descWidth="80%"
          />
          <FeatureCard
            title="Step-By-Step learning"
            desc="and problem solving to via Socratic method"
            img={images.featureCard2}
            top="-140px"
            right="0"
            descWidth="70%"
          />
          <FeatureCard
            title="Customizable Guardrails"
            desc="for a focused and safe learning environment"
            img={images.featureCard3}
            top="-70px"
            right="15px"
            descWidth="70%"
            mTop={{ xs: "100px", md: "200px" }}
          />
          <FeatureCard
            title="Reporting & Analytics"
            desc="on student engagement & learning outcomes"
            img={images.featureCard4}
            top="-70px"
            right="15px"
            descWidth="70%"
            mTop={{ xs: "100px", md: "200px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Features;
