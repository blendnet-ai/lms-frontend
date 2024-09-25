import { Box, Button, CardMedia } from "@mui/material";
import FeatureCard from "../Components/FeatureCard";
import { images } from "../../../assets";
import DisplayTextImage from "../Components/DisplayTextImage";
import { useState } from "react";

const Features = ({
  maxWidth,
  outerPadding,
}: {
  maxWidth: string;
  outerPadding: string | {};
}) => {
  const [switchLayout, setSwitchLayout] = useState(1);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: outerPadding,
        marginTop: { xs: "5rem", md: "0" },
      }}
    >
      {/* Inner content  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: { xs: "2rem", md: "2rem 2rem 6rem 2rem" },
          borderRadius: "20px",
          maxWidth: maxWidth,
          margin: "auto",
          gap: "2rem",
          position: "relative",
          backgroundColor: switchLayout === 1 ? "#EFF6FF" : "#fff",
        }}
      >
        {/*  for testing swtich layout button  */}
        {/* <Button
          sx={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            zIndex: 1000,
          }}
          onClick={() => setSwitchLayout(switchLayout === 0 ? 1 : 0)}
        >
          Switch Layout
        </Button> */}

        {switchLayout === 0 ? (
          <Box
            sx={{
              display: "flex",
              margin: "auto",
              width: "100%",
              justifyContent: "center",
              gap: "4rem",
              padding: "0rem 2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "4rem",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                background: "linear-gradient(90deg, #6992FF 20%,#DD53FC 100%)",
                padding: "1rem 0rem 0rem 0rem",
                borderRadius: "20px",
                mb: "2rem",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  objectFit: "contain",
                  width: { xs: "80px", md: "150px" },
                  ml: "5rem",
                  mr: "4rem",
                }}
                image={images.dishaCrop}
              />

              <DisplayTextImage
                text="Meet DISHA, Your Always Available AI Tutor"
                fontSize={{ xs: "20px", md: "34px" }}
                fontWeight="700"
                padding={{ xs: "1rem", md: "0rem" }}
                textWidth={{ xs: "100%", md: "100%" }}
                textAlignment="center"
                highlightWordsList={["Always", "Available"]}
                highlightWordsFontWeight="700"
                width={{ xs: "100%", md: "max-content" }}
                placeNewLineAfterWord="Your"
                highlightWordsColor={["#fff", "#fff"]}
                textColor="#fff"
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              margin: "auto",
              width: "100%",
              justifyContent: "center",
              gap: "1rem",
              backgroundColor: "#EFF6FF",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                display: { xs: "none", md: "block" },
                objectFit: "contain",
                width: "250px",
              }}
              image={images.disha}
            />

            {/* disha for mobile  */}
            <CardMedia
              component="img"
              sx={{
                display: { xs: "block", md: "none" },
                position: "absolute",
                top: "-110px",
                objectFit: "contain",
                width: "180px",
              }}
              image={images.dishaMobile}
            />

            <DisplayTextImage
              text="Meet DISHA, Your Always Available AI Tutor"
              fontSize={{ xs: "20px", sm: "26", md: "34px" }}
              fontWeight="700"
              textWidth={{ xs: "100%", md: "100%" }}
              textAlignment="center"
              highlightWordsList={["Always"]}
              gradientWordsList={["Available"]}
              gradientWordsColor={["#6A4BE4", "#063FD4"]}
              highlightWordsFontWeight="700"
              width={{ xs: "100%", md: "max-content" }}
              placeNewLineAfterWord="Your"
              marginTop={{ xs: "3rem", md: "2rem" }}
            />
          </Box>
        )}

        {/* Grid Cards for features */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: "6rem",
            rowGap: { xs: "4rem", md: "5rem" },
            padding: { xs: "0rem", md: "0rem 2rem" },
            mt: { xs: "10px", md: "20px" },
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
            descWidth={{ xs: "100%", md: "55%" }}
            mTop={{ xs: "100px", md: "200px" }}
            borderColor="rgb(100%, 85%, 36%,0.2)"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Features;
