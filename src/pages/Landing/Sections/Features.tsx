import { Box, CardMedia } from "@mui/material";
import FeatureCard from "../Components/FeatureCard";
import { images } from "../../../assets";
import DisplayTextImage from "../Components/DisplayTextImage";

const Features = ({
  maxWidth,
  outerPadding,
}: {
  maxWidth: string;
  outerPadding: string | {};
}) => {
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
          padding: { xs: "2rem", md: "2rem 2rem 6rem 2rem" },
          borderRadius: "20px",
          maxWidth: maxWidth,
          margin: "auto",
          gap: "2rem",
        }}
      > 
        <Box
          sx={{
            display: "flex",
            margin: "auto",
            width: "100%",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              width: { xs: "80px", md: "150px" },
            }}
            image={images.dishaMadam}
          />

          {/* Center aligned heading */}
          <DisplayTextImage
            text="Meet DISHA, Your Always Available AI Tutor"
            fontSize={{ xs: "20px", md: "40px" }}
            fontWeight="700"
            padding={{ xs: "1rem", md: "0rem" }}
            textWidth={{ xs: "100%", md: "100%" }}
            textAlignment="center"
            highlightWordsList={["Always", "Available"]}
            highlightWordsFontWeight="700"
            width={{ xs: "100%", md: "max-content" }}
            placeNewLineAfterWord="Your"
          />
        </Box>

        {/* Grid Cards for features */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: "4rem",
            rowGap: { xs: "4rem", md: "5rem" },
            padding: { xs: "0rem", md: "0rem 2rem" },
            mt: { xs: "100px", md: "20px" },
          }}
        >
          <FeatureCard
            title="Accurate & Grounded"
            desc="hallucination free responses based on verified sources & strong guardrails"
            img={images.featureCard1}
            descWidth={{ xs: "100%", md: "80%" }}
            borderColor="rgb(16%, 32%, 81%,0.2)"
          />
          <FeatureCard
            title="Step-By-Step learning"
            desc="using Socratic method to power your reasoning & problem solving skills"
            img={images.featureCard2}
            descWidth={{ xs: "100%", md: "80%" }}
            borderColor="rgb(100%, 57%, 25%,0.2)"
          />
          <FeatureCard
            title="Multi-lingual Support"
            desc="converse and ask doubts in the language of your choice"
            img={images.featureCard3}
            descWidth={{ xs: "100%", md: "60%" }}
            mTop={{ xs: "100px", md: "200px" }}
            borderColor="rgb(93%, 41%, 50%,0.2)"
          />
          <FeatureCard
            title="Reporting & Analytics"
            desc="to track your performance and improve your results"
            img={images.featureCard4}
            descWidth={{ xs: "100%", md: "80%" }}
            mTop={{ xs: "100px", md: "200px" }}
            borderColor="rgb(100%, 85%, 36%,0.2)"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Features;
